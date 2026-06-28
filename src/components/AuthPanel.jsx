import { Cloud, LogOut, UploadCloud, UserRound } from "lucide-react";
import { useState } from "react";

export function AuthPanel({
  auth,
  cloudStatus,
  isSyncing,
  onLoadCloudData,
  onSaveLocalData,
  t
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("sign-in");
  const [localStatus, setLocalStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLocalStatus("");

    const action = mode === "sign-up" ? auth.signUpWithEmail : auth.signInWithEmail;
    const { error } = await action(email, password);

    if (error) {
      setLocalStatus(error.message);
      return;
    }

    setPassword("");
    setLocalStatus(mode === "sign-up" ? t.authCheckEmail : t.authSignedIn);
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
                onClick={() => setMode("sign-in")}
              >
                {t.signIn}
              </button>
              <button
                className={mode === "sign-up" ? "is-active" : ""}
                type="button"
                aria-pressed={mode === "sign-up"}
                onClick={() => setMode("sign-up")}
              >
                {t.signUp}
              </button>
            </div>

            <label htmlFor="auth-email">{t.email}</label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="auth-password">{t.password}</label>
            <input
              id="auth-password"
              type="password"
              autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <small>{t.passwordHint}</small>

            <button className="button primary" type="submit" disabled={auth.isLoading}>
              {mode === "sign-up" ? t.signUp : t.signIn}
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
