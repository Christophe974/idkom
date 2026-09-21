"use server";

import { getLeadStore } from "@/lib/noel/leads/store";
import type { SubmitState } from "@/lib/noel/leads/types";
import { hasErrors, parseLead } from "@/lib/noel/leads/validate";

export async function submitProposal(_prev: SubmitState, formData: FormData): Promise<SubmitState> {
  const { data, errors } = parseLead(formData);

  // Champ piège rempli = robot : on fait comme si, sans rien envoyer.
  if (data.website) return { status: "sent", reference: "" };

  if (hasErrors(errors)) return { status: "invalid", errors };

  const store = getLeadStore();
  if (!store) return { status: "not_configured" };

  try {
    const { reference } = await store.save(data);
    return { status: "sent", reference };
  } catch {
    return { status: "error" };
  }
}
