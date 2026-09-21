/**
 * Modèle du Pass participant.
 *
 * Il est volontairement proche de ce que PULSE (play.idkom.fr) manipule déjà :
 * `guests` (prénom, entreprise, table, équipe), `events`, missions/défis,
 * blind test (`blindtest_participants`), photos (`event_recap_photos`).
 * La phase 2 remplacera le fournisseur de démo par un fournisseur PULSE/Supabase
 * sans toucher aux composants d’affichage.
 */
export type ProgrammeState = "done" | "now" | "next";

export type PassParticipant = {
  token: string;
  /** Vrai quand les données sont fictives (aperçu public). */
  demo: boolean;
  firstName: string;
  company: string;
  table: number;
  team: { name: string };
  points: number;
  event: { name: string; venue: string };
  nextMission?: { number: number; title: string; location: string };
  programme: Array<{ label: string; state: ProgrammeState }>;
};
