import {
  ArrowRight,
  BookmarkCheck,
  CheckCircle2,
  Clock3,
  Compass,
  FolderGit2,
  ListChecks,
  Map,
  TimerReset
} from "lucide-react";
import { formatCourseDuration, localizeField } from "../utils/courseDisplay";
import {
  DashboardMetricCard,
  GlassCard,
  GradientText,
  InteractiveButton,
  LocalStatusBadge,
  RevealSection
} from "./ProductSurface";

const dashboardCopy = {
  en: {
    eyebrow: "Local learning cockpit",
    title: "Turn saved courses into a visible learning system.",
    subtitle:
      "This dashboard reads the browser's local course, route, study-log, and project milestone state. It is a frontend prototype only, with no account or backend dependency.",
    localOnly: "Local browser state",
    noBackend: "No login or backend",
    continueRoute: "Continue current route",
    addStudyLog: "Add study log",
    openProjects: "Review projects",
    progress: "Course progress",
    savedCourses: "Saved courses",
    studyHours: "Study hours",
    projectProgress: "Project milestones",
    activeRoute: "Active route",
    routeHelper: "Saved from route starters and roadmap nodes.",
    nextAction: "Recommended next action",
    nextCourse: "Next course to continue",
    recentStudy: "Recent study notes",
    projectSnapshot: "Project snapshot",
    emptySaved: "No saved courses yet. Start by saving one course from the course page.",
    emptyLogs: "No study logs yet. Add a short daily note to start the review loop.",
    emptyProjects: "No project progress yet. Start one milestone to make portfolio work visible.",
    coursesCompleted: "courses completed",
    coursesSaved: "saved locally",
    hoursLast7: "hours in last 7 days",
    projectsDone: "projects completed",
    estimatedRoute: "Estimated route time",
    noRouteEstimate: "Pick a course route to estimate time.",
    hoursUnit: "h",
    weeksUnit: "weeks",
    openCourse: "Open course",
    viewAllCourses: "View all saved courses",
    portfolioValue: "Portfolio value",
    nextStep: "Next step",
    currentFocus: "Current focus"
  },
  zh: {
    eyebrow: "本地学习驾驶舱",
    title: "把收藏课程、学习记录和项目里程碑连成一条可执行路线。",
    subtitle:
      "这个看板只读取当前浏览器里的本地状态：课程收藏、完成进度、保存路线、学习记录和项目里程碑。当前版本是纯前端原型，不需要账号，也不连接后端。",
    localOnly: "本地浏览器状态",
    noBackend: "无登录 / 无后端",
    continueRoute: "继续当前路线",
    addStudyLog: "添加学习记录",
    openProjects: "复盘项目里程碑",
    progress: "课程进度",
    savedCourses: "已收藏课程",
    studyHours: "学习小时",
    projectProgress: "项目里程碑",
    activeRoute: "当前路线",
    routeHelper: "来自首屏入口和路线图节点的本地保存状态。",
    nextAction: "推荐下一步",
    nextCourse: "下一门建议继续的课程",
    recentStudy: "最近学习记录",
    projectSnapshot: "项目快照",
    emptySaved: "还没有收藏课程。先到课程页保存一门想学的课程。",
    emptyLogs: "还没有学习记录。先写一条今天的学习笔记，复盘闭环就会开始。",
    emptyProjects: "还没有项目进度。先启动一个里程碑，让作品集路径变得可见。",
    coursesCompleted: "门课程已完成",
    coursesSaved: "门已本地收藏",
    hoursLast7: "最近 7 天小时",
    projectsDone: "个项目已完成",
    estimatedRoute: "路线预计时间",
    noRouteEstimate: "选择路线后可估算完成时间。",
    hoursUnit: "小时",
    weeksUnit: "周",
    openCourse: "打开课程",
    viewAllCourses: "查看全部收藏",
    portfolioValue: "作品集价值",
    nextStep: "下一步",
    currentFocus: "当前关注"
  }
};

