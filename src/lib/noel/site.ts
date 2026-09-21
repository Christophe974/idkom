/**
 * Informations de base de la page « Noël en bande organisée ».
 * Coordonnées du Domaine relevées sur https://les12ponts.com/fr/ (21 sept. 2026).
 * ⚠️ Aucune date ni aucun tarif tant qu’ils ne sont pas validés.
 */
export const site = {
  name: "Noël en bande organisée",
  tagline: "Cette année, le repas de Noël a un plan.",
  venue: "Domaine les 12 Ponts",
  path: "/noel-en-bande-organisee",
  organizer: {
    name: "iDkom",
    url: "https://www.idkom.fr",
    email: "contact@idkom.fr",
    phone: "+33637754064",
    phoneDisplay: "06 37 75 40 64",
  },
  partner: {
    name: "Domaine les 12 Ponts",
    url: "https://les12ponts.com/fr/",
    urlDisplay: "les12ponts.com",
    address: { street: "D89 – Route d’Esprels", postalCode: "70110", city: "Pont-sur-l’Ognon" },
    phone: "+33681686164",
    phoneDisplay: "06 81 68 61 64",
    email: "contact@les12ponts.com",
    socials: [
      { label: "Facebook", url: "https://www.facebook.com/domaineles12ponts" },
      { label: "Instagram", url: "https://www.instagram.com/domaineles12ponts/" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/domaine-les-12-ponts/" },
    ],
  },
  cities: ["Belfort", "Montbéliard", "Vesoul"],
  region: "Franche-Comté",
  headcount: { min: 5, max: 200 },
  description:
    "Soirée de Noël entreprise et CSE au Domaine les 12 Ponts : parcours de chalets, repas, animations, blind test et danse. Soirée privée ou table partagée, de 5 à 200 personnes.",
  locale: "fr_FR",
} as const;

/** URL publique de la page (toujours la prod, pour canonical et JSON-LD). */
export const PAGE_URL = `${site.organizer.url}${site.path}`;

/** Base du site selon l’environnement (QR de démo en local, prod sinon). */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  if (process.env.NODE_ENV === "development") return "http://localhost:3030";
  return site.organizer.url;
}

export function absoluteUrl(path: string): string {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
