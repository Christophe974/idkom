/**
 * « À la carte » : ce que l’on peut ajouter ou choisir pour composer la soirée.
 * Inspiré du déroulé type préparé par le Domaine (sept. 2026).
 * ⚠️ Aucun prix ici, aucun nom de prestataire : la page attire, la proposition chiffre.
 */
export type CarteGroup = {
  id: "table" | "salle" | "dehors" | "enfants";
  kicker: string;
  title: string;
  image: { src: string; alt: string };
  items: Array<{ name: string; text: string }>;
};

export const carte: CarteGroup[] = [
  {
    id: "table",
    kicker: "À table",
    title: "Quatre façons de passer à table",
    image: {
      src: "/noel/carte-table.jpg",
      alt: "Une table de fête : caquelon de fondue fumant, saumon fumé sur blinis, charcuterie, comté, bûche au chocolat et verres levés.",
    },
    items: [
      { name: "La fondue", text: "Un caquelon au milieu de la table, et tout le monde pioche." },
      { name: "La boîte chaude", text: "Le fromage coulant sorti du four, à la franc-comtoise." },
      {
        name: "Le buffet de Noël",
        text: "Saumon fumé, marbré de volaille au foie gras, chapon au vin jaune et morilles, fromages de la région, buffet de desserts.",
      },
      {
        name: "Le repas de gala",
        text: "Foie gras maison, sandre au vin jaune ou Saint-Jacques, pintade aux morilles ou pavé de bœuf, puis les bûches.",
      },
    ],
  },
  {
    id: "salle",
    kicker: "En salle",
    title: "Un spectacle, un casino, ou les deux",
    image: {
      src: "/noel/carte-salle.jpg",
      alt: "Un magicien déploie un jeu de cartes devant des collègues médusés, avec une table de roulette et son croupier en arrière-plan.",
    },
    items: [
      { name: "Le casino d’hiver", text: "Quatre tables de jeu, des croupiers, des jetons. Personne ne perd d’argent, tout le monde bluffe." },
      { name: "La magie de proximité", text: "Mentalisme et tours de cartes, à l’apéritif ou de table en table." },
      { name: "Les grandes illusions", text: "Une heure de mystère et d’humour sur scène. Le Père Noël passe juste après." },
      { name: "Le music-hall", text: "Ambiance cabaret et revue parisienne, en un spectacle ou par tableaux." },
      { name: "La kermesse de Noël", text: "Des stands, des lots, et des adultes plus mauvais joueurs que les enfants." },
      { name: "Le concert et le DJ", text: "De la musique live pour lancer la soirée, un DJ pour la finir." },
    ],
  },
  {
    id: "dehors",
    kicker: "Dehors",
    title: "Encore un chalet ?",
    image: {
      src: "/noel/carte-dehors.jpg",
      alt: "Un grand chalet ouvert sous la neige : des invités autour de tonneaux en bois partagent huîtres, toasts de foie gras et tartines grillées.",
    },
    items: [
      { name: "Le grand chalet gourmand", text: "Autour des tonneaux en bois : fondue, huîtres et foie gras, tartines grillées." },
      { name: "La musique dès le portail", text: "Le Domaine est sonorisé dehors. L’ambiance commence avant les chalets." },
      { name: "Le bus en mode Noël", text: "Décoré, en musique. La soirée démarre au premier arrêt." },
      {
        name: "Le porte-clé du départ",
        text: "Le groom reprend votre Pass et vous remet un porte-clé à vos initiales ou aux couleurs de votre entreprise.",
      },
    ],
  },
  {
    id: "enfants",
    kicker: "Pour les enfants",
    title: "Le Père Noël a son chalet",
    image: {
      src: "/noel/carte-enfants.jpg",
      alt: "Dans un chalet en bois, le Père Noël écoute une petite fille pendant qu’un photographe prend la photo souvenir.",
    },
    items: [
      { name: "Le chalet des enfants", text: "Le Père Noël y reçoit, dans son décor, sur des horaires pensés pour les petits." },
      { name: "La photo souvenir", text: "Un photographe immortalise la rencontre. La photo repart à la maison." },
      { name: "Les friandises", text: "De quoi patienter, et de quoi négocier avec les parents." },
      { name: "Les cadeaux", text: "Les vôtres ou ceux que l’on prépare pour vous, remis par le Père Noël." },
    ],
  },
];
