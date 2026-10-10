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

// Page pilier « animations » (oct. 2026) : le chiffre d'affaires vient des soirées,
// séminaires et assemblées générales, plus que des stands. Cibles Search Console :
// « animation entreprise besançon », « team building belfort », « animation d'entreprise
// mulhouse », « agence evenementiel besancon », « soirée d'entreprise montbéliard »…
// Les pages villes et l'accueil pointent ici.

const PAGE_URL = 'https://www.idkom.fr/seminaire-soiree-entreprise';
const HERO_IMAGE =
  'https://olmcbqiojczhupspzedo.supabase.co/storage/v1/object/public/vitrine-assets/projets/ruee-vers-l-or-swapn-roulette-croupier.webp';

export const metadata: Metadata = {
  title: "Animation de séminaire et soirée d'entreprise en Franche-Comté",
  description:
    "Soirées à thème, team building, quiz en direct, blind test, assemblées générales : iDkom anime vos séminaires et soirées d'entreprise à Montbéliard, Belfort, Besançon et Mulhouse. Matériel, écrans et animateurs fournis.",
  keywords: [
    'animation séminaire entreprise',
    "soirée d'entreprise montbéliard",
    "soirée d'entreprise belfort",
    'animation entreprise besançon',
    "animation d'entreprise mulhouse",
    'team building belfort',
    'team building montbéliard',
    'animation assemblée générale',
    'agence événementielle besançon',
    'séminaire franche-comté',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { fr: PAGE_URL },
  },
  openGraph: {
    title: "Animation de séminaire et soirée d'entreprise en Franche-Comté | iDkom",
    description:
      "Soirées à thème, team building, quiz en direct, assemblées générales : vos équipes jouent ensemble, on s'occupe du reste. Montbéliard, Belfort, Besançon, Mulhouse.",
    url: PAGE_URL,
    siteName: 'iDkom',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1200, height: 630, alt: "Table de roulette pendant la soirée western d'un séminaire au Domaine des 12 Ponts" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Animation de séminaire et soirée d'entreprise en Franche-Comté | iDkom",
    description: 'Soirées à thème, team building, quiz en direct, assemblées générales. Montbéliard, Belfort, Besançon, Mulhouse.',
  },
};

export const revalidate = 3600;

// On montre la soirée du client, pas une liste de logos.
const EVENT_PROJECT_SLUGS = [
  'la-ruee-vers-l-or-soiree-western-swapn-domaine-des-12-ponts',
  'ag-credit-mutuel-belfort-centre-kinepolis-saynetes-quiz-bar-a-goodies',
  'operation-code-wurtemberg-escape-game-montbeliard',
  'bar-alphabet-en-images-manpower',
  'la-fabrique-a-souvenirs-sied70-domaine-des-douze-ponts',
  'ag-credit-mutuel-audincourt-quiz-antifraude-live',
  'blind-test-geant-grand-place-grenoble-oz-marketing',
  'la-fabrique-a-souvenirs-connectee-pour-autocars-maron',
];

const formats = [
  {
    icon: 'solar:moon-stars-linear',
    title: 'La soirée à thème',
    description:
      "Western, casino, années 90 : un décor, des tables de jeu, une monnaie sur le téléphone de chacun et une vente aux enchères pour finir. 53 cowboys l'ont vécue au Domaine des 12 Ponts.",
    href: '/animations/la-ruee-vers-l-or',
    linkLabel: "La Ruée vers l'Or",
    color: '#f59e0b',
  },
  {
    icon: 'solar:users-group-two-rounded-linear',
    title: 'Le team building',
    description:
      'Des équipes mélangées, des défis courts, un classement qui bouge sur grand écran. Les services qui ne se parlent jamais finissent par se tutoyer.',
    href: '/animations/la-kermesse-2-0',
    linkLabel: 'La Kermesse 2.0',
    color: '#22c55e',
  },
  {
    icon: 'solar:music-notes-linear',
    title: 'Le blind test géant',
    description:
      "Chacun joue sur son téléphone, les extraits passent sur l'écran, le classement tombe à chaque manche. De 20 à 200 joueurs, au micro avec un animateur.",
    href: '/animations/le-blind-test',
    linkLabel: 'Le blind test',
    color: '#ff2d55',
  },
  {
    icon: 'solar:chat-square-like-linear',
    title: "L'assemblée générale qui se regarde",
    description:
      "Un quiz en direct pour faire passer le message, des collaborateurs filmés pour jouer les réponses, un vote à main levée sur téléphone. La salle reste jusqu'au bout.",
    href: '/realisations/ag-credit-mutuel-belfort-centre-kinepolis-saynetes-quiz-bar-a-goodies',
    linkLabel: "L'AG au Kinépolis de Belfort",
    color: '#00d4ff',
  },
  {
    icon: 'solar:gift-linear',
    title: 'Le souvenir fabriqué sur place',
    description:
      "Une photo, un objet choisi, et le cadeau sort de l'atelier pendant l'apéritif : magnet, miroir, planche gravée au prénom. Chacun repart avec le sien.",
    href: '/animations/le-bar-goodies',
    linkLabel: 'Le bar à goodies',
    color: '#ec4899',
  },
  {
    icon: 'solar:key-minimalistic-square-linear',
    title: "L'escape game sur mesure",
    description:
      "Une énigme écrite pour votre entreprise, jouée dans vos murs ou dans la ville. 70 minutes pour que les nouveaux arrivants connaissent déjà tout le monde.",
    href: '/realisations/operation-code-wurtemberg-escape-game-montbeliard',
    linkLabel: 'Opération Code Wurtemberg',
    color: '#7928ca',
  },
];

