import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { getHomepageData } from '@/lib/api';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import AmbientBackground from '@/components/AmbientBackground';
import FAQAccordion from './FAQAccordion';

async function FooterWithData() {
  const homeData = await getHomepageData();
  return <FooterServer site={homeData.site} social={homeData.social} />;
}

export const revalidate = 300;

export const metadata = {
  title: 'Carte de visite NFC',
  description:
    'Porte-clé NFC personnalisable, carte de visite digitale toujours à jour. Partagez vos coordonnées en un scan, modifiez-les à tout moment. Pour indépendants, PME et grandes entreprises.',
  alternates: { canonical: 'https://www.idkom.fr/carte-de-visite-nfc' },
  openGraph: {
    title: 'Carte de visite NFC | iDkom',
    description:
      'Un porte-clé NFC connecté, personnalisable et toujours à jour. La carte de visite qui ne finit jamais à la poubelle.',
    url: 'https://www.idkom.fr/carte-de-visite-nfc',
  },
};

const problems = [
  '500 cartes distribuées, 490 à la poubelle',
  'Infos périmées dès le premier changement de poste',
  'Zéro tracking, zéro données',
];

const solutions = [
  'Toujours dans la poche de votre client',
  'Modifiable à tout moment, sans réimpression',
  'Statistiques de scans en temps réel',
];

const steps = [
  {
    icon: 'solar:printer-3d-bold',
    title: 'On fabrique',
    description: 'Porte-clé imprimé 3D à votre image, puce NFC intégrée',
  },
  {
    icon: 'solar:smartphone-bold',
    title: 'On scanne',
    description: 'Le client approche son téléphone, la carte apparaît instantanément',
  },
  {
    icon: 'solar:pen-bold',
    title: 'On personnalise',
    description: 'Chaque propriétaire crée et modifie sa carte depuis son espace',
  },
];

const usages = [
  {
    icon: 'solar:buildings-bold',
    title: 'Entreprise',
    description: 'Offrez à vos commerciaux un porte-clé connecté à votre image',
    color: '#ff2d55',
  },
  {
    icon: 'solar:hand-money-bold',
    title: 'Agence bancaire',
    description: 'Un cadeau client premium qui renforce votre relation',
    color: '#7928ca',
  },
  {
    icon: 'solar:calendar-bold',
    title: 'Événement',
    description: 'Distribuez aux exposants un badge NFC mémorable',
    color: '#00d4ff',
  },
  {
    icon: 'solar:user-bold',
    title: 'Indépendant',
    description: 'Votre carte de visite toujours dans votre poche',
    color: '#ff9500',
  },
];

const offers = [
  {
    name: 'Solo',
    quantity: '1 porte-clé',
    target: 'Pour les indépendants',
    features: [
      '1 porte-clé personnalisé',
      'Carte de visite digitale',
      'Espace de gestion',
      'Stats de scans',
    ],
    cta: 'Nous contacter',
    ctaHref: '/contact',
    highlighted: false,
  },
  {
    name: 'Équipe',
    quantity: '10 à 50 porte-clés',
    target: 'Pour les PME',
    features: [
      'Lot personnalisé à votre logo',
      'Carte pour chaque collaborateur',
      'Dashboard équipe',
      'Support prioritaire',
    ],
    cta: 'Nous contacter',
    ctaHref: '/contact',
    highlighted: true,
    badge: 'Populaire',
  },
  {
    name: 'Partenaire',
    quantity: '100+ porte-clés',
    target: 'Pour les grandes entreprises',
    features: [
      'Portail de gestion dédié',
      'Branding complet',
      'Statistiques avancées',
      'Account manager',
      'API sur mesure',
    ],
    cta: 'Demander une démo',
    ctaHref: '/contact',
    highlighted: false,
  },
];

const faqItems = [
  {
    question: 'Faut-il installer une application ?',
    answer:
      'Non. Le porte-clé utilise la technologie NFC native de votre téléphone. Il suffit d\'approcher le téléphone — aucune app nécessaire, que ce soit sur iPhone ou Android.',
  },
  {
    question: 'Est-ce compatible avec tous les téléphones ?',
    answer:
      'Oui. Tous les iPhone depuis le 7 et la majorité des smartphones Android supportent le NFC. C\'est plus de 95% des téléphones en circulation.',
  },
  {
    question: 'Puis-je modifier ma carte après sa création ?',
    answer:
      'Bien sûr. Vous accédez à votre espace personnel pour modifier vos informations autant de fois que vous le souhaitez. Les changements sont instantanés.',
  },
  {
    question: 'Qu\'est-ce que le QuickView ?',
    answer:
      'Le QuickView affiche un aperçu de votre carte directement à l\'écran, sans ouvrir le navigateur. C\'est la manière la plus rapide et élégante de partager vos coordonnées.',
  },
  {
    question: 'Combien de temps dure un porte-clé ?',
    answer:
      'La puce NFC n\'a pas de batterie et ne s\'use pas. Le porte-clé est imprimé en résine durable. Comptez plusieurs années d\'utilisation.',
  },
];

