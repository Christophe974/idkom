/**
 * Tous les textes de la page /mariage, section par section.
 * Modifier ici : les composants ne contiennent pas de texte éditorial en dur
 * (seules les données de démonstration sont dans demo.ts).
 */

export const site = {
  path: "/mariage",
  name: "Le mariage iDkom",
  title: "Faire-part porte-clés et mariage connecté : avant, pendant, après",
  description:
    "Un porte-clés personnalisé envoyé comme faire-part. Il ouvre votre mariage : réponses des invités, budget, plan de table, jeux et rencontres le jour J, puis les photos et le souvenir. Fabriqué dans notre atelier.",
  contactEmail: "contact@idkom.fr",
  phone: "+33637754064",
  phoneDisplay: "06 37 75 40 64",
};

export const nav = [
  { href: "#avant", label: "Avant" },
  { href: "#jour-j", label: "Jour J" },
  { href: "#apres", label: "Après" },
  { href: "#difference", label: "La différence" },
] as const;

export const hero = {
  kicker: "Faire-part, organisation, fête, souvenirs",
  title: "Votre mariage commence bien avant le jour J.",
  lines: [
    "Un faire-part que vos invités garderont.",
    "Un espace qui vous accompagne.",
    "Une expérience qui continue le jour du mariage… et après.",
  ],
  ctaPrimary: { label: "Découvrir l’expérience", href: "#comment" },
  ctaSecondary: { label: "Voir comment ça marche", href: "#trois-moments" },
  phone: { names: "Sophie & Thomas", date: "14 juin 2027", line: "On se marie !", cta: "Serez-vous avec nous ?" },
  tapHint: "On approche le porte-clés. C’est tout.",
};

/** Le fil rouge en 4 temps : à comprendre en 10 secondes sur téléphone. */
export const conceptIntro = {
  kicker: "Le fil rouge",
  title: "Un seul objet. Toute l’histoire.",
  steps: [
    { n: "01", title: "Vos invités reçoivent un porte-clés", text: "Gravé à vos couleurs, glissé dans l’enveloppe. C’est le faire-part." },
    { n: "02", title: "Il ouvre votre mariage", text: "Ils l’approchent du téléphone : l’invitation s’affiche. Rien à télécharger." },
    { n: "03", title: "Il les accompagne le jour J", text: "Leur table, le programme, les jeux, les rencontres, leurs points." },
    { n: "04", title: "Il garde vos souvenirs", text: "Après la fête, le même geste ouvre la galerie et le récit de la journée." },
  ],
};

export const moments = {
  kicker: "La grande frise",
  title: "Un seul univers. Trois moments.",
  items: [
    {
      id: "avant",
      label: "Avant",
      title: "L’invitation et la préparation",
      text: "Le faire-part qu’on garde, les réponses qui arrivent toutes seules, le budget, le plan de table, les objets fabriqués pour vous.",
    },
    {
      id: "jour-j",
      label: "Jour J",
      title: "La fête, les rencontres, les jeux",
      text: "L’accueil, la table de chacun, les deux familles qui font connaissance, le DJ qui lance les défis, 100 photographes.",
    },
    {
      id: "apres",
      label: "Après",
      title: "Les photos et le souvenir",
      text: "La galerie qui arrive le lundi, le récap de votre journée, le livre du mariage. Et le porte-clés qui reste.",
    },
  ],
};

export const nfcTag = {
  kicker: "Avant · Le faire-part",
  title: "Tout commence par une invitation qu’on ne jette pas.",
  text: "Vous choisissez un modèle, vous nous dites combien de foyers vous invitez. Nous gravons et fabriquons chaque porte-clés dans notre atelier, à vos couleurs. Chaque foyer reçoit le sien, glissé dans l’enveloppe.",
  materials: ["Chêne & noyer", "Acrylique", "PVC", "Impression 3D", "Selon les collections"],
  scenario: {
    kicker: "Exemple",
    title: "La famille Martin ouvre l’enveloppe.",
    text: "Julie approche le porte-clés de son téléphone. L’invitation s’ouvre, à leur nom.",
  },
  cta: { label: "Voir les porte-clés", href: "#porte-cles" },
};

export const rsvp = {
  kicker: "Avant · Les réponses",
  title: "Serez-vous avec nous ?",
  text: "Un porte-clés par foyer, une réponse par personne. La famille Martin répond pour quatre en quelques secondes : qui vient, les enfants, les repas, les allergies.",
  hint: "Touchez les prénoms pour répondre à leur place.",
};

