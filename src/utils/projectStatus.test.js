import { describe, expect, it } from "vitest";
import {
  PROJECT_STATUSES,
  getNextAvailableProjects,
  getProjectStatus,
  isProjectUnlocked
} from "./projectStatus";

const baseProject = {
  id: "project-1",
  order: 1,
  requiredCourses: ["cs50x"],
  unlockCriteria: {
    requiredCourses: ["cs50x"],
    requiredProjects: ["setup"]
  }
};

describe("projectStatus", () => {
  it("returns locked when unlock criteria are not met", () => {
    expect(getProjectStatus(baseProject, [], [], [])).toBe(PROJECT_STATUSES.locked);
    expect(isProjectUnlocked(baseProject, [], [])).toBe(false);
  });

  it("returns available when criteria are met and the user has not started", () => {
    expect(getProjectStatus(baseProject, [], ["cs50x"], ["setup"])).toBe(
      PROJECT_STATUSES.available
    );
  });

  it("prefers in_progress from user progress", () => {
    expect(
      getProjectStatus(
        baseProject,
        [{ projectId: "project-1", status: PROJECT_STATUSES.inProgress }],
        [],
        []
      )
    ).toBe(PROJECT_STATUSES.inProgress);
  });

  it("returns submitted after the user submits", () => {
    expect(
      getProjectStatus(
        baseProject,
        [{ projectId: "project-1", status: PROJECT_STATUSES.submitted }],
        [],
        []
      )
    ).toBe(PROJECT_STATUSES.submitted);
  });

  it("returns completed after the user completes the project", () => {
    expect(
      getProjectStatus(
        baseProject,
        [{ projectId: "project-1", status: PROJECT_STATUSES.completed, completed: true }],
        [],
        []
      )
    ).toBe(PROJECT_STATUSES.completed);
  });

  it("returns the next available projects sorted by order", () => {
    const projects = [
      {
        id: "later",
        order: 2,
        unlockCriteria: { requiredCourses: ["cs50x"], requiredProjects: [] }
      },
      {
        id: "first",
        order: 1,
        unlockCriteria: { requiredCourses: [], requiredProjects: [] }
      }
    ];

    expect(getNextAvailableProjects(projects, [], ["cs50x"]).map((project) => project.id)).toEqual([
      "first",
      "later"
    ]);
  });
});
