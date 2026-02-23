"use client";

import { useMemo, useState } from "react";

type Video = { key: string; title: string; id: string; code: string };

export function LearningFlow({ sessionId, videos }: { sessionId: string; videos: Video[] }) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [quiz, setQuiz] = useState<Record<string, string>>({});
  const allDone = useMemo(() => videos.every((v) => completed[v.key]), [videos, completed]);

  async function validateCode(video: Video) {
    const ok = (inputs[video.key] || "").trim().toUpperCase() === video.code;
    if (!ok) return alert("Code invalide");
    const next = { ...completed, [video.key]: true };
    setCompleted(next);
    await fetch("/api/learning/video", {
      method: "POST",
      body: JSON.stringify({ sessionId, completed: next })
    });
  }

  async function finishLearning() {
    const score = Object.values(quiz).filter((v) => v === "ok").length * 20;
    await fetch("/api/learning/finish", {
      method: "POST",
      body: JSON.stringify({ sessionId, quizScore: score, videosCompletedCount: Object.keys(completed).length })
    });
    alert("Parcours terminé");
  }

  return (
    <div className="space-y-6">
      {videos.map((video) => (
        <div key={video.key} className="card space-y-3">
          <h3 className="font-semibold">{video.title}</h3>
          <iframe className="w-full aspect-video rounded-md" src={`https://drive.google.com/file/d/${video.id}/preview`} allow="autoplay" />
          <a className="text-sm underline" target="_blank" href={`https://drive.google.com/file/d/${video.id}/view`} rel="noreferrer">
            Ouvrir le lien alternatif
          </a>
          <div className="flex gap-2">
            <input
              className="input"
              placeholder="Code de validation"
              value={inputs[video.key] || ""}
              onChange={(e) => setInputs((s) => ({ ...s, [video.key]: e.target.value }))}
            />
            <button type="button" className="btn-primary" onClick={() => validateCode(video)}>
              Valider
            </button>
          </div>
          {completed[video.key] && <p className="text-green-700 text-sm">Vidéo complétée.</p>}
        </div>
      ))}

      {allDone && (
        <div className="card space-y-3">
          <h3 className="font-semibold">Quiz final (5 questions)</h3>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx}>
              <label className="text-sm">Q{idx + 1}</label>
              <select className="input" value={quiz[`q${idx}`] || ""} onChange={(e) => setQuiz((s) => ({ ...s, [`q${idx}`]: e.target.value }))}>
                <option value="">Choisir</option>
                <option value="ok">Bonne réponse</option>
                <option value="ko">Mauvaise réponse</option>
              </select>
            </div>
          ))}
          <button type="button" className="btn-primary" onClick={finishLearning}>Finish Learning</button>
        </div>
      )}
    </div>
  );
}
