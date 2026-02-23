export type Risk = "red" | "orange" | "green";

const pointsMap: Record<string, number> = {
  best: 10,
  mid: 5,
  low: 0
};

export function computeRisk(score: number): Risk {
  if (score < 50) return "red";
  if (score < 75) return "orange";
  return "green";
}

export function computeScore(answers: Record<string, string>, count = 11): number {
  let total = 0;
  for (let i = 1; i <= count; i += 1) {
    const v = answers[`q${i}`];
    if (v === "best") total += pointsMap.best;
    else if (v === "mid") total += pointsMap.mid;
  }
  return Math.max(0, Math.min(100, total));
}

export function computeConfidence(answers: Record<string, string>, duration: number): "A" | "B" | "C" {
  let confidence = 100;
  if (answers.q12 !== "mid") confidence -= 30;
  if (duration < 120) confidence -= 20;

  const allBest = Array.from({ length: 11 }, (_, idx) => answers[`q${idx + 1}`]).every((v) => v === "best");
  if (allBest && duration < 180) confidence -= 20;

  const contradiction =
    (answers.q2 === "best" && answers.q3 === "low") ||
    (answers.q1 === "best" && answers.q9 === "low");
  if (contradiction) confidence -= 20;

  if (confidence >= 80) return "A";
  if (confidence >= 60) return "B";
  return "C";
}

export function explanationForRisk(risk: Risk): string {
  if (risk === "red") return "Votre profil indique des vulnérabilités élevées. Suivez le parcours complet prioritaire.";
  if (risk === "orange") return "Votre profil est intermédiaire. Renforcez les bases pour réduire les risques.";
  return "Votre profil est solide. Maintenez les bonnes pratiques et optimisez vos décisions.";
}
