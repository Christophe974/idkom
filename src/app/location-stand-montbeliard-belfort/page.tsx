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

// Page SEO locale : « location de stand montbéliard », « location de matériel événementiel
// montbéliard / belfort », « transport événementiel belfort », « standiste mulhouse »…
// (Search Console, août 2026 : ~90 impressions/mois, positions 14 à 58, 0 clic.)
// /bematrix reste la page nationale ; celle-ci parle du Nord Franche-Comté.

const PAGE_URL = 'https://www.idkom.fr/location-stand-montbeliard-belfort';

export const metadata: Metadata = {
  title: 'Location de stand et matériel événementiel à Montbéliard et Belfort',
  description:
    "Stands BeMatrix, écrans LED, mobilier et animations à louer, livrés et montés à Montbéliard, Belfort et dans le Nord Franche-Comté. Atelier à Brevilliers, à un quart d'heure des deux villes.",
  keywords: [
    'location de stand montbéliard',
    'location de stand belfort',
    'location de matériel événementiel montbéliard',
    'location de matériel événementiel belfort',
    'transport événementiel belfort',
    'standiste montbéliard',
    'standiste belfort',
    'location écran led belfort',
    'stand salon franche-comté',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { fr: PAGE_URL },
  },
  openGraph: {
    title: 'Location de stand et matériel événementiel à Montbéliard et Belfort | iDkom',
    description:
      "Stands BeMatrix, écrans LED, mobilier et animations à louer, livrés et montés dans le Nord Franche-Comté. Atelier à Brevilliers, entre Belfort et Montbéliard.",
    url: PAGE_URL,
    siteName: 'iDkom',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: 'https://www.idkom.fr/images/bematrix-hero.jpg', width: 1200, height: 630, alt: 'Stand monté par iDkom pour un salon' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Location de stand et matériel événementiel à Montbéliard et Belfort | iDkom',
    description: "Stands, écrans LED, mobilier et animations livrés et montés dans le Nord Franche-Comté.",
  },
};

export const revalidate = 3600;

// Réalisations montées à Montbéliard, Belfort et autour : on montre l'objet du client, pas une liste de logos.
const LOCAL_PROJECT_SLUGS = [
  'oms-belfort-ecrans-led-pitch-3-1',
  'bar-alphabet-en-images-manpower',
  'operation-code-wurtemberg-escape-game-montbeliard',
  'ag-credit-mutuel-audincourt-quiz-antifraude-live',
];

const rentals = [
  {
    icon: 'solar:widget-linear',
    title: 'Stands BeMatrix',
    description:
      "Cadres aluminium, parois, réserves et comptoirs, du stand de 9 m² à l'espace de 100 m². Plus de 4 000 pièces en stock, conception 3D et montage par nos équipes.",
    href: '/bematrix',
    linkLabel: 'Le stand BeMatrix',
    color: '#ff2d55',
  },
  {
    icon: 'solar:monitor-linear',
    title: 'Écrans LED et LEDskin®',
    description:
      "Mur LED pitch 3.1 pour une soirée ou une convention, ou 12 m² de LEDskin® intégrés dans les cadres du stand, sans bord d'écran visible.",
    href: '/realisations/oms-belfort-ecrans-led-pitch-3-1',
    linkLabel: 'Les 20 ans de l’OMS Belfort',
    color: '#7928ca',
  },
  {
    icon: 'solar:lamp-linear',
    title: 'Éclairage de stand',
    description:
      'Spots LED, bandeaux lumineux et rétro-éclairage de parois, intégrés aux cadres. Un stand éclairé se voit depuis l’autre bout de l’allée.',
    href: '/blog/eclairage-stand-bematrix',
    linkLabel: 'Bien éclairer son stand',
    color: '#f59e0b',
  },
  {
    icon: 'solar:sofa-linear',
    title: 'Mobilier et comptoirs',
    description:
      "Comptoirs d'accueil, mange-debout, présentoirs et mobilier habillé à vos couleurs, livrés avec le stand ou seuls.",
    href: '/realisations/credit-mutuel-mobilier-evenementiel-personnalise',
    linkLabel: 'Le mobilier du Crédit Mutuel',
    color: '#00d4ff',
  },
  {
    icon: 'solar:gamepad-linear',
    title: 'Animations à louer',
    description:
      'Photobooth IA, bar à goodies, kermesse 2.0, quiz sur grand écran, roue des avis. Avec un animateur ou en autonomie, selon la soirée.',
    href: '/animations',
    linkLabel: 'Toutes les animations',
    color: '#22c55e',
  },
  {
    icon: 'solar:printer-linear',
    title: 'Signalétique imprimée',
    description:
      'Bâches au format, affiches, kakémonos, gobelets réutilisables et cartes de visite pour compléter le stand. Fabriqués et livrés avec le reste.',
    href: '/contact',
    linkLabel: 'Décrire votre besoin',
    color: '#ec4899',
  },
];

