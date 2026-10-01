/**
 * Petits faits amusants à partir d'une date de naissance (démo de l'inscription ludique).
 * Ce sont des estimations pour sourire, présentées comme telles sur la page.
 */

const ZODIAC = ["Singe", "Coq", "Chien", "Cochon", "Rat", "Buffle", "Tigre", "Lapin", "Dragon", "Serpent", "Cheval", "Chèvre"];
const DAYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

/** « 14/11/1986 » → Date, ou null si la saisie n'est pas (encore) une date valide et passée. */
export function parseFrenchDate(input: string, today = new Date()): Date | null {
  const m = input.trim().match(/^(\d{1,2})[/.\- ](\d{1,2})[/.\- ](\d{4})$/);
  if (!m) return null;
  const [d, mo, y] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(y, mo - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return null;
  if (date > today || y < 1900) return null;
  return date;
}

/** Saisie au clavier : on ajoute les « / » tout seuls (JJ/MM/AAAA). */
export function maskFrenchDate(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function birthdayFacts(birth: Date, today = new Date()) {
  let age = today.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
  if (beforeBirthday) age -= 1;

  const days = Math.floor((today.getTime() - birth.getTime()) / 86_400_000);
  // ~70 battements par minute : un ordre de grandeur, pas une mesure.
  const beats = days * 24 * 60 * 70;

  // Année chinoise approchée : avant début février, on compte l'année précédente.
  const cnYear = birth.getMonth() === 0 || (birth.getMonth() === 1 && birth.getDate() < 4) ? birth.getFullYear() - 1 : birth.getFullYear();

  const next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (next < today) next.setFullYear(today.getFullYear() + 1);

  return {
    age,
    days,
    beats,
    zodiac: ZODIAC[cnYear % 12],
    weekday: DAYS[birth.getDay()],
    month: MONTHS[birth.getMonth()],
    nextWeekday: DAYS[next.getDay()],
  };
}

/** 1 620 000 000 → « 1,6 milliard » */
export function roughBillions(n: number): string {
  if (n >= 1e9) {
    const v = (n / 1e9).toLocaleString("fr-FR", { maximumFractionDigits: 1 });
    return `${v} milliard${n >= 2e9 ? "s" : ""}`;
  }
  return `${Math.round(n / 1e6).toLocaleString("fr-FR")} millions`;
}
