import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ensureSessionsTable } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { sessionId, completed } = await req.json();
  await ensureSessionsTable();
  const count = Object.values(completed || {}).filter(Boolean).length;
  await sql`UPDATE sessions SET videos_completed=${JSON.stringify(completed)}::jsonb, videos_completed_count=${count} WHERE id=${sessionId}`;
  return NextResponse.json({ ok: true });
}
