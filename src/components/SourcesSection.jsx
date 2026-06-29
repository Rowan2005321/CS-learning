import {
  BadgeCheck,
  BookOpenCheck,
  Compass,
  ExternalLink,
  FileCheck2,
  Globe2,
  GraduationCap,
  Layers3,
  ShieldCheck
} from "lucide-react";
import { lazy, Suspense, useMemo, useState } from "react";

const ThreeAtlasScene = lazy(() =>
  import("./ThreeAtlasScene").then((module) => ({ default: module.ThreeAtlasScene }))
);

const copy = {
  en: {
    eyebrow: "Source atlas",
    title: "Trace every route back to durable, official learning sources",
    subtitle:
      "The source page now uses the same three3.json route map as the homepage, then explains which institutions, course sites, labs, and open resources support each CS learning path.",
    allSources: "All sources",
    showingRoute: "Current lens",
    routeHint: "Click a node in the 3D map to inspect the sources behind that route.",
    sourceCount: "sources",
    courseCount: "courses",
    freeCount: "free courses",
    officialCount: "official or university-backed",
    qualityTitle: "Collection standards",
    qualitySubtitle:
      "A resource is not listed only because it is popular. It should be useful for long-term self-study and transparent enough to verify.",
    sourceMapTitle: "Source coverage by route",
    sourceMapSubtitle:
      "Each card shows how many courses a source contributes to the selected route, plus its dominant source types and representative official link.",
    representativeLink: "Representative link",
    viewLink: "Open representative course",
    freeLabel: "free",
    partialLabel: "partly paid",
    paidLabel: "paid",
    officialBadge: "Official",
    supplementBadge: "Supplement",
    tracksLabel: "Routes",
    sourceTypesLabel: "Source types",
    languagesLabel: "Languages",
    integrityTitle: "Transparency notes",
    integrityText:
      "Open CS Atlas keeps the course catalog in source control. Each course should include provider, official URL, access status, prerequisites, outcomes, and last checked date.",
    emptyRoute: "No sources are attached to this route yet.",
    standards: [
      {
        title: "Prefer official courses",
        body: "University OCW pages, official course sites, and maintained public curricula come first."
      },
      {
        title: "Prefer durable resources",
        body: "Syllabus, lecture notes, assignments, projects, or labs are stronger signals than one-off posts."
      },
      {
        title: "Mark access clearly",
        body: "Free, partly paid, professional, and supplemental resources are separated instead of mixed together."
      },
      {
        title: "Keep context visible",
        body: "Prerequisites, outcomes, language, and last checked date help learners decide whether a course fits."
      }
    ]
  },
  zh: {
    eyebrow: "来源地图",
    title: "把每条学习路线追溯到稳定、官方、可验证的课程来源",
    subtitle:
      "课程来源页现在复用首页同一份 three3.json 路线动画，并解释每个 CS 学习方向背后的大学公开课、官方课程站点、实验资源和开源资料。",
    allSources: "全部来源",
    showingRoute: "当前查看",
    routeHint: "点击 3D 地图里的节点，可以查看该路线背后的课程来源覆盖。",
    sourceCount: "个来源",
    courseCount: "门课程",
    freeCount: "门免费课程",
    officialCount: "个官方或大学背景来源",
    qualityTitle: "收录标准",
    qualitySubtitle:
      "Open CS Atlas 不因为资源热门就直接收录。优先考虑长期自学价值、可访问性、可验证性和清晰的学习产出。",
    sourceMapTitle: "按路线查看来源覆盖",
    sourceMapSubtitle:
      "每张卡片展示某个来源在当前路线里贡献了多少课程、主要来源类型，以及一个代表性官方链接。",
    representativeLink: "代表课程链接",
    viewLink: "打开代表课程",
    freeLabel: "免费",
    partialLabel: "部分付费",
    paidLabel: "付费",
    officialBadge: "官方",
    supplementBadge: "补充",
    tracksLabel: "覆盖路线",
    sourceTypesLabel: "来源类型",
    languagesLabel: "课程语言",
    integrityTitle: "透明说明",
    integrityText:
      "Open CS Atlas 的课程目录保存在源码中。每门课程都应包含 provider、官方链接、访问方式、前置知识、学习产出和最后检查日期。",
    emptyRoute: "当前路线还没有关联来源。",
    standards: [
      {
        title: "优先官方课程",
        body: "大学 OCW、官方课程站点、长期维护的公开课程和教学项目优先。"
      },
      {
        title: "优先长期可用",
        body: "有 syllabus、讲义、作业、项目或实验的资源，比一次性文章更适合自学路线。"
      },
      {
        title: "清楚标注费用",
        body: "免费、部分付费、职业教育和补充资源分开展示，避免混在一起误导学习者。"
      },
      {
        title: "保留学习上下文",
        body: "前置知识、学完能做什么、课程语言和最后检查日期会帮助学习者判断是否适合自己。"
      }
    ]
  }
};

