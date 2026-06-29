import { mergeStudyLogEntries } from "../utils/studyLog";

export function getCourseStatus({ saved = false, completed = false } = {}) {
  if (completed) return "completed";
  if (saved) return "saved";
  return "not_started";
}

export function toCourseStateRows(userId, savedIds, completedIds, courseIds = []) {
  const ids = [...new Set([...courseIds, ...savedIds, ...completedIds])];
  const savedSet = new Set(savedIds);
  const completedSet = new Set(completedIds);

  return ids.map((courseId) => {
    const saved = savedSet.has(courseId);
    const completed = completedSet.has(courseId);

    return {
      course_id: courseId,
      completed,
      notes: "",
      rating: null,
      saved,
      status: getCourseStatus({ saved, completed }),
      updated_at: new Date().toISOString(),
      user_id: userId
    };
  });
}

export function toLegacyCourseStateRows(rows) {
  return rows.map(({ course_id, completed, saved, updated_at, user_id }) => ({
    course_id,
    completed,
    saved,
    updated_at,
    user_id
  }));
}

export function fromCourseStateRows(rows = []) {
  return {
    savedIds: rows
      .filter((row) => row.saved || row.status === "saved" || row.status === "in_progress")
      .map((row) => row.course_id),
    completedIds: rows
      .filter((row) => row.completed || row.status === "completed")
      .map((row) => row.course_id)
  };
}

export function toStudyLogRow(userId, entry) {
  return {
    course_id: entry.courseId || null,
    created_at: entry.createdAt,
    date: entry.date,
    hours: entry.hours,
    id: entry.id,
    next_step: entry.nextStep,
    note: entry.note,
    tags: Array.isArray(entry.tags) ? entry.tags : [],
    topic: entry.topic,
    updated_at: new Date().toISOString(),
    user_id: userId
  };
}

export function toLegacyStudyLogRows(rows) {
  return rows.map(({ created_at, date, hours, id, next_step, note, topic, updated_at, user_id }) => ({
    created_at,
    date,
    hours,
    id,
    next_step,
    note,
    topic,
    updated_at,
    user_id
  }));
}

export function fromStudyLogRow(row) {
  return {
    courseId: row.course_id ?? "",
    createdAt: row.created_at,
    date: row.date,
    hours: Number(row.hours),
    id: row.id,
    nextStep: row.next_step ?? "",
    note: row.note ?? "",
    tags: Array.isArray(row.tags) ? row.tags : [],
    topic: row.topic
  };
}

export function mergeLocalAndCloudStudyLogs(localEntries, cloudEntries) {
  return mergeStudyLogEntries(localEntries, cloudEntries);
}

export function toStudyPlanRow(userId, { filters, weeklyHours }) {
  const targetTrack = filters?.track || "all";

  return {
    active_track: targetTrack,
    is_active: true,
    notes: "",
    target_completion_date: null,
    target_track: targetTrack,
    title: "Default study plan",
    updated_at: new Date().toISOString(),
    user_id: userId,
    weekly_hours: Number(weeklyHours) || 8
  };
}

export function toLegacyStudyPlanRow(row) {
  return {
    active_track: row.active_track,
    updated_at: row.updated_at,
    user_id: row.user_id,
    weekly_hours: row.weekly_hours
  };
}

export function fromStudyPlanRow(row) {
  if (!row) return null;

  return {
    targetCompletionDate: row.target_completion_date ?? "",
    targetTrack: row.target_track ?? row.active_track ?? "all",
    title: row.title ?? "Default study plan",
    weeklyHours: Number(row.weekly_hours) || 8
  };
}

export function toProjectProgressRow(userId, progress) {
  return {
    completed: Boolean(progress.completed),
    completed_at: progress.completedAt || null,
    current_step: progress.currentStep ?? "",
    milestone_id: progress.milestoneId || progress.projectId,
    project_id: progress.projectId,
    reflection: progress.reflection ?? "",
    started_at: progress.startedAt || new Date().toISOString(),
    status: progress.status ?? (progress.completed ? "completed" : "in_progress"),
    updated_at: new Date().toISOString(),
    user_id: userId
  };
}

export function fromProjectProgressRow(row) {
  return {
    completed: Boolean(row.completed),
    completedAt: row.completed_at ?? "",
    currentStep: row.current_step ?? "",
    milestoneId: row.milestone_id ?? row.project_id,
    projectId: row.project_id,
    reflection: row.reflection ?? "",
    startedAt: row.started_at ?? "",
    status: row.status ?? "not_started"
  };
}

export function toMilestoneLogRow(userId, log) {
  return {
    blockers: log.blockers ?? "",
    created_at: log.createdAt || new Date().toISOString(),
    id: log.id,
    log_date: log.date,
    milestone_id: log.milestoneId || log.projectId,
    next_step: log.nextStep ?? "",
    note: log.note ?? "",
    project_id: log.projectId,
    updated_at: new Date().toISOString(),
    user_id: userId
  };
}
