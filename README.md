# Open CS Atlas

[简体中文](README.zh-CN.md) | English

Open CS Atlas is a bilingual computer science self-study planner for Chinese learners. It turns open courses, public course notes, and project milestones into a roadmap that can be searched, filtered, saved, and tracked locally.

Live site: [Open CS Atlas](https://rowan2005321.github.io/CS-learning/?lang=en) | [中文模式](https://rowan2005321.github.io/CS-learning/?lang=zh)

> Screenshot placeholder: add a desktop and mobile screenshot after each major UI release. Suggested path: `docs/assets/open-cs-atlas-desktop.png` and `docs/assets/open-cs-atlas-mobile.png`.

## 给 2026 高考后选择计算机科学的同学

如果你刚结束 2026 年高考，正在报考或即将进入计算机科学相关专业，不必因为 AI Agent、自动编程和大模型工具的高速发展而过度焦虑。技术变化越快，越需要扎实的基础、清晰的问题意识和持续动手的能力。

计算机科学不只是“学某个语言”或“追某个热门框架”。它更像一张长期地图：编程、数学、数据结构、系统、网络、数据库、AI、软件工程和安全会互相连接。AI Agent 会改变写代码的方式，但不会替代你理解问题、拆解系统、判断取舍和创造新方向的能力。

给新同学的几句话：

- 不要急着证明自己“会很多工具”，先把基础课、英文阅读和动手项目稳住。
- 不要被“AI 会不会取代程序员”困住，真正重要的是学会用 AI 放大自己的学习、实验和表达能力。
- 不要只盯着就业焦虑，大学四年更值得训练的是发散思维、系统思维和把想法做成作品的能力。
- 找到一个方向持续深入：AI 工程、系统、数据、安全、Web3、开发工具、教育技术都可能长出新的机会。
- 每天记录一点学习过程，回头看时你会发现，长期进步往往来自稳定的小步推进。

Open CS Atlas 希望帮助你把焦虑变成路线，把路线变成计划，把计划变成每天可以执行的行动。

## Features

- Chinese and English interface.
- Track-based roadmap for Foundations, Systems, AI & Data, Software Engineering, and Interview Prep.
- Course search, discipline filter, level filter, and track filter.
- Table and card views, with mobile screens automatically using cards.
- Saved courses and completed courses stored in localStorage.
- Real progress calculation from completed courses.
- Study planner that estimates route duration from weekly available hours.
- Daily study log for recording study hours, notes, outputs, next steps, and streak progress locally.
- Optional Supabase account login and cloud sync for saved courses, completed courses, and study logs.
- Interactive Three.js route map driven by `public/three3.json`.
- Official direct link for every course.
- GitHub Pages-ready static deployment.

## Tech Stack

- React 19
- Vite 6
- Three.js
- Supabase JS
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

## Supabase Cloud Sync

Cloud sync is optional. The app still works locally without Supabase.

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor.
3. Copy `.env.example` to `.env.local`.
4. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

See [`docs/supabase-setup.md`](docs/supabase-setup.md) for the full setup guide.

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
