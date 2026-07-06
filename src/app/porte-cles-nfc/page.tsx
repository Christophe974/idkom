import { Suspense } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { getHomepageData } from '@/lib/api';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import AmbientBackground from '@/components/AmbientBackground';
import PorteCleRealisations from '@/components/PorteCleRealisations';

async function FooterWithData() {
  const homeData = await getHomepageData();
  return <FooterServer site={homeData.site} social={homeData.social} />;
}

// La boutique entreprise (landing PRO : configurateur logo + tarifs dégressifs + paiement).
const ORDER_URL = 'https://boutique.idkom.fr/boutique-pro';

export const revalidate = 300;

export const metadata = {
  title: 'Porte-clés NFC personnalisés pour entreprise',
  description:
    'Porte-clés NFC au logo de votre entreprise, imprimés en 3D en France. Votre carte de visite connectée, toujours à jour, en un scan.',
  alternates: { canonical: 'https://www.idkom.fr/porte-cles-nfc' },
  openGraph: {
    title: 'Porte-clés NFC entreprise | iDkom',
    description:
      "Vos porte-clés NFC personnalisés à votre logo, imprimés en 3D en France. La carte de visite connectée que l'on garde dans sa poche.",
    url: 'https://www.idkom.fr/porte-cles-nfc',
    images: [{ url: '/images/porte-cle-nfc-hero.png', width: 750, height: 750 }],
  },
};

const trust = [
  { icon: 'solar:map-point-wave-bold', label: 'Fabriqué en France' },
  { icon: 'solar:tag-price-bold', label: 'Tarifs dégressifs' },
  { icon: 'solar:bill-check-bold', label: 'Prix HT pour les pros' },
  { icon: 'solar:box-minimalistic-bold', label: 'Livraison offerte' },
];

const steps = [
  {
    icon: 'solar:upload-square-bold',
    title: 'Votre logo prend vie',
    description: 'Importez votre logo. On vérifie le fichier et on vous envoie un aperçu à valider si nécessaire.',
  },
  {
    icon: 'solar:palette-bold',
    title: 'Un objet à votre image',
    description: 'Choisissez les couleurs, la quantité, et visualisez votre création avant fabrication.',
  },
  {
    icon: 'solar:printer-3d-bold',
    title: 'Prêt à être offert',
    description: 'On imprime chaque porte-clé dans notre atelier en France, puce NFC déjà intégrée.',
  },
];

const cardFeatures = [
  {
    icon: 'solar:smartphone-2-bold',
    title: 'Votre carte dans leur téléphone',
    description: 'Un simple geste : vos coordonnées, réseaux, site et contact sont enregistrés en quelques secondes.',
  },
  {
    icon: 'solar:camera-bold',
    title: 'Ne perdez plus jamais un contact',
    description: 'Photographiez une carte papier : les informations sont récupérées automatiquement et enregistrées dans votre téléphone.',
  },
  {
    icon: 'solar:shield-check-bold',
    title: 'Toujours avec vous',
    description: 'Même sans votre porte-clé, votre carte reste accessible depuis votre téléphone.',
  },
];

const cases = [
  {
    icon: 'solar:users-group-rounded-bold',
    title: "Fini l'impression pour toute une équipe",
    description:
      'Une collectivité a équipé ses 45 agents. Chacun imprimait 200 à 300 cartes par an — place à un seul objet connecté, mis à jour en un clic.',
    chip: '≈ 11 000 cartes / an en moins',
    color: '#ff2d55',
  },
  {
    icon: 'solar:gift-bold',
    title: 'Le goodie qui travaille pour votre marque',
    description:
      "Un groupe l'offre à ses clients. Chacun le transforme en SA carte de visite… mais l'objet reste à vos couleurs. Votre logo circule dans des centaines de poches.",
    chip: 'Votre marque, en continu',
    color: '#7928ca',
  },
  {
    icon: 'solar:card-bold',
    title: "Le cadeau de bienvenue d'une banque",
    description:
      "Une banque pro l'offre à chaque créateur d'entreprise : « votre première carte de visite — et la seule dont vous aurez besoin ». Un cadeau utile qui marque durablement.",
    chip: 'Fidélisation dès le jour 1',
    color: '#00d4ff',
  },
];

const fleet = [
  { icon: 'solar:refresh-square-bold', title: 'Une seule mise à jour', description: 'Toutes les cartes sont synchronisées en quelques secondes.' },
  { icon: 'solar:link-bold', title: 'Une communication toujours à jour', description: 'Site web, téléphone, réseaux… une seule modification suffit.' },
  { icon: 'solar:infinity-bold', title: "L'objet reste, les infos évoluent", description: 'Vos équipes gardent le même porte-clé. Votre communication évolue en permanence.' },
];

