import { notFound } from "next/navigation";
import { LEARNING_PATHS, LearningLevel, VIDEOS } from "@/lib/constants";
import { LearningFlow } from "@/components/LearningFlow";

export default function LearningPage({ params, searchParams }: { params: { level: LearningLevel }; searchParams: { id?: string } }) {
  const level = params.level;
  if (!(level in LEARNING_PATHS)) notFound();
  const sessionId = searchParams.id;
  if (!sessionId) return <p>Session manquante.</p>;

  const videos = LEARNING_PATHS[level].map((k) => ({ key: k, ...VIDEOS[k] }));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Parcours {level.toUpperCase()}</h1>
      <LearningFlow sessionId={sessionId} videos={videos} />
    </div>
  );
}
