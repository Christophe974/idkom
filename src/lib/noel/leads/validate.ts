import type { LeadErrors, LeadInput } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+0-9][0-9 .()-]{6,}$/;

function str(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/** Lit un FormData et renvoie les valeurs normalisées + les erreurs. */
export function parseLead(fd: FormData): { data: LeadInput; errors: LeadErrors } {
  const rawHeadcount = str(fd, "headcount");
  const headcount = rawHeadcount === "" ? null : Number(rawHeadcount);

  const data: LeadInput = {
    company: str(fd, "company"),
    lastName: str(fd, "lastName"),
    firstName: str(fd, "firstName"),
    email: str(fd, "email"),
    phone: str(fd, "phone"),
    departureCity: str(fd, "departureCity"),
    headcount: Number.isFinite(headcount) ? headcount : null,
    children: str(fd, "children") as LeadInput["children"],
    formule: str(fd, "formule") as LeadInput["formule"],
    bus: str(fd, "bus") as LeadInput["bus"],
    message: str(fd, "message"),
    consent: fd.get("consent") === "on",
    website: str(fd, "website"),
  };

  const errors: LeadErrors = {};
  if (!data.company) errors.company = "Indiquez le nom de votre entreprise.";
  if (!data.lastName) errors.lastName = "Votre nom est nécessaire.";
  if (!data.firstName) errors.firstName = "Votre prénom est nécessaire.";
  if (!data.email) errors.email = "Une adresse e-mail est nécessaire pour vous répondre.";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Cette adresse e-mail ne semble pas valide.";
  if (data.phone && !PHONE_RE.test(data.phone)) errors.phone = "Ce numéro ne semble pas valide.";
  if (data.headcount === null) errors.headcount = "Donnez une estimation, même approximative.";
  else if (data.headcount < 1 || data.headcount > 2000) errors.headcount = "Entre 1 et 2 000 personnes.";
  if (!data.formule) errors.formule = "Choisissez une formule, ou « Je ne sais pas encore ».";
  if (!data.consent) errors.consent = "Nous avons besoin de votre accord pour vous répondre.";

  return { data, errors };
}

export function hasErrors(errors: LeadErrors): boolean {
  return Object.keys(errors).length > 0;
}
