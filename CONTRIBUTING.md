# Contributing

Thanks for helping improve Open CS Atlas. The goal is to keep this repository useful for serious self-learners, especially Chinese learners who want a clear path through open computer science courses.

## Adding A Course

1. Read `docs/content-guidelines.md`.
2. Add the course to `src/data/courses.js`.
3. Include both English and Chinese text for title, description, audience, outcomes, and prerequisites.
4. Add one or more tracks from:
   - `foundations`
   - `systems`
   - `ai-data`
   - `software-engineering`
   - `interview-prep`
5. Add a direct official link in `officialUrl`.
6. Set `isFree` to `true` only when the core course material is free to access.
7. Set `lastChecked` to the date when you verified the link and metadata.

## Course Standards

Good entries usually have:

- An official university or project source.
- Long-term public access.
- Syllabus, lecture notes, assignments, labs, problem sets, or projects.
- Clear prerequisites.
- A concrete learning outcome.

Do not add:

- Low-quality advertising pages.
- Pirated courses or reuploaded paid material.
- Expired links.
- Courses with unclear ownership or unverifiable providers.

## Pull Request Format

Use the PR template and include:

- What changed.
- Whether you added or updated courses.
- Whether you checked course links.
- Whether `npm run lint`, `npm run test`, and `npm run build` pass.
- A screenshot or short visual note when UI changes are included.

## Issue Format

For course requests, include:

- Course title and provider.
- Official link.
- Why it belongs in the atlas.
- Whether it is free or partly paid.
- Primary language.
- Known prerequisites.

For bugs, include:

- What happened.
- What you expected.
- Browser/device if it is a UI issue.
- Steps to reproduce.
