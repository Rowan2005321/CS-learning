# Architecture

Open CS Atlas is a static Vite multi-page React application.

## Pages

Each page has its own HTML entry and React mount:

- `index.html` -> `src/main.jsx`
- `account/index.html` -> `src/pages/account.jsx`
- `courses/index.html` -> `src/pages/courses.jsx`
- `study-log/index.html` -> `src/pages/studyLog.jsx`
- `tracks/index.html` -> `src/pages/tracks.jsx`
- `projects/index.html` -> `src/pages/projects.jsx`
- `sources/index.html` -> `src/pages/sources.jsx`

Shared application state and page composition live in `src/App.jsx`.

## Navigation

`src/app/navigation.js` builds GitHub Pages-compatible links from the current site root, so nested pages work under both local Vite paths and the `/CS-learning/` Pages subpath.

Legacy hash links such as `/#courses` and `/#study-log` are redirected to real pages.

`/study-log/` is a personal page when Supabase Auth is configured. Signed-out visitors are redirected to `/account/?redirectTo=study-log`; successful email/password or Google sign-in returns them to the requested page. If Supabase is not configured, the page keeps the localStorage-first behavior so static local development is not blocked.

## Worker Boundary

Course planning calculations run through `src/hooks/useCoursePlannerWorker.js`.

The worker entry is `src/workers/coursePlanner.worker.js`. It delegates to `src/app/coursePlanner.js`, which combines:

- weighted course search and filtering;
- completed-course progress calculation;
- route duration estimation from weekly hours.

The hook computes a synchronous fallback first, then replaces it with the Worker result when available.

## Supabase Boundary

Supabase remains optional. Static pages work fully with localStorage. When environment variables are present, `src/lib/supabaseClient.js` enables auth and cloud sync through `src/services/cloudDataService.js`.

Auth is intentionally client-side and publishable-key only. Email/password supports Gmail, QQ email, and other valid mailbox providers. Google login uses Supabase OAuth and requires the provider and redirect URLs to be configured in the Supabase dashboard.

The database is split into three groups:

- Local-first user data: `user_course_states`, `study_logs`, `study_plans`, `study_plan_items`, `user_track_states`, `user_project_progress`, and `user_milestone_logs`.
- User identity extension: `profiles`, linked to `auth.users`.
- Optional public catalog tables: `project_templates`, `project_milestones`, and `learning_tracks`.

Course catalog data still lives in `src/data/courses.js` so course additions can remain simple GitHub pull requests. The frontend maps Supabase rows through `src/services/cloudDataMappers.js`, which keeps snake_case database fields out of components and preserves compatibility with older deployments that have not run the latest schema yet.

All user-owned tables use RLS policies of the form `(select auth.uid()) = user_id` or `(select auth.uid()) = id`, with indexes on policy and query columns. Public catalog tables have read-only select policies for `anon` and `authenticated`.

## Future Agent Backend

If OpenAI Agents SDK support is added later, keep it out of the static Pages bundle. Add it as a separate service with its own runtime, credentials, tests, and deployment path. The frontend should call that service through explicit API endpoints rather than embedding API keys in Vite.

## Project Milestones

Project milestones are stored in `src/data/projects.js` as bilingual portfolio stages. Each milestone should include:

- `title`, `description`, `targetAudience`, and `portfolioValue` in English and Chinese.
- `difficulty`, `estimatedWeeks`, `deliverables`, and `evaluationChecklist`.
- `recommendedCourses` using ids from `src/data/courses.js`.
- `githubRepoSuggestion`, `aiAssistedTips`, and `nextMilestoneId`.

When project progress becomes editable in the UI, persist user-specific progress to `user_project_progress` and reflection entries to `user_milestone_logs`.