function formatDate(date, lang) {
  if (!date) return "";
  return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en", {
    month: "short",
    day: "numeric"
  }).format(new Date(date));
}

function formatHours(value, lang) {
  const copy = dashboardCopy[lang] ?? dashboardCopy.zh;
  return `${Number(value || 0).toFixed(value >= 10 ? 0 : 1)} ${copy.hoursUnit}`;
}

function getProjectTitle(project, lang) {
  if (!project) return "";
  return project.title?.[lang] ?? project.title?.en ?? project.id;
}

function getProjectText(value, lang) {
  if (typeof value === "string") return value;
  return value?.[lang] ?? value?.en ?? "";
}

function getLast7DayHours(logs) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - 6);
  start.setHours(0, 0, 0, 0);

  return logs
    .filter((entry) => new Date(entry.date) >= start)
    .reduce((total, entry) => total + Number(entry.hours || 0), 0);
}

export function Dashboard({
  completedIds,
  courses,
  filteredCourses,
  lang,
  links,
  progress,
  projects,
  routeWeeks,
  savedIds,
  savedTracks,
  studyLogs,
  t,
  userProjectProgress,
  weeklyHours
}) {
  const copy = dashboardCopy[lang] ?? dashboardCopy.zh;
  const savedSet = new Set(savedIds);
  const completedSet = new Set(completedIds);
  const savedCourses = courses.filter((course) => savedSet.has(course.id));
  const nextCourse =
    filteredCourses.find((course) => !completedSet.has(course.id)) ??
    courses.find((course) => !completedSet.has(course.id));
  const recentLogs = [...studyLogs]
    .sort((left, right) => `${right.date}`.localeCompare(`${left.date}`))
    .slice(0, 4);
  const completedProjects = userProjectProgress.filter(
    (entry) => entry.completed || entry.status === "completed"
  );
  const lastStartedProject = [...userProjectProgress]
    .filter((entry) => entry.projectId)
    .sort((left, right) => `${right.updatedAt ?? ""}`.localeCompare(`${left.updatedAt ?? ""}`))[0];
  const project = projects.find((item) => item.id === lastStartedProject?.projectId);
  const activeTrack = savedTracks.at(-1) ?? (filteredCourses[0]?.tracks?.[0] || "foundations");
  const routeLabel = t.tracks?.[activeTrack] ?? activeTrack;
  const routeEstimate =
    routeWeeks > 0
      ? `${routeWeeks} ${copy.weeksUnit} · ${weeklyHours} ${copy.hoursUnit}/week`
      : copy.noRouteEstimate;

  return (
    <RevealSection className="dashboard-section" id="dashboard">
      <div className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <span className="eyebrow">{copy.eyebrow}</span>
          <GradientText as="h1">{copy.title}</GradientText>
          <p>{copy.subtitle}</p>
          <div className="dashboard-status-row">
            <LocalStatusBadge tone="success">{copy.localOnly}</LocalStatusBadge>
            <LocalStatusBadge>{copy.noBackend}</LocalStatusBadge>
          </div>
          <div className="dashboard-actions">
            <InteractiveButton as="a" href={links.courses} icon={Compass}>
              {copy.continueRoute}
            </InteractiveButton>
            <InteractiveButton as="a" href={links.studyLog} icon={Clock3} variant="secondary">
              {copy.addStudyLog}
            </InteractiveButton>
            <InteractiveButton as="a" href={links.projects} icon={FolderGit2} variant="ghost">
              {copy.openProjects}
            </InteractiveButton>
          </div>
        </div>

        <GlassCard className="dashboard-route-card">
          <div>
            <span>{copy.activeRoute}</span>
            <strong>{routeLabel}</strong>
            <p>{copy.routeHelper}</p>
          </div>
          <div className="dashboard-route-map">
            <span />
            <span />
            <span />
            <span />
          </div>
          <small>
            {copy.estimatedRoute}: {routeEstimate}
          </small>
        </GlassCard>
      </div>

      <div className="dashboard-metric-grid">
        <DashboardMetricCard
          icon={CheckCircle2}
          label={copy.progress}
          value={`${progress.percent}%`}
          helper={`${progress.completed}/${progress.total} ${copy.coursesCompleted}`}
          tone="teal"
        />
        <DashboardMetricCard
          icon={BookmarkCheck}
          label={copy.savedCourses}
          value={savedCourses.length}
          helper={copy.coursesSaved}
          tone="blue"
        />
        <DashboardMetricCard
          icon={TimerReset}
          label={copy.studyHours}
          value={formatHours(getLast7DayHours(studyLogs), lang)}
          helper={copy.hoursLast7}
          tone="amber"
        />
        <DashboardMetricCard
          icon={ListChecks}
          label={copy.projectProgress}
          value={`${Math.round((completedProjects.length / Math.max(projects.length, 1)) * 100)}%`}
          helper={`${completedProjects.length}/${projects.length} ${copy.projectsDone}`}
          tone="green"
        />
      </div>

      <div className="dashboard-content-grid">
        <GlassCard as="article" className="dashboard-panel dashboard-next-panel">
          <div className="dashboard-panel-heading">
            <span>{copy.nextAction}</span>
            <Map size={18} aria-hidden="true" />
          </div>
          {nextCourse ? (
            <div className="dashboard-next-course">
              <span>{copy.nextCourse}</span>
              <h2>{localizeField(nextCourse.title, lang)}</h2>
              <p>{localizeField(nextCourse.description, lang)}</p>
              <div className="dashboard-chip-row">
                <span>{nextCourse.provider}</span>
                <span>{formatCourseDuration(nextCourse, lang)}</span>
                <span>{t.levels[nextCourse.level] ?? nextCourse.level}</span>
              </div>
              <InteractiveButton as="a" href={nextCourse.officialUrl} variant="secondary">
                {copy.openCourse}
                <ArrowRight size={15} aria-hidden="true" />
              </InteractiveButton>
            </div>
          ) : (
            <p className="empty-state compact">{copy.emptySaved}</p>
          )}
        </GlassCard>

        <GlassCard as="article" className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <span>{copy.savedCourses}</span>
            <a href={links.courses}>{copy.viewAllCourses}</a>
          </div>
          {savedCourses.length ? (
            <ol className="dashboard-list">
              {savedCourses.slice(0, 5).map((course) => (
                <li key={course.id}>
                  <strong>{localizeField(course.title, lang)}</strong>
                  <span>{course.provider}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="empty-state compact">{copy.emptySaved}</p>
          )}
        </GlassCard>

        <GlassCard as="article" className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <span>{copy.recentStudy}</span>
            <a href={links.studyLog}>{copy.addStudyLog}</a>
          </div>
          {recentLogs.length ? (
            <ol className="dashboard-list">
              {recentLogs.map((entry) => (
                <li key={entry.id}>
                  <strong>{entry.topic}</strong>
                  <span>
                    {formatDate(entry.date, lang)} · {formatHours(entry.hours, lang)}
                  </span>
                  {entry.nextStep ? <small>{copy.nextStep}: {entry.nextStep}</small> : null}
                </li>
              ))}
            </ol>
          ) : (
            <p className="empty-state compact">{copy.emptyLogs}</p>
          )}
        </GlassCard>

        <GlassCard as="article" className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <span>{copy.projectSnapshot}</span>
            <a href={links.projects}>{copy.openProjects}</a>
          </div>
          {project ? (
            <div className="dashboard-project-snapshot">
              <h2>{getProjectTitle(project, lang)}</h2>
              <p>{getProjectText(project.description, lang)}</p>
              <div>
                <span>{copy.currentFocus}</span>
                <strong>{lastStartedProject?.currentStep || getProjectText(project.subtitle, lang)}</strong>
              </div>
              <div>
                <span>{copy.portfolioValue}</span>
                <strong>{getProjectText(project.portfolioValue, lang)}</strong>
              </div>
            </div>
          ) : (
            <p className="empty-state compact">{copy.emptyProjects}</p>
          )}
        </GlassCard>
      </div>
    </RevealSection>
  );
}
