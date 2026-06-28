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

## Worker Boundary

Course planning calculations run through `src/hooks/useCoursePlannerWorker.js`.

The worker entry is `src/workers/coursePlanner.worker.js`. It delegates to `src/app/coursePlanner.js`, which combines:

- weighted course search and filtering;
- completed-course progress calculation;
- route duration estimation from weekly hours.

The hook computes a synchronous fallback first, then replaces it with the Worker result when available.

## Supabase Boundary

Supabase remains optional. Static pages work fully with localStorage. When environment variables are present, `src/lib/supabaseClient.js` enables auth and cloud sync through `src/services/cloudDataService.js`.

## Future Agent Backend

If OpenAI Agents SDK support is added later, keep it out of the static Pages bundle. Add it as a separate service with its own runtime, credentials, tests, and deployment path. The frontend should call that service through explicit API endpoints rather than embedding API keys in Vite.
