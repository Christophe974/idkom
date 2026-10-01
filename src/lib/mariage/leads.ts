/**
 * Demandes « Créer notre mariage » : envoyées à l'endpoint contact du CRM iDkom
 * (crm.idkom.fr/api/contact, même chemin que la page Noël), qui enregistre la demande
 * dans cms_contact_submissions et prévient par e-mail (Brevo).
 */

export type WeddingLead = {
  names: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  message: string;
  website: string; // champ piège anti-robots
};

export type WeddingLeadState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<keyof WeddingLead, string>> }
  | { status: "sent" }
  | { status: "error" };

const CRM = process.env.NEXT_PUBLIC_CRM_URL || "https://crm.idkom.fr";

export function parseWeddingLead(fd: FormData): { data: WeddingLead; errors: Partial<Record<keyof WeddingLead, string>> } {
  const get = (k: string) => String(fd.get(k) ?? "").trim().slice(0, 2000);
  const data: WeddingLead = {
    names: get("names"),
    email: get("email"),
    phone: get("phone"),
    date: get("date"),
    guests: get("guests"),
    message: get("message"),
    website: get("website"),
  };
  const errors: Partial<Record<keyof WeddingLead, string>> = {};
  if (data.names.length < 2) errors.names = "Dites-nous vos prénoms.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Cette adresse e-mail ne semble pas valide.";
  if (data.date && !/^\d{2}\/\d{2}\/\d{4}$/.test(data.date)) errors.date = "Format attendu : JJ/MM/AAAA.";
  return { data, errors };
}

export async function sendWeddingLead(lead: WeddingLead): Promise<void> {
  const message = [
    "Demande « Créer notre mariage » (page /mariage)",
    "",
    `Prénoms : ${lead.names}`,
    `E-mail : ${lead.email}`,
    `Téléphone : ${lead.phone || "Non précisé"}`,
    `Date du mariage : ${lead.date || "Non précisée"}`,
    `Invités (environ) : ${lead.guests || "Non précisé"}`,
    "",
    "Message :",
    lead.message || "(aucun)",
  ].join("\n");

  const res = await fetch(`${CRM}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: lead.names,
      email: lead.email,
      phone: lead.phone || undefined,
      subject: "Mariage — Créer notre mariage",
      message,
      source: "mariage",
      website: lead.website,
    }),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
  if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
}
