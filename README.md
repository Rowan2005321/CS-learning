# Open CS Atlas

Open CS Atlas is a bilingual computer science self-study planner for Chinese learners. It turns open courses, public course notes, and project milestones into a roadmap that can be searched, filtered, saved, and tracked locally.

> Screenshot placeholder: add a desktop and mobile screenshot after each major UI release. Suggested path: `docs/assets/open-cs-atlas-desktop.png` and `docs/assets/open-cs-atlas-mobile.png`.

## Features

- Chinese and English interface.
- Track-based roadmap for Foundations, Systems, AI & Data, Software Engineering, and Interview Prep.
- Course search, discipline filter, level filter, and track filter.
- Table and card views, with mobile screens automatically using cards.
- Saved courses and completed courses stored in localStorage.
- Real progress calculation from completed courses.
- Study planner that estimates route duration from weekly available hours.
- Official direct link for every course.
- GitHub Pages-ready static deployment.

## Tech Stack

- React 19
- Vite 6
- Lucide React
- ESLint
- Prettier
- Vitest
- GitHub Actions and GitHub Pages

## Local Development

```powershell
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Checks

```powershell
npm run lint
npm run test
npm run build
```

The production site is generated in `dist/`.

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

## Roadmap

- Expand course coverage for architecture, compilers, networking, databases, distributed systems, AI engineering, and security.
- Add source freshness checks for official links.
- Add optional learning plans by weekly schedule and target deadline.
- Add topic pages for Chinese learners who need prerequisite bridges.
- Add screenshots and a small docs site when the course catalog grows.

## GitHub Pages

This repository includes `.github/workflows/deploy-pages.yml`. On every push to `main`, GitHub Actions installs dependencies, runs lint, runs tests, builds the site, and deploys `dist/` to GitHub Pages.

## License

Code and documentation are released under the MIT License. Course names and external course materials belong to their respective providers.
