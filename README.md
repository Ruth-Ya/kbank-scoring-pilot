# kBANK Scoring Pilot

Production-ready Next.js 14 pilot app for anonymized financial diagnostics, learning journeys, re-scoring, and admin CSV export.

## Features

- Home intake: institution + anonymized `clientId`
- T0 diagnostic (12 questions, 11 scored + attention check)
- Exact scoring, risk categorization, and confidence grading
- Result page with learning-path routing and WhatsApp click-to-chat
- Learning tracks (`/learning/red`, `/learning/orange`, `/learning/green`)
- Google Drive video embeds with fallback links + validation code checks
- Completion flow with 5-question quiz and automatic `rescoreDueAt = +6 weeks`
- T1 re-scoring against latest session
- Simple Kajou admin login via env password and httpOnly cookie
- Institution-filtered CSV export with required columns
- Persistence via `@vercel/postgres` and `CREATE TABLE IF NOT EXISTS`

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- `@vercel/postgres`

## Deployment on Vercel (no local setup required)

1. Push this repository to GitHub.
2. In Vercel, create a new project from the repo.
3. Add a **Vercel Postgres** database from the Storage tab.
4. Set environment variables in Vercel:
   - `POSTGRES_URL` (auto-injected by Vercel Postgres)
   - `KBANK_ADMIN_PASSWORD` (your admin password)
5. Deploy.

On first write/read operation, the app automatically runs:

```sql
CREATE TABLE IF NOT EXISTS sessions (...)
```

No extra migration tooling is required.

## Admin access

- URL: `/admin`
- Enter the password from `KBANK_ADMIN_PASSWORD`
- On success, session cookie is set (httpOnly)
- Export page: `/admin/export`

## Key routes

- `/` Home
- `/diagnostic` T0 questionnaire
- `/result` T0 outcome + WhatsApp link
- `/learning/red`, `/learning/orange`, `/learning/green`
- `/rescore` T1 questionnaire
- `/admin`
- `/admin/export`

## Notes

- No PII is stored. Only institution + anonymized client ID.
- WhatsApp sharing uses:
  - `https://wa.me/?text=ENCODED_MESSAGE`
- Google Drive embeds use:
  - `/preview` in iframe
  - `/view` as fallback link
