import { Suspense } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { getHomepageData } from '@/lib/api';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import AmbientBackground from '@/components/AmbientBackground';

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
    "Le porte-clé NFC au logo de votre entreprise, imprimé en 3D en France. Une puce sans contact qui ouvre votre carte de visite connectée : coordonnées, site, réseaux — toujours à jour, en un scan.",
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
  { icon: 'solar:hand-heart-bold', label: 'Fabriqué en France' },
  { icon: 'solar:printer-3d-bold', label: 'Imprimé en 3D' },
  { icon: 'solar:tag-horizontal-bold', label: 'Puce NFC incluse' },
  { icon: 'solar:box-bold', label: 'Livraison offerte' },
];

const steps = [
  {
    icon: 'solar:upload-square-bold',
    title: 'Vous envoyez votre logo',
    description: 'Import SVG ou image. On adapte votre identité au porte-clé, aperçu à l’appui.',
  },
  {
    icon: 'solar:printer-3d-bold',
    title: 'On fabrique dans notre atelier',
    description: 'Impression 3D en France, puce NFC intégrée, finition soignée. Aucun minimum absurde.',
  },
  {
    icon: 'solar:smartphone-bold',
    title: 'Un scan, tout apparaît',
    description: 'Le contact approche son téléphone : votre carte connectée s’ouvre. Aucune application.',
  },
];

const usages = [
  {
    icon: 'solar:users-group-rounded-bold',
    title: 'Vos commerciaux',
    description: 'Un porte-clé connecté à votre image pour toute l’équipe. Fini les cartes papier périmées.',
    color: '#ff2d55',
  },
  {
    icon: 'solar:gift-bold',
    title: 'Cadeaux clients',
    description: 'Un objet premium et utile, à votre marque, que vos clients gardent sur leurs clés.',
    color: '#7928ca',
  },
  {
    icon: 'solar:widget-5-bold',
    title: 'Salons & événements',
    description: 'Distribuez un objet mémorable qui renvoie vers votre site, un formulaire, un rendez-vous.',
    color: '#00d4ff',
  },
  {
    icon: 'solar:buildings-3-bold',
    title: 'Accueil & boutiques',
    description: 'Sur un comptoir : un geste de scan qui ouvre vos avis, votre catalogue ou vos réseaux.',
    color: '#ff9500',
  },
];

const advantages = [
  'À votre logo et vos couleurs, en impression 3D',
  'Puce NFC compatible iPhone et Android (95% des téléphones)',
  'La carte digitale se modifie à tout moment, sans réimpression',
  'Statistiques de scans en temps réel',
  'Tarifs dégressifs selon la quantité',
  'Fabriqué et expédié depuis la France',
];

const faqItems = [
  {
    question: 'Faut-il installer une application ?',
    answer:
      "Non. Le porte-clé utilise le NFC natif du téléphone. Le contact approche son smartphone et votre carte s’ouvre — aucune app, sur iPhone comme sur Android.",
  },
  {
    question: 'À partir de combien de porte-clés peut-on commander ?',
    answer:
      "Il n’y a pas de gros minimum : vous pouvez démarrer petit pour tester, puis passer sur des tarifs dégressifs dès que la quantité augmente. Tout se configure directement dans la boutique entreprise.",
  },
  {
    question: 'Peut-on mettre notre logo exact ?',
    answer:
      "Oui. Vous importez votre logo (idéalement en SVG) et on l’intègre au porte-clé. Vous validez un aperçu avant la fabrication.",
  },
  {
    question: 'Que se passe-t-il si nos informations changent ?',
    answer:
      "La carte connectée derrière le porte-clé se modifie en ligne, à tout moment. Un changement de poste, de numéro ou de site ne nécessite jamais de réimprimer l’objet.",
  },
  {
    question: 'Combien de temps dure un porte-clé ?',
    answer:
      "La puce NFC n’a pas de batterie et ne s’use pas. L’objet est imprimé en matière durable : comptez plusieurs années d’utilisation.",
  },
];

export default function PorteClesNFCPage() {
  return (
    <>
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.05]">
                Vos porte-clés NFC,{' '}
                <span className="gradient-text">à votre logo</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 max-w-xl mb-8 leading-relaxed">
                Un porte-clé imprimé en 3D à votre image, avec une puce NFC qui ouvre votre carte
                de visite connectée. Distribué à vos équipes ou offert à vos clients : la carte
                qu&apos;on garde, celle qui ne finit jamais à la poubelle.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <a
                  href={ORDER_URL}
                  className="px-8 py-4 bg-gradient-to-r from-[#ff2d55] to-[#7928ca] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Commander pour mon entreprise
                  <Icon icon="solar:arrow-right-linear" width={20} />
                </a>
                <a
                  href="/contact"
                  className="px-6 py-4 text-zinc-300 hover:text-white transition-colors font-medium flex items-center gap-2"
                >
                  Parler à un humain
                  <Icon icon="solar:chat-round-line-linear" width={20} />
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
              </div>
            </div>
          </div>
        </section>

        {/* ===== COMMENT ÇA MARCHE ===== */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">De votre logo à la poche de vos clients</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Trois étapes, zéro complexité. On s&apos;occupe de la fabrication, vous gardez la main sur le contenu.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:border-white/20 transition-colors">
                <span className="absolute top-6 right-6 text-5xl font-bold text-white/5">{i + 1}</span>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff2d55]/20 to-[#7928ca]/20 text-white mb-5">
                  <Icon icon={step.icon} width={28} />
                </span>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== LE PRODUIT (collection) ===== */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-3xl border border-white/10 overflow-hidden">
                <Image
                  src="/images/porte-cles-collection.webp"
                  alt="Collection de porte-clés NFC personnalisés iDkom"
                  width={1672}
                  height={941}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Un vrai objet, pas un gadget</h2>
              <ul className="space-y-4">
                {advantages.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-zinc-300">
                    <Icon icon="solar:check-circle-bold" width={22} className="text-[#ff2d55] shrink-0 mt-0.5" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== POUR LES ENTREPRISES ===== */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pensé pour les entreprises</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Un seul objet, plusieurs usages — tous connectés à votre marque.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {usages.map((u) => (
              <div key={u.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/20 transition-colors">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl mb-4" style={{ backgroundColor: `${u.color}22`, color: u.color }}>
                  <Icon icon={u.icon} width={24} />
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">{u.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{u.description}</p>
              </div>
            ))}
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

        {/* ===== FAQ ===== */}
        <section className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Questions fréquentes</h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 open:border-white/20">
                <summary className="flex items-center justify-between cursor-pointer list-none text-white font-medium">
                  {item.question}
                  <Icon icon="solar:alt-arrow-down-linear" width={20} className="text-zinc-400 transition-transform group-open:rotate-180" />
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
            <h2 className="relative text-3xl md:text-5xl font-bold text-white mb-5">Faites de chaque rencontre un scan mémorable</h2>
            <p className="relative text-zinc-300 max-w-xl mx-auto mb-8">
              Configurez vos porte-clés à votre logo, choisissez la quantité, on s&apos;occupe du reste.
            </p>
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={ORDER_URL}
                className="px-8 py-4 bg-gradient-to-r from-[#ff2d55] to-[#7928ca] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Commander maintenant
                <Icon icon="solar:arrow-right-linear" width={20} />
              </a>
              <a
                href="/contact"
                className="px-8 py-4 border border-white/15 text-white font-medium rounded-xl hover:bg-white/5 transition-colors"
              >
                Poser une question
              </a>
            </div>
            <p className="relative mt-8 text-sm text-zinc-500">
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
