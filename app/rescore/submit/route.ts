import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ensureSessionsTable } from "@/lib/db";
import { computeConfidence, computeRisk, computeScore } from "@/lib/scoring";
import { mapAnswer } from "@/lib/questions";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const sessionId = String(form.get("sessionId") || "");
  const duration = Number(form.get("duration") || 0);

  const answersRaw: Record<string, string> = {};
  const answersMapped: Record<string, string> = {};
  const keys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q11", "q12"];
  for (const key of keys) {
    const val = String(form.get(key) || "");
    answersRaw[key] = val;
    answersMapped[key] = mapAnswer(key, val);
  }

  const scoreT1 = computeScore(answersMapped, 11);
  const riskT1 = computeRisk(scoreT1);
  const confT1 = computeConfidence(answersMapped, duration);

  await ensureSessionsTable();
  const { rows } = await sql`SELECT score_t0 FROM sessions WHERE id=${sessionId} LIMIT 1`;
  const scoreT0 = rows[0]?.score_t0 || 0;
  const delta = scoreT1 - scoreT0;

  await sql`
    UPDATE sessions
    SET answers_t1=${JSON.stringify(answersRaw)}::jsonb,
        score_t1=${scoreT1},
        risk_t1=${riskT1},
        conf_t1=${confT1},
        duration_t1=${duration},
        delta_score=${delta}
    WHERE id=${sessionId}
  `;

  return NextResponse.redirect(new URL(`/result?id=${sessionId}`, req.url));
}
