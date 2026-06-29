import { supabase } from "../lib/supabaseClient";
import {
  fromCourseStateRows,
  fromProjectSubmissionRow,
  fromProjectProgressRow,
  fromStudyPlanRow,
  fromStudyLogRow,
  toCourseStateRows,
  toLegacyCourseStateRows,
  toLegacyProjectProgressRows,
  toLegacyStudyPlanRow,
  toLegacyStudyLogRows,
  toMilestoneLogRow,
  toProjectSubmissionRow,
  toProjectProgressRow,
  toStudyPlanRow,
  toStudyLogRow
} from "./cloudDataMappers";

function requireClient() {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  return supabase;
}

function isMissingColumnError(error) {
  return error?.code === "42703" || /column .* does not exist/i.test(error?.message ?? "");
}

function isMissingTableError(error) {
  return error?.code === "42P01" || /relation .* does not exist/i.test(error?.message ?? "");
}

export async function saveCourseStateToCloud(userId, savedIds, completedIds, courseIds) {
  const client = requireClient();
  const rows = toCourseStateRows(userId, savedIds, completedIds, courseIds);

  if (!rows.length) return [];

  const result = await client
    .from("user_course_states")
    .upsert(rows, { onConflict: "user_id,course_id" })
    .select();

  if (!result.error) return result.data;
  if (!isMissingColumnError(result.error)) throw result.error;

  const legacy = await client
    .from("user_course_states")
    .upsert(toLegacyCourseStateRows(rows), { onConflict: "user_id,course_id" })
    .select();

  if (legacy.error) throw legacy.error;
  return legacy.data;
}

export async function loadCourseStateFromCloud(userId) {
  const client = requireClient();
  const result = await client
    .from("user_course_states")
    .select("course_id,saved,completed,status,rating,notes")
    .eq("user_id", userId);

  if (!result.error) return fromCourseStateRows(result.data);
  if (!isMissingColumnError(result.error)) throw result.error;

  const legacy = await client
    .from("user_course_states")
    .select("course_id,saved,completed")
    .eq("user_id", userId);

  if (legacy.error) throw legacy.error;
  return fromCourseStateRows(legacy.data);
}

export async function saveStudyLogsToCloud(userId, logs) {
  const client = requireClient();
  const rows = logs.map((entry) => toStudyLogRow(userId, entry));

  if (!rows.length) return [];

  const result = await client
    .from("study_logs")
    .upsert(rows, { onConflict: "user_id,id" })
    .select();

  if (!result.error) return result.data;
  if (!isMissingColumnError(result.error)) throw result.error;

  const legacy = await client
    .from("study_logs")
    .upsert(toLegacyStudyLogRows(rows), { onConflict: "user_id,id" })
    .select();

  if (legacy.error) throw legacy.error;
  return legacy.data;
}

export async function loadStudyLogsFromCloud(userId) {
  const client = requireClient();
  const result = await client
    .from("study_logs")
    .select("id,date,hours,topic,note,next_step,course_id,tags,created_at")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (!result.error) return result.data.map(fromStudyLogRow);
  if (!isMissingColumnError(result.error)) throw result.error;

  const legacy = await client
    .from("study_logs")
    .select("id,date,hours,topic,note,next_step,created_at")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (legacy.error) throw legacy.error;
  return legacy.data.map(fromStudyLogRow);
}

export async function saveStudyPlanToCloud(userId, plan) {
  const client = requireClient();
  const row = toStudyPlanRow(userId, plan);
  const result = await client
    .from("study_plans")
    .upsert(row, { onConflict: "user_id" })
    .select()
    .single();

  if (!result.error) return result.data;
  if (!isMissingColumnError(result.error)) throw result.error;

  const legacy = await client
    .from("study_plans")
    .upsert(toLegacyStudyPlanRow(row), { onConflict: "user_id" })
    .select()
    .single();

  if (legacy.error) throw legacy.error;
  return legacy.data;
}

export async function loadStudyPlanFromCloud(userId) {
  const client = requireClient();
  const result = await client
    .from("study_plans")
    .select("weekly_hours,active_track,target_track,target_completion_date,title,is_active")
    .eq("user_id", userId)
    .eq("is_active", true)
    .maybeSingle();

  if (!result.error) return fromStudyPlanRow(result.data);
  if (!isMissingColumnError(result.error)) throw result.error;

  const legacy = await client
    .from("study_plans")
    .select("weekly_hours,active_track")
    .eq("user_id", userId)
    .maybeSingle();

  if (legacy.error) throw legacy.error;
  return fromStudyPlanRow(legacy.data);
}

export async function saveProjectProgressToCloud(userId, progressEntries) {
  const client = requireClient();
  const rows = progressEntries.map((entry) => toProjectProgressRow(userId, entry));

  if (!rows.length) return [];

  const { data, error } = await client
    .from("user_project_progress")
    .upsert(rows, { onConflict: "user_id,project_id" })
    .select();

  if (!error) return data;
  if (!isMissingColumnError(error)) throw error;

  const legacy = await client
    .from("user_project_progress")
    .upsert(toLegacyProjectProgressRows(rows), { onConflict: "user_id,project_id" })
    .select();

  if (legacy.error) throw legacy.error;
  return legacy.data;
}

export async function loadProjectProgressFromCloud(userId) {
  const client = requireClient();
  const result = await client
    .from("user_project_progress")
    .select(
      "project_id,milestone_id,status,completed,current_step,reflection,blockers,next_step,started_at,submitted_at,completed_at"
    )
    .eq("user_id", userId);

  if (!result.error) return result.data.map(fromProjectProgressRow);
  if (!isMissingColumnError(result.error)) throw result.error;

  const legacy = await client
    .from("user_project_progress")
    .select(
      "project_id,milestone_id,status,completed,current_step,reflection,started_at,completed_at"
    )
    .eq("user_id", userId);

  if (legacy.error) throw legacy.error;
  return legacy.data.map(fromProjectProgressRow);
}

export async function saveProjectSubmissionToCloud(userId, submission) {
  const client = requireClient();
  const row = toProjectSubmissionRow(userId, submission);
  const { data, error } = await client
    .from("project_submissions")
    .upsert(row, { onConflict: "id" })
    .select()
    .single();

  if (error) throw error;
  return fromProjectSubmissionRow(data);
}

export async function loadProjectSubmissionsFromCloud(userId) {
  const client = requireClient();
  const { data, error } = await client
    .from("project_submissions")
    .select(
      "id,project_id,title,github_url,demo_url,description,reflection,review_request,visibility,status,reviewer_feedback,created_at,updated_at"
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (isMissingTableError(error)) return [];
  if (error) throw error;
  return data.map(fromProjectSubmissionRow);
}

export async function updateProjectSubmissionToCloud(userId, submission) {
  return saveProjectSubmissionToCloud(userId, submission);
}

export async function saveMilestoneLogToCloud(userId, log) {
  const client = requireClient();
  const row = toMilestoneLogRow(userId, log);
  const { data, error } = await client
    .from("user_milestone_logs")
    .upsert(row, { onConflict: "user_id,id" })
    .select()
    .single();

  if (error) throw error;
  return data;
}