const steps = [
  {
    icon: 'solar:chat-round-dots-linear',
    title: 'Vous racontez',
    description: 'Le nombre de personnes, le lieu, la date, ce que vous voulez que vos équipes retiennent. Un appel de dix minutes suffit.',
  },
  {
    icon: 'solar:pen-new-square-linear',
    title: 'On écrit la soirée',
    description: 'Un déroulé minute par minute, aux couleurs de votre entreprise, avec une proposition chiffrée. Vous ajustez, on réécrit.',
  },
  {
    icon: 'solar:play-circle-linear',
    title: 'On arrive avec tout',
    description: 'Écrans, son, lumière, jeux, animateurs. Installés avant vos invités, rangés après le dernier verre.',
  },
];

const venues = [
  { name: 'Domaine des 12 Ponts', city: 'Pont-sur-l’Ognon (70)', detail: 'Séminaires de deux jours, soirées au vert' },
  { name: "L'Axone", city: 'Montbéliard', detail: 'Grandes soirées et anniversaires d’entreprise' },
  { name: 'Kinépolis', city: 'Belfort', detail: 'Assemblées générales sur grand écran' },
  { name: 'Atria', city: 'Belfort', detail: 'Conventions et congrès' },
  { name: 'Micropolis', city: 'Besançon', detail: 'Conventions, salons et soirées' },
  { name: 'Vos locaux', city: 'partout', detail: "Une salle de réunion devient une salle de jeu en une heure" },
];

const zones = ['Montbéliard', 'Belfort', 'Besançon', 'Mulhouse', 'Héricourt', 'Audincourt', 'Vesoul', 'Lure', 'Dole', 'Colmar'];

const faqs = [
  {
    question: "Quelles animations proposez-vous pour un séminaire d'entreprise ?",
    answer:
      "Soirée à thème (western, casino, années 90), team building en équipes mélangées, blind test géant, quiz en direct sur grand écran, escape game écrit pour votre entreprise, bar à goodies où chacun repart avec un cadeau fabriqué sur place. On les combine souvent : un jeu d'équipe l'après-midi, une soirée le soir.",
  },
  {
    question: 'Pour combien de personnes ?',
    answer:
      "De 20 à plusieurs centaines. Le blind test de Grand'Place à Grenoble a réuni 151 joueurs, l'assemblée générale du Crédit Mutuel d'Audincourt 113 joueurs connectés, la soirée western de SWAPN 53 participants. Chacun joue sur son propre téléphone : rien à installer.",
  },
  {
    question: "Intervenez-vous à Besançon, Belfort, Mulhouse ?",
    answer:
      "Oui. Notre atelier est à Brevilliers, entre Belfort et Montbéliard : nous sommes à 15 minutes de Belfort et Montbéliard, 45 minutes de Mulhouse, une heure de Besançon. Nous allons aussi partout en France quand l'événement l'exige.",
  },
  {
    question: "Faut-il prévoir le matériel, l'écran, le son ?",
    answer:
      "Non. Nous arrivons avec les écrans (jusqu'au mur LED de 9 m²), la sonorisation, la lumière, les jeux et les animateurs. Il nous faut une prise électrique et l'accès à la salle deux heures avant vos invités.",
  },
  {
    question: "L'animation peut-elle être aux couleurs de notre entreprise ?",
    answer:
      "C'est notre façon de faire. Les questions du quiz parlent de vos métiers, les écrans portent votre logo, les cadeaux votre nom. À l'AG du Crédit Mutuel Belfort Centre, ce sont douze conseillers qui jouaient les réponses à l'écran.",
  },
  {
    question: 'Combien de temps à l’avance faut-il réserver ?',
    answer:
      "Trois à six semaines pour une soirée écrite sur mesure, davantage en novembre et décembre où les soirées de fin d'année se bousculent. Pour une animation de notre catalogue, quelques jours peuvent suffire si la date est libre.",
  },
];

