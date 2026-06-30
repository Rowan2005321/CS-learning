import { describe, expect, it } from "vitest";
import { courses } from "./courses";
import { projectTracks, projects } from "./projects";

const requiredProjectIds = [
  "github-profile-and-dev-setup",
  "cs-learning-notebook",
  "data-structures-visualizer",
  "web-app-with-local-state",
  "localstorage-learning-tracker",
  "testing-and-deployment-pipeline",
  "prd-to-mvp-vibe-coding",
  "ai-assisted-refactor-and-test",
  "ai-code-review-journal",
  "rag-course-qa-assistant",
  "tool-calling-study-agent",
  "rag-evaluation-dashboard",
  "multi-step-agent-workflow",
  "blockchain-concepts-notebook",
  "solidity-todo-contract",
  "smart-contract-security-report",
  "onchain-data-dashboard",
  "open-source-contribution",
  "interview-prep-portfolio",
  "capstone-product"
];

const requiredTrackIds = [
  "cs-foundation",
  "software-engineering",
  "vibe-coding",
  "agent-engineering",
  "blockchain-web3",
  "portfolio-capstone"
];

describe("project milestones", () => {
  it("contains the required project tracks", () => {
    expect(projectTracks.map((track) => track.id)).toEqual(requiredTrackIds);

    for (const track of projectTracks) {
      expect(track.title.en).toBeTruthy();
      expect(track.title.zh).toBeTruthy();
      expect(track.description.en).toBeTruthy();
      expect(track.description.zh).toBeTruthy();
    }
  });

  it("contains the required twenty project tasks", () => {
    expect(projects.map((project) => project.id)).toEqual(requiredProjectIds);
    expect(projects.length).toBeGreaterThanOrEqual(20);
  });

  it("does not hard-code user status in project catalog data", () => {
    expect(projects.some((project) => Object.hasOwn(project, "status"))).toBe(false);
  });

  it("has complete bilingual project metadata", () => {
    for (const project of projects) {
      expect(project.title.en).toBeTruthy();
      expect(project.title.zh).toBeTruthy();
      expect(project.subtitle.en).toBeTruthy();
      expect(project.subtitle.zh).toBeTruthy();
      expect(project.description.en).toBeTruthy();
      expect(project.description.zh).toBeTruthy();
      expect(project.targetAudience.en).toBeTruthy();
      expect(project.targetAudience.zh).toBeTruthy();
      expect(project.deliverables.en.length).toBeGreaterThan(0);
      expect(project.deliverables.zh.length).toBe(project.deliverables.en.length);
      expect(project.submissionRequirements.en.length).toBeGreaterThan(0);
      expect(project.submissionRequirements.zh.length).toBe(
        project.submissionRequirements.en.length
      );
      expect(project.evaluationRubric.en.length).toBeGreaterThan(0);
      expect(project.evaluationRubric.zh.length).toBe(project.evaluationRubric.en.length);
      expect(project.reviewQuestions.en.length).toBeGreaterThan(0);
      expect(project.commonPitfalls.en.length).toBeGreaterThan(0);
      expect(project.aiAssistedWorkflow.en.length).toBeGreaterThan(0);
      expect(project.portfolioValue.en).toBeTruthy();
      expect(project.portfolioValue.zh).toBeTruthy();
      expect(project.githubRepoSuggestion).toBeTruthy();
      expect(project.estimatedWeeks).toBeGreaterThan(0);
      expect(project.estimatedHours).toBeGreaterThan(0);
    }
  });

  it("only references existing project track ids", () => {
    const trackIds = new Set(projectTracks.map((track) => track.id));
    const missing = projects.flatMap((project) =>
      project.trackIds.filter((trackId) => !trackIds.has(trackId))
    );

    expect(missing).toEqual([]);
  });

  it("only references existing course ids", () => {
    const courseIds = new Set(courses.map((course) => course.id));
    const missing = projects.flatMap((project) => {
      const ids = [
        ...(project.requiredCourses ?? []),
        ...(project.recommendedCourses ?? []),
        ...(project.unlockCriteria?.requiredCourses ?? [])
      ];

      return ids.filter((courseId) => !courseIds.has(courseId));
    });

    expect(missing).toEqual([]);
  });

  it("links next projects and required projects to existing project ids", () => {
    const projectIds = new Set(projects.map((project) => project.id));
    const missing = projects.flatMap((project) => {
      const ids = [
        ...(project.nextProjectIds ?? []),
        ...(project.unlockCriteria?.requiredProjects ?? [])
      ];

      return ids.filter((projectId) => !projectIds.has(projectId));
    });

    expect(missing).toEqual([]);
  });
});
