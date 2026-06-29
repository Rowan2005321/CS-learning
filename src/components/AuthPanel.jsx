import { BookOpen, Chrome, Cloud, LogOut, Mail, UploadCloud, UserRound } from "lucide-react";
import { useEffect, useMemo, useReducer, useState } from "react";
import { getAuthReadinessReport } from "../auth/authDiagnostics";
import { AUTH_EVENTS, AUTH_STATES, transitionAuthState } from "../auth/authStateMachine";
import { getEmailProvider, maskEmail, normalizeEmail } from "../auth/emailUtils";

const AUTH_TABS = {
  otpLogin: "otp-login",
  passwordLogin: "password-login",
  signUp: "sign-up"
};

function formatStatus(template, values) {
  return Object.entries(values).reduce(
    (message, [key, value]) => message.replace(`{${key}}`, value),
    template
  );
}

function getQueryFlag(name) {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).has(name);
}

export function AuthPanel({
  auth,
  cloudStatus,
  isSyncing,
  lang = "zh",
  oauthRedirectUrl,
  onAuthSuccess,
  onLoadCloudData,
  onSaveLocalData,
  redirectLabel,
  successHref,
  t
}) {
  const [activeTab, setActiveTab] = useState(AUTH_TABS.otpLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isCodeStep, setIsCodeStep] = useState(false);
  const [localStatus, setLocalStatus] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [authState, dispatchAuthEvent] = useReducer(
    transitionAuthState,
    auth.isConfigured ? AUTH_STATES.ready : AUTH_STATES.misconfigured
  );

  const normalizedEmail = normalizeEmail(email);
  const maskedEmail = maskEmail(normalizedEmail);
  const isBusy = [
    AUTH_STATES.sendingOtp,
    AUTH_STATES.verifyingOtp,
    AUTH_STATES.settingPassword,
    AUTH_STATES.signingIn,
    AUTH_STATES.oauthRedirecting
  ].includes(authState);
  const showDiagnostics = import.meta.env.DEV || getQueryFlag("debugAuth");
  const diagnostics = useMemo(
    () =>
      getAuthReadinessReport({
        currentUrl: typeof window === "undefined" ? undefined : window.location.href,
        env: import.meta.env,
        isSupabaseConfigured: auth.isConfigured,
        lang,
        redirectPage: oauthRedirectUrl
      }),
    [auth.isConfigured, lang, oauthRedirectUrl]
  );
  const provider = getEmailProvider(email);

  useEffect(() => {
    if (!auth.isConfigured) {
      dispatchAuthEvent({ type: AUTH_EVENTS.error, errorCode: "SUPABASE_NOT_CONFIGURED" });
    }
  }, [auth.isConfigured]);

  useEffect(() => {
    if (cooldown <= 0) return undefined;

    const timer = window.setInterval(() => {
      setCooldown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [cooldown]);

  function startCooldown() {
    setCooldown(60);
  }

  function resetFormForTab(nextTab) {
    setActiveTab(nextTab);
    setEmailCode("");
    setIsCodeStep(false);
    setLocalStatus("");
    dispatchAuthEvent(AUTH_EVENTS.reset);
  }

  function handleCodeChange(event) {
    setEmailCode(event.target.value.replace(/\D/g, "").slice(0, 6));
  }

  function handleAuthError(error) {
    dispatchAuthEvent({ type: AUTH_EVENTS.error, errorCode: error?.code });
    setLocalStatus(error?.message ?? t.authUnknownError);
  }

  async function sendOtpForCurrentTab() {
    setLocalStatus("");
    dispatchAuthEvent(AUTH_EVENTS.sendOtp);

    const result =
      activeTab === AUTH_TABS.signUp
        ? await auth.sendSignUpOtp(email, oauthRedirectUrl)
        : await auth.sendSignInOtp(email, oauthRedirectUrl);

    if (result.error) {
      handleAuthError(result.error);
      return;
    }

    dispatchAuthEvent(AUTH_EVENTS.otpSent);
    setIsCodeStep(true);
    startCooldown();
    setLocalStatus(formatStatus(t.otpSentTo, { email: maskedEmail || normalizedEmail }));
  }

  async function verifyOtpForCurrentTab() {
    setLocalStatus("");
    dispatchAuthEvent(AUTH_EVENTS.verifyOtp);

    const verifyResult = await auth.verifyEmailOtp(email, emailCode);
    if (verifyResult.error) {
      handleAuthError(verifyResult.error);
      return;
    }

    if (activeTab === AUTH_TABS.signUp) {
      dispatchAuthEvent(AUTH_EVENTS.setPassword);
      const passwordResult = await auth.setPassword(password);
      if (passwordResult.error) {
        handleAuthError(passwordResult.error);
        return;
      }
      dispatchAuthEvent(AUTH_EVENTS.passwordSet);
      setLocalStatus(t.authCodeVerified);
    } else {
      dispatchAuthEvent(AUTH_EVENTS.otpVerified);
      setLocalStatus(t.authSignedIn);
    }

    setEmailCode("");
    setPassword("");
    setIsCodeStep(false);
    onAuthSuccess?.();
  }

  async function handlePasswordSignIn() {
    setLocalStatus("");
    dispatchAuthEvent(AUTH_EVENTS.signInPassword);

    const result = await auth.signInWithPassword(email, password);
    if (result.error) {
      handleAuthError(result.error);
      return;
    }

    dispatchAuthEvent(AUTH_EVENTS.otpVerified);
    setPassword("");
    setLocalStatus(t.authSignedIn);
    onAuthSuccess?.();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (activeTab === AUTH_TABS.passwordLogin) {
      await handlePasswordSignIn();
      return;
    }

    if (isCodeStep) {
      await verifyOtpForCurrentTab();
      return;
    }

    await sendOtpForCurrentTab();
  }

  async function handleGoogleSignIn() {
    setLocalStatus("");
    dispatchAuthEvent(AUTH_EVENTS.googleSignIn);
    const { error } = await auth.signInWithGoogle(oauthRedirectUrl);

    if (error) {
      handleAuthError(error);
    }
  }

  const tabTitle =
    activeTab === AUTH_TABS.otpLogin
      ? t.otpLoginTitle
      : activeTab === AUTH_TABS.passwordLogin
        ? t.passwordLoginTitle
        : t.signUpWithOtpTitle;
  const primaryButtonLabel =
    activeTab === AUTH_TABS.passwordLogin
      ? t.signIn
      : isCodeStep
        ? t.verifyOtp
        : t.sendOtp;
  const resendLabel =
    cooldown > 0 ? formatStatus(t.resendInSeconds, { seconds: cooldown }) : t.resendOtp;
  const showPasswordFallbackTip =
    activeTab === AUTH_TABS.passwordLogin && Boolean(auth.authError || localStatus);

  return (
    <section className="auth-section" id="account">
      <div className="auth-copy">
        <span>{t.accountEyebrow}</span>
        <h2>{t.accountTitle}</h2>
        <p>{t.accountSubtitle}</p>
      </div>

      <div className="auth-card">
        {!auth.isConfigured ? (
          <div className="auth-empty">
            <Cloud size={24} aria-hidden="true" />
            <strong>{t.supabaseMissingTitle}</strong>
            <p>{t.supabaseMissingText}</p>
            {showDiagnostics ? (
              <AuthDiagnostics diagnostics={diagnostics} t={t} />
            ) : null}
          </div>
        ) : auth.user ? (
          <div className="auth-signed-in">
            <div className="auth-user">
              <UserRound size={22} aria-hidden="true" />
              <div>
                <strong>{t.signedInAs}</strong>
                <span>{auth.user.email}</span>
              </div>
            </div>

            <div className="auth-actions">
              {successHref ? (
                <a className="button secondary" href={successHref}>
                  <BookOpen size={16} aria-hidden="true" />
                  {t.continueToStudyLog}
                </a>
              ) : null}
              <button
                className="button primary"
                type="button"
                disabled={isSyncing}
                onClick={onSaveLocalData}
              >
                <UploadCloud size={16} aria-hidden="true" />
                {t.saveLocalToCloud}
              </button>
              <button
                className="button secondary"
                type="button"
                disabled={isSyncing}
                onClick={onLoadCloudData}
              >
                <Cloud size={16} aria-hidden="true" />
                {t.loadCloudData}
              </button>
              <button className="button ghost" type="button" onClick={auth.signOut}>
                <LogOut size={16} aria-hidden="true" />
                {t.signOut}
              </button>
            </div>

            {cloudStatus ? <p className="auth-status">{cloudStatus}</p> : null}
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-mode" role="tablist" aria-label={t.authMode}>
              <AuthTabButton
                isActive={activeTab === AUTH_TABS.otpLogin}
                label={t.authTabOtpLogin}
                onClick={() => resetFormForTab(AUTH_TABS.otpLogin)}
              />
              <AuthTabButton
                isActive={activeTab === AUTH_TABS.passwordLogin}
                label={t.authTabPasswordLogin}
                onClick={() => resetFormForTab(AUTH_TABS.passwordLogin)}
              />
              <AuthTabButton
                isActive={activeTab === AUTH_TABS.signUp}
                label={t.authTabSignUp}
                onClick={() => resetFormForTab(AUTH_TABS.signUp)}
              />
            </div>

            {redirectLabel ? (
              <p className="auth-redirect-note">
                {t.authRedirectNotice.replace("{target}", redirectLabel)}
              </p>
            ) : null}

            <button
              className="button ghost oauth-button"
              type="button"
              disabled={auth.isLoading || isBusy}
              onClick={handleGoogleSignIn}
            >
              <Chrome size={16} aria-hidden="true" />
              {t.signInWithGoogle}
            </button>

            <div className="auth-form-heading">
              <h3>{tabTitle}</h3>
              <p>{t.emailProviderHint.replace("{provider}", provider)}</p>
            </div>

            <label htmlFor="auth-email">{t.email}</label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isCodeStep}
              required
            />
            <small className="auth-help">
              <Mail size={14} aria-hidden="true" />
              {t.authCheckSpamFolder} {t.authAdminSmtpRequired}
            </small>

            {activeTab !== AUTH_TABS.otpLogin ? (
              <>
                <label htmlFor="auth-password">{t.password}</label>
                <input
                  id="auth-password"
                  type="password"
                  autoComplete={
                    activeTab === AUTH_TABS.signUp ? "new-password" : "current-password"
                  }
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={isCodeStep}
                  required
                />
                <small>{t.passwordHint}</small>
              </>
            ) : null}

            {isCodeStep ? (
              <div className="auth-code-step">
                <label htmlFor="auth-email-code">{t.emailCode}</label>
                <input
                  id="auth-email-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder={t.otpCodePlaceholder}
                  maxLength={6}
                  value={emailCode}
                  onChange={handleCodeChange}
                  required
                />
                <small>{t.otpCodeHint}</small>
                <button
                  className="button ghost"
                  type="button"
                  disabled={auth.isLoading || isBusy || cooldown > 0}
                  onClick={sendOtpForCurrentTab}
                >
                  {resendLabel}
                </button>
              </div>
            ) : null}

            <button className="button primary" type="submit" disabled={auth.isLoading || isBusy}>
              {primaryButtonLabel}
            </button>

            {showPasswordFallbackTip ? (
              <p className="auth-inline-tip">{t.authTryOtpLogin}</p>
            ) : null}

            {auth.authError || localStatus ? (
              <p className="auth-status" role="status">
                {auth.authError || localStatus}
              </p>
            ) : null}

            {showDiagnostics ? <AuthDiagnostics diagnostics={diagnostics} t={t} /> : null}
          </form>
        )}
      </div>
    </section>
  );
}

function AuthTabButton({ isActive, label, onClick }) {
  return (
    <button
      className={isActive ? "is-active" : ""}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-pressed={isActive}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function AuthDiagnostics({ diagnostics, t }) {
  return (
    <div className="auth-diagnostics">
      <strong>{t.authDiagnosticsTitle}</strong>
      <dl>
        <div>
          <dt>Supabase configured</dt>
          <dd>{diagnostics.isConfigured ? "yes" : "no"}</dd>
        </div>
        <div>
          <dt>{t.authCurrentOrigin}</dt>
          <dd>{diagnostics.currentOrigin}</dd>
        </div>
        <div>
          <dt>{t.authCurrentRedirectUrl}</dt>
          <dd>{diagnostics.redirectUrl}</dd>
        </div>
        <div>
          <dt>App base path</dt>
          <dd>{diagnostics.appBasePath}</dd>
        </div>
      </dl>
      {diagnostics.problems.length ? (
        <p>{diagnostics.problems.join(", ")}</p>
      ) : null}
    </div>
  );
}