export const rsvpDashboard = {
  kicker: "Avant · Votre suivi",
  title: "Finis les tableaux Excel qui traînent partout.",
  text: "Chaque réponse arrive dans votre espace et vous prévient. Vous voyez en direct qui vient, qui ne vient pas, qui n’a pas encore répondu. Un porte-clés peut représenter toute une famille, mais chaque personne devient un invité à part entière.",
};

export const guestProfiles = {
  kicker: "Avant · Vos invités",
  title: "Chaque invité a sa fiche. Et elle servira.",
  text: "Vous pouvez préciser pour chacun le lien, le côté, la famille, une note privée. Ces petites informations serviront plus tard au plan de table, aux rencontres et aux jeux du jour J.",
  tags: [
    "Ami",
    "Collègue",
    "Famille",
    "Côté Sophie",
    "Côté Thomas",
    "Cousin",
    "Frère",
    "Sœur",
    "Grand-parent",
    "Ami d’enfance",
    "Témoin",
    "Voisin",
  ],
};

export const funBirthday = {
  kicker: "Avant · Une inscription déjà ludique",
  title: "Une date de naissance ? On en fait un petit moment.",
  text: "Quand un invité indique sa date de naissance, il ne remplit pas un formulaire : il découvre deux ou trois choses sur lui. Essayez avec la vôtre.",
  label: "Votre date de naissance",
  placeholder: "JJ/MM/AAAA",
  defaultValue: "14/11/1986",
  disclaimer: "Les battements de cœur sont une estimation pour sourire (environ 70 par minute), pas une mesure.",
};

export const organize = {
  kicker: "Avant · L’organisation",
  title: "Pendant que vos invités répondent, votre mariage prend forme.",
  text: "Le même espace vous sert à tout préparer. Pas un logiciel de plus : les quelques outils dont vous avez vraiment besoin, au même endroit que vos invités.",
  features: [
    { title: "Budget", text: "Prévu, engagé, payé, reste : sans tableur." },
    { title: "Prestataires", text: "Acomptes, soldes et échéances au même endroit." },
    { title: "Plan de table", text: "Glisser, déposer, ou laisser une proposition vous aider." },
    { title: "Invités", text: "Réponses, repas, allergies, enfants." },
  ],
};

export const budget = {
  kicker: "Budget",
  title: "Tout est centralisé. Même les acomptes.",
  text: "Prévisionnel, réel, acomptes, soldes, échéances, par prestataire et par catégorie. Vous savez toujours où vous en êtes.",
};

export const seating = {
  kicker: "Avant · Le plan de table",
  title: "Votre plan de table sans les Post‑it sur la table de la cuisine.",
  text: "Vous créez vos tables, leur capacité, leur nom. Vous placez vos invités. Et si vous bloquez, « Proposer un plan » répartit tout le monde en tenant compte des couples, des familles, des amis et de vos contraintes. Vous gardez toujours la main.",
  hint: "Sur ordinateur, glissez un prénom. Sur téléphone, touchez un prénom puis une table.",
  propose: "Proposer un plan",
  reset: "Tout reprendre",
};

export const shop = {
  kicker: "Avant · L’atelier",
  title: "Vous avez créé vos tables. Nous pouvons déjà fabriquer le reste.",
  text: "Votre espace connaît les prénoms, les tables, la date, vos couleurs. Notre atelier aussi. Marque-places, noms de table, menus, panneau de bienvenue : tout part de vos données et sort de nos machines, sans rien ressaisir.",
  products: [
    "Porte-clés",
    "Marque-places",
    "Chevalets",
    "Noms de table",
    "Menus",
    "Signalétique",
    "Panneau de bienvenue",
    "Urne",
    "Cadeaux invités",
    "Décoration",
    "Objets gravés",
    "Accessoires photobooth",
  ],
  previewLabel: "Aperçu généré depuis votre plan de table",
  cta: { label: "Découvrir les possibilités", href: "#creer" },
};

export const creative = {
  kicker: "Un exemple parmi d’autres",
  title: "Le tableau de vos invités.",
  text: "De petites silhouettes en bois, plusieurs morphologies, coiffures et tenues. Pendant la fête, chacun choisit celle qui lui ressemble, la colorie comme sa tenue du jour, écrit son prénom et la colle sur l’œuvre commune. Vous repartez avec le portrait de tous ceux qui étaient là.",
  note: "Une des animations fabriquées dans notre atelier.",
};

