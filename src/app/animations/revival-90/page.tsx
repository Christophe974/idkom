import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import AmbientBackground from '@/components/AmbientBackground';
import ProjetCard from '@/components/ProjetCard';
import { getHomepageData, getProjetBySlug, type Projet } from '@/lib/api';

// Page concept Revival 90 (nov. 2026), deuxième page nationale après PULSE.
// Cibles : « soirée années 90 entreprise », « soirée à thème années 90 », « blind test années 90 »,
// « soirée rétro séminaire ». Pas encore de réalisation publiée : on raconte le déroulé,
// sans chiffres ni client. À enrichir avec les photos d'une vraie soirée quand le client l'accepte.
// Route statique : elle passe devant /animations/[slug] ; la ligne cms_animations « revival-90 »
// ne sert qu'à la liste /animations et au sitemap.

const PAGE_URL = 'https://www.idkom.fr/animations/revival-90';
const ASSETS = 'https://olmcbqiojczhupspzedo.supabase.co/storage/v1/object/public/vitrine-assets/animations';
const HERO_IMAGE = `${ASSETS}/revival-90-affiche.webp`;
// Version « sans-date » du teaser (ni date ni lieu), 720p, faststart.
const TEASER_VIDEO = `${ASSETS}/revival-90-teaser.mp4`;
const TEASER_POSTER = `${ASSETS}/revival-90-teaser-poster.webp`;

export const metadata: Metadata = {
  title: 'Soirée années 90 pour séminaire et entreprise : Revival 90',
  description:
    'Une soirée, une décennie : équipes Tamagotchi, Walkman ou Minitel, blind test 90, jeux sur téléphone et enchères. iDkom l’anime partout en France.',
  keywords: [
    'soirée années 90 entreprise',
    'soirée à thème années 90',
    'soirée 90 séminaire',
    'blind test années 90',
    'soirée rétro entreprise',
    "animation soirée d'entreprise à thème",
    'soirée de fin d’année entreprise',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { fr: PAGE_URL },
  },
  openGraph: {
    title: 'Revival 90 · la soirée années 90 de votre entreprise | iDkom',
    description: 'Une soirée. Une décennie. Vos souvenirs vont jouer contre vous. Équipes, blind test 90 et enchères, partout en France.',
    url: PAGE_URL,
    siteName: 'iDkom',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 900, alt: 'Affiche néon de la soirée Revival 90' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Revival 90 · la soirée années 90 de votre entreprise | iDkom',
    description: 'Une soirée. Une décennie. Vos souvenirs vont jouer contre vous.',
  },
};

export const revalidate = 3600;

// La soirée Revival 90 d'Orange (3 nov. 2026), puis d'autres soirées jouées avec PULSE.
const PROJECT_SLUGS = [
  'revival-90-seminaire-orange-domaine-les-12-ponts',
  'la-ruee-vers-l-or-soiree-western-swapn-domaine-des-12-ponts',
  'blind-test-geant-grand-place-grenoble-oz-marketing',
];

const steps = [
  {
    icon: 'solar:letter-linear',
    title: 'La veille',
    description:
      "Le lien part la veille, avec le teaser et l'inscription. Les équipes se forment dans l'ordre d'arrivée des inscriptions : c'est le temps le maître du jeu.",
  },
  {
    icon: 'solar:ticket-linear',
    title: "L'arrivée",
    description:
      "Chacun reçoit son badge et rejoint la table de son équipe. Le jeu s'ouvre sur son téléphone, sans rien installer.",
  },
  {
    icon: 'solar:target-linear',
    title: "Les jeux d'équipe",
    description:
      "421, chamboule-tout, petit bac, défis à table : chaque partie rapporte des points à l'équipe. Entre deux phases de travail l'après-midi, ou tout au long de la soirée.",
  },
  {
    icon: 'solar:music-notes-linear',
    title: 'Le blind test 90',
    description:
      "Entre l'entrée et le plat, toute la salle joue depuis sa table. Puis le meilleur de chaque équipe monte pour la finale, devant tout le monde.",
  },
  {
    icon: 'solar:cup-star-linear',
    title: 'Le grand final',
    description:
      "Le classement s'affiche sur l'écran géant, la table gagnante se lève, et tout ce qui a été gagné part aux enchères.",
  },
  {
    icon: 'solar:key-minimalistic-linear',
    title: 'En repartant',
    description:
      "En option, un porte-clé au nom de chacun : ses jeux continuent à la maison, entre amis ou en famille.",
  },
];

const teams = [
  { icon: 'solar:emoji-funny-circle-linear', name: 'Tamagotchi', memory: "Celui qu'il fallait nourrir pendant les cours." },
  { icon: 'solar:gamepad-linear', name: 'Game Boy', memory: 'Tetris sur la banquette arrière, en route pour les vacances.' },
  { icon: 'solar:headphones-round-linear', name: 'Walkman', memory: 'La cassette rembobinée au crayon.' },
  { icon: 'solar:cassette-linear', name: 'VHS', memory: '« Merci de rembobiner avant de rendre. »' },
  { icon: 'solar:keyboard-linear', name: 'Minitel', memory: 'Le 3615, puis la facture de fin de mois.' },
  { icon: 'solar:phone-rounded-linear', name: 'Bi-Bop', memory: 'Le téléphone de poche qui ne marchait que près d’une borne.' },
];

