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

// Page pilier « team building » (16 nov. 2026). Dans Search Console, le team building est
// devenu le plus gros groupe de requêtes hors marque (« team building besançon »,
// « séminaire team building », « atelier team building », « cohésion d'équipe belfort »…)
// et le site n'avait aucune page dédiée. Cap national : on vient partout en France,
// les villes du coin restent citées. Les pages villes et la page séminaires pointent ici.

const PAGE_URL = 'https://www.idkom.fr/team-building';
const HERO_IMAGE =
  'https://olmcbqiojczhupspzedo.supabase.co/storage/v1/object/public/vitrine-assets/projets/ruee-vers-l-or-swapn-jeux-pelouse-domaine-12-ponts.webp';

export const metadata: Metadata = {
  title: "Team building d'entreprise : jeux d'équipe, défis et soirées",
  description:
    "Équipes mélangées, défis courts, classement en direct sur grand écran : iDkom anime votre team building en séminaire ou en soirée, à Besançon, Belfort, Mulhouse, Strasbourg et partout en France.",
  keywords: [
    'team building',
    'team building entreprise',
    'séminaire team building',
    'atelier team building',
    'team building besançon',
    'team building belfort',
    'team building mulhouse',
    'team building strasbourg',
    "cohésion d'équipe",
    "jeux d'équipe séminaire",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { fr: PAGE_URL },
  },
  openGraph: {
    title: "Team building d'entreprise : jeux d'équipe, défis et soirées | iDkom",
    description:
      "Des équipes tirées au sort, des jeux d'un quart d'heure, un classement qui bouge sur grand écran. On vient l'animer partout en France.",
    url: PAGE_URL,
    siteName: 'iDkom',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1200, height: 630, alt: 'Jeux en équipes sur la pelouse du Domaine les 12 Ponts pendant un séminaire' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Team building d'entreprise : jeux d'équipe, défis et soirées | iDkom",
    description: "Équipes mélangées, défis courts, classement en direct. Partout en France.",
  },
};

export const revalidate = 3600;

// Trois séminaires où tout le monde a joué en équipe : on raconte ce qui s'y est passé.
const TEAM_PROJECT_SLUGS = [
  'revival-90-seminaire-orange-domaine-les-12-ponts',
  'la-ruee-vers-l-or-soiree-western-swapn-domaine-des-12-ponts',
  'operation-code-wurtemberg-escape-game-montbeliard',
];

const formats = [
  {
    icon: 'solar:dice-linear',
    title: 'Les jeux entre deux séances',
    description:
      "Un 421, un chamboule-tout, un petit bac par équipe : un quart d'heure, et on retourne travailler. Chez Orange, huit équipes ont joué ainsi toute la journée sans prendre une minute aux séances.",
    href: '/animations/revival-90',
    linkLabel: 'Revival 90',
    color: '#22c55e',
  },
  {
    icon: 'solar:key-minimalistic-square-linear',
    title: "L'escape game écrit pour vous",
    description:
      "Une énigme qui parle de votre entreprise, jouée dans vos murs ou dans les rues de la ville. À Montbéliard, 25 nouveaux agents ont 70 minutes pour sauver la ville, et finissent la journée en équipe.",
    href: '/animations/operation-103',
    linkLabel: 'Opération 103, à Belfort',
    color: '#7928ca',
  },
  {
    icon: 'solar:moon-stars-linear',
    title: 'La soirée à thème en équipes',
    description:
      "Shérifs, Hors-la-loi, Chercheurs d'or et Apaches : chaque équipe gagne des pépites à la roulette, au tir laser, au blind test, puis tout se joue aux enchères. 53 cowboys, une seule équipe gagnante.",
    href: '/animations/la-ruee-vers-l-or',
    linkLabel: "La Ruée vers l'Or",
    color: '#f59e0b',
  },
  {
    icon: 'solar:gamepad-linear',
    title: 'La Kermesse 2.0',
    description:
      "De vrais ateliers de jeu, des défis lancés entre collègues, un classement qui bouge en direct. Même les plus discrets finissent par se prendre au jeu, et le final aux enchères fait le reste.",
    href: '/animations/la-kermesse-2-0',
    linkLabel: 'La Kermesse 2.0',
    color: '#00d4ff',
  },
  {
    icon: 'solar:music-notes-linear',
    title: 'Le blind test par équipes',
    description:
      "Chacun joue pour son équipe sur son téléphone, puis un finaliste par table monte face à la salle. Un morceau, un éliminé. Les collègues retiennent leur souffle, ou soufflent très fort.",
    href: '/animations/le-blind-test',
    linkLabel: 'Le blind test',
    color: '#ff2d55',
  },
  {
    icon: 'solar:sun-2-linear',
    title: 'Les jeux de plein air',
    description:
      "Tir laser, cornhole, jeux d'adresse sur la pelouse : on sort de la salle, on se défie au chrono, et les scores remontent au classement des équipes.",
    href: '/realisations/la-ruee-vers-l-or-soiree-western-swapn-domaine-des-12-ponts',
    linkLabel: 'La soirée SWAPN',
    color: '#ec4899',
  },
];

