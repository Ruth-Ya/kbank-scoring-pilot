import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ensureSessionsTable } from "@/lib/db";
import { computeConfidence, computeRisk, computeScore } from "@/lib/scoring";
import { mapAnswer } from "@/lib/questions";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const institution = String(form.get("institution") || "");
  const clientId = String(form.get("clientId") || "");
  const duration = Number(form.get("duration") || 0);

  if (!institution || !clientId) return NextResponse.redirect(new URL("/", req.url));

  const answersRaw: Record<string, string> = {};
  const answersMapped: Record<string, string> = {};
  for (let i = 1; i <= 12; i += 1) {
    const key = `q${i}`;
    const v = String(form.get(key) || "");
    answersRaw[key] = v;
    answersMapped[key] = mapAnswer(key, v);
  }

  const score = computeScore(answersMapped, 11);
  const risk = computeRisk(score);
  const conf = computeConfidence(answersMapped, duration);

  await ensureSessionsTable();
  const path = risk;
  const response = await sql`
    INSERT INTO sessions (institution, client_id, answers_t0, score_t0, risk_t0, conf_t0, duration_t0, learning_path, videos_completed, videos_completed_count)
    VALUES (${institution}, ${clientId}, ${JSON.stringify(answersRaw)}::jsonb, ${score}, ${risk}, ${conf}, ${duration}, ${path}, ${JSON.stringify({})}::jsonb, 0)
    RETURNING id
  `;

  const id = response.rows[0].id;
  return NextResponse.redirect(new URL(`/result?id=${id}`, req.url));
}
