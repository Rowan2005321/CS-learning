import { describe, expect, it } from "vitest";
import {
  fromCourseStateRows,
  fromStudyPlanRow,
  fromStudyLogRow,
  getCourseStatus,
  mergeLocalAndCloudStudyLogs,
  toCourseStateRows,
  toLegacyCourseStateRows,
  toLegacyStudyPlanRow,
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
});
