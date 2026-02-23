import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ensureSessionsTable } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { sessionId, quizScore, videosCompletedCount } = await req.json();
  await ensureSessionsTable();
  await sql`
    UPDATE sessions
    SET quiz_score=${quizScore},
        videos_completed_count=${videosCompletedCount},
        learning_completed_at=now(),
        rescore_due_at=now() + interval '6 weeks'
    WHERE id=${sessionId}
  `;
  return NextResponse.json({ ok: true });
}
