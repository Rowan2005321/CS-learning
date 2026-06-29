import { useEffect, useMemo, useState } from "react";
import { buildAuthRedirectUrl } from "../auth/authRedirects";
import { AUTH_ERROR_CODES, getAuthErrorMessage, normalizeAuthError } from "../auth/authErrors";
import { maskEmail, normalizeEmail } from "../auth/emailUtils";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

function createNormalizedError(code, lang) {
  return {
    code,
    message: getAuthErrorMessage(code, lang),
    rawMessage: code
  };
}

function getSafeRedirectUrl(redirectTo, lang) {
  return buildAuthRedirectUrl(redirectTo, lang);
}

export function createAuthActions({
  client,
  isConfigured,
  lang = "zh",
  setAuthError = () => {},
  setSession = () => {}
}) {
  function handleMissingConfig() {
    const error = createNormalizedError(AUTH_ERROR_CODES.SUPABASE_NOT_CONFIGURED, lang);
    setAuthError(error.message);
    return { data: null, error };
  }

  function handleResult(result) {
    if (result?.error) {
      const error = normalizeAuthError(result.error, lang);
      setAuthError(error.message);
      return { ...result, error };
    }

    setAuthError("");
    if (result?.data?.session) setSession(result.data.session);
    return result;
  }

  async function getSessionSafe() {
    if (!isConfigured || !client) return { data: { session: null }, error: null };

    try {
      return handleResult(await client.auth.getSession());
    } catch (error) {
      return handleResult({ data: { session: null }, error });
    }
  }

  async function refreshSession() {
    if (!isConfigured || !client) return handleMissingConfig();
    return handleResult(await client.auth.refreshSession());
  }

  async function sendSignUpOtp(email, redirectTo) {
    if (!isConfigured || !client) return handleMissingConfig();
    const normalizedEmail = normalizeEmail(email);

    return handleResult(
      await client.auth.signInWithOtp({
        email: normalizedEmail,
        options: {
          emailRedirectTo: getSafeRedirectUrl(redirectTo, lang),
          shouldCreateUser: true
        }
      })
    );
  }

  async function sendSignInOtp(email, redirectTo) {
    if (!isConfigured || !client) return handleMissingConfig();
    const normalizedEmail = normalizeEmail(email);

    return handleResult(
      await client.auth.signInWithOtp({
        email: normalizedEmail,
        options: {
          emailRedirectTo: getSafeRedirectUrl(redirectTo, lang),
          shouldCreateUser: false
        }
      })
    );
  }

  async function verifyEmailOtp(email, token) {
    if (!isConfigured || !client) return handleMissingConfig();
    const normalizedEmail = normalizeEmail(email);

    return handleResult(
      await client.auth.verifyOtp({
        email: normalizedEmail,
        token: String(token ?? "").trim(),
        type: "email"
      })
    );
  }

  async function setPassword(password) {
    if (!isConfigured || !client) return handleMissingConfig();
    return handleResult(await client.auth.updateUser({ password }));
  }

  async function signInWithPassword(email, password) {
    if (!isConfigured || !client) return handleMissingConfig();
    const normalizedEmail = normalizeEmail(email);

    return handleResult(
      await client.auth.signInWithPassword({
        email: normalizedEmail,
        password
      })
    );
  }

  async function signInWithGoogle(redirectTo) {
    if (!isConfigured || !client) return handleMissingConfig();

    return handleResult(
      await client.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: getSafeRedirectUrl(redirectTo, lang)
        }
      })
    );
  }

  async function signOut() {
    if (!isConfigured || !client) return handleMissingConfig();
    const result = await client.auth.signOut();
    if (!result.error) setSession(null);
    return handleResult(result);
  }

  return {
    getSessionSafe,
    refreshSession,
    sendSignInOtp,
    sendSignUpOtp,
    setPassword,
    signInWithGoogle,
    signInWithPassword,
    signOut,
    verifyEmailOtp
  };
}

export function useAuth(lang = "zh") {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [authError, setAuthError] = useState("");

  const actions = useMemo(
    () =>
      createAuthActions({
        client: supabase,
        isConfigured: isSupabaseConfigured,
        lang,
        setAuthError,
        setSession
      }),
    [lang]
  );

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    let isMounted = true;

    actions.getSessionSafe().then(({ data, error }) => {
      if (!isMounted) return;
      if (error) setAuthError(error.message);
      setSession(data?.session ?? null);
      setIsLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") {
        setSession(nextSession);
      }

      if (event === "SIGNED_OUT") {
        setSession(null);
      }

      if (event === "USER_UPDATED" && nextSession) {
        setSession(nextSession);
      }

      if (event === "SIGNED_IN" && nextSession?.user?.email) {
        console.info("[auth] signed in", { email: maskEmail(nextSession.user.email) });
      }

      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [actions]);

  return {
    ...actions,
    authError,
    isConfigured: isSupabaseConfigured,
    isLoading,
    session,
    user: session?.user ?? null
  };
}
