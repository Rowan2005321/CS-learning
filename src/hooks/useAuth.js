import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

export function useAuth() {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!isMounted) return;
      if (error) setAuthError(error.message);
      setSession(data.session);
      setIsLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signInWithEmail(email, password) {
    if (!supabase) return { error: new Error("Supabase is not configured.") };
    setAuthError("");
    const result = await supabase.auth.signInWithPassword({ email, password });
    if (result.error) setAuthError(result.error.message);
    return result;
  }

  async function signUpWithEmail(email, password) {
    if (!supabase) return { error: new Error("Supabase is not configured.") };
    setAuthError("");
    const result = await supabase.auth.signUp({ email, password });
    if (result.error) setAuthError(result.error.message);
    return result;
  }

  async function signOut() {
    if (!supabase) return { error: new Error("Supabase is not configured.") };
    setAuthError("");
    const result = await supabase.auth.signOut();
    if (result.error) setAuthError(result.error.message);
    return result;
  }

  return {
    authError,
    isConfigured: isSupabaseConfigured,
    isLoading,
    session,
    signInWithEmail,
    signOut,
    signUpWithEmail,
    user: session?.user ?? null
  };
}
