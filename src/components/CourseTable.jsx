import { Bookmark, BookmarkCheck, CheckCircle2, Circle, ExternalLink } from "lucide-react";
import {
  formatCourseDuration,
  getAccessClass,
  getAccessLabel,
  getPriorityLabel,
  getSourceTypeLabel,
  localizeField
} from "../utils/courseDisplay";
import { CourseCard } from "./CourseCard";
import { disciplineIcons } from "./icons";

export function CourseTable({
  courses,
  lang,
  t,
  savedIds,
  completedIds,
  onToggleSaved,
  onToggleCompleted
}) {
  const savedSet = new Set(savedIds);
  const completedSet = new Set(completedIds);

  return (
    <>
      <div className="course-table-wrap">
        <table className="course-table">
          <caption>{t.courses}</caption>
          <thead>
            <tr>
              <th>{lang === "zh" ? "课程" : "Course"}</th>
              <th>{t.source}</th>
              <th>{t.level}</th>
              <th>{t.time}</th>
              <th>{t.track}</th>
              <th>{t.added}</th>
              <th>{t.done}</th>
              <th>{t.action}</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => {
              const Icon = disciplineIcons[course.discipline] || disciplineIcons.programming;
              const isSaved = savedSet.has(course.id);
              const isCompleted = completedSet.has(course.id);
              const priorityLabel = getPriorityLabel(course, t);
              const sourceTypeLabel = getSourceTypeLabel(course, t);

              return (
                <tr key={course.id} className={isCompleted ? "is-completed" : ""}>
                  <td>
                    <div className="course-name">
                      <span>
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <strong>{localizeField(course.title, lang)}</strong>
                        {course.priority && (
                          <span
                            className={`priority-badge priority-${course.priority.toLowerCase()}`}
                          >
                            {course.priority} · {priorityLabel}
                          </span>
                        )}
                        <p>{localizeField(course.description, lang)}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href={course.officialUrl} target="_blank" rel="noreferrer">
                      {course.provider}
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                    {course.university && (
                      <small className="source-type-inline">{course.university}</small>
                    )}
                    {sourceTypeLabel && (
                      <small className="source-type-inline">{sourceTypeLabel}</small>
                    )}
                  </td>
                  <td>{t.levels[course.level] ?? course.level}</td>
                  <td>
                    {formatCourseDuration(course, lang)}
                    <span className={`access-inline ${getAccessClass(course)}`}>
                      {getAccessLabel(course, t)}
                    </span>
                  </td>
                  <td>
                    <div className="mini-tags">
                      {course.tracks.map((track) => (
                        <span key={track}>{t.tracks[track]}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <button
                      className="icon-button"
                      type="button"
                      aria-label={isSaved ? t.unsaveCourse : t.saveCourse}
                      onClick={() => onToggleSaved(course.id)}
                    >
                      {isSaved ? (
                        <BookmarkCheck size={17} aria-hidden="true" />
                      ) : (
                        <Bookmark size={17} aria-hidden="true" />
                      )}
                    </button>
                  </td>
                  <td>
                    <button
                      className="icon-button"
                      type="button"
                      aria-label={isCompleted ? t.markUndone : t.markDone}
                      onClick={() => onToggleCompleted(course.id)}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={17} aria-hidden="true" />
                      ) : (
                        <Circle size={17} aria-hidden="true" />
                      )}
                    </button>
                  </td>
                  <td>
                    <a
                      className="open-link"
                      href={course.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t.officialLink}
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mobile-course-cards">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            lang={lang}
            t={t}
            isSaved={savedSet.has(course.id)}
            isCompleted={completedSet.has(course.id)}
            onToggleSaved={onToggleSaved}
            onToggleCompleted={onToggleCompleted}
          />
        ))}
      </div>
    </>
  );
}
