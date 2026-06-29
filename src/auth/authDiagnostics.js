import { buildAuthRedirectUrl, getAppBasePath, getBaseOrigin } from "./authRedirects";

function readRuntimeEnv(env) {
  if (env) return env;
  return import.meta.env ?? {};
}

function readCurrentUrl(currentUrl) {
  if (currentUrl) return currentUrl;
  if (typeof window !== "undefined") return window.location.href;
  return "http://localhost:5173/";
}

export function detectCommonConfigProblems(report) {
  const problems = [];

  if (!report.hasSupabaseUrl) problems.push("MISSING_SUPABASE_URL");
  if (!report.hasSupabaseKey) problems.push("MISSING_SUPABASE_PUBLISHABLE_KEY");
  if (report.isConfigured && report.isGithubPages && !report.redirectUrl.includes("/CS-learning/")) {
    problems.push("MISSING_GITHUB_PAGES_BASE_PATH");
  }
  if (report.isProduction && report.redirectUrl.includes("localhost")) {
    problems.push("PRODUCTION_LOCALHOST_REDIRECT");
  }
  if (report.isConfigured && !/\/(courses|study-log|projects)\//.test(report.redirectUrl)) {
    problems.push("MISSING_AUTH_RETURN_PATH");
  }

  return problems;
}

export function getAuthReadinessReport({
  isSupabaseConfigured = false,
  env,
  currentUrl,
  redirectPage = "courses",
  lang = "zh"
} = {}) {
  const runtimeEnv = readRuntimeEnv(env);
  const url = new URL(readCurrentUrl(currentUrl));
  const hasSupabaseUrl = Boolean(runtimeEnv.VITE_SUPABASE_URL);
  const hasSupabaseKey = Boolean(
    runtimeEnv.VITE_SUPABASE_PUBLISHABLE_KEY || runtimeEnv.VITE_SUPABASE_ANON_KEY
  );
  const redirectUrl = buildAuthRedirectUrl(redirectPage, lang, {}, url.href);
  const report = {
    appBasePath: getAppBasePath(url.href),
    currentOrigin: getBaseOrigin(url.href),
    currentUrl: url.href,
    hasSupabaseKey,
    hasSupabaseUrl,
    isConfigured: Boolean(isSupabaseConfigured && hasSupabaseUrl && hasSupabaseKey),
    isGithubPages: url.hostname.endsWith("github.io"),
    isLocalhost: url.hostname === "localhost" || url.hostname === "127.0.0.1",
    isProduction: runtimeEnv.PROD === true || runtimeEnv.MODE === "production",
    redirectUrl
  };

  return {
    ...report,
    problems: detectCommonConfigProblems(report)
  };
}
