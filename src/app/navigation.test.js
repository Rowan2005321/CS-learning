import { describe, expect, it } from "vitest";
import { PAGE_IDS, buildNavLinks, getLegacyHashTarget, getSiteRootPath } from "./navigation";

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

describe("navigation", () => {
  it("builds public local-first navigation without an account page", () => {
    const links = buildNavLinks("en");

    expect(links.map((link) => link.pageId)).toEqual([
      PAGE_IDS.home,
      PAGE_IDS.courses,
      PAGE_IDS.studyLog,
      PAGE_IDS.dashboard,
      PAGE_IDS.tracks,
      PAGE_IDS.projects,
      PAGE_IDS.sources
    ]);
    expect(links.some((link) => link.pageId === "account")).toBe(false);
  });

  it("keeps legacy hash links mapped to public pages", () => {
    expect(getLegacyHashTarget("#courses")).toBe(PAGE_IDS.courses);
    expect(getLegacyHashTarget("#study-log")).toBe(PAGE_IDS.studyLog);
    expect(getLegacyHashTarget("#dashboard")).toBe(PAGE_IDS.dashboard);
    expect(getLegacyHashTarget("#account")).toBeNull();
  });
});
