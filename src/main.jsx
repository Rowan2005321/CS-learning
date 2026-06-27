import { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Grid2X2, List } from "lucide-react";
import { CourseCard } from "./components/CourseCard";
import { CourseFilters } from "./components/CourseFilters";
import { CourseTable } from "./components/CourseTable";
import { DisciplineMap } from "./components/DisciplineMap";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProjectMilestones } from "./components/ProjectMilestones";
import { Roadmap } from "./components/Roadmap";
import { SourcesSection } from "./components/SourcesSection";
import { StudyLogPanel } from "./components/StudyLogPanel";
import { courses, tracks } from "./data/courses";
import { labels } from "./data/labels";
import { projects } from "./data/projects";
import { stages } from "./data/stages";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { filterCourses } from "./utils/filterCourses";
import { calculateProgress, estimateWeeks } from "./utils/progress";
import "./styles.css";

function toggleId(list, id) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

function scrollToCourses() {
  window.requestAnimationFrame(() => {
    document.querySelector("#courses")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function readInitialLanguage() {
  if (typeof window === "undefined") return "zh";

  const queryLang = new URLSearchParams(window.location.search).get("lang");
  return queryLang === "en" || queryLang === "zh" ? queryLang : "zh";
}

function writeLanguageToUrl(nextLang) {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  url.searchParams.set("lang", nextLang);
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function App() {
  const [lang, setLang] = useLocalStorage("open-cs-atlas-lang", readInitialLanguage());
  const [savedIds, setSavedIds] = useLocalStorage("open-cs-atlas-saved", []);
  const [completedIds, setCompletedIds] = useLocalStorage("open-cs-atlas-completed", []);
  const [weeklyHours, setWeeklyHours] = useLocalStorage("open-cs-atlas-weekly-hours", 8);
  const [viewMode, setViewMode] = useLocalStorage("open-cs-atlas-view-mode", "table");
  const [studyLogs, setStudyLogs] = useLocalStorage("open-cs-atlas-study-logs", []);
  const [filters, setFilters] = useState({
    query: "",
    discipline: "all",
    level: "all",
    track: "all"
  });

  const t = labels[lang] ?? labels.zh;

  useEffect(() => {
    const queryLang = new URLSearchParams(window.location.search).get("lang");
    if ((queryLang === "en" || queryLang === "zh") && queryLang !== lang) {
      setLang(queryLang);
    }
  }, [lang, setLang]);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  function changeLanguage(nextLang) {
    setLang(nextLang);
    writeLanguageToUrl(nextLang);
  }

  const filteredCourses = useMemo(() => filterCourses(courses, filters), [filters]);
  const progress = useMemo(() => calculateProgress(courses, completedIds), [completedIds]);
  const routeWeeks = useMemo(
    () => estimateWeeks(filteredCourses, weeklyHours),
    [filteredCourses, weeklyHours]
  );
  const sources = useMemo(() => [...new Set(courses.map((course) => course.provider))], []);
  const savedSet = useMemo(() => new Set(savedIds), [savedIds]);
  const completedSet = useMemo(() => new Set(completedIds), [completedIds]);

  function updateFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function selectTrack(track, discipline = "all") {
    setFilters({
      query: "",
      discipline,
      level: "all",
      track
    });
    scrollToCourses();
  }

  function selectDiscipline(discipline) {
    setFilters((current) => ({ ...current, discipline }));
    scrollToCourses();
  }

  function addStudyLog(entry) {
    setStudyLogs((current) => [entry, ...current].slice(0, 180));
  }

  function deleteStudyLog(id) {
    setStudyLogs((current) => current.filter((entry) => entry.id !== id));
  }

  return (
    <div className="app-shell">
      <Header lang={lang} onLanguageChange={changeLanguage} t={t} />
      <main>
        <Hero t={t} onSelectTrack={selectTrack} />
        <Roadmap
          stages={stages}
          activeTrack={filters.track}
          progress={progress}
          t={t}
          lang={lang}
          onSelectTrack={selectTrack}
        />

        <section className="courses-section" id="courses">
          <CourseFilters
            filters={filters}
            weeklyHours={weeklyHours}
            estimatedWeeks={routeWeeks}
            trackOptions={tracks}
            t={t}
            onFilterChange={updateFilter}
            onWeeklyHoursChange={setWeeklyHours}
          />

          <div className="courses-main">
            <div className="section-heading">
              <div>
                <h2>{t.courses}</h2>
                <p>
                  {filteredCourses.length} {t.courseCountSuffix}
                </p>
              </div>
              <div className="view-toggle" role="group" aria-label="Course view">
                <button
                  className={viewMode === "table" ? "is-active" : ""}
                  type="button"
                  aria-pressed={viewMode === "table"}
                  onClick={() => setViewMode("table")}
                >
                  <List size={15} aria-hidden="true" />
                  {t.table}
                </button>
                <button
                  className={viewMode === "cards" ? "is-active" : ""}
                  type="button"
                  aria-pressed={viewMode === "cards"}
                  onClick={() => setViewMode("cards")}
                >
                  <Grid2X2 size={15} aria-hidden="true" />
                  {t.cards}
                </button>
              </div>
            </div>

            {filteredCourses.length ? (
              viewMode === "table" ? (
                <CourseTable
                  courses={filteredCourses}
                  lang={lang}
                  t={t}
                  savedIds={savedIds}
                  completedIds={completedIds}
                  onToggleSaved={(id) => setSavedIds((current) => toggleId(current, id))}
                  onToggleCompleted={(id) => setCompletedIds((current) => toggleId(current, id))}
                />
              ) : (
                <div className="course-card-grid">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      lang={lang}
                      t={t}
                      isSaved={savedSet.has(course.id)}
                      isCompleted={completedSet.has(course.id)}
                      onToggleSaved={(id) => setSavedIds((current) => toggleId(current, id))}
                      onToggleCompleted={(id) =>
                        setCompletedIds((current) => toggleId(current, id))
                      }
                    />
                  ))}
                </div>
              )
            ) : (
              <p className="empty-state">{t.noResults}</p>
            )}
          </div>
        </section>

        <StudyLogPanel
          logs={studyLogs}
          t={t}
          onAddLog={addStudyLog}
          onDeleteLog={deleteStudyLog}
        />
        <DisciplineMap
          t={t}
          activeDiscipline={filters.discipline}
          onSelectDiscipline={selectDiscipline}
        />
        <ProjectMilestones projects={projects} lang={lang} t={t} />
        <SourcesSection sources={sources} lang={lang} t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
