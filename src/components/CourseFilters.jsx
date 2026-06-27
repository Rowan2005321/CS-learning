import { Clock, Search } from "lucide-react";

export function CourseFilters({
  filters,
  weeklyHours,
  estimatedWeeks,
  trackOptions,
  t,
  onFilterChange,
  onWeeklyHoursChange
}) {
  const estimateText = estimatedWeeks
    ? t.routeEstimate.replace("{hours}", weeklyHours).replace("{weeks}", estimatedWeeks)
    : t.emptyRouteEstimate;

  return (
    <aside className="filters-panel" aria-label={t.courses}>
      <div className="search-box">
        <Search size={16} aria-hidden="true" />
        <label className="sr-only" htmlFor="course-search">
          {t.search}
        </label>
        <input
          id="course-search"
          value={filters.query}
          onChange={(event) => onFilterChange("query", event.target.value)}
          placeholder={t.search}
        />
      </div>

      <label htmlFor="discipline-filter">
        <span>{t.discipline}</span>
        <select
          id="discipline-filter"
          value={filters.discipline}
          onChange={(event) => onFilterChange("discipline", event.target.value)}
        >
          <option value="all">{t.allDisciplines}</option>
          {Object.entries(t.disciplines).map(([id, text]) => (
            <option key={id} value={id}>
              {text}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="level-filter">
        <span>{t.level}</span>
        <select
          id="level-filter"
          value={filters.level}
          onChange={(event) => onFilterChange("level", event.target.value)}
        >
          <option value="all">{t.allLevels}</option>
          {Object.entries(t.levels).map(([id, text]) => (
            <option key={id} value={id}>
              {text}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="track-filter">
        <span>{t.track}</span>
        <select
          id="track-filter"
          value={filters.track}
          onChange={(event) => onFilterChange("track", event.target.value)}
        >
          <option value="all">{t.allTracks}</option>
          {trackOptions.map((track) => (
            <option key={track} value={track}>
              {t.tracks[track]}
            </option>
          ))}
        </select>
      </label>

      <section className="planner-panel" aria-label={t.planner}>
        <div className="planner-title">
          <Clock size={18} aria-hidden="true" />
          <h3>{t.planner}</h3>
        </div>
        <label htmlFor="weekly-hours">
          <span>{t.weeklyHours}</span>
          <input
            id="weekly-hours"
            type="number"
            min="1"
            max="80"
            value={weeklyHours}
            onChange={(event) => onWeeklyHoursChange(event.target.value)}
          />
        </label>
        <p>{estimateText}</p>
      </section>
    </aside>
  );
}
