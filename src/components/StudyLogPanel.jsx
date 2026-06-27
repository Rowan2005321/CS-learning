import {
  CalendarCheck2,
  Clock3,
  Download,
  Flame,
  NotebookPen,
  Plus,
  Table,
  Trash2,
  Upload
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import {
  buildStudyLogHeatmap,
  calculateStudyLogStats,
  studyLogsToCsv,
  studyLogsToJson,
  todayKey,
  validateStudyLogImport
} from "../utils/studyLog";

function createInitialForm() {
  return {
    date: todayKey(),
    hours: "1",
    topic: "",
    note: "",
    nextStep: ""
  };
}

function formatTemplate(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, value),
    template
  );
}

function downloadTextFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function formatRangeSummary(range, t) {
  return formatTemplate(t.studyLogRangeSummary, {
    hours: range.totalHours,
    days: range.loggedDays,
    average: range.averageHoursPerLoggedDay
  });
}

export function StudyLogPanel({ logs, lang, t, onAddLog, onDeleteLog, onImportLogs }) {
  const [form, setForm] = useState(createInitialForm);
  const [importMessage, setImportMessage] = useState("");
  const [activeHeatmapDate, setActiveHeatmapDate] = useState("");
  const importInputRef = useRef(null);
  const stats = useMemo(() => calculateStudyLogStats(logs), [logs]);
  const heatmap = useMemo(
    () => buildStudyLogHeatmap(logs, { weeks: 12, locale: lang === "zh" ? "zh-CN" : "en-US" }),
    [lang, logs]
  );
  const heatmapDays = useMemo(
    () => heatmap.weeks.flatMap((week) => week.days),
    [heatmap.weeks]
  );
  const activeHeatmapDay =
    heatmapDays.find((day) => day.date === activeHeatmapDate) ??
    heatmapDays.find((day) => day.date === heatmap.today) ??
    heatmapDays.at(-1);
  const weeklyTopics = stats.weeklyReview.topTopics
    .map((topic) => `${topic.topic} (${topic.hours}${t.hoursUnit})`)
    .join(", ");
  const weeklySummary = stats.weeklyReview.entries
    ? formatTemplate(t.weekReviewSummary, {
        hours: stats.weeklyReview.totalHours,
        days: stats.weeklyReview.loggedDays,
        topics: weeklyTopics || t.weekReviewNoFocus
      })
    : t.weekReviewEmpty;
  const recentLogs = useMemo(
    () =>
      [...logs]
        .sort((first, second) => {
          const dateOrder = second.date.localeCompare(first.date);
          return dateOrder || String(second.createdAt).localeCompare(String(first.createdAt));
        })
        .slice(0, 6),
    [logs]
  );

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const hours = Number(form.hours);
    const topic = form.topic.trim();

    if (!form.date || !topic || !Number.isFinite(hours) || hours <= 0) {
      return;
    }

    onAddLog({
      id: `${form.date}-${Date.now()}`,
      date: form.date,
      hours,
      topic,
      note: form.note.trim(),
      nextStep: form.nextStep.trim(),
      createdAt: new Date().toISOString()
    });

    setImportMessage("");
    setForm(createInitialForm());
  }

  function handleExportJson() {
    downloadTextFile(
      `open-cs-atlas-study-log-${todayKey()}.json`,
      studyLogsToJson(logs),
      "application/json;charset=utf-8"
    );
  }

  function handleExportCsv() {
    downloadTextFile(
      `open-cs-atlas-study-log-${todayKey()}.csv`,
      studyLogsToCsv(logs),
      "text/csv;charset=utf-8"
    );
  }

  async function handleImportJson(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const result = validateStudyLogImport(text);

      if (!result.ok) {
        setImportMessage(`${t.importJsonFailed}: ${result.errors.join("; ")}`);
        return;
      }

      onImportLogs(result.state.entries);
      setImportMessage(
        formatTemplate(t.importJsonSuccess, { count: result.state.entries.length })
      );
    } catch (error) {
      setImportMessage(`${t.importJsonFailed}: ${error.message}`);
    } finally {
      event.target.value = "";
    }
  }

  return (
    <section className="study-log-section" id="study-log" aria-labelledby="study-log-heading">
      <div className="study-log-intro">
        <div>
          <span className="eyebrow">{t.studyLogEyebrow}</span>
          <h2 id="study-log-heading">{t.studyLog}</h2>
          <p>{t.studyLogSubtitle}</p>
          <div className="study-log-actions" aria-label={t.studyLogDataActions}>
            <button className="button secondary" type="button" onClick={handleExportJson}>
              <Download size={16} aria-hidden="true" />
              {t.exportJson}
            </button>
            <button
              className="button secondary"
              type="button"
              onClick={() => importInputRef.current?.click()}
            >
              <Upload size={16} aria-hidden="true" />
              {t.importJson}
            </button>
            <input
              className="sr-only"
              id="study-log-import-json"
              ref={importInputRef}
              type="file"
              accept="application/json,.json"
              onChange={handleImportJson}
            />
            <button className="button secondary" type="button" onClick={handleExportCsv}>
              <Table size={16} aria-hidden="true" />
              {t.exportCsv}
            </button>
          </div>
          {importMessage && (
            <p className="study-log-import-status" role="status">
              {importMessage}
            </p>
          )}
        </div>
        <div className="study-log-stats" aria-label={t.studyLogStats}>
          <div>
            <Clock3 size={18} aria-hidden="true" />
            <strong>{stats.totalHours}</strong>
            <span>{t.totalStudyHours}</span>
          </div>
          <div>
            <CalendarCheck2 size={18} aria-hidden="true" />
            <strong>{stats.thisWeekHours}</strong>
            <span>{t.thisWeekHours}</span>
          </div>
          <div>
            <Flame size={18} aria-hidden="true" />
            <strong>{stats.streakDays}</strong>
            <span>{t.streakDays}</span>
          </div>
          <div>
            <NotebookPen size={18} aria-hidden="true" />
            <strong>{stats.loggedDays}</strong>
            <span>{t.loggedDays}</span>
          </div>
        </div>
      </div>

      <div className="study-log-review-grid">
        <article>
          <h3>{t.last7Days}</h3>
          <strong>
            {stats.last7Days.totalHours} {t.hoursUnit}
          </strong>
          <p>{formatRangeSummary(stats.last7Days, t)}</p>
        </article>
        <article>
          <h3>{t.last30Days}</h3>
          <strong>
            {stats.last30Days.totalHours} {t.hoursUnit}
          </strong>
          <p>{formatRangeSummary(stats.last30Days, t)}</p>
        </article>
        <article className="weekly-review-card">
          <h3>{t.weeklyReview}</h3>
          <p>{weeklySummary}</p>
          {stats.weeklyReview.nextSteps.length > 0 && (
            <small>
              {t.nextReviewSteps}: {stats.weeklyReview.nextSteps.join(" / ")}
            </small>
          )}
        </article>
      </div>

      <div className="study-log-heatmap" aria-label={t.studyHeatmap}>
        <div className="study-log-list-heading">
          <h3>{t.studyHeatmap}</h3>
          <span>{t.studyHeatmapHint}</span>
        </div>

        <div className="study-calendar-wrap">
          <div className="study-calendar-months" aria-hidden="true">
            <span />
            <div
              className="study-calendar-month-grid"
              style={{ "--calendar-weeks": heatmap.weeks.length }}
            >
              {heatmap.monthLabels.map((month) => (
                <span
                  key={`${month.year}-${month.month}`}
                  style={{ gridColumn: `${month.weekIndex + 1}` }}
                >
                  {month.label}
                </span>
              ))}
            </div>
          </div>

          <div className="study-calendar-body">
            <div className="study-calendar-weekdays" aria-hidden="true">
              {heatmap.weekdayLabels.map((day) => (
                <span key={day.index}>{day.show ? day.label : ""}</span>
              ))}
            </div>
            <div className="study-calendar-grid" style={{ "--calendar-weeks": heatmap.weeks.length }}>
              {heatmap.weeks.map((week) => (
                <div className="study-calendar-week" key={week.weekStart}>
                  {week.days.map((day) => {
                    const topics = day.topics.length ? day.topics.join(", ") : t.noHeatmapTopics;
                    const ariaLabel = formatTemplate(t.heatmapDayAria, {
                      date: day.date,
                      hours: day.hours,
                      entries: day.entries,
                      topics
                    });

                    return (
                      <button
                        className={`heatmap-day heatmap-level-${day.level} ${
                          activeHeatmapDay?.date === day.date ? "is-active" : ""
                        } ${day.isFuture ? "is-future" : ""}`}
                        key={day.date}
                        type="button"
                        aria-label={ariaLabel}
                        title={ariaLabel}
                        onClick={() => setActiveHeatmapDate(day.date)}
                        onFocus={() => setActiveHeatmapDate(day.date)}
                        onMouseEnter={() => setActiveHeatmapDate(day.date)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="study-heatmap-detail" aria-live="polite">
          <div>
            <span>{t.heatmapSelectedDay}</span>
            <strong>{activeHeatmapDay?.date}</strong>
          </div>
          <div>
            <span>{t.logHours}</span>
            <strong>
              {activeHeatmapDay?.hours ?? 0} {t.hoursUnit}
            </strong>
          </div>
          <div>
            <span>{t.heatmapEntries}</span>
            <strong>{activeHeatmapDay?.entries ?? 0}</strong>
          </div>
          <p>
            <strong>{t.heatmapTopics}:</strong>{" "}
            {activeHeatmapDay?.topics?.length ? activeHeatmapDay.topics.join(", ") : t.noHeatmapTopics}
          </p>
        </div>

        <div className="study-heatmap-legend" aria-label={t.heatmapLegend}>
          <span>{t.heatmapLess}</span>
          {heatmap.legend.map((item) => (
            <span className="legend-item" key={item.level}>
              <span className={`heatmap-day heatmap-level-${item.level}`} aria-hidden="true" />
              <span>{t.heatmapLegendLevels[item.key] ?? item.label}</span>
            </span>
          ))}
          <span>{t.heatmapMore}</span>
        </div>
      </div>

      <div className="study-log-grid">
        <form className="study-log-form" onSubmit={handleSubmit}>
          <label htmlFor="study-log-date">
            <span>{t.logDate}</span>
            <input
              id="study-log-date"
              type="date"
              value={form.date}
              onChange={(event) => updateField("date", event.target.value)}
              required
            />
          </label>

          <label htmlFor="study-log-hours">
            <span>{t.logHours}</span>
            <input
              id="study-log-hours"
              type="number"
              min="0.25"
              max="24"
              step="0.25"
              value={form.hours}
              onChange={(event) => updateField("hours", event.target.value)}
              required
            />
          </label>

          <label className="span-two" htmlFor="study-log-topic">
            <span>{t.logTopic}</span>
            <input
              id="study-log-topic"
              value={form.topic}
              onChange={(event) => updateField("topic", event.target.value)}
              placeholder={t.logTopicPlaceholder}
              required
            />
          </label>

          <label className="span-two" htmlFor="study-log-note">
            <span>{t.logNote}</span>
            <textarea
              id="study-log-note"
              value={form.note}
              onChange={(event) => updateField("note", event.target.value)}
              placeholder={t.logNotePlaceholder}
              rows="3"
            />
          </label>

          <label className="span-two" htmlFor="study-log-next">
            <span>{t.logNextStep}</span>
            <input
              id="study-log-next"
              value={form.nextStep}
              onChange={(event) => updateField("nextStep", event.target.value)}
              placeholder={t.logNextStepPlaceholder}
            />
          </label>

          <button className="button primary span-two" type="submit">
            <Plus size={17} aria-hidden="true" />
            {t.addLog}
          </button>
        </form>

        <div className="study-log-list" aria-label={t.recentLogs}>
          <div className="study-log-list-heading">
            <h3>{t.recentLogs}</h3>
            <span>{t.studyLogStorageNote}</span>
          </div>

          {recentLogs.length ? (
            <ol>
              {recentLogs.map((entry) => (
                <li key={entry.id}>
                  <div>
                    <time dateTime={entry.date}>{entry.date}</time>
                    <strong>
                      {entry.hours} {t.hoursUnit}
                    </strong>
                  </div>
                  <h4>{entry.topic}</h4>
                  {entry.note && <p>{entry.note}</p>}
                  {entry.nextStep && <small>{entry.nextStep}</small>}
                  <button
                    className="icon-button"
                    type="button"
                    aria-label={`${t.deleteLog}: ${entry.topic}`}
                    onClick={() => onDeleteLog(entry.id)}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p className="empty-state compact">{t.noStudyLogs}</p>
          )}
        </div>
      </div>
    </section>
  );
}
