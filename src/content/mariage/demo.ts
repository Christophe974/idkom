/**
 * Données fictives des démonstrations de la page /mariage.
 * Le mariage d'exemple : Sophie & Thomas, 14 juin 2027, 96 invités.
 */

export const couple = { a: "Sophie", b: "Thomas", date: "14 juin 2027" };

export type Presence = "present" | "absent";

export const household = {
  name: "Famille Martin",
  members: [
    { name: "François", feminine: false, presence: "present" as Presence, meal: "Adulte" },
    { name: "Julie", feminine: true, presence: "present" as Presence, meal: "Adulte · sans gluten" },
    { name: "Emma", feminine: true, presence: "present" as Presence, meal: "Enfant" },
    { name: "Lucas", feminine: false, presence: "absent" as Presence, meal: "Enfant" },
  ],
};

/** Chiffres du tableau de suivi AVANT la réponse des Martin. */
export const rsvpBase = {
  invited: 96,
  sentHouseholds: 41,
  answered: 58,
  present: 49,
  absent: 9,
  children: 11,
  allergies: 4,
};

export const guestProfile = {
  name: "François Martin",
  initials: "FM",
  presence: "Présent",
  side: "Côté Thomas",
  group: "Famille",
  relation: "Beau-frère",
  table: "Table à définir",
  birthday: "Novembre",
  household: "Famille Martin · 4 personnes",
  note: "Adore le rugby. À placer loin de l’oncle Gérard.",
};

export const budget = {
  planned: 22000,
  committed: 18420,
  paid: 11800,
  categories: [
    { label: "Lieu & traiteur", planned: 11500, paid: 6900 },
    { label: "Musique & DJ", planned: 2200, paid: 800 },
    { label: "Photo & vidéo", planned: 2600, paid: 1300 },
    { label: "Tenues", planned: 3100, paid: 2400 },
    { label: "Décoration & faire-part", planned: 2600, paid: 400 },
  ],
  nextDue: { label: "Solde traiteur", amount: 4600, date: "14 mai 2027" },
};

export type SeatGuest = { id: string; name: string; group: string };

/** Invités à placer (groupes = couples, familles, amis…). */
export const seatGuests: SeatGuest[] = [
  { id: "g1", name: "François", group: "Famille Martin" },
  { id: "g2", name: "Julie", group: "Famille Martin" },
  { id: "g3", name: "Emma", group: "Famille Martin" },
  { id: "g4", name: "Cyril", group: "Cousins de Sophie" },
  { id: "g5", name: "Laura", group: "Cousins de Sophie" },
  { id: "g6", name: "Élodie", group: "Amis de fac" },
  { id: "g7", name: "Maxime", group: "Amis de fac" },
  { id: "g8", name: "Inès", group: "Amis de fac" },
  { id: "g9", name: "Paul", group: "Collègues de Thomas" },
  { id: "g10", name: "Nadia", group: "Collègues de Thomas" },
  { id: "g11", name: "Gérard", group: "Oncles & tantes" },
  { id: "g12", name: "Monique", group: "Oncles & tantes" },
];

export const seatTables = [
  { id: "marrakech", name: "Marrakech", capacity: 4 },
  { id: "ibiza", name: "Ibiza", capacity: 3 },
  { id: "new-york", name: "New York", capacity: 3 },
  { id: "bali", name: "Bali", capacity: 4 },
];

/** Plan proposé : regroupe par groupe en respectant les capacités. */
export const proposedPlan: Record<string, string> = {
  g1: "marrakech",
  g2: "marrakech",
  g3: "marrakech",
  g11: "bali",
  g12: "bali",
  g4: "ibiza",
  g5: "ibiza",
  g6: "new-york",
  g7: "new-york",
  g8: "new-york",
  g9: "bali",
  g10: "bali",
};

export const placeCards = [
  { name: "François", table: "Marrakech" },
  { name: "Élodie", table: "New York" },
  { name: "Cyril", table: "Ibiza" },
  { name: "Monique", table: "Bali" },
];

export const meetPair = {
  a: { name: "François", role: "Beau-frère de Thomas", initials: "F" },
  b: { name: "Cyril", role: "Cousin de Sophie", initials: "C" },
};

export const leaderboard = [
  { name: "François", table: "Marrakech", pts: 1840 },
  { name: "Élodie", table: "New York", pts: 1620 },
  { name: "Cyril", table: "Ibiza", pts: 1490 },
  { name: "Nadia", table: "Bali", pts: 1310 },
  { name: "Maxime", table: "New York", pts: 1180 },
];

export const programme = [
  { time: "15:00", label: "Cérémonie laïque", place: "Le verger" },
  { time: "16:30", label: "Cocktail & rencontres", place: "La terrasse" },
  { time: "19:30", label: "Dîner", place: "La grange" },
  { time: "22:00", label: "Ouverture du bal", place: "La piste" },
];

export const himHerVotes = { her: 68, him: 32 };

export const blindTrack = {
  artist: "Coldplay",
  title: "Yellow",
  anecdote: "C’est le morceau qui passait lors de notre première soirée ensemble.",
  options: ["Coldplay — Yellow", "Oasis — Wonderwall", "Muse — Starlight", "Keane — Somewhere Only We Know"],
  answered: 87,
  right: 64,
};

export const wishlistTracks = [
  { artist: "Coldplay", title: "Yellow", tag: "Important", note: "Notre première soirée", played: true },
  { artist: "Gala", title: "Freed From Desire", tag: "Souhaité", note: "Pour les cousins", played: true },
  { artist: "Céline Dion", title: "Pour que tu m’aimes encore", tag: "Important", note: "La chanson de maman", played: false },
  { artist: "Daft Punk", title: "One More Time", tag: "Souhaité", note: "", played: false },
  { artist: "Earth, Wind & Fire", title: "September", tag: "Souhaité", note: "Ouverture de piste ?", played: false },
];

export const wrappedStats = [
  { value: "96", label: "invités" },
  { value: "1 486", label: "photos" },
  { value: "132", label: "défis relevés" },
  { value: "684", label: "rencontres" },
  { value: "287", label: "réponses au blind test" },
];

export const wrappedHighlights = [
  { label: "Table la plus joueuse", value: "Marrakech" },
  { label: "Chanson la plus réclamée", value: "Freed From Desire" },
  { label: "Champion des points", value: "François · 1 840 pts" },
];

export const bookPages = [
  "Sophie & Thomas · 14 juin 2027",
  "Nos 96 invités",
  "Le plan de table",
  "La galerie",
  "Les moments forts",
  "La musique & les anecdotes",
  "Les jeux & le classement",
];