const recipe = [
  {
    icon: 'solar:shuffle-linear',
    title: 'Des équipes tirées au sort',
    description:
      "Chacun découvre son équipe en arrivant. Les services qui ne se croisent jamais se retrouvent à la même table, les régions se mélangent, les nouveaux sont adoptés avant midi.",
  },
  {
    icon: 'solar:stopwatch-linear',
    title: 'Des jeux courts, pour tout le monde',
    description:
      "Adresse, mémoire, musique, culture générale : un quart d'heure par jeu, et personne n'est mis en difficulté. Celui qui rate au chamboule-tout gagne au petit bac.",
  },
  {
    icon: 'solar:cup-star-linear',
    title: 'Un classement qui se vit ensemble',
    description:
      "Les points tombent sur le téléphone de chacun et sur l'écran géant. Le classement se fait à la moyenne par joueur, pour qu'une table de sept joue à armes égales avec une table de huit.",
  },
];

const steps = [
  {
    icon: 'solar:chat-round-dots-linear',
    title: 'Vous racontez',
    description: "Combien vous serez, où, combien de temps vous avez, et ce que vous voulez que vos équipes retiennent. Un appel de dix minutes suffit.",
  },
  {
    icon: 'solar:pen-new-square-linear',
    title: 'On écrit le jeu',
    description: "Les équipes, les épreuves, les questions sur vos métiers, le déroulé minute par minute, avec une proposition chiffrée. Vous ajustez, on réécrit.",
  },
  {
    icon: 'solar:play-circle-linear',
    title: 'On arrive avec tout',
    description: "Jeux, écrans, son, animateurs. Installés avant vos équipes, rangés après la remise des prix.",
  },
];

const cities = [
  { name: 'Montbéliard', href: '/animations-evenementielles/montbeliard' },
  { name: 'Belfort', href: '/animations-evenementielles/belfort' },
  { name: 'Besançon', href: '/animations-evenementielles/besancon' },
  { name: 'Mulhouse', href: '/animations-evenementielles/mulhouse' },
  { name: 'Strasbourg', href: '/animations-evenementielles/strasbourg' },
  { name: 'Lyon', href: '/animations-evenementielles/lyon' },
];

const faqs = [
  {
    question: 'Quelles activités de team building proposez-vous ?',
    answer:
      "Des jeux d'équipe d'un quart d'heure entre deux séances (421, chamboule-tout, petit bac), un escape game écrit pour votre entreprise, une soirée à thème jouée en équipes (western, années 90, kermesse), un blind test par équipes et des jeux de plein air. On les combine souvent : des jeux courts pendant la journée, une soirée le soir, et une seule équipe gagnante à la fin.",
  },
  {
    question: 'Pour combien de participants ?',
    answer:
      "De 15 à plus de 150. Chez Orange, 59 managers en huit équipes ; chez SWAPN, 53 participants en quatre équipes ; à la Mairie de Montbéliard, 25 nouveaux agents par session. Chacun joue sur son propre téléphone : rien à installer, un QR code suffit.",
  },
  {
    question: 'Combien de temps dure un team building ?',
    answer:
      "Ce que vous avez. Un quart d'heure entre deux séances de travail, 70 minutes pour un escape game, un après-midi complet ou une soirée de trois heures. Les jeux se glissent dans votre programme, pas l'inverse.",
  },
  {
    question: "Et ceux qui n'aiment pas les jeux ?",
    answer:
      "Ils sont souvent les premiers à réclamer la revanche. Rien de sportif ni de gênant : on alterne adresse, mémoire, musique et culture générale, chacun trouve son jeu, et c'est l'équipe qui gagne, pas le plus fort.",
  },
  {
    question: 'Intervenez-vous à Besançon, Belfort, Mulhouse, et ailleurs en France ?',
    answer:
      "Oui. Notre atelier est à Brevilliers, entre Belfort et Montbéliard : un quart d'heure de Belfort, 45 minutes de Mulhouse, une heure de Besançon, deux heures de Strasbourg. Nous avons déjà animé à Grenoble et à Caen, et nous venons partout en France avec les jeux, les écrans et les animateurs.",
  },
  {
    question: 'Où se passe le team building ?',
    answer:
      "Là où vous êtes : dans vos locaux, dans votre lieu de séminaire, sur la pelouse d'un domaine comme le Domaine les 12 Ponts, ou dans les rues de la ville pour un escape game. Il nous faut une prise électrique et l'accès à la salle une à deux heures avant vos équipes.",
  },
  {
    question: 'Combien de temps à l’avance faut-il réserver ?',
    answer:
      "Trois à six semaines pour un team building écrit pour votre entreprise, davantage en novembre et décembre. Pour un format de notre catalogue, quelques jours peuvent suffire si la date est libre.",
  },
];

