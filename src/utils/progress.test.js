import { describe, expect, it } from "vitest";
import { courses } from "../data/courses";
import { calculateProgress, estimateWeeks } from "./progress";

describe("calculateProgress", () => {
  it("calculates completed course percentage from completed ids", () => {
    expect(calculateProgress(courses, ["cs50x", "cs229"])).toEqual({
      completed: 2,
      total: courses.length,
      percent: Math.round((2 / courses.length) * 100)
    });
  });

  it("handles empty course lists", () => {
    expect(calculateProgress([], ["cs50x"])).toEqual({
      completed: 0,
      total: 0,
      percent: 0
    });
  });
});

describe("estimateWeeks", () => {
  it("estimates route duration from total course hours and weekly availability", () => {
    const route = courses.filter((course) => course.tracks.includes("ai-data"));

    expect(estimateWeeks(route, 12)).toBe(15);
  });

  it("returns 0 when weekly hours are not usable", () => {
    expect(estimateWeeks(courses, 0)).toBe(0);
  });
});