function getText(value, lang) {
  if (!value || typeof value === "string") return value;
  return value[lang] ?? value.en ?? value.zh ?? "";
}

function getSourceTypeLabel(t, sourceType) {
  return t.sourceTypes?.[sourceType] ?? sourceType ?? "course source";
}

function getTrackLabel(t, track) {
  return t.tracks?.[track] ?? track;
}

function formatPrice(course, text) {
  if (course.isFree === true) return text.freeLabel;
  if (course.isFree === "partial") return text.partialLabel;
  return text.paidLabel;
}

function isOfficialCourse(course) {
  const type = course.sourceType ?? "";
  return (
    type.startsWith("official") ||
    Boolean(course.university) ||
    /MIT|Harvard|Stanford|Berkeley|CMU|Princeton|UC San Diego/i.test(course.provider)
  );
}

function summarizeSources(courses, lang, t, text) {
  const sourceMap = new Map();

  for (const course of courses) {
    const key = course.provider;
    if (!key) continue;

    const summary =
      sourceMap.get(key) ??
      {
        provider: key,
        courses: [],
        disciplines: new Set(),
        languages: new Set(),
        sourceTypes: new Map(),
        tracks: new Set()
      };

    summary.courses.push(course);
    if (course.discipline) summary.disciplines.add(course.discipline);
    if (course.language) summary.languages.add(course.language);
    if (course.sourceType) {
      summary.sourceTypes.set(course.sourceType, (summary.sourceTypes.get(course.sourceType) ?? 0) + 1);
    }
    for (const track of course.tracks ?? []) {
      summary.tracks.add(track);
    }

    sourceMap.set(key, summary);
  }

  return [...sourceMap.values()]
    .map((source) => {
      const representative =
        source.courses.find((course) => course.priority === "P0" && course.officialUrl) ??
        source.courses.find((course) => course.officialUrl) ??
        source.courses[0];
      const freeCount = source.courses.filter((course) => course.isFree === true).length;
      const partialCount = source.courses.filter((course) => course.isFree === "partial").length;
      const officialCount = source.courses.filter(isOfficialCourse).length;
      const sourceTypes = [...source.sourceTypes.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([sourceType]) => getSourceTypeLabel(t, sourceType));

      return {
        ...source,
        courseCount: source.courses.length,
        freeCount,
        partialCount,
        officialCount,
        representative,
        representativeTitle: getText(representative?.title, lang),
        sourceTypes,
        trackLabels: [...source.tracks].slice(0, 4).map((track) => getTrackLabel(t, track)),
        languageLabels: [...source.languages],
        priceSummary: [
          freeCount ? `${freeCount} ${text.freeLabel}` : "",
          partialCount ? `${partialCount} ${text.partialLabel}` : ""
        ].filter(Boolean)
      };
    })
    .sort((a, b) => b.courseCount - a.courseCount || a.provider.localeCompare(b.provider));
}

