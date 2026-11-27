import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import AmbientBackground from '@/components/AmbientBackground';
import ProjetCard from '@/components/ProjetCard';
import { getHomepageData, getProjetBySlug, type Projet } from '@/lib/api';

// Page concept « Opération 103 » (nov. 2026) : l'escape game d'entreprise écrit pour Belfort.
// Cibles : « escape game entreprise belfort », « team building belfort », « escape game team building »,
// « cohésion d'équipe belfort ». Ni client ni date : la première partie se joue en décembre 2026 et
// les joueurs ne doivent rien apprendre ici de plus que le teaser (pas d'étapes, pas de lieux du
// parcours, pas de code). À enrichir avec des photos et une réalisation une fois la partie jouée.
// Route statique : elle passe devant /animations/[slug] ; la ligne cms_animations « operation-103 »
// ne sert qu'à la liste /animations et au sitemap.

const PAGE_URL = 'https://www.idkom.fr/animations/operation-103';
const ASSETS = 'https://olmcbqiojczhupspzedo.supabase.co/storage/v1/object/public/vitrine-assets/animations';
const HERO_IMAGE = `${ASSETS}/operation-103-belfort-103-jours.webp`;

export const metadata: Metadata = {
  title: "Escape game d'entreprise à Belfort : Opération 103",
  description:
    "Un pirate, un coffre, 75 minutes : vos équipes parcourent Belfort, téléphone en main, pour retrouver le code. Un team building écrit pour votre entreprise, à Belfort ou dans votre ville.",
  keywords: [
    'escape game entreprise Belfort',
    'team building Belfort',
    'escape game team building',
    'escape game urbain entreprise',
    "cohésion d'équipe Belfort",
    'séminaire Belfort',
    'escape game sur mesure entreprise',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { fr: PAGE_URL },
  },
  openGraph: {
    title: "Opération 103 · l'escape game d'entreprise dans les rues de Belfort | iDkom",
    description: 'Assiégée, Belfort a tenu 103 jours. Votre équipe a 75 minutes.',
    url: PAGE_URL,
    siteName: 'iDkom',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 900, alt: 'Opération 103 : assiégée, Belfort a tenu 103 jours' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Opération 103 · l'escape game d'entreprise dans les rues de Belfort | iDkom",
    description: 'Assiégée, Belfort a tenu 103 jours. Votre équipe a 75 minutes.',
  },
};

export const revalidate = 3600;

// Le même jeu écrit pour Montbéliard, puis deux journées d'équipe déjà jouées.
const PROJECT_SLUGS = [
  'operation-code-wurtemberg-escape-game-montbeliard',
  'ag-credit-mutuel-belfort-centre-kinepolis-saynetes-quiz-bar-a-goodies',
  'revival-90-seminaire-orange-domaine-les-12-ponts',
];

const message = [
  {
    src: `${ASSETS}/operation-103-vous-avez-un-message.webp`,
    alt: 'Écran du teaser Opération 103 : « Vous avez un message. Expéditeur : inconnu. Objet : votre coffre. »',
    caption: 'Expéditeur : inconnu.',
  },
  {
    src: `${ASSETS}/operation-103-coffre-virus.webp`,
    alt: "Écran du teaser Opération 103 : « J'ai craqué les codes de votre coffre. Et j'y ai laissé un virus. »",
    caption: 'Le coffre est infecté.',
  },
  {
    src: `${ASSETS}/operation-103-code-cache-dans-belfort.webp`,
    alt: "Écran du teaser Opération 103 : « Le code qui l'annule existe. Je l'ai caché dehors, en morceaux, dans Belfort. »",
    caption: 'Le code est dehors, en morceaux.',
  },
];

