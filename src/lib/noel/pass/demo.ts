import type { PassParticipant } from "./types";

/** Jeton public de démonstration : /pass/demo */
export const DEMO_PASS_TOKEN = "demo";

/** Données FICTIVES, affichées comme telles. */
export const demoParticipant: PassParticipant = {
  token: DEMO_PASS_TOKEN,
  demo: true,
  firstName: "Christophe",
  company: "iDkom",
  table: 12,
  team: { name: "Les Braqueurs de Noël" },
  points: 120,
  event: { name: "Noël en bande organisée", venue: "Domaine les 12 Ponts" },
  nextMission: {
    number: 1,
    title: "Votre première mission vous attend au Chalet des Potions.",
    location: "Chalet des Potions",
  },
  programme: [
    { label: "Accueil aux chalets", state: "done" },
    { label: "Repas", state: "now" },
    { label: "Blind test", state: "next" },
    { label: "Le butin", state: "next" },
    { label: "Soirée dansante", state: "next" },
  ],
};
