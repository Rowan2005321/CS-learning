export const STUDY_LOG_STORAGE_VERSION = 1;

export const STUDY_LOG_HEATMAP_LEGEND = [
  { level: 0, key: "zero", label: "0h", minHours: 0, maxHours: 0 },
  { level: 1, key: "low", label: "0-1h", minHours: 0, maxHours: 1 },
  { level: 2, key: "medium", label: "1-2h", minHours: 1, maxHours: 2 },
  { level: 3, key: "high", label: "2-4h", minHours: 2, maxHours: 4 },
  { level: 4, key: "deep", label: "4h+", minHours: 4, maxHours: null }
];

function toLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function fromDateKey(dateKey) {
  if (typeof dateKey !== "string") return null;

  const [year, month, day] = dateKey.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  return toLocalDateKey(date) === dateKey ? date : null;
}

function roundHours(value) {
  return Math.round(value * 10) / 10;
}

function cleanText(value) {
  return String(value ?? "").trim();
}

function fallbackCreatedAt(dateKey) {
  return fromDateKey(dateKey) ? `${dateKey}T00:00:00.000Z` : new Date(0).toISOString();
}

function normalizeEntry(entry, index = 0) {
  if (!entry || typeof entry !== "object") return null;

  const date = cleanText(entry.date);
  const dateValue = fromDateKey(date);
  const hours = Number(entry.hours);
  const topic = cleanText(entry.topic);

  if (!dateValue || !Number.isFinite(hours) || hours <= 0 || hours > 24 || !topic) {
    return null;
  }

  return {
    id: cleanText(entry.id) || `${date}-${index + 1}`,
    date,
    hours: roundHours(hours),
    topic,
    note: cleanText(entry.note),
    nextStep: cleanText(entry.nextStep),
    createdAt: cleanText(entry.createdAt) || fallbackCreatedAt(date)
  };
}

function sortEntries(entries) {
  return [...entries].sort((first, second) => {
    const dateOrder = second.date.localeCompare(first.date);
    return dateOrder || String(second.createdAt).localeCompare(String(first.createdAt));
  });
}

function getValidEntries(entries) {
  if (!Array.isArray(entries)) return [];

  return sortEntries(entries.map((entry, index) => normalizeEntry(entry, index)).filter(Boolean));
}

function entriesBetween(entries, startDate, endDate) {
  return getValidEntries(entries).filter((entry) => {
    const date = fromDateKey(entry.date);
    return date && date >= startDate && date <= endDate;
  });
}

function aggregateTopics(entries) {
  const topicHours = new Map();

  for (const entry of entries) {
    topicHours.set(entry.topic, roundHours((topicHours.get(entry.topic) ?? 0) + entry.hours));
  }

  return [...topicHours.entries()]
    .map(([topic, hours]) => ({ topic, hours }))
    .sort((first, second) => second.hours - first.hours || first.topic.localeCompare(second.topic));
}

function startOfWeek(date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const mondayOffset = start.getDay() === 0 ? 6 : start.getDay() - 1;
  start.setDate(start.getDate() - mondayOffset);

  return start;
}

function getHeatmapLevel(hours) {
  if (hours <= 0) return 0;
  if (hours <= 1) return 1;
  if (hours <= 2) return 2;
  if (hours < 4) return 3;
  return 4;
}

function formatMonthLabel(date, locale) {
  return new Intl.DateTimeFormat(locale, { month: "short" }).format(date);
}

function formatWeekdayLabel(dayIndex, locale) {
  const monday = new Date(2026, 0, 5);
  monday.setDate(monday.getDate() + dayIndex);

  return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(monday);
}

export function todayKey(date = new Date()) {
  return toLocalDateKey(date);
}

export function createStudyLogState(entries = []) {
  return {
    version: STUDY_LOG_STORAGE_VERSION,
    entries: getValidEntries(entries)
  };
}

