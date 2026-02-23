import { INSTITUTIONS } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="card max-w-xl mx-auto space-y-5">
      <h1 className="text-2xl font-semibold">kBANK Scoring Pilot</h1>
      <p className="text-sm text-slate-600">Diagnostic financier anonymisé pour institutions partenaires.</p>
      <form action="/diagnostic" method="GET" className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Institution</label>
          <select name="institution" required className="input">
            <option value="">Sélectionner</option>
            {INSTITUTIONS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Client ID anonymisé</label>
          <input name="clientId" required minLength={3} maxLength={40} pattern="[A-Za-z0-9_-]+" className="input" />
        </div>
        <button type="submit" className="btn-primary w-full">
          Start Diagnostic
        </button>
      </form>
    </div>
  );
}
