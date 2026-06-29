# Supabase Production Login Checklist

Open CS Atlas works local-first without Supabase. Supabase is required only for account login and optional cloud sync.

## 1. Create a Supabase project

Suggested settings:

- Project name: `open-cs-atlas`
- Region: choose the nearest region for your main users
- Database password: store it in a password manager
- Never commit the database password or service role key

## 2. Run the schema

Open Supabase Dashboard -> SQL Editor and run the contents of:

```text
supabase/schema.sql
```

The schema creates user-owned tables such as `profiles`, `user_course_states`, `study_logs`, `study_plans`, `user_project_progress`, `project_submissions`, and milestone logs. All user tables enable RLS and use `(select auth.uid())` policies so users can only read and write their own data.

## 3. Configure frontend environment variables

Local development:

```powershell
copy .env.example .env.local
```

Required values:

```text
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Older Supabase projects may call the publishable key the anon public key. `VITE_SUPABASE_ANON_KEY` is still supported as a fallback.

Do not put `service_role` in any Vite variable. Browser builds must only receive a publishable or anon public key.

## 4. Configure Auth redirect URLs

Supabase Dashboard -> Authentication -> URL Configuration:

Site URL:

```text
https://rowan2005321.github.io/CS-learning/
```

Redirect URLs:

```text
https://rowan2005321.github.io/CS-learning/**
http://localhost:5173/**
http://127.0.0.1:5173/**
```

The app constructs all login redirects through `src/auth/authRedirects.js`. GitHub Pages uses the `/CS-learning/` base path; local dev uses `/`.

## 5. Configure Custom SMTP

Custom SMTP is required for production-quality login.

Supabase's default email service is not suitable for production because:

- It may only send to team members in some project states.
- It may have very low rate limits.
- Deliverability for QQ Mail, Gmail, Outlook, and school mailboxes can be unstable.
- You cannot fully control SPF, DKIM, DMARC, sender identity, or bounce handling.

Recommended SMTP setup:

- Use a verified sender domain.
- Configure SPF, DKIM, and DMARC.
- Keep Auth Logs open while testing delivery.
- Test QQ Mail, Gmail, Outlook, and at least one school mailbox.

Frontend code cannot detect whether SMTP is correctly configured. If QQ/Gmail does not receive codes, check Supabase Auth Logs and SMTP provider logs.

## 6. Configure email templates

Open Supabase Dashboard -> Authentication -> Email Templates.

The Open CS Atlas web flow verifies the 6-digit code inside the app. Do not depend on confirmation links for the primary flow.

Magic Link / OTP template must include:

```text
{{ .Token }}
```

Confirm Signup template should also include:

```text
{{ .Token }}
```

Avoid making the user flow depend on:

```text
{{ .ConfirmationURL }}
```

Suggested OTP email body:

```html
<h2>Open CS Atlas verification code</h2>
<p>Your verification code is:</p>
<p style="font-size: 28px; font-weight: 700; letter-spacing: 6px;">{{ .Token }}</p>
<p>Enter this code in the Open CS Atlas page. You do not need to click a link.</p>
<p>If you did not request this email, you can ignore it.</p>
```

## 7. Configure Google OAuth

Google Cloud Console:

- OAuth Client type: `Web application`

Authorized JavaScript origins:

```text
https://rowan2005321.github.io
http://localhost:5173
http://127.0.0.1:5173
```

Authorized redirect URIs:

```text
https://your-project-ref.supabase.co/auth/v1/callback
```

Then enable the Google provider in Supabase Dashboard -> Authentication -> Providers and paste the Google Client ID and Client Secret there.

## 8. Configure GitHub Pages variables

The deployment workflow supports GitHub Secrets first and repository Variables as a fallback:

```yaml
env:
  VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL || vars.VITE_SUPABASE_URL }}
  VITE_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.VITE_SUPABASE_PUBLISHABLE_KEY || vars.VITE_SUPABASE_PUBLISHABLE_KEY }}
```

Recommended production setup:

- Store `VITE_SUPABASE_URL` as a GitHub Secret.
- Store `VITE_SUPABASE_PUBLISHABLE_KEY` as a GitHub Secret.
- Keep repository Variables only as a fallback if they already exist.

These keys are public browser config, not service role credentials. Still, avoid pasting them into issues or screenshots.

## 9. Troubleshooting table

| Symptom | Likely cause | Check |
| --- | --- | --- |
| QQ Mail does not receive codes | Default Supabase email service, poor sender reputation, spam filtering | Configure Custom SMTP, check spam folder, check Auth Logs |
| Gmail does not receive codes | Rate limit, unverified sender, template missing token | Check SMTP logs, SPF/DKIM/DMARC, and `{{ .Token }}` |
| Email lands in spam | Sender domain is not authenticated | Configure SPF, DKIM, DMARC |
| PC login does not return to the app | Missing GitHub Pages redirect URL or wrong base path | Add `https://rowan2005321.github.io/CS-learning/**` |
| Google `redirect_uri_mismatch` | Google OAuth callback URI is wrong | Add `https://your-project-ref.supabase.co/auth/v1/callback` in Google Cloud |
| `Email rate limit exceeded` | Too many OTP requests | Wait for cooldown and check Supabase rate limits |
| `Email address not authorized` | Existing-account OTP login was used before sign-up | Register first, then sign in |
| `Supabase not configured` | Missing build-time env variables | Check GitHub Actions env and local `.env.local` |

## 10. Manual smoke check

Run:

```powershell
npm.cmd run auth:smoke
```

The script checks whether the expected public Supabase variables are present and prints recommended redirect URLs. It does not send real OTP emails by default.

## 11. Future migrations

Keep changes additive:

- Prefer `create table if not exists`.
- Prefer `alter table ... add column if not exists`.
- Keep RLS enabled.
- Keep localStorage as the fallback for signed-out users.
- Keep mapper changes in `src/services/cloudDataMappers.js`.
- Never expose service role keys in frontend code.
