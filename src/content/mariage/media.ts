/**
 * Médias de la page /mariage, rangés par emplacement.
 *
 * Chaque emplacement a un identifiant stable (HERO_NFC, RSVP_SCREEN…) repris dans le code
 * via <MediaSlot id="…"> et l'attribut data-media-slot (repérable dans l'inspecteur).
 *
 * Pour remplacer un média : déposer le fichier dans public/mariage/ et changer `src`.
 * - kind "photo" : visuel provisoire généré (Magnific) en attendant la vraie photo.
 * - kind "screen" : écran du produit. Tant que `src` est vide, la page affiche une
 *   démonstration codée (interactive). Dès qu'une vraie capture existe, renseigner `src` :
 *   la capture remplace la démo sans toucher au reste.
 */
export type MediaSlotId =
  | "HERO_NFC"
  | "INVITATION_HOME"
  | "NFC_COLLECTION"
  | "RSVP_SCREEN"
  | "GUEST_PROFILE_SCREEN"
  | "BUDGET_SCREEN"
  | "SEATING_PLAN_SCREEN"
  | "SHOP_PRODUCTS"
  | "SILHOUETTES_PRODUCT"
  | "WEDDING_DAY"
  | "CHECKIN_SCREEN"
  | "MEET_GUESTS"
  | "GAME_SCREEN"
  | "DANCEFLOOR"
  | "DJ_SCREEN"
  | "GUEST_PHOTOS"
  | "AFTER_MORNING"
  | "PHOTO_GALLERY_SCREEN"
  | "WEDDING_WRAPPED_SCREEN"
  | "WEDDING_BOOK";

export type MediaEntry = {
  kind: "photo" | "screen";
  /** Chemin public (ex. /mariage/hero.jpg). Vide = démo codée affichée à la place. */
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  /** Ce qu'il faudra produire pour la version définitive. */
  brief: string;
  /** provisoire = image générée ; final = vraie photo/capture validée. */
  status: "provisoire" | "final" | "a-produire";
};