export const dayTransition = {
  kicker: "Jour J",
  title: "Et puis arrive le jour J.",
  text: "Tout ce que vous avez préparé se met à travailler pour vous. En coulisses.",
};

export const checkIn = {
  kicker: "Jour J · L’accueil",
  title: "Bienvenue François. Vous êtes à la table Marrakech.",
  text: "Si vous le souhaitez, l’accueil passe en mode check-in. On scanne le porte-clés ou le QR de l’invité : son prénom s’affiche, sa table aussi. Vous savez qui est vraiment arrivé.",
};

export const passport = {
  kicker: "Jour J · Le passeport invité",
  title: "Chaque invité a la journée dans sa poche.",
  text: "À partir du jour J, chaque personne devient participante. Sur son téléphone : sa table, le programme, les infos utiles, ses défis, ses points, les photos, et un peu des autres invités.",
  tabs: ["Ma table", "Programme", "Défis", "Photos"],
};

export const meet = {
  kicker: "Jour J · Briser la glace",
  title: "Et si votre mariage aidait aussi vos invités à se rencontrer ?",
  text: "Les deux familles ne se connaissent pas toujours. Les amis non plus. Deux invités rapprochent leurs téléphones et découvrent qui est l’autre. Puis on leur donne une bonne raison de rester discuter.",
  challenges: [
    { label: "Vous ne vous connaissiez pas. Photo ensemble", pts: 30 },
    { label: "Trouvez votre point commun", pts: 40 },
    { label: "Chifoumi. Le gagnant prend", pts: 20 },
  ],
};

export const points = {
  kicker: "Jour J · Les points",
  title: "Toute la soirée peut devenir un jeu.",
  text: "Chaque invité gagne des points, du cocktail à la dernière chanson. Le même score l’accompagne toute la soirée. Le classement s’affiche sur écran si vous le voulez, ou pas du tout.",
  events: [
    { pts: 30, label: "Rencontre avec un nouvel invité" },
    { pts: 50, label: "Bonne réponse au quiz" },
    { pts: 100, label: "Parmi les 10 premiers sur la piste" },
    { pts: 40, label: "Défi photo" },
    { pts: 80, label: "Blind test" },
    { pts: 20, label: "Défi surprise" },
  ],
};

export const dancefloor = {
  kicker: "Scène vécue",
  djLine: "« Les 10 premiers sur la piste prennent 100 points ! »",
  title: "Le téléphone lance. La piste se remplit.",
  text: "C’est tout l’esprit : le digital sert à déclencher quelque chose de réel. Personne ne reste les yeux sur son écran.",
  counterLabel: "places prises",
};

export const commonPoint = {
  kicker: "Scène vécue",
  djLine: "« François, Élodie, Maxime… vous avez quelque chose en commun. »",
  title: "Ils se cherchent. Ils trouvent.",
  text: "Les informations données au moment de répondre au faire-part deviennent des jeux. Personne n’a eu à remplir quoi que ce soit de plus.",
  reveal: "Révéler",
  answer: "Vous êtes tous nés en novembre !",
  pts: 50,
};

export const himHer = {
  kicker: "Jeu · Lui ou elle",
  title: "Qui a embrassé l’autre en premier ?",
  text: "Le DJ pose la question. Tous les invités votent sur leur téléphone. Le résultat s’affiche sur l’écran. Puis les mariés révèlent la vraie réponse.",
  him: "Lui",
  her: "Elle",
  answer: "Elle",
  reveal: "Les mariés révèlent",
};

export const blindTest = {
  kicker: "Jeu · Blind test",
  title: "Pas un blind test trouvé sur Internet. Le leur.",
  text: "Avant le mariage, vous choisissez vos morceaux et vous ajoutez une anecdote. Le jour J, le DJ lance le jeu, les invités répondent sur leur téléphone, le résultat s’affiche. La musique devient une façon de raconter votre histoire.",
};

export const wishlist = {
  kicker: "Pour le DJ",
  title: "Les morceaux qu’on aimerait vraiment entendre.",
  text: "Pas une playlist imposée : le DJ garde toute sa liberté. Il voit simplement les morceaux importants pour vous, vos souhaits, vos anecdotes, et coche ce qui est passé.",
};

