import { sql } from "@vercel/postgres";

let initPromise: Promise<void> | null = null;

export async function ensureSessionsTable() {
  if (!initPromise) {
    initPromise = (async () => {
      await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        institution text NOT NULL,
        client_id text NOT NULL,
        created_at timestamptz DEFAULT now(),
        answers_t0 jsonb,
        score_t0 int,
        risk_t0 text,
        conf_t0 text,
        duration_t0 int,
        learning_path text,
        learning_completed_at timestamptz,
        rescore_due_at timestamptz,
        videos_completed jsonb,
        videos_completed_count int,
        quiz_score int,
        answers_t1 jsonb,
        score_t1 int,
        risk_t1 text,
        conf_t1 text,
        duration_t1 int,
        delta_score int
      );`;
    })();
  }
  return initPromise;
}
