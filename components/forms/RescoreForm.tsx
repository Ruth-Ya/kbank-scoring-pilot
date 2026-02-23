"use client";

import { FormEvent, useRef, useState } from "react";
import { DIAGNOSTIC_QUESTIONS } from "@/lib/questions";

const RESCORE_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q11", "q12"];

export function RescoreForm({ sessionId }: { sessionId: string }) {
  const start = useRef(Date.now());
  const durationRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(_: FormEvent<HTMLFormElement>) {
    if (durationRef.current) durationRef.current.value = String(Math.floor((Date.now() - start.current) / 1000));
    setSubmitted(true);
  }

  return (
    <form action="/rescore/submit" method="POST" onSubmit={onSubmit} className="space-y-4">
      <input name="sessionId" value={sessionId} type="hidden" />
      <input name="duration" defaultValue="0" ref={durationRef} type="hidden" />
      {DIAGNOSTIC_QUESTIONS.filter((q) => RESCORE_KEYS.includes(q.key)).map((q) => (
        <div key={q.key} className="card">
          <p className="font-medium mb-3">{q.label}</p>
          <div className="space-y-2">
            {q.options.map((opt) => (
              <label key={opt} className="flex gap-2 text-sm">
                <input type="radio" required name={q.key} value={opt} className="accent-bank-700" />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button disabled={submitted} className="btn-primary w-full">Soumettre re-scoring</button>
    </form>
  );
}