export const djConsole = {
  kicker: "Pour le DJ",
  title: "Une petite régie dans la régie.",
  text: "Le DJ a son propre accès, séparé du vôtre. Il ne voit aucune donnée privée ni administrative : seulement les animations, les blind tests, vos souhaits musicaux, les défis, le classement et les boutons pour donner des points.",
};

export const guestPhotos = {
  kicker: "Jour J · Les photos",
  title: "100 invités. 100 photographes.",
  text: "Pendant le mariage, chacun envoie ses photos depuis son téléphone, sans rien installer. Elles arrivent dans une galerie privée. Rien n’est publié tant que vous ne l’avez pas décidé.",
};

export const after = {
  kicker: "Après",
  title: "Et quand tout le monde est rentré ?",
  text: "Le porte-clés continue de servir. Le lundi, vous choisissez vos photos préférées. Puis vous publiez la galerie.",
};

export const galleryRelease = {
  kicker: "Après · La galerie",
  title: "Les photos sont arrivées.",
  text: "Vos invités rapprochent à nouveau leur porte-clés du téléphone : la galerie du mariage s’ouvre. Pas de lien perdu dans un groupe de discussion.",
  coupleSide: "Votre côté",
  guestSide: "Côté invités",
  toggle: "Publier la galerie",
  before: "La galerie arrive bientôt",
  afterTitle: "Les photos sont arrivées ❤️",
};

export const wrapped = {
  kicker: "Après · Le récap",
  title: "Votre mariage, en chiffres qu’on a envie de partager.",
  text: "Un récapitulatif vivant de votre journée, à faire défiler et à partager.",
  swipe: "Faites défiler",
};

export const book = {
  kicker: "Après · Le souvenir",
  title: "Deux façons de garder votre mariage.",
  online: {
    title: "Le garder en ligne",
    text: "Photos, souvenirs, récap et données restent accessibles, à vous et à vos invités.",
  },
  printed: {
    title: "Créer votre livre du mariage",
    text: "Le document se compose tout seul : vos noms, la date, les invités, le plan de table, la galerie choisie, les moments forts, les jeux, la musique, les anecdotes. Gardez le PDF, imprimez-le ou faites-en un album.",
    cta: "Créer notre souvenir",
  },
};

export const nfcAfter = {
  title: "Et le porte-clés ? Il reste.",
  text: "Accroché aux clés de vos invités, il continue de donner accès aux souvenirs de votre mariage. Sa destination peut évoluer avec le temps, sans jamais toucher à l’objet.",
};

export const whyDifferent = {
  kicker: "Notre différence",
  title: "Ce n’est pas un site de mariage.",
  steps: [
    "C’est le faire-part.",
    "C’est l’organisation.",
    "C’est l’accueil.",
    "C’est le jeu.",
    "C’est la rencontre.",
    "C’est la fête.",
    "C’est la photo.",
    "Et finalement, c’est le souvenir.",
  ],
  closing: ["Un mariage connecté qui ne remplace jamais l’humain.", "Il lui donne simplement plus d’occasions de se rencontrer."],
  values: ["De l’émotion", "Du temps gagné", "De la simplicité", "Des souvenirs", "Une fête plus vivante", "Des invités qui se rencontrent"],
  valuesTitle: "Ce que vous y gagnez vraiment",
};

export const finalCta = {
  title: "Votre mariage n’aura lieu qu’une fois.",
  subtitle: "Autant commencer l’histoire dès l’invitation.",
  formTitle: "Nous parler de votre mariage",
  formText: "Quelques mots suffisent. On vous rappelle pour imaginer votre mariage ensemble, sans engagement.",
  submit: "Créer notre mariage",
  secondary: { label: "Voir les porte-clés", href: "#porte-cles" },
  fields: {
    names: "Vos prénoms",
    namesPlaceholder: "Sophie & Thomas",
    email: "E-mail",
    phone: "Téléphone (facultatif)",
    date: "Date du mariage (si vous l’avez)",
    datePlaceholder: "JJ/MM/AAAA",
    guests: "Nombre d’invités (environ)",
    message: "Ce qui compte pour vous",
    messagePlaceholder: "Le lieu, l’ambiance, vos envies, vos questions…",
  },
  sent: "Merci ! Votre message est bien arrivé. On vous rappelle très vite pour en parler.",
  error: "L’envoi n’a pas fonctionné. Réessayez, ou écrivez-nous directement :",
};
