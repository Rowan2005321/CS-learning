import { describe, expect, it } from "vitest";
import {
  fromCourseStateRows,
  fromProjectProgressRow,
  fromProjectSubmissionRow,
  fromStudyPlanRow,
  fromStudyLogRow,
  getCourseStatus,
  mergeLocalAndCloudStudyLogs,
  toCourseStateRows,
  toLegacyCourseStateRows,
  toLegacyStudyPlanRow,
  toProjectProgressRow,
  toProjectSubmissionRow,
  toStudyPlanRow,
  toStudyLogRow
} from "./cloudDataMappers";

describe("cloudDataMappers", () => {
  it("maps course state to the expanded user_course_states schema", () => {
    const rows = toCourseStateRows("user-1", ["cs50x"], ["cs229"], ["cs50x", "cs229", "ostep"]);

    expect(rows).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          course_id: "cs50x",
          saved: true,
          completed: false,
          status: "saved",
          rating: null,
          notes: "",
          user_id: "user-1"
        }),
        expect.objectContaining({
          course_id: "cs229",
          saved: false,
          completed: true,
          status: "completed"
        }),
        expect.objectContaining({
          course_id: "ostep",
          saved: false,
          completed: false,
          status: "not_started"
        })
      ])
    );
  });

  it("keeps a legacy course-state payload for unmigrated databases", () => {
    const rows = toCourseStateRows("user-1", ["cs50x"], [], ["cs50x"]);

    expect(toLegacyCourseStateRows(rows)).toEqual([
      expect.not.objectContaining({
        status: expect.any(String),
        rating: expect.anything(),
        notes: expect.any(String)
      })
    ]);
  });

  it("reads saved and completed ids from old and new course state rows", () => {
    expect(
      fromCourseStateRows([
        { course_id: "cs50x", saved: true, completed: false },
        { course_id: "cs229", saved: false, completed: false, status: "completed" }
      ])
    ).toEqual({
      savedIds: ["cs50x"],
      completedIds: ["cs229"]
    });
  });

  it("maps study logs between local camelCase and Supabase snake_case", () => {
    const row = toStudyLogRow("user-1", {
      id: "log-1",
      date: "2026-06-29",
      hours: 2.5,
      topic: "CS50 arrays",
      note: "Finished exercises",
      nextStep: "Review pointers",
      courseId: "cs50x",
      tags: ["programming"],
      createdAt: "2026-06-29T08:00:00.000Z"
    });

    expect(row).toMatchObject({
      course_id: "cs50x",
      next_step: "Review pointers",
      tags: ["programming"],
      user_id: "user-1"
    });

    expect(fromStudyLogRow(row)).toMatchObject({
      courseId: "cs50x",
      nextStep: "Review pointers",
      tags: ["programming"]
    });
  });

  it("maps study plan rows for expanded and legacy schemas", () => {
    const row = toStudyPlanRow("user-1", {
      filters: { track: "ai-data" },
      weeklyHours: 12
    });

    expect(row).toMatchObject({
      active_track: "ai-data",
      is_active: true,
      target_track: "ai-data",
      user_id: "user-1",
      weekly_hours: 12
    });
    expect(toLegacyStudyPlanRow(row)).toEqual({
      active_track: "ai-data",
      updated_at: row.updated_at,
      user_id: "user-1",
      weekly_hours: 12
    });
    expect(fromStudyPlanRow(row)).toEqual({
      targetCompletionDate: "",
      targetTrack: "ai-data",
      title: "Default study plan",
      weeklyHours: 12
    });
  });

  it("merges cloud study logs without losing local-only records", () => {
    const merged = mergeLocalAndCloudStudyLogs(
      [
        {
          id: "local-only",
          date: "2026-06-28",
          hours: 1,
          topic: "Local note",
          note: "",
          nextStep: "",
          createdAt: "2026-06-28T08:00:00.000Z"
        }
      ],
      [
        {
          id: "cloud-only",
          date: "2026-06-29",
          hours: 2,
          topic: "Cloud note",
          note: "",
          nextStep: "",
          createdAt: "2026-06-29T08:00:00.000Z"
        }
      ]
    );

    expect(merged.map((entry) => entry.id)).toEqual(["cloud-only", "local-only"]);
  });

  it("derives a stable status from saved and completed booleans", () => {
    expect(getCourseStatus({ saved: false, completed: false })).toBe("not_started");
    expect(getCourseStatus({ saved: true, completed: false })).toBe("saved");
    expect(getCourseStatus({ saved: true, completed: true })).toBe("completed");
  });

  it("maps project progress rows with blockers, next step, and submitted time", () => {
    const row = toProjectProgressRow("user-1", {
      blockers: "Need better tests",
      currentStep: "Building submission form",
      nextStep: "Add RLS test",
      projectId: "web-app-with-auth",
      reflection: "Auth edge cases matter",
      status: "submitted",
      submittedAt: "2026-06-29T09:00:00.000Z"
    });

    expect(row).toMatchObject({
      blockers: "Need better tests",
      next_step: "Add RLS test",
      project_id: "web-app-with-auth",
      status: "submitted",
      submitted_at: "2026-06-29T09:00:00.000Z",
      user_id: "user-1"
    });

    expect(fromProjectProgressRow(row)).toMatchObject({
      blockers: "Need better tests",
      nextStep: "Add RLS test",
      projectId: "web-app-with-auth",
      status: "submitted",
      submittedAt: "2026-06-29T09:00:00.000Z"
    });
  });

  it("maps project submissions between local and Supabase shapes", () => {
    const row = toProjectSubmissionRow("user-1", {
      createdAt: "2026-06-29T09:00:00.000Z",
      demoUrl: "https://example.com",
      description: "A complete product",
      githubUrl: "https://github.com/example/capstone",
      id: "1c3b7bd0-2f4e-4a01-9f7a-0f0d4d0d9a90",
      projectId: "capstone-product",
      reflection: "Scope control was hard",
      reviewRequest: "Please review architecture",
      status: "submitted",
      title: "Capstone v1",
      visibility: "public"
    });

    expect(row).toMatchObject({
      demo_url: "https://example.com",
      github_url: "https://github.com/example/capstone",
      project_id: "capstone-product",
      review_request: "Please review architecture",
      user_id: "user-1",
      visibility: "public"
    });

    expect(fromProjectSubmissionRow(row)).toMatchObject({
      demoUrl: "https://example.com",
      githubUrl: "https://github.com/example/capstone",
      projectId: "capstone-product",
      reviewRequest: "Please review architecture",
      title: "Capstone v1",
      visibility: "public"
    });
  });
});
