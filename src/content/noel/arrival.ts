import type { IconName } from "@/components/noel/ui/Icon";

export type ArrivalStep = {
  id: string;
  kind: "prologue" | "chalet";
  label: string;
  title: string;
  text: string;
  icon: IconName;
  image: { src: string; alt: string };
};

export const arrival: ArrivalStep[] = [
  {
    id: "bus",
    kind: "prologue",
    label: "Prologue",
    title: "Le bus",
    text: "Il vous dépose devant le portail. Personne ne conduit, tout le monde profite. Et il vous ramène.",
    icon: "bus",
    image: { src: "/noel/arrivee-bus.jpg", alt: "Un bus arrêté de nuit devant le portail du Domaine, phares allumés, les premiers passagers en descendent." },
  },
  {
    id: "portail",
    kind: "prologue",
    label: "Prologue",
    title: "Le portail",
    text: "Le Domaine est ouvert. Un groom en tenue bordeaux vous attend, les Pass à la main.",
    icon: "gate",
    image: { src: "/noel/arrivee-portail.jpg", alt: "Un groom en tenue bordeaux accueille au portail une bande de collègues et d’enfants en pulls de Noël, chalets éclairés derrière eux." },
  },
  {
    id: "chalet-1",
    kind: "chalet",
    label: "Chalet 01",
    title: "Le check-in",
    text: "Le groom vérifie la liste et vous remet votre Pass du Domaine les 12 Ponts. Vous faites officiellement partie de la bande.",
    icon: "pass",
    image: { src: "/noel/chalet-1.jpg", alt: "Au comptoir d’un chalet en bois, le groom remet un Pass avec QR code à une participante souriante." },
  },
  {
    id: "chalet-2",
    kind: "chalet",
    label: "Chalet 02",
    title: "Le comptoir des potions",
    text: "Vin chaud, chocolat chaud, cocktail avec ou sans alcool. De quoi se réchauffer les mains et délier les langues.",
    icon: "mug",
    image: { src: "/noel/chalet-2.jpg", alt: "Le comptoir des potions : vin chaud fumant, chocolat chaud à la crème et deux collègues qui se réchauffent les mains." },
  },
  {
    id: "chalet-3",
    kind: "chalet",
    label: "Chalet 03",
    title: "La fabrique à souvenirs",
    text: "Photo, badge, boule de Noël, porte-clés ou goodies à votre nom. Le premier butin de la soirée.",
    icon: "camera",
    image: { src: "/noel/chalet-3.jpg", alt: "La fabrique à souvenirs : photos instantanées suspendues, boules de Noël et porte-clés personnalisés, un enfant choisit sa boule avec sa mère." },
  },
  {
    id: "chalet-4",
    kind: "chalet",
    label: "Chalet 04",
    title: "Le bureau des défis",
    text: "Vous scannez votre Pass : une première mission, une énigme ou un mini-jeu vous attend. Ou pas, si vous préférez filer à table.",
    icon: "qr",
    image: { src: "/noel/chalet-4.jpg", alt: "Au bureau des défis, un participant scanne le QR code de son Pass avec son téléphone, une enveloppe scellée posée devant lui." },
  },
];
