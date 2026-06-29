import { describe, expect, it } from "vitest";
import { AUTH_EVENTS, AUTH_STATES, transitionAuthState } from "./authStateMachine";

function applyEvents(initialState, events) {
  return events.reduce(transitionAuthState, initialState);
}

describe("authStateMachine", () => {
  it("moves through an OTP sign-in path", () => {
    expect(
      applyEvents(AUTH_STATES.idle, [
        AUTH_EVENTS.sendOtp,
        AUTH_EVENTS.otpSent,
        AUTH_EVENTS.verifyOtp,
        AUTH_EVENTS.otpVerified
      ])
    ).toBe(AUTH_STATES.signedIn);
  });

  it("moves from sending OTP to rate limited", () => {
    expect(
      transitionAuthState(AUTH_STATES.sendingOtp, {
        type: AUTH_EVENTS.error,
        errorCode: "EMAIL_RATE_LIMIT"
      })
    ).toBe(AUTH_STATES.rateLimited);
  });

  it("moves from verifying OTP to error", () => {
    expect(transitionAuthState(AUTH_STATES.verifyingOtp, AUTH_EVENTS.error)).toBe(
      AUTH_STATES.error
    );
  });

  it("moves from signed in to idle after sign out", () => {
    expect(transitionAuthState(AUTH_STATES.signedIn, AUTH_EVENTS.signOut)).toBe(
      AUTH_STATES.idle
    );
  });

  it("does not send OTP from a misconfigured state", () => {
    expect(transitionAuthState(AUTH_STATES.misconfigured, AUTH_EVENTS.sendOtp)).toBe(
      AUTH_STATES.misconfigured
    );
  });
});
