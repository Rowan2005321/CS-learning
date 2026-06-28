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
- `user_course_states`
- `study_logs`
- `study_plans`

All user tables have Row Level Security enabled. Policies use `(select auth.uid())` and `user_id` indexes so each user can read and write only their own data.

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

## 4. Configure hosted GitHub Pages

For GitHub Pages builds, add repository secrets or environment variables for:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Then update `.github/workflows/deploy-pages.yml` to expose those values during `npm run build` if cloud sync should be active on the hosted site.

## 5. Auth notes

Supabase email sign-up may require email confirmation depending on the Auth settings in the dashboard. If email confirmation is enabled, users must confirm their email before logging in.
