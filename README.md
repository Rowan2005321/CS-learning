# Open CS Atlas

Open CS Atlas is a bilingual computer science self-study website. It maps open courses across programming, math, systems, theory, AI, data, security, tools, and software engineering.

## Features

- Chinese / English language switch
- Official direct links for every course
- Search, discipline filters, level filters, and track filters
- Roadmap timeline and project milestones
- Local saved-course and project-progress state
- GitHub Pages-ready static build

## Local Development

```powershell
npm install
npm run dev
```

## Production Build

```powershell
npm run build
```

The production site is generated in `dist/`.

## GitHub Pages

This repository includes `.github/workflows/deploy-pages.yml`. After pushing to GitHub, enable GitHub Pages with GitHub Actions as the source if GitHub does not enable it automatically.