const steps = [
  {
    icon: 'solar:letter-linear',
    title: 'Quelques jours avant',
    description:
      "Le message du pirate arrive dans les boîtes mail, envoyé par le directeur lui-même. Moins d'une minute de vidéo : de quoi alimenter la machine à café jusqu'au jour J.",
  },
  {
    icon: 'solar:users-group-two-rounded-linear',
    title: 'Le matin, les équipes',
    description:
      "On forme les équipes dans votre salle de réunion : quatre ou cinq par équipe, le téléphone en main. Rien à installer, le jeu s'ouvre tout seul.",
  },
  {
    icon: 'solar:map-point-wave-linear',
    title: '75 minutes dehors',
    description:
      "Les équipes partent l'une après l'autre dans le centre-ville. Des énigmes cachées dans le patrimoine, des défis à relever ensemble : chaque étape réussie livre un morceau du code.",
  },
  {
    icon: 'solar:shield-keyhole-linear',
    title: 'Des questions sur vous',
    description:
      "Au milieu du parcours, le pirate dresse un pare-feu : des questions sur votre entreprise, vos métiers, votre histoire. Celles que seuls vos collègues savent résoudre.",
  },
  {
    icon: 'solar:safe-square-linear',
    title: 'Le retour au coffre',
    description:
      "Tout le monde revient. Les équipes remettent les morceaux du code dans l'ordre et le tapent devant les autres. Puis le classement, et le repas.",
  },
  {
    icon: 'solar:user-speak-rounded-linear',
    title: 'Deux animateurs',
    description:
      "Ils lancent les équipes, relancent celles qui calent et gardent l'œil sur le chrono. Vous, vous jouez.",
  },
];

const belfort = [
  {
    icon: 'solar:calendar-linear',
    title: '103 jours',
    text: "Du 3 novembre 1870 au 18 février 1871, Belfort assiégée ne se rend pas. C'est le nom de code de la partie.",
  },
  {
    icon: 'solar:crown-linear',
    title: 'Le Lion',
    text: "Adossé à la falaise, sous la citadelle, le Lion de Bartholdi rappelle ce siège à tous ceux qui lèvent la tête.",
  },
  {
    icon: 'solar:city-linear',
    title: 'La vieille ville',
    text: "Des remparts de Vauban aux façades colorées : le terrain de jeu tient dans le centre, et se parcourt à pied.",
  },
];

const faqs = [
  {
    question: 'À qui s’adresse Opération 103 ?',
    answer:
      "Aux entreprises, aux collectivités et aux associations : un séminaire, une journée d'équipe, l'accueil des nouveaux arrivants. Ce n'est pas un jeu ouvert au public, il s'écrit pour une équipe à la fois.",
  },
  {
    question: 'Pour combien de personnes ?',
    answer:
      "Une partie réunit une vingtaine de personnes, en équipes de quatre ou cinq. À Montbéliard, la Mairie joue par sessions de 25 nouveaux agents. Pour un groupe plus grand, on ajoute des équipes et on décale les départs : parlons-en.",
  },
  {
    question: 'Combien de temps faut-il prévoir ?',
    answer:
      "75 minutes de jeu dans les rues de Belfort. Avec la formation des équipes, le retour et les résultats, comptez une matinée. Le repas peut suivre dans votre salle.",
  },
  {
    question: 'Faut-il installer quelque chose sur les téléphones ?',
    answer: "Non. Tout se joue depuis le téléphone de l'équipe, sans rien installer.",
  },
  {
    question: 'Les énigmes peuvent-elles parler de notre entreprise ?',
    answer:
      "C'est le principe. L'histoire, l'enjeu et une partie des questions s'écrivent avec vous : vos métiers, vos chiffres, votre histoire. Le reste vient de la ville.",
  },
  {
    question: 'Et s’il fait froid ?',
    answer:
      "On joue dehors, en décembre aussi. Le parcours tient dans le centre-ville et se fait à pied : de bonnes chaussures et un manteau suffisent.",
  },
  {
    question: 'Peut-on jouer ailleurs qu’à Belfort ?',
    answer:
      "Oui. L'histoire se réécrit pour chaque ville : à Montbéliard, c'est l'Opération Code Wurtemberg, jouée par la Mairie deux fois par an depuis 2024. On vient repérer le parcours à pied, où que vous soyez en France.",
  },
  {
    question: 'Combien de temps à l’avance faut-il réserver ?',
    answer:
      "Six à huit semaines : le temps d'écrire l'histoire avec vous, de repérer le parcours et de préparer les énigmes.",
  },
];

