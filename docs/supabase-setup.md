# Supabase Setup

Open CS Atlas can run fully locally without Supabase. Supabase is only needed for account login and cloud sync.

## 1. Create a project

Suggested settings:

- Project name: `open-cs-atlas`
- Organization plan: Free
- Region: choose the closest available region for your main users
- Database password: store it in a password manager; do not commit it to GitHub

## 2. Run the schema

Open the Supabase project, go to SQL Editor, and run:

```sql
-- Paste the contents of supabase/schema.sql here.
```

The schema creates:

- `profiles`
- `user_course_states`: saved/completed state, status, rating, and private notes per course
- `study_logs`: daily study records with optional `course_id` and tags
- `study_plans`: active plan settings such as weekly hours, target track, and target date
- `study_plan_items`: ordered courses inside a plan
- `user_project_progress`: per-user project milestone progress
- `user_milestone_logs`: reflections and next steps for project milestones
- `user_track_states`: per-user track status and goals
- `project_templates`, `project_milestones`, `learning_tracks`: optional public catalog tables

All user tables have Row Level Security enabled. Policies use `(select auth.uid())` and indexed `user_id` columns so each user can read and write only their own data.

Catalog tables are RLS-enabled and expose read-only `select` policies to `anon` and `authenticated`. The frontend does not get insert, update, or delete policies for catalog data.

The schema is intentionally non-destructive:

- It uses `create table if not exists`.
- It uses `alter table ... add column if not exists` for new fields.
- It creates policies, constraints, indexes, and triggers only when missing.
- It does not use `drop table`, `drop policy`, or destructive resets.

## 3. Configure local environment

Copy `.env.example` to `.env.local`:

```powershell
copy .env.example .env.local
```

Then fill in:

```text
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Use the publishable key in the frontend. Older Supabase projects may call this the anon public key; `VITE_SUPABASE_ANON_KEY` is still supported as a fallback. Never commit secret or service role keys.

## 4. Configure Auth

Open Supabase Dashboard -> Authentication -> Providers.

Enable Email so Gmail, QQ email, and other valid email addresses can sign up with email/password. QQ email does not need a separate OAuth provider; users can register with an address such as `name@qq.com`.

Open CS Atlas uses a verification-code registration flow instead of relying on confirmation links. This avoids broken GitHub Pages callback links such as `404` pages after a user clicks an email confirmation URL.

Configure Supabase email templates:

1. Open Supabase Dashboard -> Authentication -> Email Templates.
2. Open the Magic Link template.
3. Make sure the email body includes `{{ .Token }}`.
4. Do not make the user-facing registration flow depend on `{{ .ConfirmationURL }}`.

Suggested minimal Magic Link email body:

```html
<h2>Open CS Atlas verification code</h2>
<p>Your verification code is:</p>
<p style="font-size: 28px; font-weight: 700; letter-spacing: 6px;">{{ .Token }}</p>
<p>This code is used to create or sign in to your Open CS Atlas account.</p>
<p>If you did not request this email, you can ignore it.</p>
```

The frontend calls Supabase OTP APIs to send the code, verifies the code in the app, and then stores the user's password so future email/password sign-in still works.

To enable Google login:

1. Enable the Google provider in Supabase.
2. Create Google OAuth credentials in Google Cloud Console.
3. Add the Supabase callback URL shown in the Google provider panel, usually:

```text
https://your-project-ref.supabase.co/auth/v1/callback
```

4. Add local and hosted redirect URLs in Supabase Authentication -> URL Configuration:

```text
http://127.0.0.1:5173/**
http://localhost:5173/**
https://rowan2005321.github.io/CS-learning/**
```

When Supabase Auth is configured, `/study-log/` is treated as a personal page. Signed-out visitors are redirected to `/account/?redirectTo=study-log`, and successful email/password or Google sign-in returns them to the study log.

## 5. Configure hosted GitHub Pages

For GitHub Pages builds, add repository secrets or environment variables for:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Then update `.github/workflows/deploy-pages.yml` to expose those values during `npm run build` if cloud sync should be active on the hosted site.

## 6. Auth notes

Supabase email sign-up may require email confirmation depending on the Auth settings in the dashboard. If email confirmation is enabled, users must confirm their email before logging in.

Do not put the Supabase `service_role` key in any Vite environment variable. The browser should only receive the publishable key.

## 7. Future migrations

Keep migrations additive whenever possible:

- Add new nullable columns first, backfill data, then add stricter constraints later.
- Keep localStorage as the fallback source for anonymous users.
- Keep course catalog data in `src/data/courses.js` until an admin workflow exists.
- Use the mapper functions in `src/services/cloudDataMappers.js` when adding or renaming Supabase fields.
- Never expose service role keys in Vite environment variables.
