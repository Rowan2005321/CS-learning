import { describe, expect, it } from "vitest";
import { calculateStudyLogStats, todayKey } from "./studyLog";

describe("todayKey", () => {
  it("formats a local date as YYYY-MM-DD", () => {
    expect(todayKey(new Date(2026, 5, 27))).toBe("2026-06-27");
  });
});

describe("calculateStudyLogStats", () => {
  it("calculates total hours, week hours, logged days, and streak", () => {
    const entries = [
      { id: "1", date: "2026-06-27", hours: 1.5 },
      { id: "2", date: "2026-06-26", hours: 2 },
      { id: "3", date: "2026-06-24", hours: 3 },
      { id: "4", date: "2026-06-20", hours: 4 },
      { id: "ignored", date: "2026-06-27", hours: 0 }
    ];

    expect(calculateStudyLogStats(entries, new Date(2026, 5, 27))).toEqual({
      totalHours: 10.5,
      thisWeekHours: 6.5,
      streakDays: 2,
      loggedDays: 4
    });
  });

  it("handles empty logs", () => {
    expect(calculateStudyLogStats([], new Date(2026, 5, 27))).toEqual({
      totalHours: 0,
      thisWeekHours: 0,
      streakDays: 0,
      loggedDays: 0
    });
  });
});