async function getProjects(): Promise<Projet[]> {
  const results = await Promise.all(PROJECT_SLUGS.map((slug) => getProjetBySlug(slug).catch(() => null)));
  return results.filter((p): p is Projet => p !== null);
}

export default async function Operation103Page() {
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
              <span className="text-zinc-300">Opération 103</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff2d55]/10 border border-[#ff2d55]/20 text-sm text-[#ff2d55] mb-6">
                  <Icon icon="solar:shield-keyhole-linear" width={18} />
                  Réservé aux entreprises · Belfort
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Opération 103
                  <br />
                  <span className="gradient-text">l&apos;escape game d&apos;entreprise</span>
                  <span className="block mt-3 text-2xl md:text-3xl font-semibold text-zinc-300">
                    dans les rues de Belfort
                  </span>
                </h1>
                <p className="text-lg text-zinc-400 mb-4 max-w-xl leading-relaxed">
                  Un matin, un message arrive. « Bonjour. J&apos;ai craqué les codes de votre coffre. Et j&apos;y ai
                  laissé un virus. » Le code qui l&apos;annule existe : il est caché dehors, en morceaux, dans Belfort.
                  Assiégée, la ville a tenu 103 jours. Votre équipe, elle, a 75 minutes.
                </p>
                <p className="text-zinc-500 mb-8 max-w-xl leading-relaxed">
                  Opération 103 est un escape game écrit pour souder une équipe : quatre ou cinq par équipe, le
                  téléphone en main, le centre-ville pour terrain de jeu. On écrit l&apos;histoire avec vous, on repère
                  le parcours, et deux animateurs suivent la partie jusqu&apos;au retour.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    prefetch={false}
                    href="/contact"
                    className="group px-8 py-4 rounded-full gradient-bg font-medium text-white hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all duration-300 inline-flex items-center"
                  >
                    Lancer l&apos;opération
                    <Icon icon="solar:arrow-right-linear" className="ml-2 group-hover:translate-x-1 transition-transform" width={20} />
                  </Link>
                  <Link
                    prefetch={false}
                    href="/team-building"
                    className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-medium text-white hover:bg-white/10 transition-all duration-300 inline-flex items-center"
                  >
                    <Icon icon="solar:users-group-two-rounded-linear" className="mr-2" width={20} />
                    Nos autres team buildings
                  </Link>
                </div>
              </div>

              <div className="relative animate-fade-in-up delay-200">
                <div className="aspect-[16/9] rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/10 overflow-hidden relative">
                  <Image
                    src={HERO_IMAGE}
                    alt="Écran du teaser Opération 103 : « Assiégée, Belfort a tenu 103 jours. En 1870-1871. Et sans wifi. »"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 left-4 sm:-left-6 p-4 rounded-2xl bg-zinc-900/90 backdrop-blur-sm border border-white/10 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Icon icon="solar:stopwatch-linear" className="text-white" width={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">75 minutes</p>
                      <p className="text-xs text-zinc-500">pour retrouver le code</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Le message */}
        <section className="py-20 px-6 border-y border-white/5 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Tout commence par <span className="gradient-text">un message</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                Le pirate n&apos;en veut ni aux comptes ni aux données : seulement au coffre, et à ce qu&apos;il contient.
                Il a le sens de l&apos;humour, un faible pour l&apos;histoire locale, et il déteste gagner trop facilement.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {message.map((item) => (
                <figure key={item.src} className="rounded-3xl bg-zinc-900/50 border border-white/10 overflow-hidden">
                  <div className="relative aspect-video">
                    <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <figcaption className="p-4 text-sm text-zinc-400">{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Belfort */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Pourquoi <span className="gradient-text">103</span> ?
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Pendant l&apos;hiver 1870-1871, Belfort est encerclée. La ville tient 103 jours, et ne dépose les armes
                que sur ordre du gouvernement. Quelques années plus tard, Bartholdi sculpte son Lion sous la citadelle,
                pour que personne n&apos;oublie.
              </p>
              <p className="text-zinc-500 leading-relaxed mb-8">
                C&apos;est cette ville-là que vos équipes traversent. Elles lèvent la tête, lisent ce que plus personne
                ne lit, se trompent de rue : en une matinée, elles regardent Belfort comme elles ne l&apos;avaient
                jamais regardée, et elles le font ensemble.
              </p>
              <ul className="space-y-4">
                {belfort.map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#ff2d55]/10 border border-[#ff2d55]/20 flex items-center justify-center">
                      <Icon icon={item.icon} className="text-[#ff2d55]" width={22} />
                    </span>
                    <span>
                      <span className="block font-semibold text-white">{item.title}</span>
                      <span className="block text-sm text-zinc-500 leading-relaxed">{item.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10">
              <Image
                src={`${ASSETS}/operation-103-75-minutes.webp`}
                alt="Écran du teaser Opération 103 : le chrono de 75 minutes vient de partir"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Déroulé */}
        <section className="py-24 px-6 bg-gradient-to-b from-transparent via-[#7928ca]/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Le déroulé <span className="gradient-text">d&apos;une opération</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Une matinée suffit. Le reste de la journée, on en reparle.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="absolute top-6 right-6 text-5xl font-bold text-white/5">{index + 1}</span>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff2d55]/20 to-[#7928ca]/20 border border-white/10 flex items-center justify-center mb-5">
                    <Icon icon={step.icon} className="text-white" width={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Belfort et ailleurs */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#ff2d55]/10 via-[#7928ca]/10 to-transparent border border-white/10 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              À Belfort, à un quart d&apos;heure de l&apos;atelier. Ou dans votre ville.
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-6">
              Chaque ville a son histoire, et le pirate les connaît toutes. À Montbéliard, il s&apos;en prend à la Cité
              des Princes. Chez vous, il trouvera autre chose : on vient repérer le parcours à pied, puis on écrit.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                prefetch={false}
                href="/animations-evenementielles/belfort"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bg font-medium text-white hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all"
              >
                Séminaires et soirées d&apos;entreprise à Belfort
                <Icon icon="solar:arrow-right-linear" width={18} />
              </Link>
              <Link
                prefetch={false}
                href="/realisations/operation-code-wurtemberg-escape-game-montbeliard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 font-medium text-white hover:bg-white/10 transition-all"
              >
                L&apos;escape game de la Mairie de Montbéliard
                <Icon icon="solar:arrow-right-linear" width={18} />
              </Link>
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
                    Le même jeu à Montbéliard, <span className="gradient-text">et d&apos;autres journées d&apos;équipe</span>
                  </h2>
                  <p className="text-zinc-500 mt-2">Ce qui s&apos;est déjà joué, à Belfort et autour.</p>
                </div>
                <Link
                  prefetch={false}
                  href="/team-building"
                  className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  Tous nos team buildings
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
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Questions <span className="gradient-text">fréquentes</span>
              </h2>
              <p className="text-zinc-400">Effectif, durée, météo, autres villes : les réponses courtes.</p>
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
              Et si la prochaine équipe, <span className="gradient-text">c&apos;était la vôtre</span>&nbsp;?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Dites-nous combien vous serez, dans quelle ville et à quelle date. On revient avec une histoire et un prix.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                prefetch={false}
                href="/contact"
                className="group px-10 py-5 rounded-full gradient-bg font-semibold text-lg text-white hover:shadow-xl hover:shadow-[#7928ca]/30 transition-all duration-300 inline-flex items-center"
              >
                Lancer l&apos;opération
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
              { '@type': 'ListItem', position: 3, name: 'Opération 103', item: PAGE_URL },
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
            name: "Opération 103, escape game d'entreprise à Belfort",
            description:
              "Escape game en ville écrit pour les entreprises : des équipes de quatre ou cinq, 75 minutes dans le centre de Belfort pour retrouver un code, deux animateurs, une histoire et des questions écrites pour l'entreprise. Adaptable à toute autre ville.",
            serviceType: "Team building et animation d'événements d'entreprise",
            url: PAGE_URL,
            image: HERO_IMAGE,
            provider: { '@id': 'https://www.idkom.fr/#localbusiness' },
            areaServed: [
              { '@type': 'City', name: 'Belfort' },
              { '@type': 'Country', name: 'France' },
            ],
          }),
        }}
      />

      <FooterServer site={data.site} social={data.social} />
    </>
  );
}
