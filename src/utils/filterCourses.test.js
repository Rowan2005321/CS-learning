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
    const result = filterCourses(courses, { ...allFilters, query: "classical ML models" });

    expect(result.map((course) => course.id)).toEqual(["cs229"]);
  });

  it("ranks exact course code matches first", () => {
    const result = filterCourses(courses, { ...allFilters, query: "CS50x" });

    expect(result[0].id).toBe("cs50x");
    expect(result[0].searchMatch).toMatchObject({
      field: "code",
      value: "CS50x"
    });
  });

  it("returns a readable source match reason", () => {
    const result = filterCourses(courses, { ...allFilters, query: "Harvard CS50" });

    expect(result[0].searchMatch).toMatchObject({
      field: "source",
      value: "Harvard / CS50"
    });
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

  it("filters advanced specialty tracks", () => {
    const llmSystems = filterCourses(courses, {
      ...allFilters,
      track: "llm-systems-rag-evaluation"
    });
    const soliditySecurity = filterCourses(courses, {
      ...allFilters,
      track: "solidity-security-auditing"
    });
    const onchainAnalytics = filterCourses(courses, {
      ...allFilters,
      track: "onchain-data-analytics"
    });
    const codingAgents = filterCourses(courses, {
      ...allFilters,
      track: "ai-coding-agent-evaluation-tools"
    });

    expect(llmSystems.map((course) => course.id)).toContain("ragas-rag-evaluation");
    expect(soliditySecurity.map((course) => course.id)).toContain("trail-of-bits-secure-contracts");
    expect(onchainAnalytics.map((course) => course.id)).toContain("dune-docs-dunesql");
    expect(codingAgents.map((course) => course.id)).toContain("swe-bench-benchmark");
  });

  it("searches enriched metadata fields", () => {
    const result = filterCourses(courses, { ...allFilters, query: "Fall 2024 course" });

    expect(result.map((course) => course.id)).toContain("berkeley-defi");
  });
});
