import { describe, expect, it } from "vitest";
import { courses } from "./courses";
import { projects } from "./projects";

const requiredIds = [
  "hello-world-github-profile",
  "cs-foundations-notebook",
  "data-structures-visualizer",
  "web-app-with-auth",
  "database-learning-tracker",
  "ai-rag-mini-project",
  "systems-tool-cli",
  "open-source-contribution",
  "interview-prep-portfolio",
  "capstone-project"
];

describe("project milestones", () => {
  it("contains the planned ten-stage portfolio route", () => {
    expect(projects.map((project) => project.id)).toEqual(requiredIds);
  });

  it("has complete bilingual project milestone metadata", () => {
    for (const project of projects) {
      expect(project.title.en).toBeTruthy();
      expect(project.title.zh).toBeTruthy();
      expect(project.description.en).toBeTruthy();
      expect(project.description.zh).toBeTruthy();
      expect(project.targetAudience.en).toBeTruthy();
      expect(project.targetAudience.zh).toBeTruthy();
      expect(project.deliverables.en.length).toBeGreaterThan(0);
      expect(project.deliverables.zh.length).toBe(project.deliverables.en.length);
      expect(project.evaluationChecklist.en.length).toBeGreaterThan(0);
      expect(project.evaluationChecklist.zh.length).toBe(project.evaluationChecklist.en.length);
      expect(project.portfolioValue.en).toBeTruthy();
      expect(project.portfolioValue.zh).toBeTruthy();
      expect(project.githubRepoSuggestion).toBeTruthy();
      expect(project.aiAssistedTips.en.length).toBeGreaterThan(0);
      expect(project.aiAssistedTips.zh.length).toBe(project.aiAssistedTips.en.length);
      expect(project.estimatedWeeks).toBeGreaterThan(0);
    }
  });

  it("only recommends existing course ids", () => {
    const courseIds = new Set(courses.map((course) => course.id));
    const missing = projects.flatMap((project) =>
      project.recommendedCourses.filter((courseId) => !courseIds.has(courseId))
    );

    expect(missing).toEqual([]);
  });

  it("links next milestones to existing project ids", () => {
    const projectIds = new Set(projects.map((project) => project.id));
    const missing = projects
      .map((project) => project.nextMilestoneId)
      .filter((id) => id && !projectIds.has(id));

    expect(missing).toEqual([]);
  });
});
