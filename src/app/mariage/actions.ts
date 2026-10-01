"use server";

import { parseWeddingLead, sendWeddingLead, type WeddingLeadState } from "@/lib/mariage/leads";

export async function submitWeddingLead(_prev: WeddingLeadState, formData: FormData): Promise<WeddingLeadState> {
  const { data, errors } = parseWeddingLead(formData);
  // Champ piège rempli = robot : on fait comme si, sans rien envoyer.
  if (data.website) return { status: "sent" };
  if (Object.keys(errors).length) return { status: "invalid", errors };
  try {
    await sendWeddingLead(data);
    return { status: "sent" };
  } catch {
    return { status: "error" };
  }
}