export function migrateStudyLogState(value) {
  if (Array.isArray(value)) {
    return createStudyLogState(value);
  }

  if (value && typeof value === "object" && Array.isArray(value.entries)) {
    return createStudyLogState(value.entries);
  }

  if (value && typeof value === "object" && Array.isArray(value.logs)) {
    return createStudyLogState(value.logs);
  }

  return createStudyLogState();
}

export function mergeStudyLogEntries(currentEntries, incomingEntries) {
  const mergedById = new Map();

  for (const entry of getValidEntries(currentEntries)) {
    mergedById.set(entry.id, entry);
  }

  for (const entry of getValidEntries(incomingEntries)) {
    mergedById.set(entry.id, entry);
  }

  return sortEntries([...mergedById.values()]);
}

export function validateStudyLogImport(input) {
  let parsed = input;

  if (typeof input === "string") {
    try {
      parsed = JSON.parse(input);
    } catch {
      return {
        ok: false,
        errors: ["Invalid JSON"],
        state: createStudyLogState()
      };
    }
  }

  const hasEntryCollection =
    Array.isArray(parsed) ||
    (parsed && typeof parsed === "object" && (Array.isArray(parsed.entries) || Array.isArray(parsed.logs)));

  if (!hasEntryCollection) {
    return {
      ok: false,
      errors: ["JSON must be an array or an object with an entries array"],
      state: createStudyLogState()
    };
  }

  const rawEntries = Array.isArray(parsed) ? parsed : parsed.entries ?? parsed.logs;
  const state = migrateStudyLogState(parsed);

  if (rawEntries.length > 0 && state.entries.length === 0) {
    return {
      ok: false,
      errors: ["No valid study log entries found"],
      state
    };
  }

  return {
    ok: true,
    errors: [],
    state
  };
}

export function createStudyLogExport(entries, exportedAt = new Date()) {
  return {
    version: STUDY_LOG_STORAGE_VERSION,
    exportedAt: exportedAt.toISOString(),
    entries: getValidEntries(entries)
  };
}