const faqItems = [
  {
    question: 'Quel format de logo dois-je fournir ?',
    answer:
      "Un fichier SVG (vectoriel) pour un rendu net en 1 couleur. Si vous n'avez qu'un PNG, envoyez-le nous : on le vectorise et on vous soumet un aperçu à valider avant fabrication.",
  },
  {
    question: 'Les prix sont-ils HT ou TTC ?',
    answer:
      "Vous choisissez : en tant qu'entreprise, les prix s'affichent en HT (vous récupérez la TVA). Un particulier voit les prix en TTC. Le paiement inclut toujours la TVA (20 %).",
  },
  {
    question: 'À quoi sert la puce NFC ?',
    answer:
      "Un simple scan du porte-clé avec un smartphone ouvre le lien de votre choix : site web, coordonnées, carte de visite digitale, avis Google… sans aucune application.",
  },
  {
    question: 'Comment fonctionne le scanner de cartes papier ?',
    answer:
      "Depuis votre espace, photographiez une carte reçue : notre système l'analyse automatiquement (nom, société, téléphone, email) et vous l'ajoutez en un geste au carnet d'adresses de votre téléphone.",
  },
  {
    question: "Et si je n'ai pas mon porte-clé sur moi ?",
    answer:
      "Votre carte digitale est aussi accessible depuis votre téléphone : ajoutez-la à votre écran d'accueil et faites simplement scanner votre écran. Impossible d'être à court de cartes.",
  },
  {
    question: 'À partir de combien de porte-clés peut-on commander ?',
    answer:
      "Il n'y a pas de gros minimum : démarrez petit pour tester, puis profitez de tarifs dégressifs dès que la quantité augmente. Tout se configure dans la boutique entreprise.",
  },
];

// Données structurées (JSON-LD) — FAQPage + Product pour les rich results Google
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Porte-clés NFC personnalisé pour entreprise',
  description:
    "Porte-clé NFC au logo de votre entreprise, imprimé en 3D en France. Une puce sans contact ouvre votre carte de visite connectée : coordonnées, site, réseaux — toujours à jour, en un scan.",
  image: 'https://www.idkom.fr/images/porte-cle-nfc-hero.png',
  url: 'https://www.idkom.fr/porte-cles-nfc',
  category: 'Objet publicitaire connecté',
  brand: { '@type': 'Brand', name: 'iDkom' },
  manufacturer: { '@type': 'Organization', name: 'iDkom', url: 'https://www.idkom.fr' },
  areaServed: { '@type': 'Country', name: 'France' },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'EUR',
    lowPrice: '11.90',
    highPrice: '23.90',
    offerCount: 4,
    availability: 'https://schema.org/InStock',
    url: 'https://boutique.idkom.fr/boutique-pro',
    // Tarifs dégressifs HT : 23,90 € (1–4) → 17,90 € (5–24) → 14,90 € (25–99) → 11,90 € (100+)
  },
};