async function getEventProjects(): Promise<Projet[]> {
  const results = await Promise.all(
    EVENT_PROJECT_SLUGS.map((slug) => getProjetBySlug(slug).catch(() => null)),
  );
  return results.filter((p): p is Projet => p !== null);
}

export default async function SeminaireSoireeEntreprisePage() {
  const [data, projets] = await Promise.all([getHomepageData(), getEventProjects()]);

  return (
    <>
      <AmbientBackground />
      <NavbarServer />

      <main className="relative z-10 min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff2d55]/10 border border-[#ff2d55]/20 text-sm text-[#ff2d55] mb-6">
                  <Icon icon="solar:confetti-linear" width={18} />
                  Montbéliard · Belfort · Besançon · Mulhouse
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Animation de séminaire
                  <br />
                  <span className="gradient-text">et soirée d&apos;entreprise</span>
                </h1>
                <p className="text-lg text-zinc-400 mb-4 max-w-xl leading-relaxed">
                  Deux jours de formation viennent de se terminer. À 20 heures, la salle de réunion
                  est devenue un saloon : roulette, duels, blind test, et une monnaie qui grossit
                  sur le téléphone de chacun. À minuit, le dernier lot part aux enchères
                  sous les sifflets de toute l&apos;équipe.
                </p>
                <p className="text-zinc-500 mb-8 max-w-xl leading-relaxed">
                  Soirées à thème, team building, <Link href="/animations" className="text-[#ff2d55] hover:underline">animations</Link> et
                  assemblées générales : on écrit le déroulé, on apporte les écrans, le son et les jeux,
                  et on anime jusqu&apos;au bout.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    prefetch={false}
                    href="/contact"
                    className="group px-8 py-4 rounded-full gradient-bg font-medium text-white hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all duration-300 inline-flex items-center"
                  >
                    Raconter mon événement
                    <Icon icon="solar:arrow-right-linear" className="ml-2 group-hover:translate-x-1 transition-transform" width={20} />
                  </Link>
                  <Link
                    prefetch={false}
                    href="/realisations/la-ruee-vers-l-or-soiree-western-swapn-domaine-des-12-ponts"
                    className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-medium text-white hover:bg-white/10 transition-all duration-300 inline-flex items-center"
                  >
                    <Icon icon="solar:play-circle-linear" className="mr-2" width={20} />
                    La soirée western
                  </Link>
                </div>
              </div>

              <div className="relative animate-fade-in-up delay-200">
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/10 overflow-hidden relative">
                  <Image
                    src={HERO_IMAGE}
                    alt="Table de roulette pendant la soirée western « La Ruée vers l'Or », séminaire SWAPN au Domaine des 12 Ponts"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-zinc-900/90 backdrop-blur-sm border border-white/10 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Icon icon="solar:cup-star-linear" className="text-white" width={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">77 duels</p>
                      <p className="text-xs text-zinc-500">joués en une soirée par 53 collègues</p>
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
                <p className="text-sm text-zinc-500">Joueurs sur un seul blind test</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2"><Counter target={200} /></p>
                <p className="text-sm text-zinc-500">Cadeaux fabriqués en une soirée</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2"><Counter target={30} /> ans</p>
                <p className="text-sm text-zinc-500">D&apos;événements en Franche-Comté</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2"><Counter target={600} />+</p>
                <p className="text-sm text-zinc-500">Projets livrés</p>
              </div>
            </div>
          </div>
        </section>

        {/* Formats */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ce que vos équipes <span className="gradient-text">vont vivre</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Un après-midi de séminaire, une soirée de fin d&apos;année, une assemblée générale :
                chaque format a déjà été joué, et se réécrit à votre nom.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formats.map((item, index) => (
                <div
                  key={item.title}
                  className="group p-6 rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}15`, borderColor: `${item.color}30`, borderWidth: 1 }}
                  >
                    <Icon icon={item.icon} style={{ color: item.color }} width={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed flex-1">{item.description}</p>
                  <Link
                    prefetch={false}
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-[#ff2d55] transition-colors"
                  >
                    {item.linkLabel}
                    <Icon icon="solar:arrow-right-linear" width={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comment ça se passe */}
        <section className="py-24 px-6 bg-gradient-to-b from-transparent via-[#7928ca]/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Vous recevez, <span className="gradient-text">on anime</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Pas de prestataires à coordonner : le jeu, l&apos;écran, le son et l&apos;animateur viennent ensemble.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="absolute top-6 right-6 text-5xl font-bold text-white/5">{index + 1}</span>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff2d55]/20 to-[#7928ca]/20 border border-white/10 flex items-center justify-center mb-6">
                    <Icon icon={step.icon} className="text-white" width={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {zones.map((zone) => (
                <span key={zone} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300">
                  {zone}
                </span>
              ))}
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-500">
                et partout en France
              </span>
            </div>
          </div>
        </section>

        {/* Les lieux */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Les lieux que nous <span className="gradient-text">connaissons</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Domaine, salle de spectacle, cinéma ou salle de réunion : on connaît les prises, les accès et les horaires.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {venues.map((venue) => (
                <div key={venue.name} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ff2d55]/10 border border-[#ff2d55]/20 flex items-center justify-center flex-shrink-0">
                    <Icon icon="solar:map-point-linear" className="text-[#ff2d55]" width={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {venue.name} <span className="text-zinc-500 font-normal">· {venue.city}</span>
                    </p>
                    <p className="text-zinc-500 text-sm">{venue.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Réalisations */}
        {projets.length > 0 && (
          <section className="py-24 px-6 bg-zinc-900/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Des soirées <span className="gradient-text">qu&apos;on raconte encore</span>
                  </h2>
                  <p className="text-zinc-500 mt-2">Séminaires, anniversaires d&apos;entreprise, assemblées générales : ce qui s&apos;y est passé.</p>
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
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {projets.map((projet, index) => (
                  <ProjetCard key={projet.slug} projet={projet} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Fin d'année */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#ff2d55]/10 via-[#7928ca]/10 to-transparent border border-white/10 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Une soirée de fin d&apos;année à prévoir ?</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-6">
              Au Domaine des 12 Ponts, une soirée de Noël clé en main pour vos équipes : le repas, les jeux et l&apos;ambiance, tout est prévu.
            </p>
            <Link
              prefetch={false}
              href="/noel-en-bande-organisee"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bg font-medium text-white hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all"
            >
              Noël en bande organisée
              <Icon icon="solar:arrow-right-linear" width={18} />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Questions <span className="gradient-text">fréquentes</span>
              </h2>
              <p className="text-zinc-400">Formats, nombre de participants, matériel, délais : les réponses courtes.</p>
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
              Un séminaire à <span className="gradient-text">Besançon</span>, une soirée à <span className="gradient-text">Belfort</span> ?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Dites-nous combien vous serez, où et quand. On revient avec un déroulé et un prix.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                prefetch={false}
                href="/contact"
                className="group px-10 py-5 rounded-full gradient-bg font-semibold text-lg text-white hover:shadow-xl hover:shadow-[#7928ca]/30 transition-all duration-300 inline-flex items-center"
              >
                Raconter mon événement
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
              { '@type': 'ListItem', position: 2, name: "Séminaire et soirée d'entreprise", item: PAGE_URL },
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
            name: "Animation de séminaire et de soirée d'entreprise",
            description:
              "Soirées à thème, team building, blind test, quiz en direct, escape game et assemblées générales animées, avec écrans, son, jeux et animateurs, à Montbéliard, Belfort, Besançon, Mulhouse et en France.",
            serviceType: "Animation d'événements d'entreprise",
            url: PAGE_URL,
            provider: { '@id': 'https://www.idkom.fr/#localbusiness' },
            areaServed: [
              { '@type': 'City', name: 'Montbéliard' },
              { '@type': 'City', name: 'Belfort' },
              { '@type': 'City', name: 'Besançon' },
              { '@type': 'City', name: 'Mulhouse' },
              { '@type': 'City', name: 'Vesoul' },
              { '@type': 'AdministrativeArea', name: 'Franche-Comté' },
              { '@type': 'AdministrativeArea', name: 'Alsace' },
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: "Animations pour séminaires et soirées d'entreprise",
              itemListElement: formats.map((item) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: item.title, description: item.description },
              })),
            },
          }),
        }}
      />

      <FooterServer site={data.site} social={data.social} />
    </>
  );
}
