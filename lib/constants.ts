export const INSTITUTIONS = [
  "AFG Bank",
  "Banque Atlantique",
  "Banque Nationale d’Investissement (BNI)",
  "Witti Finances",
  "AMIFA",
  "UNACOOPEC",
  "DIFIN SA",
  "Bridge Microfinance",
  "BGFI Bank",
  "Orange Bank Africa"
] as const;

export const VIDEOS = {
  flux: { title: "Gérer son flux", id: "1nugT4XKaZX6QlhnPR-xVJ4exe_L1uInN", code: "KJ-FLUX" },
  budget: { title: "Construire un budget", id: "1Nzk_XKy0gbKVtOTfQl9pXANE_ZAoVuBp", code: "KJ-BUDGET" },
  surendettement: { title: "Éviter le surendettement", id: "1Gyn9iJWLkez7XmiFmn_3invLawW2tE2-", code: "KJ-SUR" },
  imprevus: { title: "Encaisser les imprévus", id: "1yBdxh8gO3TEylZ0CV2qZwS0ehXF1QiN8", code: "KJ-IMPR" },
  epargner: { title: "Comment épargner", id: "1OKfo9LQgyZpbGsbO14iriYmbfrl-iMvL", code: "KJ-EPAR" },
  besoins: { title: "Estimer ses besoins en financement", id: "1jXWA2TMZkC_7xBlXhfd899N5GEHNXIuk", code: "KJ-BESOIN" }
} as const;

export const LEARNING_PATHS = {
  red: ["flux", "budget", "surendettement", "imprevus", "epargner"],
  orange: ["flux", "surendettement", "imprevus"],
  green: ["imprevus", "besoins"]
} as const;

export type LearningLevel = keyof typeof LEARNING_PATHS;
