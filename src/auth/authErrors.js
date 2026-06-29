import { labels } from "../data/labels";

export const AUTH_ERROR_CODES = {
  EMAIL_RATE_LIMIT: "EMAIL_RATE_LIMIT",
  EMAIL_NOT_AUTHORIZED: "EMAIL_NOT_AUTHORIZED",
  SMTP_SEND_FAILED: "SMTP_SEND_FAILED",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INVALID_OTP: "INVALID_OTP",
  EXPIRED_OTP: "EXPIRED_OTP",
  REDIRECT_NOT_ALLOWED: "REDIRECT_NOT_ALLOWED",
  PROVIDER_NOT_ENABLED: "PROVIDER_NOT_ENABLED",
  NETWORK_ERROR: "NETWORK_ERROR",
  SUPABASE_NOT_CONFIGURED: "SUPABASE_NOT_CONFIGURED",
  UNKNOWN_AUTH_ERROR: "UNKNOWN_AUTH_ERROR"
};

const CODE_LABEL_KEYS = {
  [AUTH_ERROR_CODES.EMAIL_RATE_LIMIT]: "authEmailRateLimited",
  [AUTH_ERROR_CODES.EMAIL_NOT_AUTHORIZED]: "authEmailNotAuthorized",
  [AUTH_ERROR_CODES.SMTP_SEND_FAILED]: "authSmtpSendFailed",
  [AUTH_ERROR_CODES.INVALID_CREDENTIALS]: "authInvalidCredentials",
  [AUTH_ERROR_CODES.INVALID_OTP]: "authInvalidOtp",
  [AUTH_ERROR_CODES.EXPIRED_OTP]: "authExpiredOtp",
  [AUTH_ERROR_CODES.REDIRECT_NOT_ALLOWED]: "authRedirectNotAllowed",
  [AUTH_ERROR_CODES.PROVIDER_NOT_ENABLED]: "authProviderNotEnabled",
  [AUTH_ERROR_CODES.NETWORK_ERROR]: "authNetworkError",
  [AUTH_ERROR_CODES.SUPABASE_NOT_CONFIGURED]: "authSupabaseNotConfigured",
  [AUTH_ERROR_CODES.UNKNOWN_AUTH_ERROR]: "authUnknownError"
};

function getErrorText(error) {
  if (!error) return "";
  if (typeof error === "string") return error;
  return [error.code, error.name, error.status, error.message, error.error_description]
    .filter(Boolean)
    .join(" ");
}

export function getAuthErrorCode(error) {
  const text = getErrorText(error).toLowerCase();

  if (!text) return AUTH_ERROR_CODES.UNKNOWN_AUTH_ERROR;
  if (text.includes("supabase is not configured")) {
    return AUTH_ERROR_CODES.SUPABASE_NOT_CONFIGURED;
  }
  if (
    text.includes("rate limit") ||
    text.includes("too many") ||
    text.includes("over_email_send_rate_limit")
  ) {
    return AUTH_ERROR_CODES.EMAIL_RATE_LIMIT;
  }
  if (
    text.includes("email address not authorized") ||
    text.includes("email not authorized") ||
    text.includes("signups not allowed") ||
    text.includes("user not found")
  ) {
    return AUTH_ERROR_CODES.EMAIL_NOT_AUTHORIZED;
  }
  if (
    text.includes("error sending confirmation mail") ||
    text.includes("smtp") ||
    text.includes("email send")
  ) {
    return AUTH_ERROR_CODES.SMTP_SEND_FAILED;
  }
  if (
    text.includes("invalid login credentials") ||
    text.includes("invalid credentials") ||
    text.includes("invalid email or password")
  ) {
    return AUTH_ERROR_CODES.INVALID_CREDENTIALS;
  }
  if (
    text.includes("expired") ||
    text.includes("token has expired") ||
    text.includes("otp expired")
  ) {
    return AUTH_ERROR_CODES.EXPIRED_OTP;
  }
  if (
    text.includes("invalid token") ||
    text.includes("token is invalid") ||
    text.includes("otp") ||
    text.includes("verification")
  ) {
    return AUTH_ERROR_CODES.INVALID_OTP;
  }
  if (
    text.includes("redirect not allowed") ||
    text.includes("redirect_to") ||
    text.includes("not allowed")
  ) {
    return AUTH_ERROR_CODES.REDIRECT_NOT_ALLOWED;
  }
  if (
    text.includes("provider") ||
    text.includes("oauth") ||
    text.includes("unsupported provider") ||
    text.includes("not enabled")
  ) {
    return AUTH_ERROR_CODES.PROVIDER_NOT_ENABLED;
  }
  if (
    text.includes("failed to fetch") ||
    text.includes("network") ||
    text.includes("timeout") ||
    text.includes("load failed")
  ) {
    return AUTH_ERROR_CODES.NETWORK_ERROR;
  }

  return AUTH_ERROR_CODES.UNKNOWN_AUTH_ERROR;
}

export function getAuthErrorMessage(error, lang = "zh") {
  const code = typeof error === "string" && AUTH_ERROR_CODES[error] ? error : getAuthErrorCode(error);
  const dictionary = labels[lang] ?? labels.zh;
  const labelKey = CODE_LABEL_KEYS[code] ?? CODE_LABEL_KEYS[AUTH_ERROR_CODES.UNKNOWN_AUTH_ERROR];
  return dictionary[labelKey] ?? dictionary.authUnknownError ?? "Authentication failed.";
}

export function normalizeAuthError(error, lang = "zh") {
  const code = getAuthErrorCode(error);
  return {
    code,
    message: getAuthErrorMessage(code, lang),
    rawMessage: getErrorText(error)
  };
}
