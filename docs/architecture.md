# Architecture

Open CS Atlas is a static Vite multi-page React application. It is local-first by design: user progress, saved courses, completed courses, study plans, study logs, and project progress are stored in the browser through `localStorage`.

## Pages

Each page has its own HTML entry and React mount:

- `index.html` -> `src/main.jsx`
- `courses/index.html` -> `src/pages/courses.jsx`
- `study-log/index.html` -> `src/pages/studyLog.jsx`
- `tracks/index.html` -> `src/pages/tracks.jsx`
- `projects/index.html` -> `src/pages/projects.jsx`
- `sources/index.html` -> `src/pages/sources.jsx`

Shared application state and page composition live in `src/App.jsx`.

## Navigation

`src/app/navigation.js` builds GitHub Pages-compatible links from the current site root, so nested pages work under both local Vite paths and the `/CS-learning/` Pages subpath.

Legacy hash links such as `/#courses` and `/#study-log` are redirected to real pages.

All current pages are public static frontend pages backed by bundled assets and browser storage.

## Worker Boundary

Course planning calculations run through `src/hooks/useCoursePlannerWorker.js`.

The worker entry is `src/workers/coursePlanner.worker.js`. It delegates to `src/app/coursePlanner.js`, which combines:

- weighted course search and filtering;
- completed-course progress calculation;
- route duration estimation from weekly hours.

The hook computes a synchronous fallback first, then replaces it with the Worker result when available.

## Local Data Boundary

Browser-owned data is handled in React state and persisted with `src/hooks/useLocalStorage.js`.

Current local data keys include:

- `open-cs-atlas-lang`
- `open-cs-atlas-saved`
- `open-cs-atlas-completed`
- `open-cs-atlas-weekly-hours`
- `open-cs-atlas-view-mode`
- `open-cs-atlas-study-logs`
- `open-cs-atlas-project-progress`
- `open-cs-atlas-project-submissions`

Study log migration and import/export validation live in `src/utils/studyLog.js`.

## Future Backend Boundary

If an AI service or external sync layer is added later, keep it out of the static Pages bundle. Add it as a separate service with its own runtime, credentials, tests, migration plan, and deployment path. The frontend should call that service through explicit API endpoints rather than embedding private keys or service credentials in Vite.

## Project Milestones

Project milestones are stored in `src/data/projects.js` as bilingual, multi-track portfolio projects. Each project should include:

- `trackIds`, `order`, `title`, `subtitle`, `description`, `targetAudience`, and `portfolioValue` in English and Chinese.
- `difficulty`, `estimatedWeeks`, `estimatedHours`, `deliverables`, `submissionRequirements`, and `evaluationRubric`.
- `requiredCourses`, `recommendedCourses`, and `unlockCriteria` using ids from `src/data/courses.js`.
- `reviewQuestions`, `commonPitfalls`, `aiAssistedWorkflow`, `communityCta`, `githubRepoSuggestion`, and `nextProjectIds`.

Do not store `status` in `src/data/projects.js`. Project status is computed by `src/utils/projectStatus.js` from completed courses, completed projects, unlock criteria, and local project progress.
