import Link from "next/link";
import { sql } from "@vercel/postgres";
import { ensureSessionsTable } from "@/lib/db";
import { explanationForRisk } from "@/lib/scoring";

function buildWhatsapp(institution: string, clientId: string, risk: string, learningLink: string) {
  const text = `Bonjour, voici le suivi kBANK. Institution: ${institution}. Client ID: ${clientId}. Catégorie de risque: ${risk}. Parcours: ${learningLink}. Vous avez 7 jours pour compléter. Re-scoring scheduled 6 weeks after completion.`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export default async function ResultPage({ searchParams }: { searchParams: { id?: string } }) {
  if (!searchParams.id) return <p>ID session manquant.</p>;
  await ensureSessionsTable();
  const { rows } = await sql`SELECT * FROM sessions WHERE id = ${searchParams.id} LIMIT 1`;
  const session = rows[0];
  if (!session) return <p>Session introuvable.</p>;

  const learningLink = `/learning/${session.learning_path}?id=${session.id}`;
  const waLink = buildWhatsapp(session.institution, session.client_id, session.risk_t0, learningLink);

  return (
    <div className="card space-y-4">
      <h1 className="text-2xl font-semibold">Résultat du diagnostic</h1>
      <p>Score: <b>{session.score_t0}/100</b></p>
      <p>Risque: <b className="uppercase">{session.risk_t0}</b></p>
      <p>Confiance: <b>{session.conf_t0}</b></p>
      <p className="text-sm text-slate-600">{explanationForRisk(session.risk_t0)}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href={learningLink} className="btn-primary">Ouvrir le parcours d’apprentissage</Link>
        <a href={waLink} className="btn border border-slate-300">Partager via WhatsApp</a>
      </div>
    </div>
  );
}
