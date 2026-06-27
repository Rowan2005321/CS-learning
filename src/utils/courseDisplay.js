export function localizeField(value, lang) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value.en ?? value.zh ?? "";
}

export function getAccessLabel(course, t) {
  if (course.isFree === true) return t.free;
  if (course.isFree === "partial") return t.partialPaid;
  return t.paidProfessional ?? t.partialPaid;
}

export function getSourceTypeLabel(course, t) {
  if (!course.sourceType) return "";
  return t.sourceTypes?.[course.sourceType] ?? course.sourceType;
}

export function getPriorityLabel(course, t) {
  if (!course.priority) return "";
  return t.priorityLabels?.[course.priority] ?? course.priority;
}

export function getAccessClass(course) {
  if (course.isFree === true) return "price-free";
  if (course.isFree === "partial") return "price-partial";
  return "price-paid";
}

export function formatCourseDuration(course, lang) {
  const weekLabel = lang === "zh" ? "周" : "weeks";
  const weeklyLabel = lang === "zh" ? "小时/周" : "h/week";
  const totalHours = course.estimatedHours ? ` · ${course.estimatedHours}h total` : "";

  return `${course.weeks} ${weekLabel} · ${course.hoursPerWeek}${weeklyLabel}${totalHours}`;
}

export function formatSearchMatch(searchMatch, t) {
  if (!searchMatch) return "";

  const type = t.searchHitTypes?.[searchMatch.field] ?? searchMatch.field;
  const value = searchMatch.value ? ` ${searchMatch.value}` : "";

  return `${t.searchHitPrefix}: ${type}${value}`;
}
