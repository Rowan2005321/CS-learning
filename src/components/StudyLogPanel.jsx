import { CalendarCheck2, Clock3, Flame, NotebookPen, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { calculateStudyLogStats, todayKey } from "../utils/studyLog";

function createInitialForm() {
  return {
    date: todayKey(),
    hours: "1",
    topic: "",
    note: "",
    nextStep: ""
  };
}

export function StudyLogPanel({ logs, t, onAddLog, onDeleteLog }) {
  const [form, setForm] = useState(createInitialForm);
  const stats = useMemo(() => calculateStudyLogStats(logs), [logs]);
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

    setForm(createInitialForm());
  }

  return (
    <section className="study-log-section" id="study-log" aria-labelledby="study-log-heading">
      <div className="study-log-intro">
        <div>
          <span className="eyebrow">{t.studyLogEyebrow}</span>
          <h2 id="study-log-heading">{t.studyLog}</h2>
          <p>{t.studyLogSubtitle}</p>
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