async function getTeamProjects(): Promise<Projet[]> {
  const results = await Promise.all(
    TEAM_PROJECT_SLUGS.map((slug) => getProjetBySlug(slug).catch(() => null)),
  );
  return results.filter((p): p is Projet => p !== null);
}

export default async function TeamBuildingPage() {
  const [data, projets] = await Promise.all([getHomepageData(), getTeamProjects()]);

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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-sm text-[#22c55e] mb-6">
                  <Icon icon="solar:users-group-two-rounded-linear" width={18} />
                  Séminaires, soirées, intégration · partout en France
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Team building
                  <br />
                  <span className="gradient-text">qui mélange vraiment vos équipes</span>
                </h1>
                <p className="text-lg text-zinc-400 mb-4 max-w-xl leading-relaxed">
                  Entre deux séances de travail, la salle de séminaire devient une cour de récré
                  pendant un quart d&apos;heure : un 421 sur une table, un chamboule-tout au fond,
                  un petit bac par équipe. Quelqu&apos;un propose « Orange » comme ville de France.
                  Refusé. Le soir, l&apos;équipe VHS remporte la finale sur « Foule sentimentale »,
                  et plus personne ne se souvient de qui venait de quelle région.
                </p>
                <p className="text-zinc-500 mb-8 max-w-xl leading-relaxed">
                  Des équipes tirées au sort, des jeux courts que tout le monde peut gagner, un
                  classement qui bouge sur grand écran : on écrit le jeu, on apporte tout, et on
                  l&apos;anime jusqu&apos;à la remise des prix.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    prefetch={false}
                    href="/contact"
                    className="group px-8 py-4 rounded-full gradient-bg font-medium text-white hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all duration-300 inline-flex items-center"
                  >
                    Raconter mon séminaire
                    <Icon icon="solar:arrow-right-linear" className="ml-2 group-hover:translate-x-1 transition-transform" width={20} />
                  </Link>
                  <Link
                    prefetch={false}
                    href="/realisations/revival-90-seminaire-orange-domaine-les-12-ponts"
                    className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-medium text-white hover:bg-white/10 transition-all duration-300 inline-flex items-center"
                  >
                    <Icon icon="solar:play-circle-linear" className="mr-2" width={20} />
                    Le séminaire Orange
                  </Link>
                </div>
              </div>

              <div className="relative animate-fade-in-up delay-200">
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/10 overflow-hidden relative">
                  <Image
                    src={HERO_IMAGE}
                    alt="Deux équipes s'affrontent sur la pelouse du Domaine les 12 Ponts pendant le séminaire SWAPN"
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
                      <Icon icon="solar:users-group-rounded-linear" className="text-white" width={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">91 défis</p>
                      <p className="text-xs text-zinc-500">lancés entre collègues en un séminaire</p>
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
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2"><Counter target={59} /></p>
                <p className="text-sm text-zinc-500">Managers Orange répartis en 8 équipes</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2"><Counter target={77} /></p>
                <p className="text-sm text-zinc-500">Duels joués en une soirée western</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2"><Counter target={70} /> min</p>
                <p className="text-sm text-zinc-500">Pour que 25 nouveaux agents fassent équipe</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2"><Counter target={15} /> min</p>
                <p className="text-sm text-zinc-500">Par jeu, entre deux séances de travail</p>
              </div>
            </div>
          </div>
        </section>

        {/* Formats */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Six façons de <span className="gradient-text">faire équipe</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Un quart d&apos;heure, une matinée ou une soirée : chaque format a déjà été joué
                par de vraies équipes, et se réécrit à votre nom.
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

            <Link
              prefetch={false}
              href="/animations/pulse"
              className="group mt-10 flex flex-col md:flex-row md:items-center gap-4 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#ff2d55]/10 via-[#7928ca]/10 to-transparent border border-white/10 hover:border-[#ff2d55]/40 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0">
                <Icon icon="solar:gamepad-linear" className="text-white" width={28} />
              </div>
              <div className="flex-1">
                <p className="text-xl font-semibold text-white">Ce qui relie tous ces jeux : PULSE</p>
                <p className="text-zinc-400 text-sm mt-1">
                  Un seul jeu sur le téléphone de chacun : l&apos;équipe tirée au sort à l&apos;arrivée, les points de chaque épreuve, les duels et le classement en direct sur grand écran.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm text-zinc-300 group-hover:text-[#ff2d55] transition-colors">
                Découvrir PULSE
                <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" width={16} />
              </span>
            </Link>
          </div>
        </section>

        {/* La recette */}
        <section className="py-24 px-6 bg-gradient-to-b from-transparent via-[#22c55e]/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pourquoi vos équipes <span className="gradient-text">se tutoient le lendemain</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Trois règles qu&apos;on applique à chaque team building, du séminaire de managers à la journée d&apos;intégration.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {recipe.map((item, index) => (
                <div
                  key={item.title}
                  className="p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#22c55e]/20 to-[#00d4ff]/20 border border-white/10 flex items-center justify-center mb-6">
                    <Icon icon={item.icon} className="text-white" width={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comment ça se passe */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Vous réunissez, <span className="gradient-text">on fait jouer</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Pas de prestataires à coordonner : les jeux, l&apos;écran, le son et l&apos;animateur viennent ensemble.
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

            <div className="mt-12 text-center">
              <p className="text-zinc-400 mb-4">On vient chez vous :</p>
              <div className="flex flex-wrap justify-center gap-3">
                {cities.map((city) => (
                  <Link
                    key={city.name}
                    prefetch={false}
                    href={city.href}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 hover:border-[#ff2d55]/30 hover:text-[#ff2d55] transition-colors"
                  >
                    {city.name}
                  </Link>
                ))}
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-500">
                  et partout en France
                </span>
              </div>
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
                    Des équipes <span className="gradient-text">qui en parlent encore</span>
                  </h2>
                  <p className="text-zinc-500 mt-2">Un séminaire de managers, une soirée western, une matinée d&apos;intégration : ce qui s&apos;y est joué.</p>
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

        {/* Vers la page séminaires */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#ff2d55]/10 via-[#7928ca]/10 to-transparent border border-white/10 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Le team building s&apos;inscrit dans un séminaire ?</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-6">
              Les jeux de la journée, la soirée à thème, l&apos;assemblée générale du lendemain : on écrit le séminaire en entier, avec un seul fil rouge.
            </p>
            <Link
              prefetch={false}
              href="/seminaire-soiree-entreprise"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bg font-medium text-white hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all"
            >
              Animation de séminaire et soirée d&apos;entreprise
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
              <p className="text-zinc-400">Activités, nombre de participants, durée, lieux : les réponses courtes.</p>
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
              Combien serez-vous, <span className="gradient-text">et où</span> ?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Dites-nous le nombre de participants, le lieu et le temps dont vous disposez. On revient avec un déroulé et un prix.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                prefetch={false}
                href="/contact"
                className="group px-10 py-5 rounded-full gradient-bg font-semibold text-lg text-white hover:shadow-xl hover:shadow-[#7928ca]/30 transition-all duration-300 inline-flex items-center"
              >
                Raconter mon séminaire
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
              { '@type': 'ListItem', position: 2, name: 'Team building', item: PAGE_URL },
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
            name: "Team building d'entreprise",
            description:
              "Jeux d'équipe entre deux séances, escape game sur mesure, soirée à thème en équipes, blind test et jeux de plein air, avec classement en direct sur grand écran, animateurs et matériel fournis, partout en France.",
            serviceType: 'Team building',
            url: PAGE_URL,
            provider: { '@id': 'https://www.idkom.fr/#localbusiness' },
            areaServed: [
              { '@type': 'Country', name: 'France' },
              { '@type': 'City', name: 'Besançon' },
              { '@type': 'City', name: 'Belfort' },
              { '@type': 'City', name: 'Montbéliard' },
              { '@type': 'City', name: 'Mulhouse' },
              { '@type': 'City', name: 'Strasbourg' },
              { '@type': 'City', name: 'Lyon' },
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Formats de team building',
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
