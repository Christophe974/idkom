import { DEMO_PASS_TOKEN, demoParticipant } from "./demo";
import type { PassParticipant } from "./types";

/**
 * Point d’entrée unique pour résoudre un jeton de Pass.
 *
 * V1 : seul le jeton « demo » existe.
 * Phase 2 : brancher PULSE (play.idkom.fr) ou Supabase ici, par exemple
 *   - lecture de `guests` par jeton signé,
 *   - missions / points / votes via les tables existantes.
 * Les pages et composants ne connaissent que `PassProvider`.
 */
export interface PassProvider {
  getParticipant(token: string): Promise<PassParticipant | null>;
}

export const demoPassProvider: PassProvider = {
  async getParticipant(token) {
    return token === DEMO_PASS_TOKEN ? demoParticipant : null;
  },
};

export function getPassProvider(): PassProvider {
  // if (process.env.PULSE_API_URL) return pulsePassProvider;
  return demoPassProvider;
}
