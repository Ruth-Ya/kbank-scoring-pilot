import { redirect } from "next/navigation";
import { INSTITUTIONS } from "@/lib/constants";
import { isAdminAuthenticated } from "@/lib/auth";

export default function AdminExportPage() {
  if (!isAdminAuthenticated()) redirect("/admin");

  return (
    <div className="card space-y-4">
      <h1 className="text-xl font-semibold">Export CSV</h1>
      <form action="/admin/export/csv" method="GET" className="space-y-3">
        <select name="institution" className="input" required>
          <option value="">Institution</option>
          {INSTITUTIONS.map((inst) => <option key={inst} value={inst}>{inst}</option>)}
        </select>
        <button className="btn-primary">Télécharger CSV</button>
      </form>
    </div>
  );
}
