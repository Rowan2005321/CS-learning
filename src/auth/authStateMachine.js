export const AUTH_STATES = {
  idle: "idle",
  checkingSession: "checking_session",
  ready: "ready",
  sendingOtp: "sending_otp",
  otpSent: "otp_sent",
  verifyingOtp: "verifying_otp",
  settingPassword: "setting_password",
  signingIn: "signing_in",
  oauthRedirecting: "oauth_redirecting",
  signedIn: "signed_in",
  error: "error",
  rateLimited: "rate_limited",
  misconfigured: "misconfigured"
};

export const AUTH_EVENTS = {
  sendOtp: "SEND_OTP",
  otpSent: "OTP_SENT",
  verifyOtp: "VERIFY_OTP",
  otpVerified: "OTP_VERIFIED",
  setPassword: "SET_PASSWORD",
  passwordSet: "PASSWORD_SET",
  signInPassword: "SIGN_IN_PASSWORD",
  signInOtp: "SIGN_IN_OTP",
  googleSignIn: "GOOGLE_SIGN_IN",
  signOut: "SIGN_OUT",
  error: "ERROR",
  reset: "RESET"
};

const RATE_LIMIT_CODES = new Set(["EMAIL_RATE_LIMIT"]);
const MISCONFIGURED_CODES = new Set(["SUPABASE_NOT_CONFIGURED"]);

export function transitionAuthState(currentState, event) {
  const eventType = typeof event === "string" ? event : event?.type;
  const errorCode = typeof event === "object" ? event?.errorCode : undefined;

  if (eventType === AUTH_EVENTS.reset) return AUTH_STATES.ready;
  if (eventType === AUTH_EVENTS.signOut) return AUTH_STATES.idle;

  if (currentState === AUTH_STATES.misconfigured) {
    return eventType === AUTH_EVENTS.reset ? AUTH_STATES.ready : AUTH_STATES.misconfigured;
  }

  if (eventType === AUTH_EVENTS.error) {
    if (RATE_LIMIT_CODES.has(errorCode)) return AUTH_STATES.rateLimited;
    if (MISCONFIGURED_CODES.has(errorCode)) return AUTH_STATES.misconfigured;
    return AUTH_STATES.error;
  }

  switch (currentState) {
    case AUTH_STATES.idle:
    case AUTH_STATES.ready:
    case AUTH_STATES.error:
    case AUTH_STATES.rateLimited:
      if (eventType === AUTH_EVENTS.sendOtp) return AUTH_STATES.sendingOtp;
      if (eventType === AUTH_EVENTS.signInPassword) return AUTH_STATES.signingIn;
      if (eventType === AUTH_EVENTS.signInOtp) return AUTH_STATES.sendingOtp;
      if (eventType === AUTH_EVENTS.googleSignIn) return AUTH_STATES.oauthRedirecting;
      return currentState;
    case AUTH_STATES.sendingOtp:
      if (eventType === AUTH_EVENTS.otpSent) return AUTH_STATES.otpSent;
      return currentState;
    case AUTH_STATES.otpSent:
      if (eventType === AUTH_EVENTS.verifyOtp) return AUTH_STATES.verifyingOtp;
      if (eventType === AUTH_EVENTS.sendOtp) return AUTH_STATES.sendingOtp;
      return currentState;
    case AUTH_STATES.verifyingOtp:
      if (eventType === AUTH_EVENTS.otpVerified) return AUTH_STATES.signedIn;
      if (eventType === AUTH_EVENTS.setPassword) return AUTH_STATES.settingPassword;
      return currentState;
    case AUTH_STATES.settingPassword:
      if (eventType === AUTH_EVENTS.passwordSet) return AUTH_STATES.signedIn;
      return currentState;
    case AUTH_STATES.signingIn:
    case AUTH_STATES.oauthRedirecting:
      if (eventType === AUTH_EVENTS.otpVerified) return AUTH_STATES.signedIn;
      return currentState;
    case AUTH_STATES.signedIn:
      return currentState;
    default:
      return currentState ?? AUTH_STATES.idle;
  }
}
