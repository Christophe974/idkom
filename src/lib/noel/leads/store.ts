import { BUS_OPTIONS, CHILDREN_OPTIONS, FORMULE_OPTIONS, type LeadInput } from "./types";

/**
 * Où vont les demandes de proposition : l’endpoint contact du CRM iDkom
 * (crm.idkom.fr/api/contact), déjà utilisé par le formulaire de contact du site.
 * Il enregistre le lead dans `cms_contact_submissions` et notifie par e-mail (Brevo).
 */
export interface LeadStore {
  save(lead: LeadInput): Promise<{ reference: string }>;
}

const CRM = process.env.NEXT_PUBLIC_CRM_URL || "https://crm.idkom.fr";

const label = (options: Array<{ value: string; label: string }>, value: string) =>
  options.find((o) => o.value === value)?.label ?? "Non précisé";

/** Message lisible pour la notification et la fiche CRM. */
export function buildLeadMessage(lead: LeadInput): string {
  const lines = [
    "Demande de proposition — Noël en bande organisée (Domaine les 12 Ponts)",
    "",
    `Entreprise : ${lead.company}`,
    `Contact : ${lead.firstName} ${lead.lastName}`,
    `E-mail : ${lead.email}`,
    `Téléphone : ${lead.phone || "Non précisé"}`,
    `Ville de départ : ${lead.departureCity || "Non précisée"}`,
    `Participants (estimation) : ${lead.headcount ?? "Non précisé"}`,
    `Formule : ${label(FORMULE_OPTIONS, lead.formule)}`,
    `Enfants : ${label(CHILDREN_OPTIONS, lead.children)}`,
    `Bus : ${label(BUS_OPTIONS, lead.bus)}`,
    "",
    "Message :",
    lead.message || "(aucun)",
  ];
  return lines.join("\n");
}

export const crmLeadStore: LeadStore = {
  async save(lead) {
    const res = await fetch(`${CRM}/api/contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: `${lead.firstName} ${lead.lastName}`.trim(),
        email: lead.email,
        phone: lead.phone || undefined,
        company: lead.company,
        subject: "Noël en bande organisée — demande de proposition",
        message: buildLeadMessage(lead),
        source: "noel-en-bande-organisee",
        website: lead.website,
      }),
      cache: "no-store",
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; id?: string; error?: string };
    if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
    return { reference: String(data.id ?? "") };
  },
};

export function getLeadStore(): LeadStore | null {
  return crmLeadStore;
}
