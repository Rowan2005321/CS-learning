import { CheckCircle2, CircleDot, Lock } from "lucide-react";

function localized(value, lang) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value;
  return value?.[lang] ?? value?.en ?? "";
}

function StatusIcon({ status }) {
  if (status === "completed") return <CheckCircle2 size={17} aria-hidden="true" />;
  if (status === "active") return <CircleDot size={17} aria-hidden="true" />;
  return <Lock size={17} aria-hidden="true" />;
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

export function ProjectMilestones({ projects, lang, t }) {
  return (
    <section className="projects-section" id="projects">
      <div className="section-heading">
        <div>
          <h2>{t.projects}</h2>
          <p>{t.projectMilestonesSubtitle}</p>
        </div>
      </div>
      <div className="project-strip">
        {projects.map((project, index) => {
          const deliverables = localized(project.deliverables, lang);
          const checklist = localized(project.evaluationChecklist, lang);
          const aiTips = localized(project.aiAssistedTips, lang);

          return (
            <article className={`project-card ${project.status}`} key={project.id}>
              <div className="project-card-header">
                <span className="project-index">{index + 1}</span>
                <span className="project-status">
                  <StatusIcon status={project.status} />
                  {t.projectStatusLabels[project.status] ?? project.status}
                </span>
              </div>

              <h3>{localized(project.title, lang)}</h3>
              <p>{localized(project.description, lang)}</p>

              <div className="project-meta">
                <span>{t.projectDifficulty}: {t.projectDifficultyLabels[project.difficulty]}</span>
                <span>{t.projectEstimatedWeeks}: {project.estimatedWeeks}</span>
              </div>

              <div className="project-audience">
                <strong>{t.projectTargetAudience}</strong>
                <span>{localized(project.targetAudience, lang)}</span>
              </div>

              <ListBlock title={t.projectDeliverables} items={deliverables} />
              <ListBlock title={t.projectEvaluationChecklist} items={checklist} />

              <div className="project-portfolio">
                <strong>{t.projectPortfolioValue}</strong>
                <span>{localized(project.portfolioValue, lang)}</span>
              </div>

              <div className="project-recommendations">
                <span>{t.projectRecommendedCourses}</span>
                <div>
                  {project.recommendedCourses.map((courseId) => (
                    <code key={courseId}>{courseId}</code>
                  ))}
                </div>
              </div>

              <div className="project-repo">
                <span>{t.projectGithubRepoSuggestion}</span>
                <code>{project.githubRepoSuggestion}</code>
              </div>

              <ListBlock title={t.projectAiAssistedTips} items={aiTips} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
