import { redirect } from "next/navigation";
import { DiagnosticForm } from "@/components/forms/DiagnosticForm";

export default function DiagnosticPage({ searchParams }: { searchParams: { institution?: string; clientId?: string } }) {
  const institution = searchParams.institution;
  const clientId = searchParams.clientId;

  if (!institution || !clientId) redirect("/");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Diagnostic initial</h1>
      <p className="text-sm text-slate-600">
        Institution: <b>{institution}</b> · Client: <b>{clientId}</b>
      </p>
      <DiagnosticForm institution={institution} clientId={clientId} />
    </div>
  );
}
