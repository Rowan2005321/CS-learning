export const PROJECT_STATUSES = {
  locked: "locked",
  available: "available",
  inProgress: "in_progress",
  submitted: "submitted",
  completed: "completed",
  paused: "paused"
};

const persistedStatuses = new Set([
  PROJECT_STATUSES.inProgress,
  PROJECT_STATUSES.submitted,
  PROJECT_STATUSES.completed,
  PROJECT_STATUSES.paused
]);

function toSet(values = []) {
  return values instanceof Set ? values : new Set(values);
}

export function getProgressForProject(projectId, userProjectProgress = []) {
  if (!projectId) return null;

  if (Array.isArray(userProjectProgress)) {
    return userProjectProgress.find((entry) => entry.projectId === projectId) ?? null;
  }

  return userProjectProgress[projectId] ?? null;
}

export function getCompletedProjectIds(userProjectProgress = []) {
  if (Array.isArray(userProjectProgress)) {
    return userProjectProgress
      .filter((entry) => entry.completed || entry.status === PROJECT_STATUSES.completed)
      .map((entry) => entry.projectId);
  }

  return Object.values(userProjectProgress)
    .filter((entry) => entry.completed || entry.status === PROJECT_STATUSES.completed)
    .map((entry) => entry.projectId);
}

export function isProjectUnlocked(project, completedCourseIds = [], completedProjectIds = []) {
  const criteria = project.unlockCriteria ?? {};
  const completedCourses = toSet(completedCourseIds);
  const completedProjects = toSet(completedProjectIds);
  const requiredCourses = criteria.requiredCourses ?? project.requiredCourses ?? [];
  const requiredProjects = criteria.requiredProjects ?? [];

  const hasRequiredCourses = requiredCourses.every((courseId) => completedCourses.has(courseId));
  const hasRequiredProjects = requiredProjects.every((projectId) =>
    completedProjects.has(projectId)
  );
  const hasEnoughCourses =
    !criteria.minCompletedCourses || completedCourses.size >= criteria.minCompletedCourses;
  const hasEnoughProjects =
    !criteria.minCompletedProjects || completedProjects.size >= criteria.minCompletedProjects;

  return hasRequiredCourses && hasRequiredProjects && hasEnoughCourses && hasEnoughProjects;
}

export function getProjectStatus(
  project,
  userProjectProgress = [],
  completedCourseIds = [],
  completedProjectIds = []
) {
  const progress = getProgressForProject(project.id, userProjectProgress);

  if (progress?.completed || progress?.status === PROJECT_STATUSES.completed) {
    return PROJECT_STATUSES.completed;
  }

  if (persistedStatuses.has(progress?.status)) {
    return progress.status;
  }

  if (!isProjectUnlocked(project, completedCourseIds, completedProjectIds)) {
    return PROJECT_STATUSES.locked;
  }

  return PROJECT_STATUSES.available;
}

export function getNextAvailableProjects(
  projects,
  userProjectProgress = [],
  completedCourseIds = []
) {
  const completedProjectIds = getCompletedProjectIds(userProjectProgress);

  return projects
    .filter(
      (project) =>
        getProjectStatus(project, userProjectProgress, completedCourseIds, completedProjectIds) ===
        PROJECT_STATUSES.available
    )
    .sort((left, right) => left.order - right.order);
}
