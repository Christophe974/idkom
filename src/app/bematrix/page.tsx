import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import AmbientBackground from '@/components/AmbientBackground';
import Counter from '@/components/Counter';
import { getHomepageData } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Stand BeMatrix en France — Location & Installation | iDkom',
  description: 'Location et montage de stands BeMatrix clé en main. 4 000+ pièces en stock, LEDskin® 12 m², éclairage intégré. Conception 3D, livraison et installation sur site partout en France.',
  keywords: ['BeMatrix', 'be matrix', 'stand BeMatrix', 'bematrix stand', 'standiste BeMatrix', 'bematrix éclairage', 'bematrix LEDskin', 'stand bematrix', 'location stand modulaire', 'stand modulaire salon', 'bematrix catalogue', 'bematrix France', 'standiste France', 'location stand salon professionnel'],
  alternates: {
    canonical: 'https://www.idkom.fr/bematrix',
    languages: {
      'fr-FR': 'https://www.idkom.fr/bematrix',
      'x-default': 'https://www.idkom.fr/bematrix',
    },
  },
  openGraph: {
    title: 'Stand BeMatrix en France — Location & Installation | iDkom',
    description: '4 000+ pièces BeMatrix en stock, LEDskin® 12 m², éclairage intégré. Montage clé en main pour salons professionnels partout en France.',
    url: 'https://www.idkom.fr/bematrix',
    siteName: 'iDkom',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: 'https://www.idkom.fr/images/bematrix-hero.jpg', width: 1200, height: 630, alt: 'Stand BeMatrix par iDkom — standiste en France' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stand BeMatrix en France — Location & Installation | iDkom',
    description: '4 000+ pièces en stock, LEDskin® 12 m², montage clé en main partout en France.',
  },
};

export const revalidate = 3600;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

async function getBematrixStats() {
  try {
    const res = await fetch(`${API_URL}/catalogue-bematrix.php?per_page=1`, {
      next: { revalidate: 3600 }
    });
    const json = await res.json();
    return json.success ? json.data.stats : { total_pieces: 4000, total_references: 200 };
  } catch {
    return { total_pieces: 4000, total_references: 200 };
  }
}

