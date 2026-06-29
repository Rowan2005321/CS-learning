/* @vitest-environment jsdom */
/* @vitest-environment-options {"url":"http://localhost:5173/account/?lang=zh"} */
import { describe, expect, it, vi } from "vitest";
import { createAuthActions } from "./useAuth";

function createMockClient(overrides = {}) {
  return {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      refreshSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      signInWithOAuth: vi.fn().mockResolvedValue({ data: {}, error: null }),
      signInWithOtp: vi.fn().mockResolvedValue({ data: {}, error: null }),
      signInWithPassword: vi.fn().mockResolvedValue({ data: { session: {} }, error: null }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
      updateUser: vi.fn().mockResolvedValue({ data: { user: {} }, error: null }),
      verifyOtp: vi.fn().mockResolvedValue({ data: { session: {} }, error: null }),
      ...overrides
    }
  };
}

describe("createAuthActions", () => {
  it("sendSignUpOtp calls signInWithOtp with shouldCreateUser=true", async () => {
    const client = createMockClient();
    const actions = createAuthActions({ client, isConfigured: true });

    await actions.sendSignUpOtp(" USER@QQ.COM ", "study-log");

    expect(client.auth.signInWithOtp).toHaveBeenCalledWith({
      email: "user@qq.com",
      options: {
        emailRedirectTo: "http://localhost:5173/study-log/?lang=zh",
        shouldCreateUser: true
      }
    });
  });

  it("sendSignInOtp calls signInWithOtp with shouldCreateUser=false", async () => {
    const client = createMockClient();
    const actions = createAuthActions({ client, isConfigured: true });

    await actions.sendSignInOtp(" USER@GMAIL.COM ", "courses");

    expect(client.auth.signInWithOtp).toHaveBeenCalledWith({
      email: "user@gmail.com",
      options: {
        emailRedirectTo: "http://localhost:5173/courses/?lang=zh",
        shouldCreateUser: false
      }
    });
  });

  it("verifyEmailOtp calls verifyOtp with type=email", async () => {
    const client = createMockClient();
    const actions = createAuthActions({ client, isConfigured: true });

    await actions.verifyEmailOtp("User@Example.com", "123456");

    expect(client.auth.verifyOtp).toHaveBeenCalledWith({
      email: "user@example.com",
      token: "123456",
      type: "email"
    });
  });

  it("setPassword calls updateUser", async () => {
    const client = createMockClient();
    const actions = createAuthActions({ client, isConfigured: true });

    await actions.setPassword("secret-password");

    expect(client.auth.updateUser).toHaveBeenCalledWith({ password: "secret-password" });
  });

  it("signInWithGoogle uses a safe redirect URL", async () => {
    const client = createMockClient();
    const actions = createAuthActions({ client, isConfigured: true });

    await actions.signInWithGoogle("projects");

    expect(client.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/projects/?lang=zh"
      }
    });
  });

  it("signInWithPassword returns normalized errors", async () => {
    const client = createMockClient({
      signInWithPassword: vi.fn().mockResolvedValue({
        data: null,
        error: new Error("Invalid login credentials")
      })
    });
    const actions = createAuthActions({ client, isConfigured: true, lang: "en" });

    const result = await actions.signInWithPassword("user@example.com", "bad-password");

    expect(result.error.code).toBe("INVALID_CREDENTIALS");
    expect(result.error.message).toContain("Invalid email or password");
  });
});
