# tcf-expression-ecrite-simulation

## Database-backed custom tasks

Custom tasks created in the admin panel are stored in Postgres through `/api/tasks`.

Set one of these environment variables in Vercel:

- `DATABASE_URL` — recommended. A pooled Postgres connection string, for example from Vercel Postgres, Neon, Supabase, or Railway.
- `POSTGRES_URL` — optional fallback if your Vercel Postgres integration provides this instead.

The API creates the `tcf_writing_tasks` table automatically on first use.