export default async function BematrixPage() {
  const [data, bematrixStats] = await Promise.all([
    getHomepageData(),
    getBematrixStats()
  ]);

  const features = [
    {
      icon: 'solar:widget-linear',
      title: 'Modularité totale',
      description: 'Parois droites, angles complexes, structures suspendues. Notre parc technique répond à chaque défi architectural.',
      color: '#ff2d55',
    },
    {
      icon: 'solar:monitor-linear',
      title: 'Technologie LEDskin®',
      description: '12 m² de modules LED haute résolution intégrés directement dans les cadres pour un rendu ultra-moderne.',
      color: '#7928ca',
    },
    {
      icon: 'solar:leaf-linear',
      title: 'Éco-conception',
      description: 'Solution durable, réutilisable et infiniment recyclable. Limitez l\'empreinte carbone de vos événements.',
      color: '#00d4ff',
    },
    {
      icon: 'solar:bolt-linear',
      title: 'Montage rapide',
      description: 'Système "Quick-and-Easy" pour un montage express. Réduisez vos coûts de main-d\'œuvre.',
      color: '#22c55e',
    },
    {
      icon: 'solar:lamp-linear',
      title: 'Éclairage intégré',
      description: 'Systèmes d\'éclairage LED encastrés dans les cadres BeMatrix. Spots, bandeaux et rétro-éclairage pour sublimer votre stand.',
      color: '#f59e0b',
    },
  ];

  const services = [
    {
      title: 'Conception & Installation',
      subtitle: 'Clé en main',
      description: 'Notre bureau d\'études dessine votre projet et nos monteurs certifiés assurent l\'installation sur site.',
      icon: 'solar:ruler-pen-linear',
    },
    {
      title: 'Location de parc technique',
      subtitle: 'Pour les pros',
      description: 'Besoin d\'un complément de cadres ou de nos 12 m² de LEDskin ? Location de matériel BeMatrix disponible.',
      icon: 'solar:hand-shake-linear',
    },
    {
      title: 'Accompagnement complet',
      subtitle: 'De A à Z',
      description: 'Des premiers croquis à la livraison finale, nous sommes à vos côtés à chaque étape de votre projet.',
      icon: 'solar:star-shine-linear',
    },
  ];

  return (
    <>
      <AmbientBackground />
      <NavbarServer />

      <main className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff2d55]/10 border border-[#ff2d55]/20 text-sm text-[#ff2d55] mb-6">
                  <Icon icon="solar:verified-check-linear" width={18} />
                  Partenaire BeMatrix
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Standiste <span className="gradient-text">BeMatrix</span> en France
                  <br />
                  <span className="text-zinc-400 text-3xl md:text-4xl lg:text-5xl">+4 000 pièces en stock</span>
                </h1>
                <p className="text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed">
                  Votre partenaire stand BeMatrix pour salons et événements.
                  Location, conception sur-mesure et installation clé en main
                  avec la référence mondiale du cadre aluminium.
                  Découvrez <Link href="/savoir-faire" className="text-[#ff2d55] hover:underline">notre savoir-faire</Link>,
                  notre <Link href="/atelier" className="text-[#ff2d55] hover:underline">atelier de fabrication</Link> et
                  nos <Link href="/animations-evenementielles" className="text-[#ff2d55] hover:underline">animations événementielles</Link>.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    prefetch={false}
                    href="/contact"
                    className="group px-8 py-4 rounded-full gradient-bg font-medium text-white hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all duration-300 inline-flex items-center"
                  >
                    Contactez-nous
                    <Icon icon="solar:arrow-right-linear" className="ml-2 group-hover:translate-x-1 transition-transform" width={20} />
                  </Link>
                  <Link
                    prefetch={false}
                    href="/catalogue"
                    className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-medium text-white hover:bg-white/10 transition-all duration-300 inline-flex items-center"
                  >
                    <Icon icon="solar:box-linear" className="mr-2" width={20} />
                    Voir notre stock
                  </Link>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative animate-fade-in-up delay-200">
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/10 overflow-hidden relative">
                  <Image
                    src="/images/bematrix-hero.jpg"
                    alt="Stand BeMatrix par iDkom"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                </div>
                {/* Floating stats */}
                <div className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-zinc-900/90 backdrop-blur-sm border border-white/10 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Icon icon="solar:box-linear" className="text-white" width={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        <Counter target={bematrixStats.total_pieces} />
                      </p>
                      <p className="text-xs text-zinc-500">pièces en stock</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-12 px-6 border-y border-white/5 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  <Counter target={bematrixStats.total_pieces} />
                </p>
                <p className="text-sm text-zinc-500">Pièces en stock</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  <Counter target={12} /> m²
                </p>
                <p className="text-sm text-zinc-500">LEDskin® disponible</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  <Counter target={30} /> ans
                </p>
                <p className="text-sm text-zinc-500">D'expertise</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  <Counter target={600} />+
                </p>
                <p className="text-sm text-zinc-500">Projets réalisés</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why BeMatrix Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pourquoi choisir <span className="gradient-text">BeMatrix</span> ?
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Le système BeMatrix n'est pas qu'une simple structure, c'est un canevas pour votre créativité.
                Légèreté de l'aluminium et robustesse de l'ingénierie pour des espaces uniques.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group p-6 rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundColor: `${feature.color}15`, borderColor: `${feature.color}30`, borderWidth: 1 }}
                  >
                    <Icon icon={feature.icon} style={{ color: feature.color }} width={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#ff2d55] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEDskin Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-transparent via-[#7928ca]/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Placeholder */}
              <div className="relative order-2 lg:order-1 animate-fade-in-up">
                <div className="aspect-video rounded-3xl bg-gradient-to-br from-[#7928ca]/20 to-zinc-900/50 border border-[#7928ca]/20 overflow-hidden relative">
                  <iframe
                    src="https://www.youtube.com/embed/Kgrgai_Dp_Y"
                    title="LEDskin® - Intégration BeMatrix par iDkom"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-[#7928ca]/20 rounded-3xl blur-3xl -z-10"></div>
              </div>

              <div className="order-1 lg:order-2 animate-fade-in-up delay-200">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7928ca]/10 border border-[#7928ca]/20 text-sm text-[#7928ca] mb-6">
                  <Icon icon="solar:star-shine-linear" width={18} />
                  Innovation exclusive
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Intégration <span className="gradient-text">LEDskin®</span>
                </h2>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  IDKOM va plus loin dans l'innovation avec <strong className="text-white">12 m² de modules LEDskin®</strong>.
                  Ces écrans LED haute résolution s'intègrent directement dans les cadres BeMatrix pour un rendu spectaculaire.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#7928ca]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon icon="solar:check-circle-linear" className="text-[#7928ca]" width={16} />
                    </div>
                    <div>
                      <p className="text-white font-medium">Vidéo native</p>
                      <p className="text-zinc-500 text-sm">Écrans LED haute résolution intégrés aux cadres</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#7928ca]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon icon="solar:check-circle-linear" className="text-[#7928ca]" width={16} />
                    </div>
                    <div>
                      <p className="text-white font-medium">Finition parfaite</p>
                      <p className="text-zinc-500 text-sm">Aucun cadre d'écran visible, rendu ultra-moderne</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#7928ca]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon icon="solar:check-circle-linear" className="text-[#7928ca]" width={16} />
                    </div>
                    <div>
                      <p className="text-white font-medium">Impact visuel maximum</p>
                      <p className="text-zinc-500 text-sm">Boostez votre visibilité avec des contenus animés</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Nos <span className="gradient-text">services</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                De la location au stand clé en main, nous accompagnons exposants et agences événementielles.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="group p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 hover:border-[#ff2d55]/30 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff2d55]/20 to-[#7928ca]/20 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Icon icon={service.icon} className="text-white" width={32} />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-[#ff2d55] mb-2">{service.subtitle}</p>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:gradient-text transition-all">
                    {service.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 px-6 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Nos <span className="gradient-text">réalisations</span> BeMatrix
              </h2>
              <p className="text-zinc-400">
                Découvrez quelques-uns de nos projets réalisés avec le système BeMatrix.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
              {[
                { src: '/images/bematrix/stand-bematrix-modulaire-idkom-design.webp', alt: 'Stand BeMatrix modulaire conçu par iDkom - design personnalisé pour salon professionnel', span: 'row-span-2' },
                { src: '/images/bematrix/stand-exposition-bematrix-led-integre.webp', alt: 'Stand d\'exposition BeMatrix avec écran LED intégré - solution événementielle moderne', span: '' },
                { src: '/images/bematrix/stand-bematrix-salon-professionnel.webp', alt: 'Stand BeMatrix installé en salon professionnel - structure aluminium premium', span: '' },
                { src: '/images/bematrix/construction-stand-bematrix-aluminium.webp', alt: 'Construction de stand BeMatrix en cadres aluminium - assemblage modulaire par iDkom', span: 'row-span-2' },
                { src: '/images/bematrix/stand-bematrix-vue-ensemble-evenement.webp', alt: 'Vue d\'ensemble stand BeMatrix lors d\'un événement - réalisation iDkom clé en main', span: 'md:col-span-2' },
                { src: '/images/bematrix/detail-assemblage-bematrix-stand.webp', alt: 'Détail d\'assemblage système BeMatrix - connecteurs et finitions professionnelles', span: '' },
                { src: '/images/bematrix/stand-modulaire-bematrix-eclairage.webp', alt: 'Stand modulaire BeMatrix avec éclairage intégré - mise en lumière événementielle', span: '' },
                { src: '/images/bematrix/realisation-stand-bematrix-idkom.webp', alt: 'Réalisation stand BeMatrix par iDkom - expertise standiste depuis 30 ans', span: '' },
              ].map((image, i) => (
                <div
                  key={i}
                  className={`rounded-2xl bg-zinc-800/50 border border-white/10 overflow-hidden group cursor-pointer ${image.span}`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                prefetch={false}
                href="/realisations"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
              >
                Voir toutes nos réalisations
                <Icon icon="solar:arrow-right-linear" width={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Stock CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#ff2d55]/10 via-[#7928ca]/10 to-transparent backdrop-blur-sm border border-white/10 p-8 md:p-12 overflow-hidden">
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-400 mb-6">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Stock disponible en temps réel
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Consultez notre <span className="gradient-text">inventaire BeMatrix</span>
                </h2>
                <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
                  Des milliers de pièces disponibles : cadres, connecteurs, finitions et accessoires.
                  Composez votre demande de devis directement en ligne.
                </p>
                <Link
                  prefetch={false}
                  href="/catalogue"
                  className="group px-8 py-4 rounded-full gradient-bg font-medium text-white hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all duration-300 inline-flex items-center"
                >
                  <Icon icon="solar:box-linear" className="mr-2" width={20} />
                  Explorer le catalogue
                  <Icon icon="solar:arrow-right-linear" className="ml-2 group-hover:translate-x-1 transition-transform" width={20} />
                </Link>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff2d55]/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7928ca]/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-6 bg-zinc-900/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Questions fréquentes sur <span className="gradient-text">BeMatrix</span>
              </h2>
              <p className="text-zinc-400">
                Tout ce que vous devez savoir sur nos solutions de stands modulaires BeMatrix.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "Qu'est-ce qu'un stand BeMatrix ?",
                  answer: "BeMatrix est un système de construction modulaire basé sur des cadres en aluminium légers et réutilisables. Ces cadres s'assemblent rapidement grâce au système breveté Quick-and-Easy pour créer des stands sur-mesure pour salons professionnels et événements. Chez iDkom, nous disposons de plus de 4 000 pièces en stock pour répondre à tous vos besoins.",
                },
                {
                  question: "Quels sont les avantages de BeMatrix par rapport à un stand traditionnel ?",
                  answer: "BeMatrix offre une modularité totale (parois droites, angles, structures suspendues), un montage 2 à 3 fois plus rapide qu'un stand sur-mesure classique, une solution éco-responsable car 100% réutilisable et recyclable, et la possibilité d'intégrer des écrans LED directement dans les cadres grâce à la technologie LEDskin®.",
                },
                {
                  question: "Qu'est-ce que la technologie LEDskin® ?",
                  answer: "LEDskin® est une technologie exclusive de BeMatrix qui permet d'intégrer des écrans LED haute résolution directement dans les cadres aluminium, sans aucun cadre d'écran visible. iDkom dispose de 12 m² de modules LEDskin® pour apporter un impact visuel maximum à votre stand.",
                },
                {
                  question: "Peut-on louer du matériel BeMatrix chez iDkom ?",
                  answer: "Oui, iDkom propose la location de son parc technique BeMatrix : cadres, connecteurs, finitions, accessoires et modules LEDskin®. Nous proposons aussi des prestations clé en main incluant la conception 3D, la livraison, le montage et le démontage sur site.",
                },
                {
                  question: "Dans quelles régions intervenez-vous ?",
                  answer: "Basés à Brevilliers en Franche-Comté, nous intervenons sur tout le territoire français pour l'installation de stands BeMatrix : Besançon, Belfort, Montbéliard, Mulhouse, Strasbourg, Lyon, Paris et toutes les villes accueillant des salons professionnels.",
                },
                {
                  question: "Quel est le délai pour installer un stand BeMatrix ?",
                  answer: "Grâce au système Quick-and-Easy de BeMatrix, le montage est 2 à 3 fois plus rapide qu'un stand traditionnel. Un stand de taille moyenne (30-50 m²) peut être monté en une journée. Notre bureau d'études prend en charge la conception en amont pour optimiser les délais sur site.",
                },
                {
                  question: "Quelles solutions d'éclairage sont disponibles avec BeMatrix ?",
                  answer: "BeMatrix propose des systèmes d'éclairage intégrés directement dans les cadres aluminium : spots LED encastrés, bandeaux lumineux, rétro-éclairage de panneaux et bien sûr la technologie LEDskin® qui transforme vos parois en écrans vidéo. iDkom vous conseille sur la mise en lumière optimale de votre stand pour un impact visuel maximum en salon.",
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-2xl bg-zinc-900/50 border border-white/10 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-white font-medium hover:bg-white/5 transition-colors">
                    <span className="pr-4">{faq.question}</span>
                    <Icon
                      icon="solar:alt-arrow-down-linear"
                      className="flex-shrink-0 transition-transform duration-300 group-open:rotate-180 text-zinc-500"
                      width={20}
                    />
                  </summary>
                  <div className="px-6 pb-6 text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Besoin d'un <span className="gradient-text">stand modulable</span> BeMatrix ?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Faire appel à IDKOM, c'est l'assurance d'un stock maîtrisé
              pour ne jamais manquer de la pièce critique qui fera la différence sur votre montage.
            </p>
            <Link
              prefetch={false}
              href="/contact"
              className="group px-10 py-5 rounded-full gradient-bg font-semibold text-lg text-white hover:shadow-xl hover:shadow-[#7928ca]/30 transition-all duration-300 inline-flex items-center"
            >
              Contactez-nous
              <Icon icon="solar:arrow-right-linear" className="ml-3 group-hover:translate-x-2 transition-transform" width={24} />
            </Link>
          </div>
        </section>
      </main>

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'iDkom', item: 'https://www.idkom.fr' },
              { '@type': 'ListItem', position: 2, name: 'Stand BeMatrix', item: 'https://www.idkom.fr/bematrix' },
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: "Qu'est-ce qu'un stand BeMatrix ?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "BeMatrix est un système de construction modulaire basé sur des cadres en aluminium légers et réutilisables. Ces cadres s'assemblent rapidement grâce au système breveté Quick-and-Easy pour créer des stands sur-mesure pour salons professionnels et événements. Chez iDkom, nous disposons de plus de 4 000 pièces en stock.",
                },
              },
              {
                '@type': 'Question',
                name: 'Quels sont les avantages de BeMatrix par rapport à un stand traditionnel ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "BeMatrix offre une modularité totale, un montage 2 à 3 fois plus rapide, une solution éco-responsable 100% réutilisable et recyclable, et la possibilité d'intégrer des écrans LED grâce à la technologie LEDskin®.",
                },
              },
              {
                '@type': 'Question',
                name: "Qu'est-ce que la technologie LEDskin® ?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "LEDskin® est une technologie exclusive de BeMatrix qui permet d'intégrer des écrans LED haute résolution directement dans les cadres aluminium. iDkom dispose de 12 m² de modules LEDskin®.",
                },
              },
              {
                '@type': 'Question',
                name: 'Peut-on louer du matériel BeMatrix chez iDkom ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Oui, iDkom propose la location de son parc technique BeMatrix incluant cadres, connecteurs, finitions, accessoires et modules LEDskin®. Nous proposons aussi des prestations clé en main.",
                },
              },
              {
                '@type': 'Question',
                name: 'Dans quelles régions intervenez-vous ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Basés en Franche-Comté, nous intervenons sur tout le territoire français : Besançon, Belfort, Montbéliard, Mulhouse, Strasbourg, Lyon, Paris et toutes les villes accueillant des salons professionnels.",
                },
              },
              {
                '@type': 'Question',
                name: 'Quel est le délai pour installer un stand BeMatrix ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Grâce au système Quick-and-Easy, le montage est 2 à 3 fois plus rapide qu'un stand traditionnel. Un stand de 30-50 m² peut être monté en une journée.",
                },
              },
              {
                '@type': 'Question',
                name: "Quelles solutions d'éclairage sont disponibles avec BeMatrix ?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "BeMatrix propose des systèmes d'éclairage intégrés : spots LED encastrés, bandeaux lumineux, rétro-éclairage et technologie LEDskin® qui transforme les parois en écrans vidéo.",
                },
              },
            ],
          }),
        }}
      />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Stand BeMatrix - Location et installation',
            description: "Location et installation de stands modulaires BeMatrix pour salons professionnels et événements. Conception sur-mesure, intégration LEDskin®, montage et démontage clé en main.",
            provider: {
              '@type': 'LocalBusiness',
              name: 'iDkom',
              url: 'https://www.idkom.fr',
            },
            url: 'https://www.idkom.fr/bematrix',
            serviceType: 'Location et installation de stands modulaires',
            areaServed: {
              '@type': 'Country',
              name: 'France',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Services BeMatrix iDkom',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Conception et installation de stand BeMatrix',
                    description: "Bureau d'études, conception 3D, livraison, montage et démontage sur site.",
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Location de parc technique BeMatrix',
                    description: 'Location de cadres aluminium, connecteurs, finitions et modules LEDskin®.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Intégration LEDskin®',
                    description: "12 m² d'écrans LED haute résolution intégrés dans les cadres BeMatrix.",
                  },
                },
              ],
            },
          }),
        }}
      />

      <FooterServer site={data.site} social={data.social} />
    </>
  );
}
