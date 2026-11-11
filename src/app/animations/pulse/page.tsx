import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import AmbientBackground from '@/components/AmbientBackground';
import Counter from '@/components/Counter';
import ProjetCard from '@/components/ProjetCard';
import { getHomepageData, getProjetBySlug, type Projet } from '@/lib/api';

// Page concept PULSE (nov. 2026) : le SEO passe au national. Les séminaires se vendent
// partout en France avec nos concepts, et PULSE est le jeu qui les relie tous.
// Cibles : « jeu interactif soirée d'entreprise », « animation interactive séminaire »,
// « quiz interactif entreprise », « soirée jeu entreprise ».
// Route statique : elle passe devant /animations/[slug] ; la ligne cms_animations « pulse »
// ne sert qu'à la liste /animations et au sitemap.

const PAGE_URL = 'https://www.idkom.fr/animations/pulse';
const ASSETS = 'https://olmcbqiojczhupspzedo.supabase.co/storage/v1/object/public/vitrine-assets/projets';
const HERO_IMAGE = `${ASSETS}/ruee-vers-l-or-swapn-classement-equipes-live.webp`;

export const metadata: Metadata = {
  title: "PULSE, le jeu interactif de vos soirées d'entreprise",
  description:
    "Chaque invité joue sur son téléphone : équipes, duels, blind test, quiz, enchères et classement en direct sur écran géant. On vient l'animer partout en France.",
  keywords: [
    "jeu interactif soirée d'entreprise",
    'animation interactive séminaire',
    'quiz interactif entreprise',
    "soirée jeu d'entreprise",
    'animation séminaire france',
    "enchères soirée d'entreprise",
    'blind test entreprise',
    'team building interactif',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { fr: PAGE_URL },
  },
  openGraph: {
    title: "PULSE, le jeu interactif de vos soirées d'entreprise | iDkom",
    description:
      "Du badge d'arrivée aux enchères de minuit, toute la salle joue la même partie. Écrans, jeux et animateurs : on vient partout en France.",
    url: PAGE_URL,
    siteName: 'iDkom',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 900, alt: "Classement des équipes en direct pendant la soirée western d'un séminaire" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "PULSE, le jeu interactif de vos soirées d'entreprise | iDkom",
    description: 'Équipes, duels, blind test, quiz et enchères sur le téléphone de chacun. Partout en France.',
  },
};

export const revalidate = 3600;

const PROJECT_SLUGS = [
  'revival-90-seminaire-orange-domaine-les-12-ponts',
  'la-ruee-vers-l-or-soiree-western-swapn-domaine-des-12-ponts',
  'blind-test-geant-grand-place-grenoble-oz-marketing',
  'ag-credit-mutuel-audincourt-quiz-antifraude-live',
  'ag-credit-mutuel-belfort-centre-kinepolis-saynetes-quiz-bar-a-goodies',
];

const moments = [
  {
    icon: 'solar:ticket-linear',
    title: "L'arrivée",
    description:
      "Chacun scanne son badge à l'accueil et reçoit par SMS son surnom, son équipe et le lien du jeu. Les équipes sont tirées au sort : la compta joue avec la logistique.",
    color: '#00d4ff',
  },
  {
    icon: 'solar:target-linear',
    title: 'Les ateliers',
    description:
      "Roulette, tir laser, jeux géants, défis d'adresse : à chaque atelier, l'animateur crédite les points depuis son téléphone. Plus de feuille de score ni de jetons à recompter.",
    color: '#22c55e',
  },
  {
    icon: 'solar:sledgehammer-linear',
    title: 'Les duels',
    description:
      'Un collègue vous provoque ? Défiez-le au chrono ou au chifoumi et mettez vos points sur la table. À la Ruée vers l’Or, 77 duels se sont joués en une soirée.',
    color: '#f59e0b',
  },
  {
    icon: 'solar:music-notes-linear',
    title: 'Le blind test et le quiz',
    description:
      "Les extraits passent sur l'écran géant, chacun répond sur son téléphone, la vitesse compte. Le quiz peut parler de vos métiers, de vos produits, de votre histoire.",
    color: '#ff2d55',
  },
  {
    icon: 'solar:cup-star-linear',
    title: 'Les enchères',
    description:
      "En fin de soirée, tout ce qui a été gagné s'échange contre des cadeaux, lot par lot, sur l'écran géant. Les équipes se cotisent, les mises s'envolent.",
    color: '#7928ca',
  },
  {
    icon: 'solar:gallery-wide-linear',
    title: 'Le lendemain',
    description:
      'La chronique de la soirée arrive par SMS : les photos, les duels, les records. Celle de la Ruée vers l’Or a été ouverte 145 fois.',
    color: '#ec4899',
  },
];