const steps = [
  {
    icon: 'solar:chat-round-dots-linear',
    title: 'Vous décrivez',
    description: 'La surface, le lieu, les dates, ce que vous voulez montrer. Un appel de dix minutes suffit souvent.',
  },
  {
    icon: 'solar:ruler-pen-linear',
    title: 'On dessine et on chiffre',
    description: 'Un plan 3D du stand ou une liste de matériel, avec une proposition chiffrée. Vous ajustez, on refait.',
  },
  {
    icon: 'solar:delivery-linear',
    title: 'On livre, on monte, on démonte',
    description: "Notre camion part de Brevilliers. Monteurs sur place, stand prêt avant l'ouverture, démontage le soir de la fermeture.",
  },
];

const venues = [
  { name: "L'Axone", city: 'Montbéliard', detail: "Salle de 6 000 places, salons et soirées d'entreprise" },
  { name: 'Parc des expositions', city: 'Montbéliard', detail: 'Foires et salons du Pays de Montbéliard' },
  { name: 'Atria', city: 'Belfort', detail: 'Centre de congrès, salles modulables' },
  { name: 'Le Phare', city: 'Belfort', detail: 'Salle de spectacles et grands événements' },
  { name: 'Micropolis', city: 'Besançon', detail: 'Parc des expositions, Salon des Collectivités' },
  { name: 'Domaine des 12 Ponts', city: 'Haute-Saône', detail: 'Séminaires et soirées au vert' },
];

const zones = ['Montbéliard', 'Belfort', 'Héricourt', 'Audincourt', 'Sochaux', 'Delle', 'Lure', 'Vesoul', 'Besançon', 'Mulhouse'];

const faqs = [
  {
    question: 'Louez-vous du matériel seul, sans montage ?',
    answer:
      "Oui. Agences et standistes viennent chercher ou se font livrer des cadres BeMatrix, des connecteurs, de l'éclairage ou nos modules LEDskin® depuis notre atelier de Brevilliers. Pour un exposant qui n'a pas d'équipe de montage, nous conseillons la formule livrée et montée.",
  },
  {
    question: 'Quel délai pour louer un stand à Montbéliard ou Belfort ?',
    answer:
      "Pour un stand dessiné sur mesure, comptez trois à six semaines entre le premier échange et le montage. Pour du matériel seul, cela dépend du stock disponible aux dates voulues : le catalogue en ligne le montre en temps réel. Pour un salon daté, parlez-nous-en tôt.",
  },
  {
    question: 'Livrez-vous et montez-vous sur place ?',
    answer:
      "Oui. Le matériel part de Brevilliers dans notre camion, nos monteurs installent le stand avant l'ouverture et le démontent à la fermeture. Nous connaissons l'Axone, l'Atria, Le Phare, Micropolis et la plupart des salles de la région.",
  },
  {
    question: "Peut-on louer un écran LED pour une soirée d'entreprise ?",
    answer:
      "Oui. Notre mur LED pitch 3.1 a par exemple habillé la soirée des 20 ans de l'Office Municipal des Sports de Belfort. Sur un stand, les 12 m² de LEDskin® s'intègrent directement dans les cadres BeMatrix.",
  },
  {
    question: "Quelle est votre zone d'intervention ?",
    answer:
      "Le Nord Franche-Comté d'abord : Montbéliard, Belfort, Héricourt, Audincourt, Sochaux, Delle, Lure. Puis Besançon, Vesoul, Mulhouse et l'Alsace. Et toute la France quand le salon l'exige : nous avons monté 38 stands à Nantes pour BIO360.",
  },
  {
    question: 'Comment obtenir un prix ?',
    answer:
      "Décrivez-nous la surface, le lieu et les dates. Nous revenons vers vous avec un plan et une proposition chiffrée, location seule ou formule livrée et montée.",
  },
];

async function getLocalProjects(): Promise<Projet[]> {
  const results = await Promise.all(
    LOCAL_PROJECT_SLUGS.map((slug) => getProjetBySlug(slug).catch(() => null)),
  );
  return results.filter((p): p is Projet => p !== null);
}