export function studyLogsToJson(entries) {
  return JSON.stringify(createStudyLogExport(entries), null, 2);
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function studyLogsToCsv(entries) {
  const headers = ["date", "hours", "topic", "note", "nextStep", "createdAt"];
  const rows = getValidEntries(entries).map((entry) =>
    headers.map((key) => csvCell(entry[key])).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}

export function calculateStudyLogWindowStats(entries, days, today = new Date()) {
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startDate = new Date(todayDate);
  startDate.setDate(todayDate.getDate() - days + 1);

  const rangeEntries = entriesBetween(entries, startDate, todayDate);
  const totalHours = rangeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const loggedDays = new Set(rangeEntries.map((entry) => entry.date)).size;

  return {
    days,
    totalHours: roundHours(totalHours),
    loggedDays,
    entries: rangeEntries.length,
    averageHoursPerLoggedDay: loggedDays ? roundHours(totalHours / loggedDays) : 0,
    startDate: toLocalDateKey(startDate),
    endDate: toLocalDateKey(todayDate)
  };
}

export function buildWeeklyReview(entries, today = new Date()) {
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const mondayOffset = todayDate.getDay() === 0 ? 6 : todayDate.getDay() - 1;
  const weekStart = new Date(todayDate);
  weekStart.setDate(todayDate.getDate() - mondayOffset);

  const weekEntries = entriesBetween(entries, weekStart, todayDate);
  const totalHours = weekEntries.reduce((sum, entry) => sum + entry.hours, 0);

  return {
    startDate: toLocalDateKey(weekStart),
    endDate: toLocalDateKey(todayDate),
    totalHours: roundHours(totalHours),
    loggedDays: new Set(weekEntries.map((entry) => entry.date)).size,
    entries: weekEntries.length,
    topTopics: aggregateTopics(weekEntries).slice(0, 3),
    nextSteps: weekEntries.map((entry) => entry.nextStep).filter(Boolean).slice(0, 3)
  };
}

export function buildStudyLogHeatmap(entries, options = {}) {
  const {
    weeks: weekCount = 12,
    today = new Date(),
    locale = "en-US"
  } = typeof options === "number" ? { weeks: Math.ceil(options / 7) } : options;
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const currentWeekStart = startOfWeek(todayDate);
  const startDate = new Date(currentWeekStart);
  startDate.setDate(currentWeekStart.getDate() - (weekCount - 1) * 7);
  const endDate = new Date(currentWeekStart);
  endDate.setDate(currentWeekStart.getDate() + 6);

  const entriesByDate = new Map();
  for (const entry of entriesBetween(entries, startDate, todayDate)) {
    const dayEntries = entriesByDate.get(entry.date) ?? [];
    dayEntries.push(entry);
    entriesByDate.set(entry.date, dayEntries);
  }

  const weeks = Array.from({ length: weekCount }, (_, weekIndex) => {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + weekIndex * 7);

    return {
      weekStart: toLocalDateKey(weekStart),
      days: Array.from({ length: 7 }, (_, weekdayIndex) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + weekdayIndex);
        const dateKey = toLocalDateKey(date);
        const dayEntries = entriesByDate.get(dateKey) ?? [];
        const hours = roundHours(dayEntries.reduce((sum, entry) => sum + entry.hours, 0));
        const topics = aggregateTopics(dayEntries).map((topic) => topic.topic);
        const isFuture = date > todayDate;

        return {
          date: dateKey,
          weekday: weekdayIndex + 1,
          hours,
          entries: dayEntries.length,
          topics,
          hasLog: hours > 0,
          isFuture,
          level: isFuture ? 0 : getHeatmapLevel(hours)
        };
      })
    };
  });

  const monthLabels = [];
  let previousMonth = "";
  for (const [weekIndex, week] of weeks.entries()) {
    const firstVisibleDay = week.days.find((day) => !day.isFuture) ?? week.days[0];
    const date = fromDateKey(firstVisibleDay.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

    if (monthKey !== previousMonth) {
      monthLabels.push({
        weekIndex,
        label: formatMonthLabel(date, locale),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      });
      previousMonth = monthKey;
    }
  }

  return {
    startDate: toLocalDateKey(startDate),
    endDate: toLocalDateKey(endDate),
    today: toLocalDateKey(todayDate),
    weeks,
    monthLabels,
    weekdayLabels: Array.from({ length: 7 }, (_, index) => ({
      index,
      label: formatWeekdayLabel(index, locale),
      show: index === 0 || index === 2 || index === 4
    })),
    legend: STUDY_LOG_HEATMAP_LEGEND
  };
}

export function calculateStudyLogStats(entries, today = new Date()) {
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const validEntries = getValidEntries(entries).map((entry) => ({
    ...entry,
    dateValue: fromDateKey(entry.date)
  }));

  const totalHours = validEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const mondayOffset = todayDate.getDay() === 0 ? 6 : todayDate.getDay() - 1;
  const weekStart = new Date(todayDate);
  weekStart.setDate(todayDate.getDate() - mondayOffset);

  const thisWeekHours = validEntries
    .filter((entry) => entry.dateValue >= weekStart && entry.dateValue <= todayDate)
    .reduce((sum, entry) => sum + entry.hours, 0);

  const loggedDays = new Set(validEntries.map((entry) => entry.date));
  const latestLoggedDate = validEntries
    .map((entry) => entry.dateValue)
    .filter((date) => date <= todayDate)
    .sort((a, b) => b - a)[0];

  let streakDays = 0;
  if (latestLoggedDate) {
    const cursor = new Date(latestLoggedDate);

    while (loggedDays.has(toLocalDateKey(cursor))) {
      streakDays += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
  }

  return {
    totalHours: roundHours(totalHours),
    thisWeekHours: roundHours(thisWeekHours),
    streakDays,
    loggedDays: loggedDays.size,
    last7Days: calculateStudyLogWindowStats(validEntries, 7, todayDate),
    last30Days: calculateStudyLogWindowStats(validEntries, 30, todayDate),
    weeklyReview: buildWeeklyReview(validEntries, todayDate)
  };
}
