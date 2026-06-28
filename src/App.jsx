import { useEffect, useMemo, useState } from "react";
import { Grid2X2, List } from "lucide-react";
import { PAGE_IDS, buildNavLinks, buildPageHref, getLegacyHashTarget, readInitialFilters, readInitialLanguage, writeFiltersToUrl, writeLanguageToUrl } from "./app/navigation";
import { AuthPanel } from "./components/AuthPanel";
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
import { useAuth } from "./hooks/useAuth";
import { useCoursePlannerWorker } from "./hooks/useCoursePlannerWorker";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  loadCourseStateFromCloud,
  loadStudyLogsFromCloud,
  saveCourseStateToCloud,
  saveStudyLogsToCloud
} from "./services/cloudDataService";
import {
  createStudyLogState,
  mergeStudyLogEntries,
  migrateStudyLogState
} from "./utils/studyLog";

function toggleId(list, id) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

function scrollToElement(id) {
  window.requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function scrollToHashTarget(behavior = "auto") {
  if (typeof window === "undefined") return;

  let id = window.location.hash.replace(/^#/, "");
  try {
    id = decodeURIComponent(id);
  } catch {
    // Keep the raw hash when it is not a valid encoded fragment.
  }

  if (!id) return;

  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({ behavior, block: "start" });
}

export function App({ pageId = PAGE_IDS.home }) {
  const auth = useAuth();
  const [lang, setLang] = useLocalStorage("open-cs-atlas-lang", readInitialLanguage());
  const [savedIds, setSavedIds] = useLocalStorage("open-cs-atlas-saved", []);
  const [completedIds, setCompletedIds] = useLocalStorage("open-cs-atlas-completed", []);
  const [weeklyHours, setWeeklyHours] = useLocalStorage("open-cs-atlas-weekly-hours", 8);
  const [viewMode, setViewMode] = useLocalStorage("open-cs-atlas-view-mode", "table");
  const [studyLogState, setStudyLogState] = useLocalStorage(
    "open-cs-atlas-study-logs",
    createStudyLogState()
  );
  const [filters, setFilters] = useState(readInitialFilters);
  const [cloudStatus, setCloudStatus] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const t = labels[lang] ?? labels.zh;
  const navLinks = useMemo(() => buildNavLinks(lang), [lang]);
  const brandHref = useMemo(() => buildPageHref(PAGE_IDS.home, lang), [lang]);
  const { filteredCourses, progress, routeWeeks } = useCoursePlannerWorker({
    courses,
    filters,
    completedIds,
    weeklyHours
  });
  const sources = useMemo(() => [...new Set(courses.map((course) => course.provider))], []);
  const savedSet = useMemo(() => new Set(savedIds), [savedIds]);
  const completedSet = useMemo(() => new Set(completedIds), [completedIds]);
  const normalizedStudyLogState = useMemo(
    () => migrateStudyLogState(studyLogState),
    [studyLogState]
  );
  const studyLogs = normalizedStudyLogState.entries;

  const showHero = pageId === PAGE_IDS.home;
  const showAccount = pageId === PAGE_IDS.account;
  const showRoadmap = pageId === PAGE_IDS.home || pageId === PAGE_IDS.tracks;
  const showCourses = pageId === PAGE_IDS.courses;
  const showStudyLog = pageId === PAGE_IDS.studyLog;
  const showDisciplineMap = pageId === PAGE_IDS.tracks;
  const showProjects = pageId === PAGE_IDS.projects;
  const showSources = pageId === PAGE_IDS.sources;

  useEffect(() => {
    const queryLang = new URLSearchParams(window.location.search).get("lang");
    if ((queryLang === "en" || queryLang === "zh") && queryLang !== lang) {
      setLang(queryLang);
    }
  }, [lang, setLang]);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  useEffect(() => {
    const targetPage = getLegacyHashTarget();
    if (targetPage && targetPage !== pageId) {
      window.location.replace(buildPageHref(targetPage, lang));
      return undefined;
    }

    const scrollAfterRender = () => {
      window.requestAnimationFrame(() => scrollToHashTarget());
    };

    scrollAfterRender();
    window.addEventListener("hashchange", scrollAfterRender);

    return () => window.removeEventListener("hashchange", scrollAfterRender);
  }, [lang, pageId]);

  useEffect(() => {
    window.requestAnimationFrame(() => scrollToHashTarget());
  }, [lang]);

  useEffect(() => {
    if (pageId === PAGE_IDS.courses) {
      writeFiltersToUrl(filters, lang);
    }
  }, [filters, lang, pageId]);

  useEffect(() => {
    if (JSON.stringify(studyLogState) !== JSON.stringify(normalizedStudyLogState)) {
      setStudyLogState(normalizedStudyLogState);
    }
  }, [normalizedStudyLogState, setStudyLogState, studyLogState]);

  function changeLanguage(nextLang) {
    setLang(nextLang);
    writeLanguageToUrl(nextLang);
  }

  function updateFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function navigateToCourses(nextFilters = filters) {
    window.location.assign(
      buildPageHref(PAGE_IDS.courses, lang, {
        q: nextFilters.query,
        discipline: nextFilters.discipline,
        level: nextFilters.level,
        track: nextFilters.track
      })
    );
  }

  function selectTrack(track, discipline = "all") {
    const nextFilters = {
      query: "",
      discipline,
      level: "all",
      track
    };

    setFilters(nextFilters);

    if (pageId === PAGE_IDS.courses) {
      scrollToElement("courses");
    } else {
      navigateToCourses(nextFilters);
    }
  }

  function selectDiscipline(discipline) {
    const nextFilters = {
      ...filters,
      discipline
    };

    setFilters(nextFilters);

    if (pageId === PAGE_IDS.courses) {
      scrollToElement("courses");
    } else {
      navigateToCourses(nextFilters);
    }
  }

  function resumeCurrentRoute() {
    if (pageId === PAGE_IDS.courses) {
      scrollToElement("courses");
    } else {
      navigateToCourses();
    }
  }

  function addStudyLog(entry) {
    setStudyLogState((current) => {
      const migrated = migrateStudyLogState(current);
      return createStudyLogState([entry, ...migrated.entries].slice(0, 1000));
    });
  }

  function deleteStudyLog(id) {
    setStudyLogState((current) => {
      const migrated = migrateStudyLogState(current);
      return createStudyLogState(migrated.entries.filter((entry) => entry.id !== id));
    });
  }

  function importStudyLogs(entries) {
    setStudyLogState((current) => {
      const migrated = migrateStudyLogState(current);
      return createStudyLogState(mergeStudyLogEntries(migrated.entries, entries).slice(0, 1000));
    });
  }

  async function saveLocalDataToCloud() {
    if (!auth.user) return;

    setIsSyncing(true);
    setCloudStatus("");

    try {
      await saveCourseStateToCloud(
        auth.user.id,
        savedIds,
        completedIds,
        courses.map((course) => course.id)
      );
      await saveStudyLogsToCloud(auth.user.id, studyLogs);
      setCloudStatus(t.cloudSaved);
    } catch (error) {
      setCloudStatus(error.message);
    } finally {
      setIsSyncing(false);
    }
  }

  async function loadCloudData() {
    if (!auth.user) return;

    setIsSyncing(true);
    setCloudStatus("");

    try {
      const courseState = await loadCourseStateFromCloud(auth.user.id);
      const cloudLogs = await loadStudyLogsFromCloud(auth.user.id);

      setSavedIds(courseState.savedIds);
      setCompletedIds(courseState.completedIds);
      importStudyLogs(cloudLogs);
      setCloudStatus(t.cloudLoaded);
    } catch (error) {
      setCloudStatus(error.message);
    } finally {
      setIsSyncing(false);
    }
  }

  return (
    <div className="app-shell" data-page={pageId}>
      <Header
        activePage={pageId}
        brandHref={brandHref}
        lang={lang}
        navLinks={navLinks}
        onLanguageChange={changeLanguage}
        t={t}
      />
      <main>
        {showHero ? (
          <Hero activeTrack={filters.track} lang={lang} t={t} onSelectTrack={selectTrack} />
        ) : null}

        {showAccount ? (
          <AuthPanel
            auth={auth}
            cloudStatus={cloudStatus}
            isSyncing={isSyncing}
            t={t}
            onLoadCloudData={loadCloudData}
            onSaveLocalData={saveLocalDataToCloud}
          />
        ) : null}

        {showRoadmap ? (
          <Roadmap
            stages={stages}
            activeTrack={filters.track}
            progress={progress}
            t={t}
            lang={lang}
            onSelectTrack={selectTrack}
            onResumeRoute={resumeCurrentRoute}
          />
        ) : null}

        {showCourses ? (
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
                    onToggleCompleted={(id) =>
                      setCompletedIds((current) => toggleId(current, id))
                    }
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
        ) : null}

        {showStudyLog ? (
          <StudyLogPanel
            logs={studyLogs}
            lang={lang}
            t={t}
            onAddLog={addStudyLog}
            onDeleteLog={deleteStudyLog}
            onImportLogs={importStudyLogs}
          />
        ) : null}

        {showDisciplineMap ? (
          <DisciplineMap
            t={t}
            activeDiscipline={filters.discipline}
            onSelectDiscipline={selectDiscipline}
          />
        ) : null}

        {showProjects ? <ProjectMilestones projects={projects} lang={lang} t={t} /> : null}
        {showSources ? <SourcesSection sources={sources} lang={lang} t={t} /> : null}
      </main>
      <Footer t={t} />
    </div>
  );
}
