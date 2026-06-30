import { describe, expect, it } from "vitest";
import { supabaseAuthOptions } from "./supabaseClient";

describe("supabaseClient", () => {
  it("uses implicit auth flow for static GitHub Pages callbacks", () => {
    expect(supabaseAuthOptions).toMatchObject({
      detectSessionInUrl: true,
      flowType: "implicit",
      persistSession: true,
      storageKey: "open-cs-atlas-auth"
    });
  });
});
