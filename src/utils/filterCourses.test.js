import { describe, expect, it } from "vitest";
import { courses } from "../data/courses";
import { filterCourses } from "./filterCourses";

const allFilters = {
  query: "",
  discipline: "all",
  level: "all",
  track: "all"
};

describe("filterCourses", () => {
  it("filters courses by search query", () => {
    const result = filterCourses(courses, { ...allFilters, query: "CS229" });

    expect(result.map((course) => course.id)).toEqual(["cs229"]);
  });

  it("combines discipline, level, and track filters", () => {
    const result = filterCourses(courses, {
      ...allFilters,
      discipline: "programming",
      level: "foundation",
      track: "interview-prep"
    });

    expect(result.map((course) => course.id)).toEqual(["ucsd-dsa", "neetcode"]);
  });

  it("does not let saved or completed UI state change filter results", () => {
    const filters = { ...allFilters, track: "software-engineering" };
    const baseline = filterCourses(courses, filters).map((course) => course.id);
    const coursesWithUiState = courses.map((course) => ({
      ...course,
      isSaved: course.id === "cs50x",
      isCompleted: course.id === "fullstackopen"
    }));

    expect(filterCourses(coursesWithUiState, filters).map((course) => course.id)).toEqual(baseline);
  });

  it("filters the new AI agent and Web3 tracks", () => {
    const agentCourses = filterCourses(courses, { ...allFilters, track: "agent-engineering" });
    const web3Courses = filterCourses(courses, { ...allFilters, track: "blockchain-web3" });

    expect(agentCourses.map((course) => course.id)).toContain("berkeley-llm-agents");
    expect(web3Courses.map((course) => course.id)).toContain(
      "stanford-cs251-blockchain-technologies"
    );
  });

  it("searches enriched metadata fields", () => {
    const result = filterCourses(courses, { ...allFilters, query: "Fall 2024 course" });

    expect(result.map((course) => course.id)).toContain("berkeley-defi");
  });
});
