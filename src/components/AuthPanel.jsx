import { BookOpen, Chrome, Cloud, LogOut, Mail, UploadCloud, UserRound } from "lucide-react";
import { useState } from "react";

export function AuthPanel({
  auth,
  cloudStatus,
  isSyncing,
  oauthRedirectUrl,
  onAuthSuccess,
  onLoadCloudData,
  onSaveLocalData,
  redirectLabel,
  successHref,
  t
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isCodeStep, setIsCodeStep] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState("sign-in");
  const [localStatus, setLocalStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLocalStatus("");
    setIsSubmitting(true);

    if (mode === "sign-up" && isCodeStep) {
      const { error } = await auth.verifyEmailOtp(email, emailCode.trim(), password);
      setIsSubmitting(false);

      if (error) {
        setLocalStatus(error.message);
        return;
      }

      setEmailCode("");
      setPassword("");
      setIsCodeStep(false);
      setLocalStatus(t.authCodeVerified);
      onAuthSuccess?.();
      return;
    }

    if (mode === "sign-up") {
      const { error } = await auth.sendEmailOtp(email, oauthRedirectUrl);
      setIsSubmitting(false);

      if (error) {
        setLocalStatus(error.message);
        return;
      }

      setIsCodeStep(true);
      setLocalStatus(t.authCodeSent.replace("{email}", email));
      return;
    }

    const result = await auth.signInWithEmail(email, password);
    setIsSubmitting(false);
    const { data, error } = result;

    if (error) {
      setLocalStatus(error.message);
      return;
    }

    setPassword("");
    if (data?.session) {
      setLocalStatus(t.authSignedIn);
      onAuthSuccess?.();
      return;
    }

    setLocalStatus(t.authSignedIn);
  }

  async function handleGoogleSignIn() {
    setLocalStatus("");
    const { error } = await auth.signInWithGoogle(oauthRedirectUrl);

    if (error) {
      setLocalStatus(error.message);
    }
  }

  async function handleResendCode() {
    setLocalStatus("");
    setIsSubmitting(true);
    const { error } = await auth.sendEmailOtp(email, oauthRedirectUrl);
    setIsSubmitting(false);

    if (error) {
      setLocalStatus(error.message);
      return;
    }

    setLocalStatus(t.authCodeResent.replace("{email}", email));
  }

  function handleModeChange(nextMode) {
    setMode(nextMode);
    setEmailCode("");
    setIsCodeStep(false);
    setLocalStatus("");
  }

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
            <div className="auth-mode" role="group" aria-label={t.authMode}>
              <button
                className={mode === "sign-in" ? "is-active" : ""}
                type="button"
                aria-pressed={mode === "sign-in"}
                onClick={() => handleModeChange("sign-in")}
              >
                {t.signIn}
              </button>
              <button
                className={mode === "sign-up" ? "is-active" : ""}
                type="button"
                aria-pressed={mode === "sign-up"}
                onClick={() => handleModeChange("sign-up")}
              >
                {t.signUp}
              </button>
            </div>

            {redirectLabel ? (
              <p className="auth-redirect-note">
                {t.authRedirectNotice.replace("{target}", redirectLabel)}
              </p>
            ) : null}

            <button
              className="button ghost oauth-button"
              type="button"
              disabled={auth.isLoading}
              onClick={handleGoogleSignIn}
            >
              <Chrome size={16} aria-hidden="true" />
              {t.signInWithGoogle}
            </button>

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
              {t.qqEmailHint}
            </small>

            <label htmlFor="auth-password">{t.password}</label>
            <input
              id="auth-password"
              type="password"
              autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isCodeStep}
              required
            />
            <small>{t.passwordHint}</small>

            {isCodeStep ? (
              <div className="auth-code-step">
                <label htmlFor="auth-email-code">{t.emailCode}</label>
                <input
                  id="auth-email-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="123456"
                  value={emailCode}
                  onChange={(event) => setEmailCode(event.target.value)}
                  required
                />
                <small>{t.emailCodeHint}</small>
                <button
                  className="button ghost"
                  type="button"
                  disabled={auth.isLoading || isSubmitting}
                  onClick={handleResendCode}
                >
                  {t.resendEmailCode}
                </button>
              </div>
            ) : null}

            <button
              className="button primary"
              type="submit"
              disabled={auth.isLoading || isSubmitting}
            >
              {isCodeStep
                ? t.verifyEmailCode
                : mode === "sign-up"
                  ? t.sendEmailCode
                  : t.signIn}
            </button>

            {auth.authError || localStatus ? (
              <p className="auth-status">{auth.authError || localStatus}</p>
            ) : null}
          </form>
        )}
      </div>
    </section>
  );
}
