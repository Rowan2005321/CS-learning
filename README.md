# Open CS Atlas

[简体中文](README.zh-CN.md) | English

Open CS Atlas is a bilingual, local-first computer science self-study planner for Chinese learners. It turns open courses, public course notes, and project milestones into a roadmap that can be searched, filtered, saved, and tracked directly in the browser.

Live site: [Open CS Atlas](https://rowan2005321.github.io/CS-learning/?lang=en) | [中文模式](https://rowan2005321.github.io/CS-learning/?lang=zh)

> Screenshot placeholder: add a desktop and mobile screenshot after each major UI release. Suggested path: `docs/assets/open-cs-atlas-desktop.png` and `docs/assets/open-cs-atlas-mobile.png`.

## For 2026 CS Students

If you are entering a computer science program after the 2026 Gaokao, do not let the speed of AI agents and coding tools turn into anxiety. The faster tools change, the more valuable fundamentals, clear problem framing, and consistent project practice become.

CS is not just learning one language or chasing one framework. It is a long-term map across programming, math, data structures, systems, networks, databases, AI, software engineering, and security. AI agents will change how code is written, but they do not replace the ability to understand problems, design systems, make tradeoffs, and create new directions.

Open CS Atlas aims to turn that anxiety into a route, the route into a plan, and the plan into daily action.

## Features

- Chinese and English interface.
- Track-based roadmap for Foundations, Systems, AI & Data, Software Engineering, and Interview Prep.
- Course search, discipline filter, level filter, and track filter.
- Table and card views, with mobile screens automatically using cards.
- Saved courses and completed courses stored in `localStorage`.
- Real progress calculation from completed courses.
- Study planner that estimates route duration from weekly available hours.
- Personal study log for recording study hours, notes, outputs, next steps, statistics, and heatmap review.
- Interactive Three.js route map driven by `public/three3.json`.
- Multi-page static architecture for `/courses/`, `/tracks/`, `/study-log/`, `/projects/`, and `/sources/`.
- Web Worker-backed course planning calculations for search ranking, route estimates, and progress summaries.
- Portfolio-oriented project milestones with deliverables, evaluation checklists, recommended courses, and AI-assisted practice tips.
- Official direct link for every course.
- GitHub Pages-ready static deployment.

## Tech Stack

- React 19
- Vite 6
- Three.js
- Web Workers
- Lucide React
- ESLint
- Prettier
- Vitest
- GitHub Actions and GitHub Pages

## Local Development

Clone the repository and enter the project root first:

```powershell
git clone https://github.com/Rowan2005321/CS-learning.git
cd CS-learning
```

Install dependencies and start Vite:

```powershell
npm.cmd install
npm.cmd run dev
```

Then open the local URL printed by Vite.

All npm commands must be run from the project root, the folder that contains `package.json`. If you run them from `C:\Users\pc` or another parent folder, npm will report `Could not read package.json`.

## Checks

```powershell
npm.cmd run lint
npm.cmd run test
npm.cmd run build
```

The production site is generated in `dist/`.

## Architecture

Open CS Atlas is a Vite multi-page static React app. The main pages are:

- `/` for the hero and roadmap overview.
- `/courses/` for course search, filters, route planning, saved courses, and completion state.
- `/study-log/` for personal daily study records and review charts.
- `/tracks/` for roadmap and discipline exploration.
- `/projects/` for local project milestones, progress records, and portfolio submissions.
- `/sources/` for source transparency.

Legacy hash links such as `/#courses` and `/#study-log` are redirected to the matching page so older GitHub Pages links keep working.

Course planning uses a Web Worker through `src/hooks/useCoursePlannerWorker.js`. The worker calls the shared pure function in `src/app/coursePlanner.js`; if Worker support is unavailable, the app falls back to the same synchronous calculation path.

User data is local-first and stored in the browser through `localStorage`.

See [`docs/architecture.md`](docs/architecture.md) for the page, Worker, and future backend boundaries.

## Three.js Route Map

The hero route map is driven by [`public/three3.json`](public/three3.json). Add or edit nodes, edges, colors, camera settings, and motion values there before changing rendering code.

## Course Data Format

Course data lives in `src/data/courses.js`. Each course should include:

```js
{
  id: "cs50x",
  discipline: "programming",
  level: "intro",
  tracks: ["foundations", "interview-prep"],
  provider: "Harvard / CS50",
  code: "CS50x",
  title: { en: "...", zh: "..." },
  description: { en: "...", zh: "..." },
  audience: { en: "...", zh: "..." },
  outcomes: { en: "...", zh: "..." },
  prerequisites: { en: "...", zh: "..." },
  language: "English",
  weeks: 8,
  hoursPerWeek: 8,
  isFree: true,
  officialUrl: "https://example.edu/course",
  lastChecked: "2026-06-27",
  tags: ["programming", "python"]
}
```

Use stable ids, official links, and concise bilingual descriptions.

## Contributing Courses

Before adding a course, read `docs/content-guidelines.md`.

Good course additions usually have:

- An official source from a university or maintained educational project.
- A syllabus, lecture notes, assignments, labs, projects, or problem sets.
- Clear prerequisites and learning outcomes.
- Long-term public access.
- Cost and language clearly marked.

Do not add low-quality advertising pages, pirated courses, unofficial mirrors of paid content, or expired links.

## Contributing Project Milestones

Project milestones live in `src/data/projects.js`. Each milestone belongs to one or more `projectTracks` and includes bilingual `title`, `subtitle`, `description`, `targetAudience`, `deliverables`, `submissionRequirements`, `evaluationRubric`, `reviewQuestions`, `commonPitfalls`, `aiAssistedWorkflow`, `portfolioValue`, and `communityCta`, plus `difficulty`, `estimatedWeeks`, `estimatedHours`, `requiredCourses`, `recommendedCourses`, `unlockCriteria`, `githubRepoSuggestion`, and `nextProjectIds`.

Do not hard-code user status in `projects.js`. Project status is computed from completed courses, completed projects, unlock criteria, and local project progress stored in the browser.

## Roadmap

- Expand course coverage for architecture, compilers, networking, databases, distributed systems, AI engineering, and security.
- Add source freshness checks for official links.
- Add optional learning plans by weekly schedule and target deadline.
- Add richer project progress and milestone reflection views.
- Add topic pages for Chinese learners who need prerequisite bridges.
- Add screenshots and a small docs site when the course catalog grows.

## GitHub Pages

This repository includes `.github/workflows/deploy-pages.yml`. On every push to `main`, GitHub Actions installs dependencies, runs lint, runs tests, builds the site, and deploys `dist/` to GitHub Pages.

## License

Code and documentation are released under the MIT License. Course names and external course materials belong to their respective providers.