export function SourcesSection({ courses = [], lang, t }) {
  const text = copy[lang] ?? copy.zh;
  const [activeTrack, setActiveTrack] = useState("all");
  const filteredCourses = useMemo(() => {
    if (activeTrack === "all") return courses;
    return courses.filter((course) => course.tracks?.includes(activeTrack));
  }, [activeTrack, courses]);
  const sourceSummaries = useMemo(
    () => summarizeSources(filteredCourses, lang, t, text),
    [filteredCourses, lang, t, text]
  );
  const totalFree = filteredCourses.filter((course) => course.isFree === true).length;
  const officialSources = sourceSummaries.filter((source) => source.officialCount > 0).length;
  const activeTrackLabel =
    activeTrack === "all" ? text.allSources : (t.tracks?.[activeTrack] ?? activeTrack);

  return (
    <section className="sources-section" id="sources">
      <div className="sources-hero">
        <div className="sources-copy">
          <span className="eyebrow">{text.eyebrow}</span>
          <h1>{text.title}</h1>
          <p>{text.subtitle}</p>
          <div className="sources-actions">
            <button
              className={activeTrack === "all" ? "button primary is-selected" : "button secondary"}
              type="button"
              aria-pressed={activeTrack === "all"}
              onClick={() => setActiveTrack("all")}
            >
              <Globe2 size={17} aria-hidden="true" />
              {text.allSources}
            </button>
            <a className="button secondary" href="https://github.com/Rowan2005321/CS-learning">
              <ExternalLink size={17} aria-hidden="true" />
              {t.openGithub}
            </a>
          </div>
        </div>

        <div className="source-atlas-visual">
          <Suspense fallback={<div className="source-atlas-fallback" aria-hidden="true" />}>
            <ThreeAtlasScene lang={lang} activeTrack={activeTrack} onSelectTrack={setActiveTrack} />
          </Suspense>
          <p>{text.routeHint}</p>
        </div>
      </div>

      <div className="source-stats" aria-label={lang === "zh" ? "来源统计" : "Source statistics"}>
        <article>
          <Layers3 size={22} aria-hidden="true" />
          <strong>{sourceSummaries.length}</strong>
          <span>{text.sourceCount}</span>
        </article>
        <article>
          <BookOpenCheck size={22} aria-hidden="true" />
          <strong>{filteredCourses.length}</strong>
          <span>{text.courseCount}</span>
        </article>
        <article>
          <BadgeCheck size={22} aria-hidden="true" />
          <strong>{totalFree}</strong>
          <span>{text.freeCount}</span>
        </article>
        <article>
          <GraduationCap size={22} aria-hidden="true" />
          <strong>{officialSources}</strong>
          <span>{text.officialCount}</span>
        </article>
      </div>

      <div className="source-current-lens">
        <Compass size={19} aria-hidden="true" />
        <span>{text.showingRoute}</span>
        <strong>{activeTrackLabel}</strong>
      </div>

      <div className="source-quality-grid">
        <div className="source-quality-copy">
          <span className="eyebrow">{text.qualityTitle}</span>
          <h2>{text.qualityTitle}</h2>
          <p>{text.qualitySubtitle}</p>
        </div>
        {text.standards.map((standard, index) => {
          const Icon = [GraduationCap, ShieldCheck, BadgeCheck, FileCheck2][index] ?? FileCheck2;
          return (
            <article className="source-standard-card" key={standard.title}>
              <Icon size={22} aria-hidden="true" />
              <h3>{standard.title}</h3>
              <p>{standard.body}</p>
            </article>
          );
        })}
      </div>

      <div className="section-heading source-heading">
        <div>
          <h2>{text.sourceMapTitle}</h2>
          <p>{text.sourceMapSubtitle}</p>
        </div>
      </div>

      {sourceSummaries.length ? (
        <div className="source-card-grid">
          {sourceSummaries.map((source) => (
            <article className="source-card" key={source.provider}>
              <div className="source-card-header">
                <div>
                  <h3>{source.provider}</h3>
                  <p>
                    {source.courseCount} {text.courseCount}
                    {source.priceSummary.length ? ` · ${source.priceSummary.join(" · ")}` : ""}
                  </p>
                </div>
                <span className={source.officialCount ? "source-trust is-official" : "source-trust"}>
                  {source.officialCount ? text.officialBadge : text.supplementBadge}
                </span>
              </div>

              <dl className="source-card-details">
                <div>
                  <dt>{text.representativeLink}</dt>
                  <dd>{source.representativeTitle}</dd>
                </div>
                <div>
                  <dt>{text.sourceTypesLabel}</dt>
                  <dd>
                    {source.sourceTypes.length ? (
                      <span className="source-pill-row">
                        {source.sourceTypes.map((sourceType) => (
                          <span key={sourceType}>{sourceType}</span>
                        ))}
                      </span>
                    ) : (
                      <span className="source-muted">-</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt>{text.tracksLabel}</dt>
                  <dd>
                    <span className="source-pill-row">
                      {source.trackLabels.map((track) => (
                        <span key={track}>{track}</span>
                      ))}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt>{text.languagesLabel}</dt>
                  <dd>{source.languageLabels.join(" / ")}</dd>
                </div>
              </dl>

              <div className="source-card-footer">
                <span>{formatPrice(source.representative, text)}</span>
                {source.representative?.officialUrl ? (
                  <a
                    className="small-button"
                    href={source.representative.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${text.viewLink}: ${source.representativeTitle}`}
                  >
                    <ExternalLink size={15} aria-hidden="true" />
                    {text.viewLink}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="empty-state">{text.emptyRoute}</p>
      )}

      <div className="transparency-panel source-transparency-panel">
        <Globe2 size={24} aria-hidden="true" />
        <div>
          <h3>{text.integrityTitle}</h3>
          <p>{text.integrityText}</p>
          <p>{t.footer}</p>
        </div>
      </div>
    </section>
  );
}
