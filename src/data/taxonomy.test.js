import { describe, expect, it } from "vitest";
import { courses } from "./courses";
import { labels } from "./labels";

describe("discipline taxonomy", () => {
  it("does not expose duplicate Chinese discipline option labels", () => {
    const zhNames = Object.values(labels.zh.disciplines);
    const duplicates = zhNames.filter((name, index) => zhNames.indexOf(name) !== index);

    expect(duplicates).toEqual([]);
  });

  it("has a display label for every course discipline", () => {
    const labeledDisciplines = new Set(Object.keys(labels.zh.disciplines));
    const missingDisciplines = [
      ...new Set(
        courses
          .map((course) => course.discipline)
          .filter((discipline) => !labeledDisciplines.has(discipline))
      )
    ];

    expect(missingDisciplines).toEqual([]);
  });

  it("keeps legacy discipline aliases out of course data", () => {
    const courseDisciplines = new Set(courses.map((course) => course.discipline));

    expect(courseDisciplines.has("engineering")).toBe(false);
    expect(courseDisciplines.has("artificial-intelligence")).toBe(false);
  });
});
