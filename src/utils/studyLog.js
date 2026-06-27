function toLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function fromDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function roundHours(value) {
  return Math.round(value * 10) / 10;
}

export function todayKey(date = new Date()) {
  return toLocalDateKey(date);
}

export function calculateStudyLogStats(entries, today = new Date()) {
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const validEntries = entries
    .map((entry) => ({
      ...entry,
      hours: Number(entry.hours),
      dateValue: fromDateKey(entry.date)
    }))
    .filter((entry) => entry.dateValue && Number.isFinite(entry.hours) && entry.hours > 0);

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
    loggedDays: loggedDays.size
  };
}
