export function calculateProgress(courses, completedIds) {
  if (!courses.length) {
    return { completed: 0, total: 0, percent: 0 };
  }

  const completedSet = new Set(completedIds);
  const completed = courses.filter((course) => completedSet.has(course.id)).length;

  return {
    completed,
    total: courses.length,
    percent: Math.round((completed / courses.length) * 100)
  };
}

export function estimateWeeks(courses, weeklyHours) {
  const hours = Number(weeklyHours);
  if (!courses.length || !Number.isFinite(hours) || hours <= 0) return 0;

  const totalHours = courses.reduce((sum, course) => {
    return sum + course.weeks * course.hoursPerWeek;
  }, 0);

  return Math.max(1, Math.ceil(totalHours / hours));
}
