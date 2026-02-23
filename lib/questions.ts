export const DIAGNOSTIC_QUESTIONS = [
  { key: "q1", label: "Q1. Séparez-vous l’argent personnel et l’argent d’activité ?", options: ["Toujours", "Parfois", "Non"] },
  { key: "q2", label: "Q2. Suivez-vous vos flux chaque semaine ?", options: ["Chaque semaine", "Parfois", "Non"] },
  { key: "q3", label: "Q3. Calculez-vous votre marge régulièrement ?", options: ["Toujours", "Parfois", "Non"] },
  { key: "q4", label: "Q4. Utilisez-vous un crédit pour rembourser un autre crédit ?", options: ["Jamais", "Une fois", "Plusieurs fois"] },
  { key: "q5", label: "Q5. Retard de paiement >= 15 jours ?", options: ["Jamais", "Une fois", "2+ fois"] },
  { key: "q6", label: "Q6. Comparez-vous les offres avant un crédit ?", options: ["Toujours", "Parfois", "Jamais"] },
  { key: "q7", label: "Q7. Épargne d’urgence disponible ?", options: [">= 1 mois", "< 1 mois", "Aucune"] },
  { key: "q8", label: "Q8. Si les ventes chutent ?", options: ["J’ajuste + je planifie", "J’emprunte", "Je retarde les paiements"] },
  { key: "q9", label: "Q9. Crédit vs urgence", options: ["Je garde l’objet du crédit", "J’utilise une partie", "Je l’utilise surtout pour l’urgence"] },
  { key: "q10", label: "Q10. Client veut achat à crédit", options: ["Limites + règles", "J’accepte sans règles", "J’accepte même risqué"] },
  { key: "q11", label: "Q11. Connaissance d’un retard de 45 jours", options: ["Pénalité + historique", "Pénalité seulement", "Pas de risque"] },
  { key: "q12", label: "Q12. Contrôle attention (choisir “Parfois”)", options: ["Toujours", "Parfois", "Jamais"] }
] as const;

export const SCORE_KEYS: Record<string, [string, string, string]> = {
  q1: ["Toujours", "Parfois", "Non"],
  q2: ["Chaque semaine", "Parfois", "Non"],
  q3: ["Toujours", "Parfois", "Non"],
  q4: ["Jamais", "Une fois", "Plusieurs fois"],
  q5: ["Jamais", "Une fois", "2+ fois"],
  q6: ["Toujours", "Parfois", "Jamais"],
  q7: [">= 1 mois", "< 1 mois", "Aucune"],
  q8: ["J’ajuste + je planifie", "J’emprunte", "Je retarde les paiements"],
  q9: ["Je garde l’objet du crédit", "J’utilise une partie", "Je l’utilise surtout pour l’urgence"],
  q10: ["Limites + règles", "J’accepte sans règles", "J’accepte même risqué"],
  q11: ["Pénalité + historique", "Pénalité seulement", "Pas de risque"],
  q12: ["Toujours", "Parfois", "Jamais"]
};

export function mapAnswer(key: string, value: string): "best" | "mid" | "low" {
  const [best, mid] = SCORE_KEYS[key];
  if (value === best) return "best";
  if (value === mid) return "mid";
  return "low";
}