const screens = [
  {
    src: `${ASSETS}/blind-test-grand-place-podium-ecran-geant.webp`,
    alt: "Podium du blind test sur l'écran géant de Grand'Place à Grenoble",
    caption: "Le podium du blind test, à Grand'Place (Grenoble)",
  },
  {
    src: `${ASSETS}/ruee-vers-l-or-swapn-ecran-encheres-adjuge.webp`,
    alt: 'Écran des enchères : lot adjugé à 40 488 pépites',
    caption: 'Adjugé : le lot 11 part à 40 488 pépites',
  },
  {
    src: `${ASSETS}/ruee-vers-l-or-swapn-equipes-terrasse.webp`,
    alt: "Les quatre équipes de cowboys réunies sur la terrasse du Domaine des 12 Ponts",
    caption: 'Quatre équipes, une seule partie',
  },
];

const themes = [
  {
    icon: 'solar:moon-stars-linear',
    title: "La Ruée vers l'Or",
    description: 'Western, casino et pépites : la soirée de séminaire où les cowboys finissent aux enchères.',
    href: '/animations/la-ruee-vers-l-or',
  },
  {
    icon: 'solar:users-group-two-rounded-linear',
    title: 'La Kermesse 2.0',
    description: 'Jeux de fête foraine, défis entre collègues et classement en direct pour un team building.',
    href: '/animations/la-kermesse-2-0',
  },
  {
    icon: 'solar:music-notes-linear',
    title: 'Le blind test géant',
    description: "De 20 à 200 joueurs sur leur téléphone, le clip en grand écran, l'animateur au micro.",
    href: '/animations/le-blind-test',
  },
  {
    icon: 'solar:cassette-linear',
    title: 'Revival 90',
    description: 'Les tubes, les jeux et les objets cultes des années 90, le temps d’une soirée.',
    href: '/animations/revival-90',
  },
  {
    icon: 'solar:chat-square-like-linear',
    title: 'Votre assemblée générale',
    description: "Un quiz sur vos messages, des réponses sur téléphone : à Audincourt, 113 sociétaires sur 130 ont joué.",
    href: '/realisations/ag-credit-mutuel-audincourt-quiz-antifraude-live',
  },
  {
    icon: 'solar:pen-new-square-linear',
    title: 'Votre thème',
    description: "Votre métier, l'anniversaire de l'entreprise, votre région : on écrit le jeu autour.",
  },
];

const cities = ['Grenoble', 'Caen', 'Nantes', 'Paris', 'Besançon', 'Mulhouse', 'Belfort', 'Montbéliard'];

const faqs = [
  {
    question: 'Vos invités doivent-ils télécharger quelque chose ?',
    answer:
      "Non. Un QR code ou le lien reçu par SMS ouvre le jeu directement sur le téléphone. À Grenoble, des grands-parents ont joué aux côtés d'enfants de six ans.",
  },
  {
    question: 'Pour combien de joueurs ?',
    answer:
      "De 20 à 200. 53 cowboys à la Ruée vers l'Or, 113 sociétaires à l'assemblée générale du Crédit Mutuel d'Audincourt, 151 joueurs à Grand'Place Grenoble. Chacun joue sur son téléphone, pour lui et pour son équipe.",
  },
  {
    question: 'Venez-vous partout en France ?',
    answer:
      "Oui. Notre atelier est à Brevilliers, entre Belfort et Montbéliard, et nous partons avec tout le matériel : écrans, son, tablettes d'accueil, badges. Les frais de route sont chiffrés dans la proposition, ligne par ligne.",
  },
  {
    question: 'Le jeu peut-il être à nos couleurs ?',
    answer:
      "Oui : votre logo sur chaque écran, vos noms d'équipes, vos questions, vos lots. Pour SWAPN, le thème western venait d'eux ; à Grenoble, l'écran portait les couleurs de Grand'Place.",
  },
  {
    question: 'Notre équipe peut-elle animer elle-même ?',
    answer:
      "Oui. L'animateur pilote la partie depuis son téléphone : lancer une manche, afficher le classement, ouvrir les enchères. À Grand'Place, c'est l'équipe d'OZ Marketing Solutions qui tenait le micro. On vous montre tout avant la soirée, ou on vient animer avec vous.",
  },
  {
    question: 'Que faut-il prévoir sur place ?',
    answer:
      "Une prise électrique, l'accès à la salle deux heures avant vos invités, et du réseau pour les téléphones (4G ou Wi-Fi). Le reste arrive avec nous.",
  },
  {
    question: 'Combien de temps à l’avance faut-il réserver ?',
    answer:
      "Trois à six semaines pour une soirée écrite sur mesure, davantage en novembre et décembre où les soirées de fin d'année se bousculent.",
  },
];

