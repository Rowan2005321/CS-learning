import { ArrowRight, Play } from "lucide-react";
import { stageIcons } from "./icons";

export function Roadmap({ stages, activeTrack, progress, t, lang, onSelectTrack }) {
  return (
    <section className="path-section" id="path">
      <div className="section-heading compact">
        <div>
          <h2>{t.path}</h2>
          <a href="#tracks">
            {t.full}
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
        <div className="progress-panel" aria-label={t.progress}>
          <span>{t.progress}</span>
          <strong>{progress.percent}%</strong>
          <div className="progress-track" aria-hidden="true">
            <div style={{ width: `${progress.percent}%` }} />
          </div>
          <p>
            {progress.completed}/{progress.total} {t.completedCourses}
          </p>
          <a className="small-button" href="#courses">
            <Play size={14} aria-hidden="true" />
            {t.resume}
          </a>
        </div>
      </div>

      <div className="roadmap-strip">
        {stages.map((stage, index) => {
          const Icon = stageIcons[stage.icon] || stageIcons.compass;
          const isActive = activeTrack === stage.track;

          return (
            <button
              className={`roadmap-node ${isActive ? "is-active" : ""}`}
              key={stage.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelectTrack(stage.track, stage.discipline)}
            >
              <span>{index + 1}</span>
              <Icon size={23} aria-hidden="true" />
              <strong>{t.stageTitles[stage.id]}</strong>
              <small>
                {stage.weeks} {lang === "zh" ? "周" : "weeks"}
              </small>
            </button>
          );
        })}
      </div>
    </section>
  );
}
