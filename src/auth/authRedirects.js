export const AUTH_PAGE_IDS = {
  home: "home",
  account: "account",
  courses: "courses",
  studyLog: "study-log",
  tracks: "tracks",
  projects: "projects",
  sources: "sources"
};

const PAGE_SEGMENTS = {
  [AUTH_PAGE_IDS.home]: "",
  [AUTH_PAGE_IDS.account]: "account",
  [AUTH_PAGE_IDS.courses]: "courses",
  [AUTH_PAGE_IDS.studyLog]: "study-log",
  [AUTH_PAGE_IDS.tracks]: "tracks",
  [AUTH_PAGE_IDS.projects]: "projects",
  [AUTH_PAGE_IDS.sources]: "sources"
};

const ALLOWED_REDIRECT_PAGES = new Set([
  AUTH_PAGE_IDS.courses,
  AUTH_PAGE_IDS.studyLog,
  AUTH_PAGE_IDS.projects,
  AUTH_PAGE_IDS.tracks,
  AUTH_PAGE_IDS.sources,
  AUTH_PAGE_IDS.home
]);

function getCurrentUrl(fallbackUrl = "http://localhost:5173/") {
  if (typeof window === "undefined") return new URL(fallbackUrl);
  return new URL(window.location.href);
}

function trimSlashes(value) {
  return String(value ?? "").replace(/^\/+|\/+$/g, "");
}

function pageFromPathname(pathname) {
  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const pathParts = normalizedPath.split("/").filter(Boolean);
  const lastPart = pathParts.at(-1);

  for (const [pageId, segment] of Object.entries(PAGE_SEGMENTS)) {
    if (segment && lastPart === segment) return pageId;
  }

  return AUTH_PAGE_IDS.home;
}

export function isAllowedRedirectPage(pageId) {
  return ALLOWED_REDIRECT_PAGES.has(pageId);
}

export function normalizeRedirectTarget(pageId, fallbackPageId = AUTH_PAGE_IDS.courses) {
  if (!pageId) return fallbackPageId;

  const rawValue = String(pageId).trim();
  if (!rawValue) return fallbackPageId;

  if (isAllowedRedirectPage(rawValue)) return rawValue;

  if (/^https?:\/\//i.test(rawValue)) {
    try {
      const currentUrl = getCurrentUrl();
      const parsedUrl = new URL(rawValue);
      if (parsedUrl.origin !== currentUrl.origin) return fallbackPageId;
      const targetFromUrl = pageFromPathname(parsedUrl.pathname);
      return isAllowedRedirectPage(targetFromUrl) ? targetFromUrl : fallbackPageId;
    } catch {
      return fallbackPageId;
    }
  }

  const compactValue = trimSlashes(rawValue);
  const lastSegment = compactValue.split("/").filter(Boolean).at(-1);

  for (const [knownPageId, segment] of Object.entries(PAGE_SEGMENTS)) {
    if (compactValue === knownPageId || compactValue === segment || lastSegment === segment) {
      return isAllowedRedirectPage(knownPageId) ? knownPageId : fallbackPageId;
    }
  }

  return fallbackPageId;
}

export function getBaseOrigin(currentUrl) {
  return (currentUrl ? new URL(currentUrl) : getCurrentUrl()).origin;
}

export function getAppBasePath(currentUrl) {
  const url = currentUrl ? new URL(currentUrl) : getCurrentUrl();
  const pathParts = url.pathname.split("/").filter(Boolean);
  const pageSegments = new Set(Object.values(PAGE_SEGMENTS).filter(Boolean));

  if (pathParts[0] === "CS-learning") return "/CS-learning/";
  if (pathParts.length > 0 && pageSegments.has(pathParts.at(-1))) return "/";
  return "/";
}

export function buildAuthRedirectUrl(
  pageId = AUTH_PAGE_IDS.courses,
  lang = "zh",
  extraParams = {},
  currentUrl
) {
  const url = currentUrl ? new URL(currentUrl) : getCurrentUrl();
  const targetPageId = normalizeRedirectTarget(pageId, AUTH_PAGE_IDS.courses);
  const segment = PAGE_SEGMENTS[targetPageId] ?? "";
  const basePath = getAppBasePath(url.href);
  const pathname = segment ? `${basePath}${segment}/` : basePath;
  const redirectUrl = new URL(pathname, url.origin);
  const safeLang = lang === "en" ? "en" : "zh";

  redirectUrl.searchParams.set("lang", safeLang);

  for (const [key, value] of Object.entries(extraParams)) {
    if (key === "redirectTo") continue;
    if (value == null || value === "" || value === "all") {
      redirectUrl.searchParams.delete(key);
    } else {
      redirectUrl.searchParams.set(key, String(value));
    }
  }

  return redirectUrl.toString();
}
