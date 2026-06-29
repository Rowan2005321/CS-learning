import { describe, expect, it } from "vitest";
import { PAGE_IDS, getSiteRootPath, isProtectedPage, readAccountRedirectPage, readRedirectPage } from "./navigation";

describe("getSiteRootPath", () => {
  it("returns the GitHub Pages project root from nested multi-page paths", () => {
    expect(getSiteRootPath("/CS-learning/courses/")).toBe("/CS-learning/");
    expect(getSiteRootPath("/CS-learning/study-log/")).toBe("/CS-learning/");
    expect(getSiteRootPath("/CS-learning/tracks/")).toBe("/CS-learning/");
  });

  it("keeps the root page path unchanged", () => {
    expect(getSiteRootPath("/CS-learning/")).toBe("/CS-learning/");
    expect(getSiteRootPath("/CS-learning/index.html")).toBe("/CS-learning/");
  });
});

describe("auth redirects", () => {
  it("treats courses, projects, and the personal study log as protected pages", () => {
    expect(isProtectedPage(PAGE_IDS.studyLog)).toBe(true);
    expect(isProtectedPage(PAGE_IDS.courses)).toBe(true);
    expect(isProtectedPage(PAGE_IDS.projects)).toBe(true);
    expect(isProtectedPage(PAGE_IDS.tracks)).toBe(false);
  });
  it("defaults account auth success to the personal study log", () => {
    expect(readAccountRedirectPage("?lang=zh")).toBe(PAGE_IDS.studyLog);
  });

  it("reads only known non-account page ids from redirectTo", () => {
    expect(readRedirectPage(PAGE_IDS.courses, "?lang=zh&redirectTo=study-log")).toBe(
      PAGE_IDS.studyLog
    );

    expect(readRedirectPage(PAGE_IDS.courses, "?lang=zh&redirectTo=https://evil.example")).toBe(
      PAGE_IDS.courses
    );

    expect(readRedirectPage(PAGE_IDS.studyLog, "?lang=zh&redirectTo=account")).toBe(
      PAGE_IDS.studyLog
    );
  });
});
