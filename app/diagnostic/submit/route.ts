import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { computeConfidence, computeRisk, computeScore } from "@/lib/scoring";
import { mapAnswer } from "@/lib/questions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let tableInitPromise: Promise<void> | null = null;

async function ensureSessionsTable() {
  if (!tableInitPromise) {
    tableInitPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS sessions (
          id text PRIMARY KEY,
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
        )
      `;
    })();
  }

  return tableInitPromise;
}

export async function POST(req: NextRequest) {
  if (!process.env.POSTGRES_URL) {
    return NextResponse.json(
      { error: "Database connection is not configured. Missing POSTGRES_URL." },
      { status: 500 }
    );
  }

  const form = await req.formData();
  const institution = String(form.get("institution") || "");
  const clientId = String(form.get("clientId") || "");
  const duration = Number(form.get("duration") || 0);

  if (!institution || !clientId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const answersRaw: Record<string, string> = {};
  const answersMapped: Record<string, string> = {};
  for (let i = 1; i <= 12; i += 1) {
    const key = `q${i}`;
    const value = String(form.get(key) || "");
    answersRaw[key] = value;
    answersMapped[key] = mapAnswer(key, value);
  }

  const score = computeScore(answersMapped, 11);
  const risk = computeRisk(score);
  const conf = computeConfidence(answersMapped, duration);
  const id = randomUUID();

  await ensureSessionsTable();

  await sql`
    INSERT INTO sessions (
      id,
      institution,
      client_id,
      answers_t0,
      score_t0,
      risk_t0,
      conf_t0,
      duration_t0,
      learning_path,
      videos_completed,
      videos_completed_count
    )
    VALUES (
      ${id},
      ${institution},
      ${clientId},
      ${JSON.stringify(answersRaw)}::jsonb,
      ${score},
      ${risk},
      ${conf},
      ${duration},
      ${risk},
      ${JSON.stringify({})}::jsonb,
      0
    )
  `;

  return NextResponse.redirect(new URL(`/result?id=${id}`, req.url));
}
