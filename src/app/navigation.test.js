import { describe, expect, it } from "vitest";
import { getSiteRootPath } from "./navigation";

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
