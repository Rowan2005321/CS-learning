import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  ClipboardList,
  Lock,
  PauseCircle,
  Play,
  Search,
  Send
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  PROJECT_STATUSES,
  getCompletedProjectIds,
  getProgressForProject,
  getProjectStatus
} from "../utils/projectStatus";

function localized(value, lang) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value;
  return value?.[lang] ?? value?.en ?? "";
}

function text(t, key, fallback) {
  return t[key] ?? fallback;
}

function formatList(items = []) {
  return items.filter(Boolean).join(", ");
}

function StatusIcon({ status }) {
  if (status === PROJECT_STATUSES.completed) return <CheckCircle2 size={16} aria-hidden="true" />;
  if (status === PROJECT_STATUSES.submitted) return <Send size={16} aria-hidden="true" />;
  if (status === PROJECT_STATUSES.inProgress) return <CircleDot size={16} aria-hidden="true" />;
  if (status === PROJECT_STATUSES.paused) return <PauseCircle size={16} aria-hidden="true" />;
  if (status === PROJECT_STATUSES.available) return <Play size={16} aria-hidden="true" />;
  return <Lock size={16} aria-hidden="true" />;
}

function ListBlock({ title, items }) {
  if (!items?.length) return null;

  return (
    <div className="project-detail-block">
      <span>{title}</span>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function Field({ id, label, children }) {
  return (
    <label className="project-field" htmlFor={id}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function getSearchText(project, lang, courseLookup) {
  const courseText = [...(project.requiredCourses ?? []), ...(project.recommendedCourses ?? [])]
    .map((courseId) => {
      const course = courseLookup.get(courseId);
      return course
        ? `${course.code ?? ""} ${course.provider ?? ""} ${localized(course.title, lang)} ${localized(course.title, "en")}`
        : courseId;
    })
    .join(" ");

  return [
    localized(project.title, lang),
    localized(project.title, "en"),
    localized(project.subtitle, lang),
    localized(project.description, lang),
    localized(project.description, "en"),
    localized(project.deliverables, lang).join(" "),
    localized(project.deliverables, "en").join(" "),
    project.tags?.join(" "),
    courseText
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function ProjectMilestones({
  auth,
  completedIds = [],
  courses = [],
  lang,
  projectSubmissions = [],
  projectTracks = [],
  projects,
  t,
  userProjectProgress = [],
  onMarkProjectCompleted,
  onStartProject,
  onSubmitProject,
  onUpdateProjectProgress
}) {
  const [activeTrack, setActiveTrack] = useState("all");
  const [query, setQuery] = useState("");
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [progressDrafts, setProgressDrafts] = useState({});
  const [submissionDrafts, setSubmissionDrafts] = useState({});
  const isSignedIn = Boolean(auth?.user);
  const courseLookup = useMemo(
    () => new Map(courses.map((course) => [course.id, course])),
    [courses]
  );
  const projectLookup = useMemo(
    () => new Map(projects.map((project) => [project.id, project])),
    [projects]
  );
  const completedProjectIds = useMemo(
    () => getCompletedProjectIds(userProjectProgress),
    [userProjectProgress]
  );

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects
      .filter((project) => activeTrack === "all" || project.trackIds.includes(activeTrack))
      .filter((project) => {
        if (!normalizedQuery || !isSignedIn) return true;
        return getSearchText(project, lang, courseLookup).includes(normalizedQuery);
      })
      .sort((left, right) => left.order - right.order);
  }, [activeTrack, courseLookup, isSignedIn, lang, projects, query]);

  function courseTitle(courseId) {
    const course = courseLookup.get(courseId);
    if (!course) return courseId;
    return `${course.code ? `${course.code}: ` : ""}${localized(course.title, lang)}`;
  }

  function projectTitle(projectId) {
    const project = projectLookup.get(projectId);
    return project ? localized(project.title, lang) : projectId;
  }

  function updateProgressDraft(projectId, key, value) {
    setProgressDrafts((current) => ({
      ...current,
      [projectId]: {
        ...current[projectId],
        [key]: value
      }
    }));
  }

  function updateSubmissionDraft(projectId, key, value) {
    setSubmissionDrafts((current) => ({
      ...current,
      [projectId]: {
        ...current[projectId],
        [key]: value
      }
    }));
  }

  function getProgressDraft(project) {
    const progress = getProgressForProject(project.id, userProjectProgress) ?? {};
    return {
      blockers: progress.blockers ?? "",
      currentStep: progress.currentStep ?? "",
      nextStep: progress.nextStep ?? "",
      reflection: progress.reflection ?? "",
      ...(progressDrafts[project.id] ?? {})
    };
  }

  function getSubmissionDraft(project) {
    return {
      demoUrl: "",
      description: localized(project.description, lang),
      githubUrl: "",
      reflection: "",
      reviewRequest: "",
      title: localized(project.title, lang),
      visibility: "private",
      ...(submissionDrafts[project.id] ?? {})
    };
  }

  function latestSubmission(projectId) {
    return projectSubmissions
      .filter((submission) => submission.projectId === projectId)
      .sort((left, right) => (right.createdAt ?? "").localeCompare(left.createdAt ?? ""))[0];
  }

  function saveProgress(project) {
    const draft = getProgressDraft(project);
    onUpdateProjectProgress?.(project.id, {
      ...draft,
      status: PROJECT_STATUSES.inProgress
    });
  }

  function submitProject(event, project) {
    event.preventDefault();
    const draft = getSubmissionDraft(project);
    onSubmitProject?.(project.id, draft);
  }

  function renderUnlockRequirements(project, status) {
    const criteria = project.unlockCriteria ?? {};
    const requiredCourses = criteria.requiredCourses ?? [];
    const requiredProjects = criteria.requiredProjects ?? [];
    const items = [
      ...requiredCourses.map((courseId) => courseTitle(courseId)),
      ...requiredProjects.map((projectId) => projectTitle(projectId))
    ];

    if (criteria.minCompletedCourses) {
      items.push(
        `${text(t, "completedCourses", "completed courses")}: ${criteria.minCompletedCourses}`
      );
    }

    if (criteria.minCompletedProjects) {
      items.push(
        `${text(t, "projectCompletedCount", "completed projects")}: ${criteria.minCompletedProjects}`
      );
    }

    if (!items.length)
      return <span>{text(t, "projectNoUnlockRequirements", "No prerequisites")}</span>;

    return (
      <>
        <span>{formatList(items)}</span>
        {status === PROJECT_STATUSES.locked ? (
          <small>
            {text(t, "projectLockedHelp", "Complete prerequisites or projects to unlock.")}
          </small>
        ) : null}
      </>
    );
  }

  return (
    <section className="projects-section" id="projects">
      <div className="section-heading">
        <div>
          <h2>{t.projects}</h2>
          <p>{t.projectMilestonesSubtitle}</p>
        </div>
      </div>

      <div className="project-toolbar">
        <div
          className="project-track-tabs"
          role="list"
          aria-label={text(t, "projectTracks", "Project tracks")}
        >
          <button
            className={activeTrack === "all" ? "is-active" : ""}
            type="button"
            aria-pressed={activeTrack === "all"}
            onClick={() => setActiveTrack("all")}
          >
            {text(t, "allProjectTracks", "All")}
          </button>
          {projectTracks.map((track) => (
            <button
              className={activeTrack === track.id ? "is-active" : ""}
              key={track.id}
              type="button"
              aria-pressed={activeTrack === track.id}
              onClick={() => setActiveTrack(track.id)}
            >
              {localized(track.title, lang)}
            </button>
          ))}
        </div>

        <label className="project-search" htmlFor="project-search-input">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">{text(t, "projectSearch", "Search projects")}</span>
          <input
            id="project-search-input"
            type="search"
            value={query}
            disabled={!isSignedIn}
            placeholder={
              isSignedIn
                ? text(t, "projectSearchPlaceholder", "Search project title, deliverables, tags...")
                : text(t, "loginToSearchProjects", "Sign in to search projects")
            }
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      {!isSignedIn ? (
        <p className="project-auth-note">
          {text(t, "loginToSearchProjects", "Sign in to search projects")}
        </p>
      ) : null}

      <div className="project-strip">
        {visibleProjects.map((project) => {
          const status = getProjectStatus(
            project,
            userProjectProgress,
            completedIds,
            completedProjectIds
          );
          const isExpanded = expandedProjectId === project.id;
          const progressDraft = getProgressDraft(project);
          const submissionDraft = getSubmissionDraft(project);
          const submission = latestSubmission(project.id);

          return (
            <article className={`project-card ${status}`} key={project.id}>
              <div className="project-card-header">
                <span className="project-index">{project.order}</span>
                <span className={`project-status ${status}`}>
                  <StatusIcon status={status} />
                  {t.projectStatusLabels?.[status] ?? status}
                </span>
              </div>

              <div className="project-card-title">
                <h3>{localized(project.title, lang)}</h3>
                <p>{localized(project.subtitle, lang)}</p>
              </div>

              <p>{localized(project.description, lang)}</p>

              <div className="project-track-tags">
                {project.trackIds.map((trackId) => (
                  <span key={trackId}>
                    {localized(projectTracks.find((track) => track.id === trackId)?.title, lang) ||
                      trackId}
                  </span>
                ))}
              </div>

              <div className="project-meta">
                <span>
                  {t.projectDifficulty}:{" "}
                  {t.projectDifficultyLabels?.[project.difficulty] ?? project.difficulty}
                </span>
                <span>
                  {t.projectEstimatedWeeks}: {project.estimatedWeeks}
                </span>
                <span>
                  {text(t, "projectEstimatedHours", "Hours")}: {project.estimatedHours}
                </span>
              </div>

              <div className="project-audience">
                <strong>{t.projectTargetAudience}</strong>
                <span>{localized(project.targetAudience, lang)}</span>
              </div>

              <div className="project-requirements">
                <strong>{text(t, "projectUnlockRequirements", "Unlock requirements")}</strong>
                {renderUnlockRequirements(project, status)}
              </div>

              <div className="project-recommendations">
                <span>{t.projectRecommendedCourses}</span>
                <div>
                  {project.recommendedCourses.map((courseId) => (
                    <code key={courseId}>{courseTitle(courseId)}</code>
                  ))}
                </div>
              </div>

              <ListBlock
                title={t.projectDeliverables}
                items={localized(project.deliverables, lang)}
              />

              <div className="project-actions">
                {status === PROJECT_STATUSES.locked ? (
                  <span className="locked-copy">
                    <Lock size={15} aria-hidden="true" />
                    {text(t, "projectLockedHelp", "Complete prerequisites or projects to unlock.")}
                  </span>
                ) : null}

                {status === PROJECT_STATUSES.available ? (
                  <button
                    className="button primary"
                    type="button"
                    disabled={!isSignedIn}
                    onClick={() => onStartProject?.(project.id)}
                  >
                    <Play size={15} aria-hidden="true" />
                    {text(t, "startProject", "Start project")}
                  </button>
                ) : null}

                {status === PROJECT_STATUSES.inProgress ? (
                  <>
                    <button
                      className="button secondary"
                      type="button"
                      onClick={() => setExpandedProjectId(project.id)}
                    >
                      <ClipboardList size={15} aria-hidden="true" />
                      {text(t, "recordProjectProgress", "Record progress")}
                    </button>
                    <button
                      className="button secondary"
                      type="button"
                      onClick={() => setExpandedProjectId(project.id)}
                    >
                      <Send size={15} aria-hidden="true" />
                      {text(t, "submitProject", "Submit project")}
                    </button>
                    <button
                      className="button secondary"
                      type="button"
                      onClick={() =>
                        onUpdateProjectProgress?.(project.id, { status: PROJECT_STATUSES.paused })
                      }
                    >
                      <PauseCircle size={15} aria-hidden="true" />
                      {text(t, "pauseProject", "Pause")}
                    </button>
                  </>
                ) : null}

                {status === PROJECT_STATUSES.paused ? (
                  <button
                    className="button primary"
                    type="button"
                    onClick={() =>
                      onUpdateProjectProgress?.(project.id, { status: PROJECT_STATUSES.inProgress })
                    }
                  >
                    <Play size={15} aria-hidden="true" />
                    {text(t, "resumeProject", "Resume project")}
                  </button>
                ) : null}

                {status === PROJECT_STATUSES.submitted ? (
                  <button
                    className="button secondary"
                    type="button"
                    onClick={() => setExpandedProjectId(project.id)}
                  >
                    <Send size={15} aria-hidden="true" />
                    {text(t, "viewProjectSubmission", "View submission")}
                  </button>
                ) : null}

                {status === PROJECT_STATUSES.completed ? (
                  <button
                    className="button secondary"
                    type="button"
                    onClick={() => setExpandedProjectId(project.id)}
                  >
                    <CheckCircle2 size={15} aria-hidden="true" />
                    {text(t, "viewProjectRetrospective", "View retrospective")}
                  </button>
                ) : null}

                {status !== PROJECT_STATUSES.locked ? (
                  <button
                    className="small-button"
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedProjectId(isExpanded ? null : project.id)}
                  >
                    {isExpanded ? (
                      <ChevronDown size={15} aria-hidden="true" />
                    ) : (
                      <ChevronRight size={15} aria-hidden="true" />
                    )}
                    {text(t, "projectDetails", "Details")}
                  </button>
                ) : null}
              </div>

              {isExpanded ? (
                <div className="project-expanded">
                  <div className="project-detail-grid">
                    <ListBlock
                      title={text(t, "projectSubmissionRequirements", "Submission requirements")}
                      items={localized(project.submissionRequirements, lang)}
                    />
                    <ListBlock
                      title={text(t, "projectEvaluationRubric", "Evaluation rubric")}
                      items={localized(project.evaluationRubric, lang)}
                    />
                    <ListBlock
                      title={text(t, "projectReviewQuestions", "Review questions")}
                      items={localized(project.reviewQuestions, lang)}
                    />
                    <ListBlock
                      title={text(t, "projectCommonPitfalls", "Common pitfalls")}
                      items={localized(project.commonPitfalls, lang)}
                    />
                    <ListBlock
                      title={text(t, "projectAiWorkflow", "AI-assisted workflow")}
                      items={localized(project.aiAssistedWorkflow, lang)}
                    />
                    <div className="project-portfolio">
                      <strong>{t.projectPortfolioValue}</strong>
                      <span>{localized(project.portfolioValue, lang)}</span>
                    </div>
                  </div>

                  <div className="project-repo">
                    <span>{t.projectGithubRepoSuggestion}</span>
                    <code>{project.githubRepoSuggestion}</code>
                  </div>

                  <p className="project-community">{localized(project.communityCta, lang)}</p>

                  <div className="project-forms">
                    <div className="project-progress-form">
                      <h4>{text(t, "recordProjectProgress", "Record progress")}</h4>
                      <Field
                        id={`${project.id}-current-step`}
                        label={text(t, "projectCurrentStep", "Current step")}
                      >
                        <textarea
                          id={`${project.id}-current-step`}
                          value={progressDraft.currentStep}
                          onChange={(event) =>
                            updateProgressDraft(project.id, "currentStep", event.target.value)
                          }
                        />
                      </Field>
                      <Field
                        id={`${project.id}-reflection`}
                        label={text(t, "projectReflection", "Reflection")}
                      >
                        <textarea
                          id={`${project.id}-reflection`}
                          value={progressDraft.reflection}
                          onChange={(event) =>
                            updateProgressDraft(project.id, "reflection", event.target.value)
                          }
                        />
                      </Field>
                      <Field
                        id={`${project.id}-blockers`}
                        label={text(t, "projectBlockers", "Blockers")}
                      >
                        <textarea
                          id={`${project.id}-blockers`}
                          value={progressDraft.blockers}
                          onChange={(event) =>
                            updateProgressDraft(project.id, "blockers", event.target.value)
                          }
                        />
                      </Field>
                      <Field
                        id={`${project.id}-next-step`}
                        label={text(t, "projectNextStep", "Next step")}
                      >
                        <textarea
                          id={`${project.id}-next-step`}
                          value={progressDraft.nextStep}
                          onChange={(event) =>
                            updateProgressDraft(project.id, "nextStep", event.target.value)
                          }
                        />
                      </Field>
                      <div className="project-form-actions">
                        <button
                          className="button primary"
                          type="button"
                          onClick={() => saveProgress(project)}
                        >
                          {text(t, "saveProjectProgress", "Save progress")}
                        </button>
                        <button
                          className="button secondary"
                          type="button"
                          onClick={() => onMarkProjectCompleted?.(project.id)}
                        >
                          {text(t, "markProjectCompleted", "Mark completed")}
                        </button>
                      </div>
                    </div>

                    <form
                      className="project-submission-form"
                      onSubmit={(event) => submitProject(event, project)}
                    >
                      <h4>{text(t, "submitProject", "Submit project")}</h4>
                      <Field
                        id={`${project.id}-submission-title`}
                        label={text(t, "projectSubmissionTitle", "Submission title")}
                      >
                        <input
                          id={`${project.id}-submission-title`}
                          type="text"
                          value={submissionDraft.title}
                          required
                          onChange={(event) =>
                            updateSubmissionDraft(project.id, "title", event.target.value)
                          }
                        />
                      </Field>
                      <Field
                        id={`${project.id}-github-url`}
                        label={text(t, "projectGithubUrl", "GitHub URL")}
                      >
                        <input
                          id={`${project.id}-github-url`}
                          type="url"
                          value={submissionDraft.githubUrl}
                          placeholder="https://github.com/..."
                          onChange={(event) =>
                            updateSubmissionDraft(project.id, "githubUrl", event.target.value)
                          }
                        />
                      </Field>
                      <Field
                        id={`${project.id}-demo-url`}
                        label={text(t, "projectDemoUrl", "Demo URL")}
                      >
                        <input
                          id={`${project.id}-demo-url`}
                          type="url"
                          value={submissionDraft.demoUrl}
                          placeholder="https://..."
                          onChange={(event) =>
                            updateSubmissionDraft(project.id, "demoUrl", event.target.value)
                          }
                        />
                      </Field>
                      <Field
                        id={`${project.id}-description`}
                        label={text(t, "projectDescription", "Project description")}
                      >
                        <textarea
                          id={`${project.id}-description`}
                          value={submissionDraft.description}
                          required
                          onChange={(event) =>
                            updateSubmissionDraft(project.id, "description", event.target.value)
                          }
                        />
                      </Field>
                      <Field
                        id={`${project.id}-submission-reflection`}
                        label={text(t, "projectReflection", "Reflection")}
                      >
                        <textarea
                          id={`${project.id}-submission-reflection`}
                          value={submissionDraft.reflection}
                          onChange={(event) =>
                            updateSubmissionDraft(project.id, "reflection", event.target.value)
                          }
                        />
                      </Field>
                      <Field
                        id={`${project.id}-review-request`}
                        label={text(t, "projectReviewRequest", "What feedback do you want?")}
                      >
                        <textarea
                          id={`${project.id}-review-request`}
                          value={submissionDraft.reviewRequest}
                          onChange={(event) =>
                            updateSubmissionDraft(project.id, "reviewRequest", event.target.value)
                          }
                        />
                      </Field>
                      <Field
                        id={`${project.id}-visibility`}
                        label={text(t, "projectSubmissionVisibility", "Visibility")}
                      >
                        <select
                          id={`${project.id}-visibility`}
                          value={submissionDraft.visibility}
                          onChange={(event) =>
                            updateSubmissionDraft(project.id, "visibility", event.target.value)
                          }
                        >
                          <option value="private">
                            {text(t, "privateSubmission", "Private submission")}
                          </option>
                          <option value="public">
                            {text(t, "publicSubmission", "Public showcase")}
                          </option>
                        </select>
                      </Field>
                      <button className="button primary" type="submit">
                        <Send size={15} aria-hidden="true" />
                        {text(t, "submitProject", "Submit project")}
                      </button>
                    </form>
                  </div>

                  {submission ? (
                    <div className="project-submission-summary">
                      <strong>{text(t, "latestProjectSubmission", "Latest submission")}</strong>
                      <span>{submission.title}</span>
                      <small>
                        {t.projectStatusLabels?.[submission.status] ?? submission.status}
                      </small>
                      <div>
                        {submission.githubUrl ? (
                          <a href={submission.githubUrl} target="_blank" rel="noreferrer">
                            GitHub
                          </a>
                        ) : null}
                        {submission.demoUrl ? (
                          <a href={submission.demoUrl} target="_blank" rel="noreferrer">
                            Demo
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      {!visibleProjects.length ? (
        <p className="empty-state">
          {text(t, "noProjectResults", "No projects match the current filters.")}
        </p>
      ) : null}
    </section>
  );
}
