# Open CS Atlas

Open CS Atlas is a bilingual computer science learning roadmap inspired by the structure of OSSU Computer Science. It organizes free and open university-level courses into practical learning paths with direct course links, Chinese/English UI text, filters, project milestones, and local progress tracking.

## Features

- Chinese and English language switch
- Direct links to open courses and textbooks
- Filter by discipline, level, track, and search keywords
- Suggested tracks for foundations, systems, AI/data, and software engineering
- Project milestone planner and saved-course state in local storage
- Static GitHub Pages deployment workflow

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The built site is emitted to `dist/`.

## GitHub Pages

This repository includes `.github/workflows/deploy-pages.yml`. After GitHub Pages is configured to use GitHub Actions, pushes to `main` will build and deploy the site automatically.
