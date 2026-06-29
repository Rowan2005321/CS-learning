import { describe, expect, it } from "vitest";
import {
  AUTH_PAGE_IDS,
  buildAuthRedirectUrl,
  getAppBasePath,
  normalizeRedirectTarget
} from "./authRedirects";

describe("authRedirects", () => {
  it("builds GitHub Pages redirects with the /CS-learning/ base path", () => {
    expect(
      buildAuthRedirectUrl(
        AUTH_PAGE_IDS.studyLog,
        "zh",
        {},
        "https://rowan2005321.github.io/CS-learning/courses/?lang=zh"
      )
    ).toBe("https://rowan2005321.github.io/CS-learning/study-log/?lang=zh");
  });

  it("builds localhost redirects without the GitHub Pages base path", () => {
    expect(
      buildAuthRedirectUrl(
        AUTH_PAGE_IDS.projects,
        "en",
        {},
        "http://localhost:5173/account/?lang=en"
      )
    ).toBe("http://localhost:5173/projects/?lang=en");
  });

  it("detects the app base path for GitHub Pages and local development", () => {
    expect(getAppBasePath("https://rowan2005321.github.io/CS-learning/projects/")).toBe(
      "/CS-learning/"
    );
    expect(getAppBasePath("http://127.0.0.1:5173/projects/")).toBe("/");
  });

  it("allows only known redirect page ids", () => {
    expect(normalizeRedirectTarget("study-log")).toBe(AUTH_PAGE_IDS.studyLog);
    expect(normalizeRedirectTarget("/CS-learning/courses/")).toBe(AUTH_PAGE_IDS.courses);
    expect(normalizeRedirectTarget("unknown")).toBe(AUTH_PAGE_IDS.courses);
  });

  it("does not allow open redirect URLs", () => {
    expect(normalizeRedirectTarget("https://evil.com/projects/")).toBe(AUTH_PAGE_IDS.courses);
  });
});
