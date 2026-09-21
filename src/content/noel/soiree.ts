import type { IconName } from "@/components/noel/ui/Icon";

export type Moment = { n: string; title: string; text: string; icon: IconName };

export const soiree: Moment[] = [
  { n: "01", title: "L’accueil", text: "Le portail, le groom, les quatre chalets. L’ambiance est posée avant même d’entrer en salle.", icon: "gate" },
  { n: "02", title: "Le repas", text: "Un vrai repas de fête, à table, au chaud. Le moment où l’on souffle et où l’on se parle.", icon: "plate" },
  { n: "03", title: "Les animations", text: "Des jeux entre les plats, en équipe ou en solo. On joue si on en a envie.", icon: "dice" },
  { n: "04", title: "Les blind tests", text: "Toute la salle vote depuis son Pass. Les tables s’affrontent, les voisins chantent faux.", icon: "music" },
  { n: "05", title: "Les défis", text: "Missions et duels entre invités, du portail jusqu’au dessert. Des points à gagner, des points à perdre.", icon: "target" },
  { n: "06", title: "Les photos", text: "La fabrique à souvenirs tourne toute la soirée. Les photos se retrouvent sur le Pass.", icon: "camera" },
  { n: "07", title: "La danse", text: "La piste s’ouvre. Personne ne regarde l’heure : le bus attend.", icon: "disco" },
  { n: "08", title: "Le butin", text: "Tirage au sort ou vente aux enchères ludique. Le seul casse où tout le monde repart avec quelque chose.", icon: "gift" },
];
