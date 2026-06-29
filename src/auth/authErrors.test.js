import { describe, expect, it } from "vitest";
import { AUTH_ERROR_CODES, getAuthErrorCode } from "./authErrors";

describe("authErrors", () => {
  it("maps email rate limits", () => {
    expect(getAuthErrorCode(new Error("Email rate limit exceeded"))).toBe(
      AUTH_ERROR_CODES.EMAIL_RATE_LIMIT
    );
  });

  it("maps unauthorized email addresses", () => {
    expect(getAuthErrorCode(new Error("Email address not authorized"))).toBe(
      AUTH_ERROR_CODES.EMAIL_NOT_AUTHORIZED
    );
  });

  it("maps SMTP send failures", () => {
    expect(getAuthErrorCode(new Error("Error sending confirmation mail"))).toBe(
      AUTH_ERROR_CODES.SMTP_SEND_FAILED
    );
  });

  it("maps invalid OTP tokens", () => {
    expect(getAuthErrorCode(new Error("invalid token"))).toBe(AUTH_ERROR_CODES.INVALID_OTP);
  });

  it("maps blocked redirect URLs", () => {
    expect(getAuthErrorCode(new Error("redirect not allowed"))).toBe(
      AUTH_ERROR_CODES.REDIRECT_NOT_ALLOWED
    );
  });

  it("maps disabled OAuth providers", () => {
    expect(getAuthErrorCode(new Error("provider not enabled"))).toBe(
      AUTH_ERROR_CODES.PROVIDER_NOT_ENABLED
    );
  });
});
