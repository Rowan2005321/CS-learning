import { Bookmark, BookmarkCheck, CheckCircle2, Circle, ExternalLink } from "lucide-react";
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

  return (
    <article className={`course-card ${isCompleted ? "is-completed" : ""}`}>
      <div className="course-card-header">
        <span className="course-icon">
          <Icon size={18} aria-hidden="true" />
        </span>
        <div>
          <h3>{course.title[lang]}</h3>
          <p>
            {course.provider} · {course.code}
          </p>
        </div>
      </div>

      <p className="course-desc">{course.description[lang]}</p>

      <dl className="course-details">
        <div>
          <dt>{t.courseAudience}</dt>
          <dd>{course.audience[lang]}</dd>
        </div>
        <div>
          <dt>{t.courseOutcomes}</dt>
          <dd>{course.outcomes[lang]}</dd>
        </div>
        <div>
          <dt>{t.coursePrerequisites}</dt>
          <dd>{course.prerequisites[lang]}</dd>
        </div>
        <div>
          <dt>{t.time}</dt>
          <dd>
            {course.weeks} {lang === "zh" ? "周" : "weeks"} · {course.hoursPerWeek}h/week
          </dd>
        </div>
      </dl>

      <div className="tag-list">
        {course.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
        <span>{course.language}</span>
        <span className={course.isFree ? "price-free" : "price-partial"}>
          {course.isFree ? t.free : t.partialPaid}
        </span>
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
