import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const schema = readFileSync(new URL("../../supabase/schema.sql", import.meta.url), "utf8");

describe("supabase schema", () => {
  it("contains the long-term planner tables", () => {
    const tables = [
      "profiles",
      "user_course_states",
      "study_logs",
      "study_plans",
      "study_plan_items",
      "user_project_progress",
      "project_submissions",
      "user_milestone_logs",
      "project_templates",
      "project_milestones",
      "learning_tracks",
      "user_track_states"
    ];

    for (const table of tables) {
      expect(schema).toContain(`public.${table}`);
      expect(schema).toContain(`alter table public.${table} enable row level security`);
    }
  });

  it("uses RLS policies with cached auth.uid calls", () => {
    expect(schema).toContain("(select auth.uid()) = user_id");
    expect(schema).toContain("(select auth.uid()) = id");
  });

  it("creates indexes for the main query paths", () => {
    const indexes = [
      "user_course_states_user_course_idx",
      "study_logs_user_date_idx",
      "study_logs_user_course_idx",
      "study_plans_user_active_idx",
      "study_plan_items_plan_order_idx",
      "user_project_progress_user_project_idx",
      "project_submissions_user_project_created_idx",
      "user_milestone_logs_user_project_created_idx"
    ];

    for (const index of indexes) {
      expect(schema).toContain(index);
    }
  });
});
