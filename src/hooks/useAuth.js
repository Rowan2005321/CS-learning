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
      setIsLoading(false);
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

  async function sendEmailOtp(email, redirectTo) {
    if (!supabase) return { error: new Error("Supabase is not configured.") };
    setAuthError("");
    const result = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true
      }
    });
    if (result.error) setAuthError(result.error.message);
    return result;
  }

  async function verifyEmailOtp(email, token, password) {
    if (!supabase) return { error: new Error("Supabase is not configured.") };
    setAuthError("");

    const result = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email"
    });

    if (result.error) {
      setAuthError(result.error.message);
      return result;
    }

    if (!password) return result;

    const passwordResult = await supabase.auth.updateUser({ password });
    if (passwordResult.error) {
      setAuthError(passwordResult.error.message);
      return passwordResult;
    }

    return {
      data: {
        ...result.data,
        user: passwordResult.data.user ?? result.data.user
      },
      error: null
    };
  }

  async function signInWithGoogle(redirectTo) {
    if (!supabase) return { error: new Error("Supabase is not configured.") };
    setAuthError("");
    const result = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          redirectTo ??
          (typeof window === "undefined" ? undefined : window.location.href)
      }
    });
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
    sendEmailOtp,
    session,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    verifyEmailOtp,
    user: session?.user ?? null
  };
}
