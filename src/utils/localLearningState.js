const STORAGE_KEYS = {
  favoriteCourses: "open-cs-atlas-saved",
  savedTracks: "open-cs-atlas-saved-tracks",
  completedCourses: "open-cs-atlas-completed",
  completedMilestones: "open-cs-atlas-project-progress",
  recentActivity: "open-cs-atlas-study-logs"
};

function readJson(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (typeof window === "undefined") return value;

  window.localStorage.setItem(key, JSON.stringify(value));
  return value;
}

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function getFavoriteCourses() {
  return readJson(STORAGE_KEYS.favoriteCourses, []);
}

export function toggleFavoriteCourse(courseId) {
  const nextValue = toggleValue(getFavoriteCourses(), courseId);
  return writeJson(STORAGE_KEYS.favoriteCourses, nextValue);
}

export function getCompletedCourses() {
  return readJson(STORAGE_KEYS.completedCourses, []);
}

export function updateCourseProgress(courseId, completed = true) {
  const current = getCompletedCourses();
  const nextValue = completed
    ? Array.from(new Set([...current, courseId]))
    : current.filter((item) => item !== courseId);

  return writeJson(STORAGE_KEYS.completedCourses, nextValue);
}

export function getSavedTracks() {
  return readJson(STORAGE_KEYS.savedTracks, []);
}

export function saveTrack(trackId) {
  if (!trackId || trackId === "all") return getSavedTracks();

  const nextValue = Array.from(new Set([...getSavedTracks(), trackId]));
  return writeJson(STORAGE_KEYS.savedTracks, nextValue);
}

export function toggleMilestoneComplete(milestoneId) {
  const current = readJson(STORAGE_KEYS.completedMilestones, []);
  const existing = current.find((entry) => entry.projectId === milestoneId);
  const now = new Date().toISOString();
  const nextEntry = {
    ...(existing ?? {}),
    completed: !existing?.completed,
    completedAt: existing?.completed ? "" : now,
    milestoneId,
    projectId: milestoneId,
    status: existing?.completed ? "in_progress" : "completed",
    updatedAt: now
  };
  const nextValue = existing
    ? current.map((entry) => (entry.projectId === milestoneId ? nextEntry : entry))
    : [...current, nextEntry];

  return writeJson(STORAGE_KEYS.completedMilestones, nextValue);
}

export function getRecentActivity() {
  return readJson(STORAGE_KEYS.recentActivity, { version: 1, entries: [] }).entries ?? [];
}

export { STORAGE_KEYS };
