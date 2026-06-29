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

`/courses/`, `/projects/`, and `/study-log/` are protected product areas when Supabase Auth is configured. Signed-out visitors are redirected to `/account/?redirectTo=courses`, `/account/?redirectTo=projects`, or `/account/?redirectTo=study-log`; successful email/password or Google sign-in returns them to the requested page. If Supabase is not configured, these pages show an account-system configuration prompt instead of failing open.

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

- Local-first user data: `user_course_states`, `study_logs`, `study_plans`, `study_plan_items`, `user_track_states`, `user_project_progress`, `project_submissions`, and `user_milestone_logs`.
- User identity extension: `profiles`, linked to `auth.users`.
- Optional public catalog tables: `project_templates`, `project_milestones`, and `learning_tracks`.

Course and project catalog data still lives in `src/data/courses.js` and `src/data/projects.js` so additions can remain simple GitHub pull requests. The auth guard protects the UI flow and user operations, but it does not truly hide static catalog data from built JavaScript. True catalog secrecy requires moving catalog queries into Supabase tables or an API backend. The frontend maps Supabase rows through `src/services/cloudDataMappers.js`, which keeps snake_case database fields out of components and preserves compatibility with older deployments that have not run the latest schema yet.

All user-owned tables use RLS policies of the form `(select auth.uid()) = user_id` or `(select auth.uid()) = id`, with indexes on policy and query columns. Public catalog tables have read-only select policies for `anon` and `authenticated`.

## Future Agent Backend

If OpenAI Agents SDK support is added later, keep it out of the static Pages bundle. Add it as a separate service with its own runtime, credentials, tests, and deployment path. The frontend should call that service through explicit API endpoints rather than embedding API keys in Vite.

## Project Milestones

Project milestones are stored in `src/data/projects.js` as bilingual, multi-track portfolio projects. Each project should include:

- `trackIds`, `order`, `title`, `subtitle`, `description`, `targetAudience`, and `portfolioValue` in English and Chinese.
- `difficulty`, `estimatedWeeks`, `estimatedHours`, `deliverables`, `submissionRequirements`, and `evaluationRubric`.
- `requiredCourses`, `recommendedCourses`, and `unlockCriteria` using ids from `src/data/courses.js`.
- `reviewQuestions`, `commonPitfalls`, `aiAssistedWorkflow`, `communityCta`, `githubRepoSuggestion`, and `nextProjectIds`.

Do not store `status` in `src/data/projects.js`. Project status is computed by `src/utils/projectStatus.js` from completed courses, completed projects, unlock criteria, and user-owned rows in `user_project_progress`. Project GitHub/demo submissions are stored in `project_submissions`.