export default async function LocationStandPage() {
  const [data, projets] = await Promise.all([getHomepageData(), getLocalProjects()]);

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
                  <Icon icon="solar:map-point-wave-linear" width={18} />
                  Atelier à Brevilliers, entre Belfort et Montbéliard
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Location de stand et de matériel événementiel
                  <br />
                  <span className="gradient-text">à Montbéliard et Belfort</span>
                </h1>
                <p className="text-lg text-zinc-400 mb-4 max-w-xl leading-relaxed">
                  Le salon ouvre mardi à l&apos;Axone. Le stand arrive lundi matin dans notre camion,
                  il est monté avant midi et éclairé avant la nuit. Vous arrivez avec vos échantillons
                  et votre équipe, et le jeudi soir nous repartons avec le tout.
                </p>
                <p className="text-zinc-500 mb-8 max-w-xl leading-relaxed">
                  Stands <Link href="/bematrix" className="text-[#ff2d55] hover:underline">BeMatrix</Link>,
                  écrans LED, éclairage, mobilier, <Link href="/animations" className="text-[#ff2d55] hover:underline">animations</Link> :
                  tout part du même atelier, à un quart d&apos;heure de l&apos;une comme de l&apos;autre ville.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    prefetch={false}
                    href="/contact"
                    className="group px-8 py-4 rounded-full gradient-bg font-medium text-white hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all duration-300 inline-flex items-center"
                  >
                    Décrire mon projet
                    <Icon icon="solar:arrow-right-linear" className="ml-2 group-hover:translate-x-1 transition-transform" width={20} />
                  </Link>
                  <Link
                    prefetch={false}
                    href="/catalogue"
                    className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-medium text-white hover:bg-white/10 transition-all duration-300 inline-flex items-center"
                  >
                    <Icon icon="solar:box-linear" className="mr-2" width={20} />
                    Le stock en temps réel
                  </Link>
                </div>
              </div>

              <div className="relative animate-fade-in-up delay-200">
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/10 overflow-hidden relative">
                  <Image
                    src="/images/stock-bematrix.webp"
                    alt="Le stock de cadres BeMatrix dans l'atelier iDkom à Brevilliers, prêt à partir pour Montbéliard ou Belfort"
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
                      <Icon icon="solar:delivery-linear" className="text-white" width={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">15 min</p>
                      <p className="text-xs text-zinc-500">de Belfort comme de Montbéliard</p>
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
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2"><Counter target={4000} />+</p>
                <p className="text-sm text-zinc-500">Pièces BeMatrix en stock</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2"><Counter target={12} /> m²</p>
                <p className="text-sm text-zinc-500">LEDskin® à louer</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2"><Counter target={30} /> ans</p>
                <p className="text-sm text-zinc-500">De montages en Franche-Comté</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2"><Counter target={600} />+</p>
                <p className="text-sm text-zinc-500">Projets livrés</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ce qu'on loue */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ce que vous pouvez <span className="gradient-text">louer</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Un stand complet ou une seule pièce qui manque. Tout est en stock à Brevilliers,
                et tout peut arriver dans le même camion.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentals.map((item, index) => (
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
                Livré, monté, <span className="gradient-text">démonté</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Le transport et le montage font partie de la location. Vous n&apos;avez pas de camion à réserver ni de monteurs à trouver.
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
                Les salles que nous <span className="gradient-text">connaissons</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Quai de déchargement, hauteur sous plafond, horaires de montage : autant de questions qu&apos;on ne se pose plus.
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

        {/* Réalisations locales */}
        {projets.length > 0 && (
          <section className="py-24 px-6 bg-zinc-900/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Montés <span className="gradient-text">à côté de chez vous</span>
                  </h2>
                  <p className="text-zinc-500 mt-2">Belfort, Montbéliard, Audincourt : ce que nous y avons installé.</p>
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

        {/* FAQ */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Questions <span className="gradient-text">fréquentes</span>
              </h2>
              <p className="text-zinc-400">Location seule ou formule montée, délais, zone, prix : les réponses courtes.</p>
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
              Un salon à <span className="gradient-text">Montbéliard</span>, une soirée à <span className="gradient-text">Belfort</span> ?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Dites-nous la surface, le lieu et les dates. Le reste, c&apos;est notre métier depuis 1996.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                prefetch={false}
                href="/contact"
                className="group px-10 py-5 rounded-full gradient-bg font-semibold text-lg text-white hover:shadow-xl hover:shadow-[#7928ca]/30 transition-all duration-300 inline-flex items-center"
              >
                Décrire mon projet
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
              { '@type': 'ListItem', position: 2, name: 'Location de stand et matériel événementiel · Montbéliard, Belfort', item: PAGE_URL },
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

      {/* Service local */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Location de stand et de matériel événementiel à Montbéliard et Belfort',
            description:
              "Location de stands BeMatrix, d'écrans LED, d'éclairage, de mobilier et d'animations, livrés, montés et démontés à Montbéliard, Belfort et dans le Nord Franche-Comté.",
            serviceType: 'Location de stand et de matériel événementiel',
            url: PAGE_URL,
            provider: { '@id': 'https://www.idkom.fr/#localbusiness' },
            areaServed: [
              { '@type': 'City', name: 'Montbéliard' },
              { '@type': 'City', name: 'Belfort' },
              { '@type': 'City', name: 'Héricourt' },
              { '@type': 'City', name: 'Audincourt' },
              { '@type': 'City', name: 'Besançon' },
              { '@type': 'City', name: 'Mulhouse' },
              { '@type': 'AdministrativeArea', name: 'Franche-Comté' },
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Matériel événementiel à louer',
              itemListElement: rentals.map((item) => ({
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