async function getProjects(): Promise<Projet[]> {
  const results = await Promise.all(PROJECT_SLUGS.map((slug) => getProjetBySlug(slug).catch(() => null)));
  return results.filter((p): p is Projet => p !== null);
}

export default async function PulsePage() {
  const [data, projets] = await Promise.all([getHomepageData(), getProjects()]);

  return (
    <>
      <AmbientBackground />
      <NavbarServer />

      <main className="relative z-10 min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
              <Link prefetch={false} href="/" className="hover:text-white transition-colors">Accueil</Link>
              <Icon icon="solar:arrow-right-linear" width={14} />
              <Link prefetch={false} href="/animations" className="hover:text-white transition-colors">Animations</Link>
              <Icon icon="solar:arrow-right-linear" width={14} />
              <span className="text-zinc-300">PULSE</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff2d55]/10 border border-[#ff2d55]/20 text-sm text-[#ff2d55] mb-6">
                  <Icon icon="solar:map-arrow-right-linear" width={18} />
                  Partout en France · de 20 à 200 joueurs
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  PULSE, le jeu interactif
                  <br />
                  <span className="gradient-text">de votre soirée d&apos;entreprise</span>
                </h1>
                <p className="text-lg text-zinc-400 mb-4 max-w-xl leading-relaxed">
                  À l&apos;accueil, chacun scanne son badge. Un SMS arrive : un surnom tiré au sort, une
                  équipe, un lien. Rien à installer. À partir de là, tout compte : la roulette, le tir laser,
                  le blind test, le défi lancé au collègue d&apos;en face. Sur l&apos;écran géant, le classement
                  bouge à chaque point. En fin de soirée, tout ce qui a été gagné part aux enchères.
                </p>
                <p className="text-zinc-500 mb-8 max-w-xl leading-relaxed">
                  PULSE relie tous les jeux de votre <Link href="/seminaire-soiree-entreprise" className="text-[#ff2d55] hover:underline">séminaire ou soirée d&apos;entreprise</Link> en
                  une seule partie. On l&apos;écrit à vos couleurs, on l&apos;installe et on l&apos;anime, à
                  Montbéliard comme à Lyon, Paris ou Bordeaux.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    prefetch={false}
                    href="/contact"
                    className="group px-8 py-4 rounded-full gradient-bg font-medium text-white hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all duration-300 inline-flex items-center"
                  >
                    Raconter ma soirée
                    <Icon icon="solar:arrow-right-linear" className="ml-2 group-hover:translate-x-1 transition-transform" width={20} />
                  </Link>
                  <Link
                    prefetch={false}
                    href="/realisations/la-ruee-vers-l-or-soiree-western-swapn-domaine-des-12-ponts"
                    className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-medium text-white hover:bg-white/10 transition-all duration-300 inline-flex items-center"
                  >
                    <Icon icon="solar:play-circle-linear" className="mr-2" width={20} />
                    Une soirée PULSE racontée
                  </Link>
                </div>
              </div>

              <div className="relative animate-fade-in-up delay-200">
                <div className="aspect-[16/9] rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/10 overflow-hidden relative">
                  <Image
                    src={HERO_IMAGE}
                    alt="Classement des équipes en direct sur l'écran géant pendant la soirée western de SWAPN"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 left-4 sm:-left-6 p-4 rounded-2xl bg-zinc-900/90 backdrop-blur-sm border border-white/10 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Icon icon="solar:cup-star-linear" className="text-white" width={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">112 mises</p>
                      <p className="text-xs text-zinc-500">en dix minutes d&apos;enchères</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chiffres */}
        <section className="py-12 px-6 border-y border-white/5 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2"><Counter target={151} /></p>
                <p className="text-sm text-zinc-500">Joueurs en une soirée à Grenoble</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2"><Counter target={87} /> %</p>
                <p className="text-sm text-zinc-500">De la salle a joué pendant l&apos;AG</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2"><Counter target={77} /></p>
                <p className="text-sm text-zinc-500">Duels entre collègues en une soirée</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2"><Counter target={112} /></p>
                <p className="text-sm text-zinc-500">Mises en dix minutes d&apos;enchères</p>
              </div>
            </div>
          </div>
        </section>

        {/* Une seule partie */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Une seule partie, <span className="gradient-text">du badge aux enchères</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Chaque jeu de la soirée rapporte des points à la même équipe. Personne ne décroche :
                il y a toujours une place à reprendre.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moments.map((item, index) => (
                <div
                  key={item.title}
                  className="group p-6 rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}15`, borderColor: `${item.color}30`, borderWidth: 1 }}
                  >
                    <Icon icon={item.icon} style={{ color: item.color }} width={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ce qu'on voit */}
        <section className="py-24 px-6 bg-gradient-to-b from-transparent via-[#7928ca]/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sur l&apos;écran géant, <span className="gradient-text">et dans la salle</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                De vraies soirées, de vrais écrans : ce que vos invités voient pendant la partie.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {screens.map((screen) => (
                <figure key={screen.src} className="rounded-3xl bg-zinc-900/50 border border-white/10 overflow-hidden">
                  <div className="relative aspect-[16/10]">
                    <Image src={screen.src} alt={screen.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <figcaption className="p-4 text-sm text-zinc-400">{screen.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Thèmes */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Un jeu, <span className="gradient-text">tous les costumes</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Soirée western, kermesse, années 90 ou assemblée générale : PULSE change de décor, la partie reste la même.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {themes.map((theme) => {
                const content = (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-[#ff2d55]/10 border border-[#ff2d55]/20 flex items-center justify-center flex-shrink-0">
                      <Icon icon={theme.icon} className="text-[#ff2d55]" width={20} />
                    </div>
                    <div>
                      <p className="text-white font-medium group-hover:text-[#ff2d55] transition-colors">{theme.title}</p>
                      <p className="text-zinc-500 text-sm">{theme.description}</p>
                    </div>
                  </>
                );
                return theme.href ? (
                  <Link
                    key={theme.title}
                    prefetch={false}
                    href={theme.href}
                    className="group p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-[#ff2d55]/40 transition-colors flex items-start gap-4"
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={theme.title} className="group p-6 rounded-2xl bg-zinc-900/50 border border-white/10 flex items-start gap-4">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Partout en France */}
        <section className="py-24 px-6 bg-zinc-900/30">
          <div className="max-w-5xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#ff2d55]/20 to-[#7928ca]/20 border border-white/10 flex items-center justify-center mb-6">
              <Icon icon="solar:delivery-linear" className="text-white" width={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              On vient chez vous, <span className="gradient-text">partout en France</span>
            </h2>
            <p className="text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-4">
              Notre atelier est à Brevilliers, entre Belfort et Montbéliard. La partie tient dans quelques
              caisses : écrans, son, tablettes d&apos;accueil, badges. On part la veille s&apos;il le faut,
              on installe avant vos invités, on range après le dernier lot.
            </p>
            <p className="text-zinc-500 max-w-3xl mx-auto leading-relaxed mb-10">
              Un domaine en Bourgogne, un hôtel à Lyon, une salle de congrès à Paris ou vos propres locaux :
              il nous faut une prise, la salle deux heures avant, et du réseau pour les téléphones.
            </p>
            <p className="text-sm text-zinc-500 mb-4">Nos équipes ont déjà fait la route jusqu&apos;à</p>
            <div className="flex flex-wrap justify-center gap-3">
              {cities.map((city) => (
                <span key={city} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Agences et lieux */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#ff2d55]/10 via-[#7928ca]/10 to-transparent border border-white/10 p-8 md:p-12">
            <div className="md:flex md:items-center md:gap-10">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Agence événementielle, lieu de séminaire&nbsp;?
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-3">
                  PULSE se met aux couleurs de chacun de vos clients, et votre équipe peut le piloter
                  elle-même depuis son téléphone. À Grand&apos;Place, à Grenoble, ce sont les animateurs
                  d&apos;OZ Marketing Solutions qui tenaient le micro, sans technicien derrière.
                </p>
                <p className="text-zinc-500 leading-relaxed">
                  Au Domaine des 12 Ponts, nos soirées font partie de ce que le Domaine propose aux entreprises
                  qui y viennent en séminaire.
                </p>
              </div>
              <Link
                prefetch={false}
                href="/contact"
                className="mt-6 md:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bg font-medium text-white hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all flex-shrink-0"
              >
                Travailler ensemble
                <Icon icon="solar:arrow-right-linear" width={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Réalisations */}
        {projets.length > 0 && (
          <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Des parties <span className="gradient-text">qu&apos;on raconte encore</span>
                  </h2>
                  <p className="text-zinc-500 mt-2">Séminaire, centre commercial, assemblées générales : ce qui s&apos;y est joué.</p>
                </div>
                <Link
                  prefetch={false}
                  href="/realisations"
                  className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  Toutes nos réalisations
                  <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" width={16} />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projets.map((projet, index) => (
                  <ProjetCard key={projet.slug} projet={projet} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-24 px-6 bg-zinc-900/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Questions <span className="gradient-text">fréquentes</span>
              </h2>
              <p className="text-zinc-400">Téléphones, nombre de joueurs, déplacement, matériel : les réponses courtes.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl bg-zinc-900/50 border border-white/10 overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-white font-medium hover:bg-white/5 transition-colors">
                    <span className="pr-4">{faq.question}</span>
                    <Icon
                      icon="solar:alt-arrow-down-linear"
                      className="flex-shrink-0 transition-transform duration-300 group-open:rotate-180 text-zinc-500"
                      width={20}
                    />
                  </summary>
                  <div className="px-6 pb-6 text-zinc-400 leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Une soirée à <span className="gradient-text">Lyon</span>, un séminaire à <span className="gradient-text">Bordeaux</span>&nbsp;?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Dites-nous combien vous serez, où et quand. On revient avec un déroulé et un prix, route comprise.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                prefetch={false}
                href="/contact"
                className="group px-10 py-5 rounded-full gradient-bg font-semibold text-lg text-white hover:shadow-xl hover:shadow-[#7928ca]/30 transition-all duration-300 inline-flex items-center"
              >
                Raconter ma soirée
                <Icon icon="solar:arrow-right-linear" className="ml-3 group-hover:translate-x-2 transition-transform" width={24} />
              </Link>
              <Link
                prefetch={false}
                href="/rendez-vous"
                className="px-10 py-5 rounded-full bg-white/5 border border-white/10 font-semibold text-lg text-white hover:bg-white/10 transition-all duration-300 inline-flex items-center"
              >
                <Icon icon="solar:calendar-linear" className="mr-3" width={24} />
                Réserver un créneau
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Fil d'Ariane */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'iDkom', item: 'https://www.idkom.fr' },
              { '@type': 'ListItem', position: 2, name: 'Animations', item: 'https://www.idkom.fr/animations' },
              { '@type': 'ListItem', position: 3, name: 'PULSE', item: PAGE_URL },
            ],
          }),
        }}
      />

      {/* FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />

      {/* Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: "PULSE, jeu interactif pour soirée d'entreprise et séminaire",
            description:
              "Chaque invité joue sur son téléphone : équipes tirées au sort, ateliers, duels, blind test, quiz, enchères et classement en direct sur écran géant. Matériel et animateurs fournis, partout en France.",
            serviceType: "Animation d'événements d'entreprise",
            url: PAGE_URL,
            image: HERO_IMAGE,
            provider: { '@id': 'https://www.idkom.fr/#localbusiness' },
            areaServed: { '@type': 'Country', name: 'France' },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Soirées jouées avec PULSE',
              itemListElement: themes.map((theme) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: theme.title, description: theme.description },
              })),
            },
          }),
        }}
      />

      <FooterServer site={data.site} social={data.social} />
    </>
  );
}