export const media: Record<MediaSlotId, MediaEntry> = {
  HERO_NFC: {
    kind: "photo",
    src: "/mariage/hero-faire-part.jpg",
    width: 1350,
    height: 1800,
    alt: "Un porte-clés en chêne gravé « S & T » posé sur une enveloppe en papier coton, avec un brin d'olivier.",
    brief: "Photo atelier : vrai porte-clés gravé xTool posé sur l'enveloppe du faire-part, lumière du matin.",
    status: "provisoire",
  },
  INVITATION_HOME: {
    kind: "photo",
    src: "/mariage/avant-famille.jpg",
    width: 1800,
    height: 1200,
    alt: "Une famille autour de la table de la cuisine découvre le faire-part en approchant le porte-clés du téléphone.",
    brief: "Photo d'une vraie famille qui reçoit le faire-part et approche le porte-clés du téléphone (cuisine, lumière naturelle).",
    status: "provisoire",
  },
  NFC_COLLECTION: {
    kind: "photo",
    src: "/mariage/porte-cles-collection.jpg",
    width: 1800,
    height: 1200,
    alt: "Six porte-clés de mariage : chêne, noyer, acrylique terracotta, acrylique givré, blanc et impression 3D vert sauge.",
    brief: "Packshot de la collection réelle (bois, acrylique, PVC, impression 3D) sur lin, à l'atelier.",
    status: "provisoire",
  },
  RSVP_SCREEN: {
    kind: "screen",
    alt: "Réponse d'un foyer et tableau de suivi des réponses.",
    brief: "Capture de la page de réponse d'un foyer (téléphone) + tableau de suivi des mariés.",
    status: "a-produire",
  },
  GUEST_PROFILE_SCREEN: {
    kind: "screen",
    alt: "Fiche invité de François Martin.",
    brief: "Capture d'une fiche invité côté mariés (lien, côté, table, notes).",
    status: "a-produire",
  },
  BUDGET_SCREEN: {
    kind: "screen",
    alt: "Budget du mariage : prévu, engagé, payé, reste.",
    brief: "Capture du module budget (synthèse + échéances).",
    status: "a-produire",
  },
  SEATING_PLAN_SCREEN: {
    kind: "screen",
    alt: "Plan de table avec les tables Marrakech, Ibiza, New York et Bali.",
    brief: "Capture ou courte vidéo du plan de table en glisser-déposer + « Proposer un plan ».",
    status: "a-produire",
  },
  SHOP_PRODUCTS: {
    kind: "photo",
    src: "/mariage/boutique-table.jpg",
    width: 1800,
    height: 1200,
    alt: "Une table de mariage dressée avec marque-places en bois gravé, menus en acrylique et urne gravée.",
    brief: "Photo d'une vraie table habillée par l'atelier : marque-places, nom de table, menus, urne.",
    status: "provisoire",
  },
  SILHOUETTES_PRODUCT: {
    kind: "photo",
    src: "/mariage/silhouettes.jpg",
    width: 1350,
    height: 1800,
    alt: "Une œuvre collective faite de petites silhouettes en bois coloriées par les invités.",
    brief: "Photo du vrai tableau de silhouettes (gros plan + vue d'ensemble), fabriqué à l'atelier.",
    status: "provisoire",
  },
  WEDDING_DAY: {
    kind: "photo",
    src: "/mariage/jour-j-piste.jpg",
    width: 1800,
    height: 1013,
    alt: "La piste de danse se remplit sous les guirlandes lumineuses, le DJ et l'écran au fond.",
    brief: "Photo ou vidéo courte d'un vrai mariage animé : piste, DJ, écran du classement.",
    status: "provisoire",
  },
  CHECKIN_SCREEN: {
    kind: "screen",
    alt: "Écran d'accueil : Bienvenue François, table Marrakech.",
    brief: "Photo de l'accueil avec la tablette de check-in en situation.",
    status: "a-produire",
  },
  MEET_GUESTS: {
    kind: "photo",
    src: "/mariage/rencontre.jpg",
    width: 1350,
    height: 1800,
    alt: "Deux invités qui viennent de se rencontrer rient en rapprochant leurs téléphones.",
    brief: "Photo de deux invités qui se scannent pendant le cocktail.",
    status: "provisoire",
  },
  GAME_SCREEN: {
    kind: "screen",
    alt: "Jeu Lui ou Elle sur le téléphone des invités et sur l'écran.",
    brief: "Capture du jeu (téléphone) + photo de l'écran en salle pendant le vote.",
    status: "a-produire",
  },
  DANCEFLOOR: {
    kind: "photo",
    src: "/mariage/jour-j-piste.jpg",
    width: 1800,
    height: 1013,
    alt: "Les invités courent sur la piste de danse pendant que le DJ lance le défi.",
    brief: "Vidéo 6-8 s : le DJ annonce, les invités se ruent sur la piste, compteur à l'écran.",
    status: "provisoire",
  },
  DJ_SCREEN: {
    kind: "screen",
    alt: "La régie du DJ : animations, blind test, souhaits musicaux, points.",
    brief: "Capture de la régie DJ sur tablette, idéalement photographiée sur la table de mix.",
    status: "a-produire",
  },
  GUEST_PHOTOS: {
    kind: "photo",
    src: "/mariage/photos-invites.jpg",
    width: 1350,
    height: 1800,
    alt: "Des invités photographient les mariés qui dansent sous les guirlandes.",
    brief: "Photo prise par-dessus l'épaule d'un invité qui photographie les mariés.",
    status: "provisoire",
  },
  AFTER_MORNING: {
    kind: "photo",
    src: "/mariage/apres-lendemain.jpg",
    width: 1800,
    height: 1200,
    alt: "Le lendemain, un couple en pull regarde les photos sur un téléphone, le bouquet sèche dans un bocal.",
    brief: "Photo du couple le lundi matin, bouquet qui sèche, porte-clés sur la table basse.",
    status: "provisoire",
  },
  PHOTO_GALLERY_SCREEN: {
    kind: "screen",
    alt: "Galerie privée puis publiée : les photos sont arrivées.",
    brief: "Capture de la galerie côté mariés (sélection) puis côté invité (publiée).",
    status: "a-produire",
  },
  WEDDING_WRAPPED_SCREEN: {
    kind: "screen",
    alt: "Récapitulatif du mariage de Sophie et Thomas en cartes à faire défiler.",
    brief: "Exports réels du récapitulatif (format story 9:16), à partager sur Instagram.",
    status: "a-produire",
  },
  WEDDING_BOOK: {
    kind: "screen",
    alt: "Le livre du mariage généré : couverture, plan de table, galerie, moments forts.",
    brief: "Photo du livre imprimé ouvert + aperçu PDF de quelques pages.",
    status: "a-produire",
  },
};