export default function CarteDeVisiteNFCPage() {
  return (
    <>
      <AmbientBackground />
      <NavbarServer />

      <main className="relative z-10">
        {/* ===== HERO ===== */}
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
          {/* Animated background blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#ff2d55]/8 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#7928ca]/8 rounded-full blur-[140px] animate-pulse [animation-delay:1s]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#00d4ff]/6 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-5xl mx-auto animate-fade-in">
            La carte de visite qui ne finit{' '}
            <span className="gradient-text">jamais à la poubelle</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in [animation-delay:0.1s]">
            Un porte-clé NFC connecté, personnalisable, et toujours à jour
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in [animation-delay:0.2s]">
            <a
              href="#offres"
              className="px-8 py-4 bg-gradient-to-r from-[#ff2d55] to-[#7928ca] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Découvrir nos offres
              <Icon icon="solar:arrow-down-linear" width={20} />
            </a>
            <a
              href="#demo"
              className="px-8 py-4 text-zinc-400 hover:text-white transition-colors font-medium flex items-center gap-2"
            >
              Voir une démo
              <Icon icon="solar:play-circle-linear" width={20} />
            </a>
          </div>

          {/* Hero image with glow */}
          <div
            id="hero-image"
            className="w-full max-w-sm mx-auto mt-8 aspect-square relative animate-fade-in [animation-delay:0.3s]"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-[#ff2d55]/40 via-[#7928ca]/40 to-[#00d4ff]/30 blur-[80px] animate-pulse-slow" />
            </div>
            <Image
              src="/images/porte-cle-nfc-hero.png"
              alt="Porte-clé NFC iDkom"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 384px"
              className="object-contain drop-shadow-[0_20px_50px_rgba(121,40,202,0.4)]"
            />
          </div>
        </section>

        {/* ===== PROBLEM vs SOLUTION ===== */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-stretch">
            {/* Problem card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <Icon icon="solar:trash-bin-trash-bold" className="text-red-500" width={28} />
                </div>
                <h2 className="text-2xl font-bold text-white">La carte papier</h2>
              </div>
              <ul className="space-y-4">
                {problems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon icon="solar:close-circle-bold" className="text-red-500/60 mt-0.5 flex-shrink-0" width={20} />
                    <span className="text-zinc-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* VS separator */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <span className="text-zinc-500 font-bold text-sm">VS</span>
              </div>
            </div>
            <div className="lg:hidden flex items-center justify-center py-2">
              <Icon icon="solar:arrow-down-linear" className="text-zinc-600" width={24} />
            </div>

            {/* Solution card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden animate-fade-in [animation-delay:0.2s]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-transparent pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center">
                    <Icon icon="solar:nfc-bold" className="text-[#00d4ff]" width={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Le porte-clé NFC</h2>
                </div>
                <ul className="space-y-4">
                  {solutions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Icon icon="solar:check-circle-bold" className="text-[#00d4ff] mt-0.5 flex-shrink-0" width={20} />
                      <span className="text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== COMMENT ÇA MARCHE ===== */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple comme un <span className="gradient-text">scan</span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Trois étapes pour passer de la carte papier au porte-clé connecté
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center relative group hover:border-zinc-700 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step number */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff2d55] to-[#7928ca] flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto mb-5">
                  <Icon icon={step.icon} className="text-white" width={32} />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <Icon icon="solar:arrow-right-linear" className="text-zinc-700" width={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ===== USAGES CONCRETS ===== */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pour <span className="gradient-text">qui</span> ?
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Le porte-clé NFC s&apos;adapte à tous les profils et toutes les tailles d&apos;entreprise
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {usages.map((usage, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors"
                  style={{
                    backgroundColor: `${usage.color}15`,
                    borderWidth: 1,
                    borderColor: `${usage.color}30`,
                  }}
                >
                  <Icon icon={usage.icon} width={28} style={{ color: usage.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{usage.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{usage.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== DEMO ===== */}
        <section id="demo" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Essayez <span className="gradient-text">maintenant</span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Scannez ce QR code avec votre téléphone pour voir une carte en direct
            </p>
          </div>

          {/* Scan flow: action → result */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-8 lg:gap-12 mb-16">
            {/* Step 1 — Scan in action */}
            <div className="relative animate-fade-in w-full max-w-md mx-auto aspect-square">
              <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
                <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-[#ff2d55]/30 via-[#7928ca]/30 to-[#00d4ff]/20 blur-[80px] animate-pulse-slow" />
              </div>
              <Image
                src="/images/scan-nfc-action.webp"
                alt="Porte-clé NFC en action : scan d'un iPhone"
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-contain drop-shadow-[0_20px_50px_rgba(121,40,202,0.4)]"
              />
              <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-zinc-500 text-sm whitespace-nowrap">
                1. On approche
              </p>
            </div>

            {/* Arrow / chevron */}
            <div className="hidden lg:flex items-center justify-center text-zinc-700">
              <Icon icon="solar:arrow-right-linear" width={48} />
            </div>
            <div className="lg:hidden flex items-center justify-center text-zinc-700">
              <Icon icon="solar:arrow-down-linear" width={32} />
            </div>

            {/* Step 2 — Card appears */}
            <div className="relative animate-fade-in [animation-delay:0.2s] w-full max-w-sm mx-auto aspect-[3/4]">
              <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
                <div className="w-2/3 h-2/3 rounded-full bg-gradient-to-br from-[#7928ca]/30 via-[#ff2d55]/20 to-[#00d4ff]/20 blur-[80px] animate-pulse-slow [animation-delay:1s]" />
              </div>
              <Image
                src="/images/carte-digitale-mockup.png"
                alt="Carte de visite digitale affichée sur iPhone"
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-contain drop-shadow-[0_20px_50px_rgba(121,40,202,0.5)]"
              />
              <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-zinc-500 text-sm whitespace-nowrap">
                2. La carte apparaît
              </p>
            </div>
          </div>

          {/* QR Code + try-it text */}
          <div className="flex flex-col items-center text-center animate-fade-in [animation-delay:0.4s]">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 inline-block mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://www.idkom.fr/carte/christophe-bracchini&bgcolor=000000&color=ffffff"
                alt="QR code pour voir une carte de visite NFC en direct"
                width={180}
                height={180}
                className="rounded-lg"
              />
            </div>
            <p className="text-zinc-400 text-sm max-w-xs">
              Scannez avec votre téléphone ou{' '}
              <Link href="/carte/christophe-bracchini" className="text-[#00d4ff] hover:underline">
                cliquez ici
              </Link>{' '}
              pour voir une carte en direct
            </p>
          </div>
        </section>

        {/* ===== PERSONNALISATION ===== */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              À votre <span className="gradient-text">image</span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Forme, couleur, logo, gravure : chaque porte-clé est unique et adapté à votre marque
            </p>
          </div>

          <div className="relative animate-fade-in rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50">
            {/* Glow */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
              <div className="w-2/3 h-2/3 rounded-full bg-gradient-to-br from-[#ff2d55]/20 via-[#7928ca]/20 to-[#00d4ff]/15 blur-[100px] animate-pulse-slow" />
            </div>
            <Image
              src="/images/porte-cles-collection.webp"
              alt="Collection de porte-clés NFC personnalisés iDkom : couleurs, logos, gravures variés"
              width={1920}
              height={1080}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="w-full h-auto object-cover"
            />
          </div>
        </section>

        {/* ===== OFFRES ===== */}
        <section id="offres" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nos <span className="gradient-text">formules</span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Une solution adaptée à chaque besoin, du freelance à la grande entreprise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {offers.map((offer, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 relative transition-all animate-fade-in ${
                  offer.highlighted
                    ? 'bg-zinc-900 border-2 border-transparent bg-clip-padding md:scale-105 md:-my-2 shadow-2xl shadow-[#7928ca]/10'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
                style={
                  offer.highlighted
                    ? {
                        backgroundImage:
                          'linear-gradient(rgb(24 24 27), rgb(24 24 27)), linear-gradient(135deg, #ff2d55, #7928ca, #00d4ff)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box',
                      }
                    : undefined
                }
              >
                {/* Badge */}
                {offer.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-[#ff2d55] to-[#7928ca] text-white text-xs font-semibold rounded-full">
                      {offer.badge}
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-1">{offer.name}</h3>
                <p className="text-lg gradient-text font-semibold mb-1">{offer.quantity}</p>
                <p className="text-zinc-500 text-sm mb-6">{offer.target}</p>

                <ul className="space-y-3 mb-8">
                  {offer.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-400 text-sm">
                      <Icon icon="solar:check-circle-linear" className="text-[#7928ca] flex-shrink-0" width={18} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={offer.ctaHref}
                  className={`block w-full py-3 px-6 rounded-xl font-medium text-center transition-all ${
                    offer.highlighted
                      ? 'bg-gradient-to-r from-[#ff2d55] to-[#7928ca] text-white hover:opacity-90'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                >
                  {offer.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Questions <span className="gradient-text">fréquentes</span>
            </h2>
          </div>

          <FAQAccordion items={faqItems} />
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="rounded-3xl p-12 md:p-16 bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-white/10 relative overflow-hidden text-center">
            {/* Background glows */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#ff2d55]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#7928ca]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Prêt à passer au <span className="gradient-text">phygital</span> ?
              </h2>
              <p className="text-zinc-400 max-w-lg mx-auto mb-8 text-lg">
                Contactez-nous pour découvrir comment le porte-clé NFC peut transformer votre image
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/rendez-vous"
                  className="px-8 py-4 bg-gradient-to-r from-[#ff2d55] to-[#7928ca] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Icon icon="solar:calendar-mark-linear" width={20} />
                  Prendre rendez-vous
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-zinc-800 text-white font-medium rounded-xl hover:bg-zinc-700 transition-colors flex items-center gap-2"
                >
                  <Icon icon="solar:letter-linear" width={20} />
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <FooterWithData />
      </Suspense>

      {/* Fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}
