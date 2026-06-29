/* @vitest-environment jsdom */
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { labels } from "../data/labels";
import { AuthPanel } from "./AuthPanel";

function createAuth(overrides = {}) {
  return {
    authError: "",
    isConfigured: true,
    isLoading: false,
    sendSignInOtp: vi.fn().mockResolvedValue({ data: {}, error: null }),
    sendSignUpOtp: vi.fn().mockResolvedValue({ data: {}, error: null }),
    signUpWithPassword: vi.fn().mockResolvedValue({ data: { session: {} }, error: null }),
    setPassword: vi.fn().mockResolvedValue({ data: {}, error: null }),
    signInWithGoogle: vi.fn().mockResolvedValue({ data: {}, error: null }),
    signInWithPassword: vi.fn().mockResolvedValue({ data: { session: {} }, error: null }),
    signOut: vi.fn().mockResolvedValue({ error: null }),
    user: null,
    verifyEmailOtp: vi.fn().mockResolvedValue({ data: { session: {} }, error: null }),
    ...overrides
  };
}

function renderAuthPanel(auth = createAuth()) {
  return render(
    <AuthPanel
      auth={auth}
      cloudStatus=""
      isSyncing={false}
      lang="en"
      oauthRedirectUrl="http://localhost:5173/study-log/?lang=en"
      redirectLabel="Study Log"
      successHref="/study-log/?lang=en"
      t={labels.en}
      onAuthSuccess={vi.fn()}
      onLoadCloudData={vi.fn()}
      onSaveLocalData={vi.fn()}
    />
  );
}

describe("AuthPanel", () => {
  afterEach(() => {
    cleanup();
  });

  it("creates an account with email and password in sign-up mode", async () => {
    const user = userEvent.setup();
    const auth = createAuth();
    renderAuthPanel(auth);

    await user.click(screen.getByRole("tab", { name: labels.en.authTabSignUp }));
    await user.type(screen.getByLabelText(labels.en.email), "NewUser@QQ.COM");
    await user.type(screen.getByLabelText(labels.en.password), "secret123");
    await user.click(screen.getByRole("button", { name: labels.en.signUp }));

    await waitFor(() =>
      expect(auth.signUpWithPassword).toHaveBeenCalledWith(
        "NewUser@QQ.COM",
        "secret123",
        "http://localhost:5173/study-log/?lang=en"
      )
    );
    expect(auth.sendSignUpOtp).not.toHaveBeenCalled();
  });

  it("keeps sign-up usable when email confirmation is required", async () => {
    const user = userEvent.setup();
    const auth = createAuth({
      signUpWithPassword: vi.fn().mockResolvedValue({ data: { user: {} }, error: null })
    });
    renderAuthPanel(auth);

    await user.click(screen.getByRole("tab", { name: labels.en.authTabSignUp }));
    await user.type(screen.getByLabelText(labels.en.email), "confirm@example.com");
    await user.type(screen.getByLabelText(labels.en.password), "secret123");
    await user.click(screen.getByRole("button", { name: labels.en.signUp }));

    expect(await screen.findByText(labels.en.authCheckEmail)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: labels.en.signUp })).not.toBeDisabled();
  });

  it("limits OTP input to six digits", async () => {
    const user = userEvent.setup();
    const auth = createAuth();
    renderAuthPanel(auth);

    await user.type(screen.getByLabelText(labels.en.email), "user@gmail.com");
    await user.click(screen.getByRole("button", { name: labels.en.sendOtp }));
    const input = await screen.findByLabelText(labels.en.emailCode);

    expect(input).toHaveAttribute("maxLength", "6");
    await user.type(input, "abc1234567");
    expect(input).toHaveValue("123456");
  });

  it("starts a resend cooldown after sending an OTP", async () => {
    const user = userEvent.setup();
    renderAuthPanel();

    await user.type(screen.getByLabelText(labels.en.email), "user@gmail.com");
    await user.click(screen.getByRole("button", { name: labels.en.sendOtp }));

    expect(await screen.findByRole("button", { name: /Resend in 60s/i })).toBeDisabled();
  });

  it("shows an OTP login hint after password login fails", async () => {
    const user = userEvent.setup();
    const auth = createAuth({
      signInWithPassword: vi.fn().mockResolvedValue({
        data: null,
        error: { code: "INVALID_CREDENTIALS", message: labels.en.authInvalidCredentials }
      })
    });
    renderAuthPanel(auth);

    await user.click(screen.getByRole("tab", { name: labels.en.authTabPasswordLogin }));
    await user.type(screen.getByLabelText(labels.en.email), "user@gmail.com");
    await user.type(screen.getByLabelText(labels.en.password), "bad-password");
    await user.click(screen.getByRole("button", { name: labels.en.signIn }));

    expect(await screen.findByText(labels.en.authTryOtpLogin)).toBeInTheDocument();
  });

  it("shows a configuration prompt when Supabase is not configured", () => {
    renderAuthPanel(createAuth({ isConfigured: false }));

    expect(screen.getByText(labels.en.supabaseMissingTitle)).toBeInTheDocument();
  });
});
