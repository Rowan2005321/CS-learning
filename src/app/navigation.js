export const PAGE_IDS = {
  home: "home",
  courses: "courses",
  studyLog: "study-log",
  dashboard: "dashboard",
  tracks: "tracks",
  projects: "projects",
  sources: "sources"
};

const PAGE_SEGMENTS = {
  [PAGE_IDS.home]: "",
  [PAGE_IDS.courses]: "courses",
  [PAGE_IDS.studyLog]: "study-log",
  [PAGE_IDS.dashboard]: "dashboard",
  [PAGE_IDS.tracks]: "tracks",
  [PAGE_IDS.projects]: "projects",
  [PAGE_IDS.sources]: "sources"
};

const PAGE_LABELS = {
  en: {
    [PAGE_IDS.home]: "Roadmap",
    [PAGE_IDS.courses]: "Courses",
    [PAGE_IDS.studyLog]: "Study Log",
    [PAGE_IDS.dashboard]: "Dashboard",
    [PAGE_IDS.tracks]: "Tracks",
    [PAGE_IDS.projects]: "Projects",
    [PAGE_IDS.sources]: "Sources"
  },
  zh: {
    [PAGE_IDS.home]: "路线图",
    [PAGE_IDS.courses]: "课程",
    [PAGE_IDS.studyLog]: "学习记录",
    [PAGE_IDS.dashboard]: "学习看板",
    [PAGE_IDS.tracks]: "方向",
    [PAGE_IDS.projects]: "项目",
    [PAGE_IDS.sources]: "来源"
  }
};

const LEGACY_HASH_PAGES = {
  "#courses": PAGE_IDS.courses,
  "#study-log": PAGE_IDS.studyLog,
  "#dashboard": PAGE_IDS.dashboard,
  "#tracks": PAGE_IDS.tracks,
  "#projects": PAGE_IDS.projects,
  "#sources": PAGE_IDS.sources
};

const FILTER_QUERY_KEYS = ["q", "discipline", "level", "track"];

export function isKnownPageId(pageId) {
  return Object.values(PAGE_IDS).includes(pageId);
}

export function readInitialLanguage() {
  if (typeof window === "undefined") return "zh";

  const queryLang = new URLSearchParams(window.location.search).get("lang");
  return queryLang === "en" || queryLang === "zh" ? queryLang : "zh";
}

export function readInitialFilters() {
  if (typeof window === "undefined") {
    return {
      query: "",
      discipline: "all",
      level: "all",
      track: "all"
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    query: params.get("q") ?? "",
    discipline: params.get("discipline") ?? "all",
    level: params.get("level") ?? "all",
    track: params.get("track") ?? "all"
  };
}

export function getSiteRootPath(pathname = window.location.pathname) {
  const normalizedPath = pathname.endsWith("/")
    ? pathname
    : pathname.replace(/\/index\.html$/, "/");
  const segments = Object.values(PAGE_SEGMENTS).filter(Boolean);

  for (const segment of segments) {
    const suffix = `/${segment}/`;
    if (normalizedPath.endsWith(suffix)) {
      return normalizedPath.slice(0, -segment.length - 1);
    }
  }

  return normalizedPath;
}

export function buildPageHref(pageId, lang, extraParams = {}) {
  if (typeof window === "undefined") return "#";

  const rootPath = getSiteRootPath();
  const segment = PAGE_SEGMENTS[pageId] ?? "";
  const pathname = segment ? `${rootPath}${segment}/` : rootPath;
  const url = new URL(pathname, window.location.origin);

  url.searchParams.set("lang", lang);

  for (const [key, value] of Object.entries(extraParams)) {
    if (value == null || value === "" || value === "all") {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
  }

  return `${url.pathname}${url.search}`;
}

export function buildNavLinks(lang) {
  const labels = PAGE_LABELS[lang] ?? PAGE_LABELS.zh;

  return [
    PAGE_IDS.home,
    PAGE_IDS.courses,
    PAGE_IDS.studyLog,
    PAGE_IDS.dashboard,
    PAGE_IDS.tracks,
    PAGE_IDS.projects,
    PAGE_IDS.sources
  ].map((pageId) => ({
    href: buildPageHref(pageId, lang),
    label: labels[pageId],
    pageId
  }));
}

export function writeLanguageToUrl(nextLang) {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  url.searchParams.set("lang", nextLang);
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

export function writeFiltersToUrl(filters, lang = readInitialLanguage()) {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);

  const queryParams = {
    q: filters.query,
    discipline: filters.discipline,
    level: filters.level,
    track: filters.track
  };

  for (const key of FILTER_QUERY_KEYS) {
    const value = queryParams[key];
    if (value && value !== "all") {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
  }

  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

export function getLegacyHashTarget(hash = window.location.hash) {
  return LEGACY_HASH_PAGES[hash] ?? null;
}
