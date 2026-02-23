import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ensureSessionsTable } from "@/lib/db";

const cols = [
  "institution","clientId","createdAt","scoreT0","riskT0","confidenceT0","learningPath","learningCompletedAt","videosRequiredCount","videosCompletedCount","quizScore","rescoreDueAt","scoreT1","riskT1","confidenceT1","deltaScore","dpd7","dpd30","dpdMax"
];

export async function GET(req: NextRequest) {
  const institution = req.nextUrl.searchParams.get("institution");
  if (!institution) return new NextResponse("institution required", { status: 400 });

  await ensureSessionsTable();
  const { rows } = await sql`SELECT * FROM sessions WHERE institution=${institution} ORDER BY created_at DESC`;

  const body = [
    cols.join(","),
    ...rows.map((r) => [
      r.institution,
      r.client_id,
      r.created_at,
      r.score_t0,
      r.risk_t0,
      r.conf_t0,
      r.learning_path,
      r.learning_completed_at,
      "",
      r.videos_completed_count,
      r.quiz_score,
      r.rescore_due_at,
      r.score_t1,
      r.risk_t1,
      r.conf_t1,
      r.delta_score,
      "",
      "",
      ""
    ].map((v) => `"${String(v ?? "").replaceAll('"', '""')}"`).join(","))
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="kbank-${institution}.csv"`
    }
  });
}
