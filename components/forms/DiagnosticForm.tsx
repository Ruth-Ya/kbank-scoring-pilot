"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { DIAGNOSTIC_QUESTIONS } from "@/lib/questions";

export function DiagnosticForm({ institution, clientId }: { institution: string; clientId: string }) {
  const [start, setStart] = useState<number>(Date.now());
  const durationRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setStart(Date.now());
  }, []);

  function handleSubmit(_: FormEvent<HTMLFormElement>) {
    const duration = Math.floor((Date.now() - start) / 1000);
    if (durationRef.current) durationRef.current.value = String(duration);
  }

  return (
    <form action="/diagnostic/submit" method="POST" onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="institution" value={institution} />
      <input type="hidden" name="clientId" value={clientId} />
      <input ref={durationRef} type="hidden" name="duration" defaultValue="0" />
      {DIAGNOSTIC_QUESTIONS.map((q) => (
        <div key={q.key} className="card">
          <p className="font-medium mb-3">{q.label}</p>
          <div className="space-y-2">
            {q.options.map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-sm">
                <input type="radio" name={q.key} value={opt} required className="accent-bank-700" />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button className="btn-primary w-full">Soumettre</button>
    </form>
  );
}
