import { supabase } from "../lib/supabaseClient";

function requireClient() {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  return supabase;
}

function toCourseRows(userId, savedIds, completedIds, courseIds = []) {
  const ids = [...new Set([...courseIds, ...savedIds, ...completedIds])];
  const savedSet = new Set(savedIds);
  const completedSet = new Set(completedIds);

  return ids.map((courseId) => ({
    course_id: courseId,
    completed: completedSet.has(courseId),
    saved: savedSet.has(courseId),
    updated_at: new Date().toISOString(),
    user_id: userId
  }));
}

function toStudyLogRow(userId, entry) {
  return {
    id: entry.id,
    user_id: userId,
    date: entry.date,
    hours: entry.hours,
    topic: entry.topic,
    note: entry.note,
    next_step: entry.nextStep,
    created_at: entry.createdAt,
    updated_at: new Date().toISOString()
  };
}

function fromStudyLogRow(row) {
  return {
    id: row.id,
    date: row.date,
    hours: Number(row.hours),
    topic: row.topic,
    note: row.note ?? "",
    nextStep: row.next_step ?? "",
    createdAt: row.created_at
  };
}

export async function saveCourseStateToCloud(userId, savedIds, completedIds, courseIds) {
  const client = requireClient();
  const rows = toCourseRows(userId, savedIds, completedIds, courseIds);

  if (!rows.length) return [];

  const { data, error } = await client
    .from("user_course_states")
    .upsert(rows, { onConflict: "user_id,course_id" })
    .select();

  if (error) throw error;
  return data;
}

export async function loadCourseStateFromCloud(userId) {
  const client = requireClient();
  const { data, error } = await client
    .from("user_course_states")
    .select("course_id,saved,completed")
    .eq("user_id", userId);

  if (error) throw error;

  return {
    savedIds: data.filter((row) => row.saved).map((row) => row.course_id),
    completedIds: data.filter((row) => row.completed).map((row) => row.course_id)
  };
}

export async function saveStudyLogsToCloud(userId, logs) {
  const client = requireClient();
  const rows = logs.map((entry) => toStudyLogRow(userId, entry));

  if (!rows.length) return [];

  const { data, error } = await client
    .from("study_logs")
    .upsert(rows, { onConflict: "user_id,id" })
    .select();

  if (error) throw error;
  return data;
}

export async function loadStudyLogsFromCloud(userId) {
  const client = requireClient();
  const { data, error } = await client
    .from("study_logs")
    .select("id,date,hours,topic,note,next_step,created_at")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map(fromStudyLogRow);
}