const decor = [
  {
    src: `${ASSETS}/revival-90-bar-cassettes-boombox.webp`,
    alt: 'Décor du bar Revival : étagères de cassettes, baladeur, cassettes vidéo et boombox sous les néons',
    caption: 'Cassettes, baladeur et boombox',
  },
  {
    src: `${ASSETS}/revival-90-bar-boule-a-facettes.webp`,
    alt: 'Décor du bar Revival : boule à facettes, console portable, cube à facettes de couleur et photos instantanées',
    caption: 'La boule à facettes et les photos instantanées',
  },
];

const faqs = [
  {
    question: 'Faut-il venir déguisé ?',
    answer:
      "C'est vous qui décidez. Le dress code années 90 se glisse dans l'invitation, mais la soirée marche aussi bien en costume-cravate : ce sont les souvenirs qui jouent, pas les tenues.",
  },
  {
    question: "Et ceux qui n'ont pas connu les années 90 ?",
    answer:
      "Les extraits et les questions sont choisis pour que chaque génération ait sa manche. Les plus jeunes connaissent ces tubes par leurs reprises, et les équipes mélangent les âges.",
  },
  {
    question: 'Pour combien de personnes ?',
    answer:
      'De 20 à 200, en équipes de 8 à 10 par table. Chacun joue sur son propre téléphone, pour lui et pour son équipe.',
  },
  {
    question: 'Peut-on l’intégrer à un séminaire de travail ?',
    answer:
      "Oui. Des jeux courts de 15 à 20 minutes entre les phases de travail l'après-midi, puis le blind test et les enchères le soir : le classement court sur toute la journée.",
  },
  {
    question: 'La soirée peut-elle être à nos couleurs ?',
    answer:
      "Votre logo sur les écrans, des questions sur votre entreprise dans les années 90, des noms d'équipes tirés de votre histoire : vos premiers produits, vos premiers magasins.",
  },
  {
    question: 'Venez-vous partout en France ?',
    answer:
      "Oui. Notre atelier est à Brevilliers, entre Belfort et Montbéliard, et nous partons avec le décor, les écrans, le son, les jeux et les animateurs. Les frais de route sont chiffrés dans la proposition.",
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

export default async function Revival90Page() {
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
              <span className="text-zinc-300">Revival 90</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff2d55]/10 border border-[#ff2d55]/20 text-sm text-[#ff2d55] mb-6">
                  <Icon icon="solar:cassette-linear" width={18} />
                  Soirée à thème · partout en France
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Revival 90
                  <br />
                  <span className="gradient-text">la soirée années 90</span>
                  <span className="block mt-3 text-2xl md:text-3xl font-semibold text-zinc-300">
                    de votre séminaire d&apos;entreprise
                  </span>
                </h1>
                <p className="text-lg text-zinc-400 mb-4 max-w-xl leading-relaxed">
                  La veille, un lien arrive. Trente secondes : un carton de grenier, une cassette, une télé
                  qui grésille. « Vous pensiez avoir oublié ? On va vérifier. » Le lendemain soir, chacun
                  récupère son badge et découvre son équipe : Tamagotchi, Game Boy, Walkman, VHS, Minitel
                  ou Bi-Bop. Les tubes reviennent, les vieilles rivalités aussi.
                </p>
                <p className="text-zinc-500 mb-8 max-w-xl leading-relaxed">
                  Revival 90 se joue avec <Link href="/animations/pulse" className="text-[#ff2d55] hover:underline">PULSE</Link> :
                  chacun sur son téléphone, le classement en direct sur grand écran, et des enchères pour
                  finir. On apporte le décor, les jeux et les animateurs.
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
                    href="/animations/pulse"
                    className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-medium text-white hover:bg-white/10 transition-all duration-300 inline-flex items-center"
                  >
                    <Icon icon="solar:gamepad-linear" className="mr-2" width={20} />
                    Comment se joue la partie
                  </Link>
                </div>
              </div>

              <div className="relative animate-fade-in-up delay-200">
                <div className="aspect-[16/9] rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/10 overflow-hidden relative">
                  <Image
                    src={HERO_IMAGE}
                    alt="Affiche néon Revival 90 : une soirée, une décennie, vos souvenirs vont jouer contre vous"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 left-4 sm:-left-6 p-4 rounded-2xl bg-zinc-900/90 backdrop-blur-sm border border-white/10 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Icon icon="solar:users-group-two-rounded-linear" className="text-white" width={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">6 équipes</p>
                      <p className="text-xs text-zinc-500">qui portent le nom d&apos;un objet culte</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teaser */}
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Le teaser <span className="gradient-text">de la veille</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Trente secondes envoyées avec l&apos;inscription. Vos invités arrivent en sachant déjà qu&apos;ils vont jouer.
              </p>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black">
              <video
                className="absolute inset-0 w-full h-full"
                controls
                playsInline
                preload="none"
                poster={TEASER_POSTER}
                aria-label="Teaser Revival 90 : un carton de souvenirs des années 90 qu'on n'aurait peut-être pas dû ouvrir"
              >
                <source src={TEASER_VIDEO} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* Pourquoi les années 90 */}
        <section className="py-20 px-6 border-y border-white/5 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Vos souvenirs vont <span className="gradient-text">jouer contre vous</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                Ceux qui avaient quinze ans en 1995 mènent aujourd&apos;hui les équipes. Les plus jeunes ont grandi
                avec les reprises. Trois notes d&apos;un tube de l&apos;époque, et toute la salle chante la suite :
                le directeur commercial comme l&apos;alternant arrivé en septembre.
              </p>
            </div>
            <div className="relative aspect-[16/5] rounded-3xl overflow-hidden border border-white/10">
              <Image
                src={`${ASSETS}/revival-90-bar-enseigne-neon.webp`}
                alt="Enseigne néon Revival entourée d'étagères de cassettes, baladeur, boombox, console portable et boule à facettes"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </div>
        </section>

        {/* Déroulé */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Le déroulé <span className="gradient-text">d&apos;une soirée Revival 90</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Une soirée seule ou une journée de séminaire entière : chaque moment rapporte des points à la même équipe.
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

        {/* Équipes */}
        <section className="py-24 px-6 bg-gradient-to-b from-transparent via-[#7928ca]/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Six équipes, <span className="gradient-text">six objets cultes</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Chaque table porte un nom qui fait sourire avant même le premier jeu. Les noms peuvent aussi venir
                de votre histoire.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.map((team) => (
                <div key={team.name} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ff2d55]/10 border border-[#ff2d55]/20 flex items-center justify-center flex-shrink-0">
                    <Icon icon={team.icon} className="text-[#ff2d55]" width={24} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Équipe {team.name}</p>
                    <p className="text-zinc-500 text-sm">{team.memory}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Décor */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Le bar <span className="gradient-text">Revival</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Des néons, des cassettes, une boombox et une boule à facettes : le bar prend les couleurs de la
                décennie, les écrans aussi.
              </p>
              <p className="text-zinc-500 leading-relaxed">
                Il nous faut une prise électrique et l&apos;accès à la salle deux heures avant vos invités. Le décor,
                les écrans, le son, les jeux et les animateurs arrivent avec nous, que la soirée soit à Montbéliard,
                à Lyon ou à Paris.
              </p>
            </div>
            <div className="lg:col-span-3 grid grid-cols-2 gap-4">
              {decor.map((item) => (
                <figure key={item.src} className="rounded-3xl bg-zinc-900/50 border border-white/10 overflow-hidden">
                  <div className="relative aspect-square">
                    <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 30vw" />
                  </div>
                  <figcaption className="p-4 text-sm text-zinc-400">{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* La soirée Orange et les autres */}
        {projets.length > 0 && (
          <section className="py-24 px-6 bg-zinc-900/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Revival 90 chez Orange, <span className="gradient-text">et d&apos;autres soirées PULSE</span>
                  </h2>
                  <p className="text-zinc-500 mt-2">La soirée telle qu&apos;elle s&apos;est jouée, puis le même jeu dans un autre décor.</p>
                </div>
                <Link
                  prefetch={false}
                  href="/animations"
                  className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  Toutes nos animations
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
              <p className="text-zinc-400">Déguisements, générations, séminaire, déplacement : les réponses courtes.</p>
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
              Prêts à <span className="gradient-text">rembobiner</span>&nbsp;?
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
              { '@type': 'ListItem', position: 3, name: 'Revival 90', item: PAGE_URL },
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

      {/* Teaser */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: 'Revival 90 · le teaser de la soirée années 90',
            description:
              'Un carton de souvenirs, une cassette, une télé qui grésille : trente secondes envoyées aux invités la veille de la soirée Revival 90.',
            thumbnailUrl: [TEASER_POSTER, HERO_IMAGE],
            uploadDate: '2026-11-01',
            duration: 'PT30S',
            contentUrl: TEASER_VIDEO,
            publisher: { '@id': 'https://www.idkom.fr/#localbusiness' },
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
            name: "Revival 90, soirée années 90 pour séminaire et soirée d'entreprise",
            description:
              'Soirée à thème années 90 : équipes aux noms d’objets cultes, jeux d’équipe, blind test 90, classement en direct et enchères, avec décor, écrans, son et animateurs, partout en France.',
            serviceType: "Animation d'événements d'entreprise",
            url: PAGE_URL,
            image: HERO_IMAGE,
            provider: { '@id': 'https://www.idkom.fr/#localbusiness' },
            areaServed: { '@type': 'Country', name: 'France' },
          }),
        }}
      />

      <FooterServer site={data.site} social={data.social} />
    </>
  );
}
