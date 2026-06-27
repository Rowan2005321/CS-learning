import { CheckCircle2, Lock } from "lucide-react";

export function ProjectMilestones({ projects, lang, t }) {
  return (
    <section className="projects-section" id="projects">
      <div className="section-heading">
        <h2>{t.projects}</h2>
      </div>
      <div className="project-strip">
        {projects.map((project, index) => (
          <article className={`project-card ${project.status}`} key={project.id}>
            <span>{index + 1}</span>
            <strong>{project.title}</strong>
            <p>{project.desc[lang]}</p>
            {project.status === "locked" ? (
              <Lock size={17} aria-hidden="true" />
            ) : (
              <CheckCircle2 size={17} aria-hidden="true" />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
