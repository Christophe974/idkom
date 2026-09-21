export type FormuleChoice = "privee" | "partagee" | "indecis";
export type TriState = "oui" | "non" | "a-voir";

export type LeadInput = {
  company: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  departureCity: string;
  headcount: number | null;
  children: TriState | "";
  formule: FormuleChoice | "";
  bus: TriState | "";
  message: string;
  consent: boolean;
  /** Champ piège anti-robots : doit rester vide. */
  website: string;
};

export type LeadErrors = Partial<Record<keyof LeadInput, string>>;

export type SubmitState =
  | null
  | { status: "invalid"; errors: LeadErrors }
  | { status: "not_configured" }
  | { status: "sent"; reference: string }
  | { status: "error" };

export const FORMULE_OPTIONS: Array<{ value: FormuleChoice; label: string }> = [
  { value: "privee", label: "Soirée privée" },
  { value: "partagee", label: "Soirée partagée" },
  { value: "indecis", label: "Je ne sais pas encore" },
];

export const CHILDREN_OPTIONS: Array<{ value: TriState; label: string }> = [
  { value: "oui", label: "Oui" },
  { value: "non", label: "Non" },
  { value: "a-voir", label: "Peut-être" },
];

export const BUS_OPTIONS: Array<{ value: TriState; label: string }> = [
  { value: "oui", label: "Oui" },
  { value: "non", label: "Non" },
  { value: "a-voir", label: "À voir" },
];
