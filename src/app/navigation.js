export const PAGE_IDS = {
  home: "home",
  account: "account",
  courses: "courses",
  studyLog: "study-log",
  tracks: "tracks",
  projects: "projects",
  sources: "sources"
};

const PAGE_SEGMENTS = {
  [PAGE_IDS.home]: "",
  [PAGE_IDS.account]: "account",
  [PAGE_IDS.courses]: "courses",
  [PAGE_IDS.studyLog]: "study-log",
  [PAGE_IDS.tracks]: "tracks",
  [PAGE_IDS.projects]: "projects",
  [PAGE_IDS.sources]: "sources"
};

const LEGACY_HASH_PAGES = {
  "#account": PAGE_IDS.account,
  "#courses": PAGE_IDS.courses,
  "#study-log": PAGE_IDS.studyLog,
  "#tracks": PAGE_IDS.tracks,
  "#projects": PAGE_IDS.projects,
  "#sources": PAGE_IDS.sources
};

const FILTER_QUERY_KEYS = ["q", "discipline", "level", "track"];
const REDIRECT_QUERY_KEY = "redirectTo";
export const PROTECTED_PAGE_IDS = new Set([PAGE_IDS.courses, PAGE_IDS.studyLog, PAGE_IDS.projects]);

export function isKnownPageId(pageId) {
  return Object.values(PAGE_IDS).includes(pageId);
}

export function isProtectedPage(pageId) {
  return PROTECTED_PAGE_IDS.has(pageId);
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

export function readRedirectPage(fallbackPageId = PAGE_IDS.studyLog, search) {
  if (search == null && typeof window === "undefined") return fallbackPageId;

  const redirectPageId = new URLSearchParams(search ?? window.location.search).get(
    REDIRECT_QUERY_KEY
  );

  if (!redirectPageId) return fallbackPageId;

  if (isKnownPageId(redirectPageId) && redirectPageId !== PAGE_IDS.account) {
    return redirectPageId;
  }

  return fallbackPageId;
}

export function buildNavLinks(lang) {
  return [
    { pageId: PAGE_IDS.home, href: buildPageHref(PAGE_IDS.home, lang) },
    { pageId: PAGE_IDS.account, href: buildPageHref(PAGE_IDS.account, lang) },
    { pageId: PAGE_IDS.courses, href: buildPageHref(PAGE_IDS.courses, lang) },
    { pageId: PAGE_IDS.studyLog, href: buildPageHref(PAGE_IDS.studyLog, lang) },
    { pageId: PAGE_IDS.tracks, href: buildPageHref(PAGE_IDS.tracks, lang) },
    { pageId: PAGE_IDS.projects, href: buildPageHref(PAGE_IDS.projects, lang) },
    { pageId: PAGE_IDS.sources, href: buildPageHref(PAGE_IDS.sources, lang) }
  ];
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
