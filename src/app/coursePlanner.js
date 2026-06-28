import { filterCourses } from "../utils/filterCourses";
import { calculateProgress, estimateWeeks } from "../utils/progress";

export function computeCoursePlanner({ courses, filters, completedIds, weeklyHours }) {
  const filteredCourses = filterCourses(courses, filters);

  return {
    filteredCourses,
    progress: calculateProgress(courses, completedIds),
    routeWeeks: estimateWeeks(filteredCourses, weeklyHours)
  };
}
