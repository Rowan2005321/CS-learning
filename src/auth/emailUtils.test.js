import { describe, expect, it } from "vitest";
import { getEmailProvider, maskEmail, normalizeEmail } from "./emailUtils";

describe("emailUtils", () => {
  it("normalizes email by trimming and lowercasing", () => {
    expect(normalizeEmail("  Student@QQ.COM ")).toBe("student@qq.com");
  });

  it("masks email without revealing the full local part", () => {
    expect(maskEmail("coder@qq.com")).toBe("c***@qq.com");
    expect(maskEmail("x@gmail.com")).toBe("*@gmail.com");
  });

  it("detects common email providers", () => {
    expect(getEmailProvider("a@qq.com")).toBe("qq");
    expect(getEmailProvider("a@foxmail.com")).toBe("qq");
    expect(getEmailProvider("a@gmail.com")).toBe("gmail");
    expect(getEmailProvider("a@outlook.com")).toBe("outlook");
    expect(getEmailProvider("a@cs.mit.edu")).toBe("edu");
    expect(getEmailProvider("a@example.com")).toBe("other");
  });
});
