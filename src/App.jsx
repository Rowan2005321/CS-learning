import { useEffect, useMemo, useState } from "react";
import { Grid2X2, List } from "lucide-react";
import {
  PAGE_IDS,
  buildNavLinks,
  buildPageHref,
  getLegacyHashTarget,
  isProtectedPage,
  readInitialFilters,
  readInitialLanguage,
  readRedirectPage,
  writeFiltersToUrl,
  writeLanguageToUrl
} from "./app/navigation";
import { buildAuthRedirectUrl } from "./auth/authRedirects";
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
import { projectTracks, projects } from "./data/projects";
import { stages } from "./data/stages";
import { useAuth } from "./hooks/useAuth";
import { useCoursePlannerWorker } from "./hooks/useCoursePlannerWorker";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  loadCourseStateFromCloud,
  loadProjectProgressFromCloud,
  loadProjectSubmissionsFromCloud,
  loadStudyPlanFromCloud,
  loadStudyLogsFromCloud,
  saveCourseStateToCloud,
  saveProjectProgressToCloud,
  saveProjectSubmissionToCloud,
  saveStudyPlanToCloud,
  saveStudyLogsToCloud
} from "./services/cloudDataService";
import { createStudyLogState, mergeStudyLogEntries, migrateStudyLogState } from "./utils/studyLog";
import { PROJECT_STATUSES } from "./utils/projectStatus";

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

