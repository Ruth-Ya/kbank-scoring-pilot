import { sql } from "@vercel/postgres";
import { ensureSessionsTable } from "@/lib/db";
import { RescoreForm } from "@/components/forms/RescoreForm";

export default async function RescorePage({ searchParams }: { searchParams: { institution?: string; clientId?: string } }) {
  const institution = searchParams.institution;
  const clientId = searchParams.clientId;

  if (!institution || !clientId) {
    return (
      <div className="card space-y-4">
        <h1 className="text-2xl font-semibold">Re-scoring T1</h1>
        <form className="space-y-3" method="GET">
          <input name="institution" className="input" placeholder="Institution" required />
          <input name="clientId" className="input" placeholder="Client ID" required />
          <button className="btn-primary w-full">Charger</button>
        </form>
      </div>
    );
  }

  await ensureSessionsTable();
  const { rows } = await sql`
    SELECT * FROM sessions
    WHERE institution=${institution} AND client_id=${clientId}
    ORDER BY created_at DESC
    LIMIT 1
  `;

  const session = rows[0];
  if (!session) return <p>Aucune session trouvée.</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Re-scoring T1</h1>
      <p className="text-sm text-slate-600">Session: {session.id}</p>
      <RescoreForm sessionId={session.id} />
    </div>
  );
}
