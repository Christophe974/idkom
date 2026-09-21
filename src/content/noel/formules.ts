export type Formule = {
  id: "privee" | "partagee";
  kicker: string;
  title: string;
  text: string;
  points: string[];
  image: { src: string; alt: string };
};

export const formules: Formule[] = [
  {
    id: "privee",
    kicker: "Soirée privée",
    title: "Le Domaine rien que pour vous",
    text: "Vous réservez le Domaine les 12 Ponts en entier. Vos équipes, vos familles si vous le souhaitez, votre programme. Le parcours des chalets, le repas, les animations et la soirée dansante sont taillés pour vous.",
    points: [
      "Le lieu, la date et le programme rien qu’à vous",
      "Repas, animations et blind test à votre nom",
      "Avec ou sans enfants, selon votre choix",
    ],
    image: {
      src: "/noel/formule-privee.jpg",
      alt: "La grande salle de réception du Domaine dressée pour une seule entreprise : longues tables, bougies et guirlandes ambrées sous les poutres.",
    },
  },
  {
    id: "partagee",
    kicker: "Soirée partagée",
    title: "Votre table au milieu de la bande",
    text: "Vous réservez une ou plusieurs tables lors d’une grande soirée interentreprises. Même décor, même repas, mêmes animations, même ambiance. Sans payer seuls la privatisation du lieu.",
    points: [
      "Dès 5 personnes, une table à votre nom",
      "L’ambiance d’une grande soirée, sans son budget",
      "Votre équipe joue contre les autres tables",
    ],
    image: {
      src: "/noel/formule-partagee.jpg",
      alt: "Une table de six collègues qui trinquent au premier plan, au milieu d’une grande salle pleine d’autres tables d’entreprises.",
    },
  },
];
