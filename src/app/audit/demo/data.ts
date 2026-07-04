// Données fictives mais réalistes pour la page-démo d'audit (vitrine commerciale).
// Prospect type croisé sur un salon PRO : une métallerie BTP avec un vieux site WordPress.
// V2 : enrichi à partir d'une analyse multi-agents (10 dimensions approfondies).

export const demo = {
  company: 'Atlantique Métallerie',
  url: 'www.atlantique-metallerie.fr',
  sector: 'Métallerie · Serrurerie · BTP',
  salon: 'Salon des Pros du Bâtiment 2026',
  salonDate: 'Nantes — 18 juin 2026',
  scoreTotal: 42,
  verdict: 'Votre site fait fuir 6 visiteurs sur 10 avant même la page d’accueil.',

  // Nutri-Score éco-conception (type EcoIndex)
  ecoGrade: { grade: 'F', label: 'Note éco-conception', sub: '3,8 Mo · 97 requêtes · ~1,6 g CO₂/visite' },

  // Top 3 urgences (remontées automatiquement des checks les plus critiques)
  // Le constat : 3 chiffres chocs
  constat: [
    {
      value: 8.3,
      suffix: ' s',
      decimals: 1,
      label: 'Temps de chargement sur mobile',
      sub: 'Google recommande moins de 2,5 s',
      icon: 'solar:hourglass-line-linear',
      tone: 'bad' as const,
    },
    {
      value: 58,
      suffix: ' %',
      decimals: 0,
      label: 'De visiteurs qui repartent aussitôt',
      sub: 'Ils n’attendent pas que la page charge',
      icon: 'solar:running-2-linear',
      tone: 'bad' as const,
    },
    {
      value: 7,
      prefix: 'p. ',
      decimals: 0,
      label: 'Position sur “métallerie Nantes”',
      sub: 'Personne ne va en page 7 de Google',
      icon: 'solar:magnifer-bug-linear',
      tone: 'warn' as const,
    },
  ],

  // Spotlight : le titre H1 réel de la page (analyse sémantique, pas juste comptage)
  h1Spotlight: {
    current: 'Bienvenue sur notre site',
    tabTitle: 'Accueil - Atlantique Métallerie',
    problems: [
      'Ne mentionne ni votre métier, ni Nantes',
      'Titre générique : invisible sur les recherches locales',
      '0 % de mots en commun avec le titre de l’onglet',
    ],
    ideal: 'Métallerie & serrurerie sur-mesure à Nantes',
    idealPoints: ['Métier + ville présents', 'Clair pour Google ET vos clients', 'Cohérent avec l’onglet'],
  },

  // Mock "Avant / Après" : comment Google et les clients voient le site
  googlePreview: {
    before: {
      title: 'Bienvenue sur notre site',
      url: 'atlantique-metallerie.fr',
      desc: 'atlantique-metallerie.fr › Une page WordPress sans description méta. Google improvise un extrait à partir de bouts de menu…',
      stars: false,
    },
    after: {
      title: 'Métallerie & serrurerie à Nantes — Atlantique Métallerie',
      url: 'atlantique-metallerie.fr',
      desc: 'Métallier-serrurier à Nantes depuis 2008 : garde-corps, portails, ferronnerie sur-mesure. Devis sous 48h. ★ 4,8/5 · 42 avis.',
      stars: true,
      rating: '4,8',
      reviews: '42 avis',
    },
  },

  // Mock aperçu de partage (WhatsApp / Facebook / LinkedIn)
  sharePreview: {
    before: { hasImage: false, title: 'Bienvenue sur notre site', domain: 'ATLANTIQUE-METALLERIE.FR', note: 'Vignette grise, sans image ni description : ressemble à du spam.' },
    after: { hasImage: true, title: 'Atlantique Métallerie — Nantes', desc: 'Garde-corps, portails & ferronnerie sur-mesure', domain: 'ATLANTIQUE-METALLERIE.FR', note: 'Belle vignette : photo de réalisation + titre clair. On clique.' },
  },

  // Radar : 8 axes (scores des dimensions approfondies)
  radar: [
    { key: 'performance', label: 'Performance', score: 31, color: '#ff2d55' },
    { key: 'heading', label: 'Titres', score: 38, color: '#7928ca' },
    { key: 'mobile', label: 'Mobile', score: 34, color: '#00d4ff' },
    { key: 'conversion', label: 'Conversion', score: 38, color: '#22c55e' },
    { key: 'local', label: 'SEO local', score: 31, color: '#f97316' },
    { key: 'structured', label: 'Données Google', score: 18, color: '#7928ca' },
    { key: 'ai', label: 'Visible par IA', score: 19, color: '#00d4ff' },
    { key: 'trust', label: 'Confiance', score: 38, color: '#22c55e' },
  ],

  // Top 3 problèmes prioritaires
  topIssues: [
    {
      severity: 'critique' as const,
      title: 'Le site est trop lent sur mobile',
      icon: 'solar:rocket-2-broken',
      seen: 'Vos pages mettent 8,3 s à s’afficher sur un téléphone. Images non compressées (4,2 Mo par page), aucune mise en cache.',
      cost: 'Plus de la moitié de vos visiteurs mobiles partent avant d’avoir vu vos réalisations.',
      fix: 'Compression des images, cache, hébergement optimisé → passage sous 2 s.',
    },
    {
      severity: 'critique' as const,
      title: 'Invisible sur Google localement',
      icon: 'solar:map-point-remove-linear',
      seen: 'Votre fiche Google Business n’est pas revendiquée et le site n’a aucune page “métallerie + ville”.',
      cost: 'Vos concurrents captent les recherches “serrurier / métallier près de chez moi” à votre place.',
      fix: 'Fiche Google optimisée + pages locales + avis clients → top 3 visé sur vos zones.',
    },
    {
      severity: 'élevé' as const,
      title: 'Aucun moyen simple de vous contacter',
      icon: 'solar:phone-rounded-linear',
      seen: 'Pas de bouton d’appel cliquable sur mobile, formulaire relégué, email non cliquable.',
      cost: 'Un prospect motivé sur deux abandonne plutôt que de chercher comment vous joindre.',
      fix: 'Bouton d’appel flottant, formulaire court, demande de devis en 3 clics.',
    },
  ],

  // 10 dimensions d'analyse approfondie (issues du workflow multi-agents)
  dimensions: [
    {
      key: 'heading', label: 'Titres & structure', icon: 'solar:heading-linear', color: '#7928ca', score: 38,
      tagline: 'Le titre que Google lit en premier',
      items: [
        { ok: false, label: 'Titre principal générique', detail: 'Le grand titre est « Bienvenue sur notre site » : ni métier, ni Nantes.' },
        { ok: false, label: 'Métier et ville absents du titre', detail: 'Ni « métallerie » ni « Nantes » dans le H1 : invisible sur les recherches locales.' },
        { ok: false, label: 'Titre de page et onglet incohérents', detail: 'L’onglet dit « Accueil », le grand titre dit « Bienvenue » : 0 % de mots en commun.' },
        { ok: false, label: 'Hiérarchie des sous-titres cassée', detail: 'La page saute d’un H1 à un H3 sans H2, et n’a qu’un seul sous-titre exploitable.' },
        { ok: true, label: 'Un seul grand titre détecté', detail: 'Bon point : un unique H1, Google sait quel est le sujet principal.' },
      ],
    },
    {
      key: 'conversion', label: 'Conversion & devis', icon: 'solar:phone-calling-rounded-bold', color: '#22c55e', score: 38,
      tagline: 'Transformer un visiteur en demande de devis',
      items: [
        { ok: false, label: 'Téléphone non cliquable', detail: 'Le numéro n’est qu’en pied de page, en texte. Sur mobile, impossible d’appeler en un geste.' },
        { ok: false, label: 'Aucun bouton d’action en haut', detail: 'Le premier écran est un carrousel : pas de « Demander un devis » visible immédiatement.' },
        { ok: true, label: 'Formulaire de contact présent', detail: 'Un formulaire Contact Form 7 existe, mais relégué sur une page secondaire.' },
        { ok: false, label: 'Email visible mais non cliquable', detail: 'L’adresse est écrite en toutes lettres, sans lien : le visiteur doit la recopier.' },
        { ok: false, label: 'Promesse floue à l’arrivée', detail: 'Ni métier, ni zone, ni argument de réassurance en haut de page.' },
      ],
    },
    {
      key: 'local', label: 'SEO local', icon: 'solar:map-point-wave-bold', color: '#f97316', score: 31,
      tagline: 'Être trouvé par les clients de votre secteur',
      items: [
        { ok: false, label: 'Carte d’identité Google absente', detail: 'Aucun balisage LocalBusiness : Google ignore officiellement que vous êtes une entreprise de Nantes.' },
        { ok: false, label: 'Adresse en image, tél non cliquable', detail: 'L’adresse n’apparaît que dans une image (illisible pour Google).' },
        { ok: true, label: 'Nantes citée sur l’accueil', detail: '« Nantes » apparaît 4×, mais absente du titre et des sous-titres.' },
        { ok: false, label: 'Pas de page « Zone d’intervention »', detail: 'Aucune page ne liste Saint-Herblain, Rezé, Vertou… : recherches voisines perdues.' },
        { ok: false, label: 'Aucun lien vers Google Maps', detail: 'Ni plan intégré ni lien vers la fiche : impossible de vous localiser ou voir vos avis.' },
      ],
    },
    {
      key: 'structured', label: 'Données structurées', icon: 'solar:code-square-linear', color: '#7928ca', score: 18,
      tagline: 'Les étoiles et encadrés qui font cliquer dans Google',
      items: [
        { ok: false, label: 'Aucune donnée structurée', detail: '0 bloc JSON-LD : Google n’a aucune fiche d’identité exploitable de votre entreprise.' },
        { ok: false, label: 'Pas de fiche entreprise locale', detail: 'Ni Organization ni LocalBusiness : nom, adresse, téléphone, horaires non transmis.' },
        { ok: false, label: 'Étoiles, FAQ, fil d’Ariane absents', detail: '0 des 4 familles de résultats enrichis : aucun affichage premium possible.' },
        { ok: false, label: 'WordPress + Yoast mais option éteinte', detail: 'Le plugin peut générer ces données… mais la fonction n’a jamais été activée.' },
        { ok: true, label: 'Aucun code structuré cassé', detail: 'Comme rien n’est généré, tout est à construire sur une base propre.' },
      ],
    },
    {
      key: 'ai', label: 'Visibilité dans les IA', icon: 'solar:magic-stars-bold-duotone', color: '#00d4ff', score: 19,
      tagline: 'Cité par ChatGPT et Google IA, ou invisible ?',
      items: [
        { ok: false, label: 'Robots des IA bloqués', detail: 'Votre WordPress bloque GPTBot et Google-Extended : ChatGPT et Google IA ne peuvent pas vous lire.' },
        { ok: false, label: 'Aucune carte d’identité numérique', detail: 'Pas de données LocalBusiness : horaires, adresse, téléphone non balisés pour les IA.' },
        { ok: false, label: 'Pas de foire aux questions', detail: 'Aucune FAQ : vous ratez le format que les IA citent le plus volontiers.' },
        { ok: false, label: 'Fichier llms.txt absent', detail: 'Le nouveau « mode d’emploi pour IA ». Un concurrent qui l’ajoute prend l’avantage.' },
        { ok: true, label: 'Téléphone et adresse en texte', detail: 'Bon point : numéro et adresse écrits en clair, l’IA peut les lire.' },
      ],
    },
    {
      key: 'performance', label: 'Vitesse en profondeur', icon: 'solar:bolt-circle-linear', color: '#ff2d55', score: 28,
      tagline: 'On chiffre chaque kilo et chaque seconde à gagner',
      items: [
        { ok: false, label: 'Page très lourde', detail: 'L’accueil pèse 4 520 Ko, plus de 3× le poids recommandé (1 500 Ko).' },
        { ok: false, label: 'Photos non optimisées', detail: '23 images surdimensionnées. Économie : 1 180 Ko, soit ~2,4 s de chargement en moins.' },
        { ok: false, label: 'Code inutile des extensions', detail: '11 extensions WordPress chargent 640 Ko de code JS/CSS inutilisé.' },
        { ok: false, label: 'Écran blanc au démarrage', detail: '9 fichiers bloquants (dont 3 polices Google) : 1,3 s perdue avant le premier contenu.' },
        { ok: false, label: 'Compression et cache absents', detail: 'Réglages gratuits côté hébergeur, jamais activés.' },
      ],
    },
    {
      key: 'trust', label: 'Confiance & conformité', icon: 'solar:shield-check-linear', color: '#22c55e', score: 38,
      tagline: 'Rassurer vos visiteurs et rester dans les clous',
      items: [
        { ok: false, label: 'Mentions légales introuvables', detail: 'Aucun lien détecté : obligation légale non remplie.' },
        { ok: false, label: 'Numéro SIRET absent', detail: 'Aucun SIRET/RCS/TVA : rien ne prouve que l’entreprise est déclarée.' },
        { ok: true, label: 'Téléphone et adresse présents', detail: 'Numéro et adresse Nantes affichés en pied de page.' },
        { ok: false, label: 'Aucun avis client visible', detail: 'Pas de témoignages ni d’avis Google, alors que c’est l’argument clé.' },
        { ok: false, label: 'RGPD non conforme', detail: 'Google Analytics actif sans bandeau cookies ni page de confidentialité : risque CNIL.' },
      ],
    },
    {
      key: 'social', label: 'Aperçu de partage', icon: 'solar:share-circle-linear', color: '#7928ca', score: 28,
      tagline: 'À quoi ressemble votre lien quand on le partage',
      items: [
        { ok: false, label: 'Aperçu de partage quasi inexistant', detail: '1 balise Open Graph sur 5 : pas de description ni d’image, le lien s’affiche tout gris.' },
        { ok: false, label: 'Aucune image de partage', detail: 'Partagé sur WhatsApp/Facebook, votre lien apparaît sans photo, façon spam.' },
        { ok: false, label: 'Grand aperçu désactivé sur X/LinkedIn', detail: 'Pas de Twitter Card + OG incomplet : impossible d’afficher un bel aperçu.' },
        { ok: false, label: 'Réseaux sociaux non reliés', detail: 'Un seul lien Facebook générique. Aucun lien Instagram ni LinkedIn.' },
        { ok: true, label: 'Logo présent dans l’onglet', detail: 'Un favicon existe, même s’il gagnerait à être en haute résolution.' },
      ],
    },
    {
      key: 'editorial', label: 'Qualité éditoriale', icon: 'solar:document-text-linear', color: '#f97316', score: 38,
      tagline: 'Un texte qui vend, pas une coquille vide',
      items: [
        { ok: false, label: 'Page d’accueil trop pauvre', detail: 'Seulement 94 mots de contenu réel : Google manque de matière.' },
        { ok: false, label: 'Surtout des images, peu de texte', detail: 'Le vrai contenu ne représente que 3,2 % de la page (sain : 10-20 %).' },
        { ok: false, label: 'Phrases trop longues', detail: '31 mots/phrase en moyenne : difficile à lire, surtout sur mobile.' },
        { ok: false, label: 'Texte WordPress par défaut oublié', detail: '« Just another WordPress site » et un bloc « texte à venir » encore présents.' },
        { ok: false, label: 'Activité et zone peu explicites', detail: 'Le métier et la zone de Nantes ne sont pas clairement décrits.' },
      ],
    },
    {
      key: 'eco', label: 'Éco-conception', icon: 'solar:leaf-linear', color: '#22c55e', score: 31,
      tagline: 'Un site léger, sobre et moins cher à héberger',
      items: [
        { ok: false, label: 'Page très lourde', detail: '3,8 Mo à chaque visite, 4× le poids recommandé.' },
        { ok: false, label: 'Trop de fichiers chargés', detail: '97 requêtes (extensions, sliders, polices). Recommandé : moins de 40.' },
        { ok: false, label: 'Empreinte carbone élevée', detail: '~1,6 g CO₂/visite, soit près de 0,8 kg/mois évitable sur 500 visites.' },
        { ok: false, label: 'Note éco F', detail: 'Compression serveur absente + 410 Ko de JS inutilisé.' },
        { ok: true, label: 'Hébergement vert possible', detail: 'Un site allégé + hébergeur vert vous ferait viser un A/B.' },
      ],
    },
  ],

  // Vous vs concurrents (score global)
  competitors: [
    { name: 'Atlantique Métallerie', score: 42, you: true },
    { name: 'Concurrent A — Nantes', score: 78, you: false },
    { name: 'Concurrent B — Rezé', score: 71, you: false },
    { name: 'Moyenne du secteur', score: 64, you: false },
  ],

  // Manque à gagner estimé
  revenueLoss: {
    monthly: 4200,
    note: 'Estimation basée sur votre trafic, votre taux de rebond mobile et un panier moyen métallerie.',
    breakdown: [
      { label: 'Visiteurs perdus (lenteur mobile)', value: '~ 320 / mois' },
      { label: 'Demandes de devis manquées', value: '~ 14 / mois' },
      { label: 'Chantiers potentiels non captés', value: '~ 2 / mois' },
    ],
  },

  // Plan d'action
  plan: [
    {
      phase: 'Phase 1', delay: '2 semaines', title: 'On stoppe l’hémorragie',
      icon: 'solar:bolt-linear',
      items: ['Optimisation vitesse mobile', 'Bouton d’appel + formulaire devis', 'Fiche Google revendiquée'],
    },
    {
      phase: 'Phase 2', delay: '4 semaines', title: 'On vous rend visible',
      icon: 'solar:graph-up-linear',
      items: ['Pages locales par ville', 'Données structurées + titres optimisés', 'Collecte d’avis clients'],
    },
    {
      phase: 'Phase 3', delay: 'En continu', title: 'On transforme les visites en chantiers',
      icon: 'solar:cup-star-linear',
      items: ['Suivi des positions + IA-readiness', 'Contenu métier régulier', 'Optimisation des conversions'],
    },
  ],

  commercial: {
    name: 'Christophe',
    role: 'Votre conseiller iDkom',
    bio: 'J’ai réalisé cet audit après notre échange sur le salon. Tout est gratuit et sans engagement — l’idée, c’est juste de vous montrer concrètement ce qui se joue, et ce qu’on peut corriger ensemble.',
  },
};

export type Demo = typeof demo;