function createClientId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function App({ pageId = PAGE_IDS.home }) {
  const [lang, setLang] = useLocalStorage("open-cs-atlas-lang", readInitialLanguage());
  const auth = useAuth(lang);
  const [savedIds, setSavedIds] = useLocalStorage("open-cs-atlas-saved", []);
  const [completedIds, setCompletedIds] = useLocalStorage("open-cs-atlas-completed", []);
  const [weeklyHours, setWeeklyHours] = useLocalStorage("open-cs-atlas-weekly-hours", 8);
  const [viewMode, setViewMode] = useLocalStorage("open-cs-atlas-view-mode", "table");
  const [userProjectProgress, setUserProjectProgress] = useLocalStorage(
    "open-cs-atlas-project-progress",
    []
  );
  const [projectSubmissions, setProjectSubmissions] = useLocalStorage(
    "open-cs-atlas-project-submissions",
    []
  );
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
  const accountRedirectPage = showAccount ? readRedirectPage(PAGE_IDS.courses) : PAGE_IDS.studyLog;
  const authSuccessPage = accountRedirectPage ?? PAGE_IDS.studyLog;
  const authSuccessHref = buildPageHref(authSuccessPage, lang);
  const authSuccessUrl = buildAuthRedirectUrl(authSuccessPage, lang);
  const shouldBlockForMissingAuthConfig = isProtectedPage(pageId) && !auth.isConfigured;
  const shouldBlockForSignIn = isProtectedPage(pageId) && auth.isConfigured && !auth.user;
  const shouldBlockProtectedPage = shouldBlockForMissingAuthConfig || shouldBlockForSignIn;

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
    if (!isProtectedPage(pageId) || !auth.isConfigured || auth.isLoading || auth.user) return;

    window.location.replace(
      buildPageHref(PAGE_IDS.account, lang, {
        redirectTo: pageId
      })
    );
  }, [auth.isConfigured, auth.isLoading, auth.user, lang, pageId]);

  useEffect(() => {
    if (pageId !== PAGE_IDS.account || auth.isLoading || !auth.user) return;

    const redirectPage = readRedirectPage(null);
    if (!redirectPage) return;

    window.location.replace(buildPageHref(redirectPage, lang));
  }, [auth.isLoading, auth.user, lang, pageId]);

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

  function handleAuthSuccess() {
    window.location.replace(authSuccessHref);
  }

  function redirectToAccount(targetPageId = pageId) {
    window.location.assign(
      buildPageHref(PAGE_IDS.account, lang, {
        redirectTo: targetPageId
      })
    );
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

  async function persistProjectProgress(nextProgress) {
    if (!auth.user) return;

    try {
      await saveProjectProgressToCloud(auth.user.id, nextProgress);
    } catch (error) {
      setCloudStatus(error.message);
    }
  }

  async function updateProjectProgress(projectId, updates) {
    if (!auth.user) {
      redirectToAccount(PAGE_IDS.projects);
      return;
    }

    const now = new Date().toISOString();
    const existing = userProjectProgress.find((entry) => entry.projectId === projectId);
    const status = updates.status ?? existing?.status ?? PROJECT_STATUSES.inProgress;
    const nextEntry = {
      blockers: existing?.blockers ?? "",
      completed: existing?.completed ?? false,
      completedAt: existing?.completedAt ?? "",
      currentStep: existing?.currentStep ?? "",
      milestoneId: projectId,
      nextStep: existing?.nextStep ?? "",
      projectId,
      reflection: existing?.reflection ?? "",
      startedAt: existing?.startedAt || now,
      submittedAt: existing?.submittedAt ?? "",
      ...updates,
      status,
      updatedAt: now
    };

    if (status === PROJECT_STATUSES.submitted && !nextEntry.submittedAt) {
      nextEntry.submittedAt = now;
    }

    if (status === PROJECT_STATUSES.completed) {
      nextEntry.completed = true;
      nextEntry.completedAt = nextEntry.completedAt || now;
    }

    const nextProgress = existing
      ? userProjectProgress.map((entry) => (entry.projectId === projectId ? nextEntry : entry))
      : [...userProjectProgress, nextEntry];

    setUserProjectProgress(nextProgress);
    await persistProjectProgress(nextProgress);
  }

  function startProject(projectId) {
    return updateProjectProgress(projectId, {
      status: PROJECT_STATUSES.inProgress
    });
  }

  async function submitProject(projectId, submissionDraft) {
    if (!auth.user) {
      redirectToAccount(PAGE_IDS.projects);
      return;
    }

    const now = new Date().toISOString();
    const submission = {
      createdAt: now,
      demoUrl: submissionDraft.demoUrl ?? "",
      description: submissionDraft.description ?? "",
      githubUrl: submissionDraft.githubUrl ?? "",
      id: createClientId("project-submission"),
      projectId,
      reflection: submissionDraft.reflection ?? "",
      reviewRequest: submissionDraft.reviewRequest ?? "",
      reviewerFeedback: "",
      status: "submitted",
      title: submissionDraft.title,
      updatedAt: now,
      visibility: submissionDraft.visibility ?? "private"
    };

    setProjectSubmissions((current) => [submission, ...current]);

    try {
      const cloudSubmission = await saveProjectSubmissionToCloud(auth.user.id, submission);
      setProjectSubmissions((current) =>
        current.map((entry) => (entry.id === submission.id ? cloudSubmission : entry))
      );
      await updateProjectProgress(projectId, {
        status: PROJECT_STATUSES.submitted,
        submittedAt: now
      });
    } catch (error) {
      setCloudStatus(error.message);
    }
  }

  function markProjectCompleted(projectId) {
    return updateProjectProgress(projectId, {
      completed: true,
      completedAt: new Date().toISOString(),
      status: PROJECT_STATUSES.completed
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
      await saveStudyPlanToCloud(auth.user.id, { filters, weeklyHours });
      await saveStudyLogsToCloud(auth.user.id, studyLogs);
      await saveProjectProgressToCloud(auth.user.id, userProjectProgress);
      for (const submission of projectSubmissions) {
        await saveProjectSubmissionToCloud(auth.user.id, submission);
      }
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
      const cloudPlan = await loadStudyPlanFromCloud(auth.user.id);
      const cloudLogs = await loadStudyLogsFromCloud(auth.user.id);
      const cloudProjectProgress = await loadProjectProgressFromCloud(auth.user.id);
      const cloudProjectSubmissions = await loadProjectSubmissionsFromCloud(auth.user.id);

      setSavedIds(courseState.savedIds);
      setCompletedIds(courseState.completedIds);
      setUserProjectProgress(cloudProjectProgress);
      setProjectSubmissions(cloudProjectSubmissions);
      if (cloudPlan) {
        setWeeklyHours(cloudPlan.weeklyHours);
        setFilters((current) => ({
          ...current,
          track: cloudPlan.targetTrack || current.track
        }));
      }
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
        {shouldBlockForMissingAuthConfig ? (
          <section className="auth-section auth-guard" id={pageId}>
            <div className="auth-copy">
              <span>{t.accountEyebrow}</span>
              <h2>{t.authSystemMissingTitle}</h2>
              <p>{t.authSystemMissingText}</p>
            </div>
          </section>
        ) : null}

        {shouldBlockForSignIn ? (
          <section className="auth-section auth-guard" id={pageId}>
            <div className="auth-copy">
              <span>{t.accountEyebrow}</span>
              <h2>{t.authGuardTitle}</h2>
              <p>{t.authGuardText}</p>
            </div>
            <div className="auth-card">
              <a
                className="button primary"
                href={buildPageHref(PAGE_IDS.account, lang, {
                  redirectTo: pageId
                })}
              >
                {t.signIn} / {t.signUp}
              </a>
            </div>
          </section>
        ) : null}

        {showHero ? (
          <Hero activeTrack={filters.track} lang={lang} t={t} onSelectTrack={selectTrack} />
        ) : null}

        {showAccount ? (
          <AuthPanel
            auth={auth}
            cloudStatus={cloudStatus}
            isSyncing={isSyncing}
            lang={lang}
            oauthRedirectUrl={authSuccessUrl}
            redirectLabel={t.studyLog}
            successHref={authSuccessHref}
            t={t}
            onAuthSuccess={handleAuthSuccess}
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

        {/* Course and project catalogs are still bundled in frontend JS.
            This auth guard protects the UI flow; true catalog secrecy would require moving catalog queries server-side. */}
        {showCourses && !shouldBlockProtectedPage ? (
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
        ) : null}

        {showStudyLog && !shouldBlockProtectedPage ? (
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

        {showProjects && !shouldBlockProtectedPage ? (
          <ProjectMilestones
            auth={auth}
            completedIds={completedIds}
            courses={courses}
            lang={lang}
            projectSubmissions={projectSubmissions}
            projectTracks={projectTracks}
            projects={projects}
            t={t}
            userProjectProgress={userProjectProgress}
            onMarkProjectCompleted={markProjectCompleted}
            onStartProject={startProject}
            onSubmitProject={submitProject}
            onUpdateProjectProgress={updateProjectProgress}
          />
        ) : null}
        {showSources ? <SourcesSection courses={courses} lang={lang} t={t} /> : null}
      </main>
      <Footer t={t} />
    </div>
  );
}
