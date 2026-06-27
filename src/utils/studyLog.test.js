import { describe, expect, it } from "vitest";
import {
  STUDY_LOG_STORAGE_VERSION,
  buildStudyLogHeatmap,
  buildWeeklyReview,
  calculateStudyLogStats,
  calculateStudyLogWindowStats,
  migrateStudyLogState,
  studyLogsToCsv,
  todayKey,
  validateStudyLogImport
} from "./studyLog";

describe("todayKey", () => {
  it("formats a local date as YYYY-MM-DD", () => {
    expect(todayKey(new Date(2026, 5, 27))).toBe("2026-06-27");
  });
});

describe("calculateStudyLogStats", () => {
  it("calculates total hours, week hours, logged days, and streak", () => {
    const entries = [
      { id: "1", date: "2026-06-27", hours: 1.5, topic: "CS50x" },
      { id: "2", date: "2026-06-26", hours: 2, topic: "DSA" },
      { id: "3", date: "2026-06-24", hours: 3, topic: "RAG" },
      { id: "4", date: "2026-06-20", hours: 4, topic: "Systems" },
      { id: "ignored", date: "2026-06-27", hours: 0, topic: "Ignored" }
    ];

    expect(calculateStudyLogStats(entries, new Date(2026, 5, 27))).toMatchObject({
      totalHours: 10.5,
      thisWeekHours: 6.5,
      streakDays: 2,
      loggedDays: 4
    });
  });

  it("handles empty logs", () => {
    expect(calculateStudyLogStats([], new Date(2026, 5, 27))).toMatchObject({
      totalHours: 0,
      thisWeekHours: 0,
      streakDays: 0,
      loggedDays: 0
    });
  });

  it("calculates 7-day and 30-day windows", () => {
    const entries = [
      { id: "today", date: "2026-06-27", hours: 2, topic: "Today" },
      { id: "week", date: "2026-06-21", hours: 3, topic: "Week" },
      { id: "month", date: "2026-06-01", hours: 5, topic: "Month" },
      { id: "old", date: "2026-05-01", hours: 8, topic: "Old" }
    ];

    expect(calculateStudyLogWindowStats(entries, 7, new Date(2026, 5, 27))).toMatchObject({
      totalHours: 5,
      loggedDays: 2,
      entries: 2
    });
    expect(calculateStudyLogWindowStats(entries, 30, new Date(2026, 5, 27))).toMatchObject({
      totalHours: 10,
      loggedDays: 3,
      entries: 3
    });
  });
});

describe("study log persistence", () => {
  it("migrates legacy array storage into a versioned state", () => {
    const state = migrateStudyLogState([
      { id: "1", date: "2026-06-27", hours: "2", topic: "CS50x" }
    ]);

    expect(state).toEqual({
      version: STUDY_LOG_STORAGE_VERSION,
      entries: [
        {
          id: "1",
          date: "2026-06-27",
          hours: 2,
          topic: "CS50x",
          note: "",
          nextStep: "",
          createdAt: "2026-06-27T00:00:00.000Z"
        }
      ]
    });
  });

  it("validates imported JSON and drops invalid entries", () => {
    const result = validateStudyLogImport(
      JSON.stringify({
        version: STUDY_LOG_STORAGE_VERSION,
        entries: [
          { id: "valid", date: "2026-06-27", hours: 1.5, topic: "RAG eval" },
          { id: "bad-hours", date: "2026-06-27", hours: 0, topic: "Invalid" },
          { id: "bad-date", date: "2026-99-99", hours: 1, topic: "Invalid" }
        ]
      })
    );

    expect(result.ok).toBe(true);
    expect(result.state.entries).toHaveLength(1);
    expect(result.state.entries[0]).toMatchObject({
      id: "valid",
      hours: 1.5,
      topic: "RAG eval"
    });
  });

  it("rejects invalid import payloads", () => {
    expect(validateStudyLogImport("{bad json").ok).toBe(false);
    expect(validateStudyLogImport({ wrong: [] }).ok).toBe(false);
  });

  it("exports CSV with escaped cells", () => {
    const csv = studyLogsToCsv([
      {
        id: "1",
        date: "2026-06-27",
        hours: 1,
        topic: "CS50x, arrays",
        note: "Finished \"lecture\" notes",
        nextStep: "pset",
        createdAt: "2026-06-27T00:00:00.000Z"
      }
    ]);

    expect(csv).toContain('"CS50x, arrays"');
    expect(csv).toContain('"Finished ""lecture"" notes"');
  });
});

describe("study review helpers", () => {
  it("builds a weekly review with top topics and next steps", () => {
    const review = buildWeeklyReview(
      [
        { id: "1", date: "2026-06-27", hours: 2, topic: "CS50x", nextStep: "pset" },
        { id: "2", date: "2026-06-26", hours: 3, topic: "RAG", nextStep: "eval notes" },
        { id: "3", date: "2026-06-25", hours: 1, topic: "CS50x" },
        { id: "old", date: "2026-06-10", hours: 8, topic: "Old" }
      ],
      new Date(2026, 5, 27)
    );

    expect(review).toMatchObject({
      totalHours: 6,
      loggedDays: 3,
      entries: 3
    });
    expect(review.topTopics[0]).toEqual({ topic: "CS50x", hours: 3 });
    expect(review.nextSteps).toEqual(["pset", "eval notes"]);
  });

  it("builds heatmap days with intensity levels", () => {
    const heatmap = buildStudyLogHeatmap(
      [
        { id: "1", date: "2026-06-26", hours: 0.5, topic: "Light" },
        { id: "2", date: "2026-06-27", hours: 4, topic: "Deep" }
      ],
      3,
      new Date(2026, 5, 27)
    );

    expect(heatmap).toEqual([
      { date: "2026-06-25", hours: 0, hasLog: false, level: 0 },
      { date: "2026-06-26", hours: 0.5, hasLog: true, level: 1 },
      { date: "2026-06-27", hours: 4, hasLog: true, level: 4 }
    ]);
  });
});
