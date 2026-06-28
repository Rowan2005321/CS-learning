import { describe, expect, it } from "vitest";
import { courses } from "../data/courses";
import { computeCoursePlanner } from "./coursePlanner";

describe("computeCoursePlanner", () => {
  it("keeps weighted search ranking inside the worker-safe planner path", () => {
    const result = computeCoursePlanner({
      courses,
      filters: {
        query: "CS50x",
        discipline: "all",
        level: "all",
        track: "all"
      },
      completedIds: [],
      weeklyHours: 8
    });

    expect(result.filteredCourses[0].id).toBe("cs50x");
    expect(result.filteredCourses[0].searchMatch).toMatchObject({
      field: "code",
      value: "CS50x"
    });
  });

  it("calculates progress and route duration in one planner result", () => {
    const result = computeCoursePlanner({
      courses,
      filters: {
        query: "",
        discipline: "all",
        level: "all",
        track: "ai-data"
      },
      completedIds: ["cs50x", "cs229"],
      weeklyHours: 12
    });

    const expectedWeeks = Math.ceil(
      result.filteredCourses.reduce(
        (sum, course) => sum + course.weeks * course.hoursPerWeek,
        0
      ) / 12
    );

    expect(result.filteredCourses.every((course) => course.tracks.includes("ai-data"))).toBe(true);
    expect(result.routeWeeks).toBe(expectedWeeks);
    expect(result.progress).toMatchObject({
      completed: 2,
      total: courses.length
    });
  });
});