export default function PorteClesNFCPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <AmbientBackground />
      <NavbarServer />

      <main className="relative z-10">
        {/* ===== HERO ===== */}
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-16 md:pb-24">
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-24 left-1/4 w-72 h-72 bg-[#ff2d55]/8 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#7928ca]/8 rounded-full blur-[140px] animate-pulse [animation-delay:1s]" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte */}
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#7928ca]/40 bg-[#7928ca]/10 px-4 py-1.5 text-xs font-semibold text-[#c4a4ff] mb-6">
                <Icon icon="solar:buildings-2-bold" width={14} /> L&apos;objet connecté des entreprises
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-[1.05]">
                Chaque rencontre mérite mieux{' '}
                <span className="gradient-text">qu&apos;une carte papier.</span>
              </h1>
              <h2 className="text-lg md:text-xl font-semibold text-zinc-300 mb-6">
                Porte-clés NFC personnalisés au logo de votre entreprise
              </h2>
              <p className="text-lg md:text-xl text-zinc-400 max-w-xl mb-8 leading-relaxed">
                Un porte-clé à votre logo, imprimé en 3D. Une carte digitale à leur image.
                Une rencontre qui continue après le premier scan — distribué à vos équipes ou
                offert à vos clients.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <a
                  href={ORDER_URL}
                  className="px-8 py-4 bg-gradient-to-r from-[#ff2d55] to-[#7928ca] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Icon icon="solar:upload-square-bold" width={20} /> Importer mon logo
                </a>
                <a
                  href="#tarifs"
                  className="px-6 py-4 text-zinc-300 hover:text-white transition-colors font-medium flex items-center gap-2"
                >
                  Voir les tarifs
                  <Icon icon="solar:arrow-down-linear" width={20} />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {trust.map((t) => (
                  <div key={t.label} className="flex items-center gap-2 text-sm text-zinc-400">
                    <Icon icon={t.icon} width={18} className="text-[#ff2d55] shrink-0" />
                    {t.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Image produit */}
            <div className="relative animate-fade-in-up [animation-delay:0.15s]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ff2d55]/20 to-[#7928ca]/20 blur-[80px] rounded-full" />
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
                <Image
                  src="/images/porte-cle-nfc-hero.png"
                  alt="Porte-clé NFC personnalisé au logo d'une entreprise, imprimé en 3D"
                  width={750}
                  height={750}
                  className="w-full h-auto rounded-2xl"
                  priority
                />
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-[11px] text-zinc-300">
                  Réalisation iDkom — imprimé en 3D dans notre atelier
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BANDEAU DE CONFIANCE ===== */}
        <section className="border-y border-white/5 bg-white/[0.015] py-6">
          <p className="max-w-3xl mx-auto px-6 text-center text-sm font-medium text-zinc-400">
            Déjà adopté par des collectivités, banques, réseaux d&apos;affaires, artisans et grands groupes.
          </p>
        </section>

        {/* ===== COMMENT ÇA MARCHE ===== */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trois étapes. Une nouvelle façon de créer des contacts.
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              On s&apos;occupe de la fabrication, vous gardez la main sur le contenu.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:border-white/20 transition-colors">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff2d55] to-[#7928ca] text-lg font-bold text-white">{i + 1}</span>
                  <Icon icon={step.icon} width={26} className="text-[#ff2d55]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== RÉALISATIONS ===== */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 text-center mb-10">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-zinc-300">
              <Icon icon="solar:cup-star-bold" width={14} className="text-[#ff2d55]" /> Fabriqués dans notre atelier
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ils ont laissé une empreinte, pas un bout de carton.</h2>
            <p className="mx-auto mt-3 max-w-xl text-zinc-400">
              Chaque création est unique. Aux couleurs de l&apos;entreprise. Imaginée pour être conservée.
            </p>
          </div>
          <PorteCleRealisations />
        </section>

        {/* ===== LA CARTE DIGITALE (networking) ===== */}
        <section className="relative py-20" style={{ background: 'radial-gradient(100% 80% at 20% 20%, #7928ca14, transparent 60%)' }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#ff2d55]/40 bg-[#ff2d55]/10 px-4 py-1.5 text-xs font-semibold text-[#ff2d55]">
                <Icon icon="solar:link-circle-bold" width={14} /> Une seule rencontre peut tout changer
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Transformez un simple contact en relation durable.
              </h2>
            </div>
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,360px)_1fr]">
              {/* Mockup carte digitale */}
              <div className="relative mx-auto w-full max-w-[320px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#ff2d55]/20 to-[#7928ca]/20 blur-[70px] rounded-full" />
                <Image
                  src="/images/carte-digitale-mockup.png"
                  alt="Carte de visite digitale affichée sur smartphone"
                  width={543}
                  height={750}
                  className="relative w-full h-auto rounded-3xl"
                />
              </div>
              {/* Les 3 fonctions */}
              <div className="grid gap-5">
                {cardFeatures.map((f) => (
                  <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/20 transition-colors">
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff2d55]/25 to-[#7928ca]/20 text-[#ff8fa8]">
                        <Icon icon={f.icon} width={24} />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-zinc-400">{f.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== DOUBLE USAGE ===== */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#7928ca]/40 bg-[#7928ca]/10 px-4 py-1.5 text-xs font-semibold text-[#c4a4ff]">
              <Icon icon="solar:magic-stick-3-bold" width={14} /> Deux usages, une seule création
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Offrez-le. Ou équipez votre équipe.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { emoji: '🎁', grad: 'from-[#ff2d55]/25 to-[#7928ca]/20', ring: 'text-[#ff8fa8]', t: 'Vous l’offrez', points: ['Votre logo sur le porte-clé.', 'Leur carte digitale.', 'Votre marque continue de voyager.'] },
              { emoji: '👥', grad: 'from-[#7928ca]/25 to-[#00d4ff]/20', ring: 'text-[#00d4ff]', t: 'Vous équipez vos équipes', points: ['Un porte-clé par collaborateur.', 'Gestion centralisée.', 'Toujours à jour.'] },
            ].map((c) => (
              <div key={c.t} className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                <span className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.grad} text-2xl`}>{c.emoji}</span>
                <h3 className="text-xl font-semibold text-white">{c.t}</h3>
                <ul className="mt-5 space-y-3">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-zinc-300">
                      <Icon icon="solar:check-circle-bold" width={18} className={`mt-0.5 shrink-0 ${c.ring}`} />
                      <span className="text-sm leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CAS CONCRETS ===== */}
        <section className="relative py-20" style={{ background: 'radial-gradient(90% 80% at 80% 20%, #00d4ff10, transparent 60%)' }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/40 bg-[#00d4ff]/10 px-4 py-1.5 text-xs font-semibold text-[#00d4ff]">
                <Icon icon="solar:lightbulb-bolt-bold" width={14} /> Cas concrets
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Un objet, mille façons de s&apos;en servir</h2>
              <p className="mx-auto mt-3 max-w-xl text-zinc-400">Voici comment nos clients l&apos;utilisent déjà, chacun à sa manière.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {cases.map((c) => (
                <div key={c.title} className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${c.color}22`, color: c.color }}>
                    <Icon icon={c.icon} width={24} />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{c.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-zinc-400">{c.description}</p>
                  <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${c.color}1a`, color: c.color }}>
                    <Icon icon="solar:star-bold" width={12} /> {c.chip}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== GESTION CENTRALISÉE ===== */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#ff2d55]/40 bg-[#ff2d55]/10 px-4 py-1.5 text-xs font-semibold text-[#ff2d55]">
                <Icon icon="solar:settings-bold" width={14} /> Une seule modification. Partout.
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Une flotte. Un seul tableau de bord.</h2>
              <p className="mt-4 max-w-md leading-relaxed text-zinc-400">
                Un changement d&apos;adresse ? Un nouveau site ? Un nouveau logo ?{' '}
                <b className="text-white">Modifiez une seule fois.</b> Toutes les cartes sont
                mises à jour automatiquement. Sans réimprimer, sans remplacer un seul objet.
              </p>
              <ul className="mt-6 space-y-3">
                {fleet.map((f) => (
                  <li key={f.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ff2d55]/10 text-[#ff2d55]"><Icon icon={f.icon} width={18} /></span>
                    <span><b className="text-white">{f.title}</b><span className="block text-sm text-zinc-400">{f.description}</span></span>
                  </li>
                ))}
              </ul>
            </div>

            {/* visuel : panneau admin → cartes synchronisées */}
            <div className="mx-auto w-full max-w-sm">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl">
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  <Icon icon="solar:settings-linear" width={14} /> Espace admin
                </p>
                <div className="space-y-2">
                  {[['solar:global-bold', 'Site web', 'nouveau-site.fr'], ['ri:instagram-fill', 'Instagram', '@votre_entreprise'], ['solar:gallery-bold', 'Logo', 'logo-2026.svg']].map(([ic, l, v]) => (
                    <div key={l} className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2">
                      <Icon icon={ic} width={16} className="text-[#ff2d55]" />
                      <span className="text-xs text-zinc-500">{l}</span>
                      <span className="ml-auto text-xs font-medium text-white">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff2d55] to-[#7928ca] py-2.5 text-sm font-semibold text-white">
                  <Icon icon="solar:refresh-bold" width={16} /> Appliquer à 45 cartes
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="flex h-10 w-7 flex-col items-center justify-center rounded-md border border-[#ff2d55]/30 bg-[#ff2d55]/5">
                      <Icon icon="solar:card-linear" width={13} className="text-[#ff8fa8]" />
                      <Icon icon="solar:check-circle-bold" width={9} className="mt-0.5 text-green-400" />
                    </span>
                  ))}
                  <span className="ml-1 text-xs font-medium text-green-400">+41</span>
                </div>
                <p className="mt-2 text-center text-[11px] text-zinc-500">Toutes les cartes synchronisées ✓</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SCAN EN ACTION ===== */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#7928ca]/10 to-[#ff2d55]/10 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-14">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white mb-6">
                  <Icon icon="solar:magic-stick-3-bold" width={14} /> Sans contact, sans app
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Un geste, et la relation continue</h2>
                <p className="text-zinc-300 leading-relaxed mb-6">
                  Le porte-clé approché d&apos;un téléphone ouvre instantanément votre carte connectée :
                  coordonnées, site, réseaux, prise de rendez-vous. Vos infos restent à jour, même
                  des mois après avoir remis l&apos;objet.
                </p>
                <a
                  href={ORDER_URL}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-zinc-950 font-semibold rounded-xl hover:bg-zinc-200 transition-colors"
                >
                  Configurer mes porte-clés
                  <Icon icon="solar:arrow-right-linear" width={20} />
                </a>
              </div>
              <div className="relative min-h-[280px] lg:min-h-[420px]">
                <Image
                  src="/images/scan-nfc-action.webp"
                  alt="Scan d'un porte-clé NFC avec un smartphone"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== MOMENT DE MARQUE ===== */}
        <section className="px-6 py-24">
          <p className="mx-auto max-w-2xl text-center text-2xl font-medium leading-relaxed text-zinc-400 sm:text-3xl sm:leading-relaxed">
            Ce n&apos;est pas un prospect.<br />Ce n&apos;est pas un client.<br />
            <span className="text-white">C&apos;est une personne qui repart avec un objet qu&apos;elle gardera sans doute plusieurs années.</span>
          </p>
        </section>

        {/* ===== TARIFS (teaser) ===== */}
        <section id="tarifs" className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Des tarifs dégressifs</h2>
          <p className="mx-auto max-w-xl text-zinc-400 mb-8">
            Plus vous en commandez, moins c&apos;est cher à l&apos;unité. Prix affichés HT pour les pros ·{' '}
            <span className="text-green-400">livraison offerte</span>. Le prix exact selon votre quantité
            s&apos;affiche en direct dans le configurateur.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-9">
            {['1 – 9', '10 – 49', '50 – 99', '100+'].map((range, i) => (
              <div key={range} className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-center">
                <p className="text-xs text-zinc-500">{range} unités</p>
                <p className="mt-1 text-lg font-bold text-white flex items-center justify-center gap-1">
                  {Array.from({ length: 4 - i }).map((_, k) => (
                    <Icon key={k} icon="solar:tag-price-bold" width={16} className="text-[#ff2d55]" />
                  ))}
                </p>
                <p className="text-xs text-zinc-500">{i === 3 ? 'meilleur prix' : 'dégressif'}</p>
              </div>
            ))}
          </div>
          <a
            href={ORDER_URL}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff2d55] to-[#7928ca] px-7 py-4 text-base font-semibold text-white hover:opacity-90 transition-opacity"
          >
            <Icon icon="solar:upload-square-bold" width={20} /> Voir mon prix et personnaliser
          </a>
        </section>

        {/* ===== FAQ ===== */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Questions fréquentes</h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 open:border-white/20">
                <summary className="flex items-center justify-between cursor-pointer list-none text-white font-medium gap-3">
                  {item.question}
                  <Icon icon="solar:alt-arrow-down-linear" width={20} className="text-zinc-400 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-zinc-400 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#ff2d55]/15 via-[#7928ca]/10 to-transparent p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#7928ca]/20 rounded-full blur-[100px]" />
            <h2 className="relative text-3xl md:text-5xl font-bold text-white mb-5 max-w-2xl mx-auto leading-tight">
              Le prochain objet que vous offrirez pourrait devenir votre meilleur ambassadeur.
            </h2>
            <p className="relative text-zinc-300 max-w-xl mx-auto mb-8">
              Téléchargez votre logo. On s&apos;occupe du reste. Quelques jours plus tard, votre marque
              est déjà entre de nouvelles mains.
            </p>
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={ORDER_URL}
                className="px-8 py-4 bg-gradient-to-r from-[#ff2d55] to-[#7928ca] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Icon icon="solar:upload-square-bold" width={20} /> Créer mes porte-clés
              </a>
              <a
                href="/contact"
                className="px-8 py-4 border border-white/15 text-white font-medium rounded-xl hover:bg-white/5 transition-colors"
              >
                Poser une question
              </a>
            </div>
            <p className="relative mt-8 text-lg font-medium text-zinc-300">
              Les cartes se distribuent.<br />Les objets se conservent.
            </p>
            <p className="relative mt-6 text-sm text-zinc-500">
              Un porte-clé au nom de votre cheval ?{' '}
              <a href="https://boutique.idkom.fr/boutique-cheval" className="text-[#c4a4ff] hover:text-white underline underline-offset-2">
                Découvrir la version cheval
              </a>
            </p>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <FooterWithData />
      </Suspense>
    </>
  );
}
