import { Bookmark, BookmarkCheck, CheckCircle2, Circle, ExternalLink } from "lucide-react";
import {
  formatCourseDuration,
  getAccessClass,
  getAccessLabel,
  getPriorityLabel,
  getSourceTypeLabel,
  localizeField
} from "../utils/courseDisplay";
import { disciplineIcons } from "./icons";

export function CourseCard({
  course,
  lang,
  t,
  isSaved,
  isCompleted,
  onToggleSaved,
  onToggleCompleted
}) {
  const Icon = disciplineIcons[course.discipline] || disciplineIcons.programming;
  const priorityLabel = getPriorityLabel(course, t);
  const sourceTypeLabel = getSourceTypeLabel(course, t);
  const title = localizeField(course.title, lang);
  const description = localizeField(course.description, lang);
  const audience = localizeField(course.audience, lang);
  const outcomes = localizeField(course.outcomes, lang);
  const prerequisites = localizeField(course.prerequisites, lang);

  return (
    <article className={`course-card ${isCompleted ? "is-completed" : ""}`}>
      {(course.priority || sourceTypeLabel) && (
        <div className="course-meta-row">
          {course.priority && (
            <span className={`priority-badge priority-${course.priority.toLowerCase()}`}>
              {course.priority} · {priorityLabel}
            </span>
          )}
          {sourceTypeLabel && <span className="source-type-badge">{sourceTypeLabel}</span>}
        </div>
      )}

      <div className="course-card-header">
        <span className="course-icon">
          <Icon size={18} aria-hidden="true" />
        </span>
        <div>
          <h3>{title}</h3>
          <p>
            {course.provider}
            {course.university ? ` · ${course.university}` : ""} · {course.code}
          </p>
        </div>
      </div>

      <p className="course-desc">{description}</p>

      <dl className="course-details">
        {course.university && (
          <div>
            <dt>{t.courseUniversity}</dt>
            <dd>{course.university}</dd>
          </div>
        )}
        <div>
          <dt>{t.courseAudience}</dt>
          <dd>{audience}</dd>
        </div>
        <div>
          <dt>{t.courseOutcomes}</dt>
          <dd>{outcomes}</dd>
        </div>
        <div>
          <dt>{t.coursePrerequisites}</dt>
          <dd>{prerequisites}</dd>
        </div>
        <div>
          <dt>{t.time}</dt>
          <dd>{formatCourseDuration(course, lang)}</dd>
        </div>
        {(course.access || sourceTypeLabel) && (
          <div>
            <dt>{t.courseAccess}</dt>
            <dd>
              {getAccessLabel(course, t)}
              {course.access ? ` · ${course.access}` : ""}
              {sourceTypeLabel ? ` · ${sourceTypeLabel}` : ""}
            </dd>
          </div>
        )}
        {course.outputTaskZh && (
          <div>
            <dt>{t.courseOutputTask}</dt>
            <dd>{course.outputTaskZh}</dd>
          </div>
        )}
      </dl>

      <div className="tag-list">
        {course.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
        <span>{course.language}</span>
        <span className={getAccessClass(course)}>{getAccessLabel(course, t)}</span>
      </div>

      <div className="course-actions">
        <button
          type="button"
          className="icon-button labeled"
          aria-label={isSaved ? t.unsaveCourse : t.saveCourse}
          onClick={() => onToggleSaved(course.id)}
        >
          {isSaved ? (
            <BookmarkCheck size={16} aria-hidden="true" />
          ) : (
            <Bookmark size={16} aria-hidden="true" />
          )}
          {isSaved ? t.added : t.saveCourse}
        </button>
        <button
          type="button"
          className="icon-button labeled"
          aria-label={isCompleted ? t.markUndone : t.markDone}
          onClick={() => onToggleCompleted(course.id)}
        >
          {isCompleted ? (
            <CheckCircle2 size={16} aria-hidden="true" />
          ) : (
            <Circle size={16} aria-hidden="true" />
          )}
          {isCompleted ? t.done : t.markDone}
        </button>
        <a
          className="icon-button labeled open-link"
          href={course.officialUrl}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink size={16} aria-hidden="true" />
          {t.officialLink}
        </a>
      </div>
    </article>
  );
}
