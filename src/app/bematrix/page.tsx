import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientBackground from '@/components/AmbientBackground';
import Counter from '@/components/Counter';
import { getHomepageData } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Stand BeMatrix | Système modulaire premium | iDkom',
  description: 'Expert en structures BeMatrix pour salons et événements. Plus de 4000 pièces en stock, intégration LEDskin, conception sur-mesure. La référence mondiale du cadre aluminium.',
  keywords: ['BeMatrix', 'stand modulaire', 'salon professionnel', 'événementiel', 'LEDskin', 'cadre aluminium'],
};

export const revalidate = 3600;

export default async function BematrixPage() {
  const data = await getHomepageData();

  const features = [
    {
      icon: 'solar:widget-linear',
      title: 'Modularité totale',
      description: 'Parois droites, angles complexes, structures suspendues. Notre parc technique répond à chaque défi architectural.',
      color: '#ff2d55',
    },
    {
      icon: 'solar:monitor-linear',
      title: 'Intégration LEDskin®',
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
      <Navbar />

      <main className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff2d55]/10 border border-[#ff2d55]/20 text-sm text-[#ff2d55] mb-6">
                  <Icon icon="solar:verified-check-linear" width={18} />
                  Partenaire officiel BeMatrix
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Stand <span className="gradient-text">BeMatrix</span>
                  <br />
                  <span className="text-zinc-400 text-3xl md:text-4xl lg:text-5xl">La puissance du modulable</span>
                </h1>
                <p className="text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed">
                  Expert en structures BeMatrix pour salons et événements.
                  Un stand design, éco-responsable et ultra-personnalisable
                  avec la référence mondiale du cadre aluminium.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="group px-8 py-4 rounded-full gradient-bg font-medium text-white hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all duration-300 inline-flex items-center"
                  >
                    Contactez nos experts
                    <Icon icon="solar:arrow-right-linear" className="ml-2 group-hover:translate-x-1 transition-transform" width={20} />
                  </Link>
                  <Link
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
                        <Counter target={4000} />+
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
                  <Counter target={4000} />+
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Icon icon="solar:monitor-linear" className="text-[#7928ca]/50 mx-auto mb-4" width={80} />
                      <p className="text-zinc-600 text-sm">Image: LEDskin® en action</p>
                      <p className="text-zinc-700 text-xs mt-1">/ledskin-demo.jpg</p>
                    </div>
                  </div>
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
                  Plus de 4 000 références disponibles : cadres, connecteurs, finitions et accessoires.
                  Composez votre demande de devis directement en ligne.
                </p>
                <Link
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

        {/* Final CTA */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Besoin d'un <span className="gradient-text">stand modulable</span> BeMatrix ?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Faire appel à IDKOM, c'est l'assurance d'un stock maîtrisé de 4 000 références
              pour ne jamais manquer de la pièce critique qui fera la différence sur votre montage.
            </p>
            <Link
              href="/contact"
              className="group px-10 py-5 rounded-full gradient-bg font-semibold text-lg text-white hover:shadow-xl hover:shadow-[#7928ca]/30 transition-all duration-300 inline-flex items-center"
            >
              Contactez nos experts standistes
              <Icon icon="solar:arrow-right-linear" className="ml-3 group-hover:translate-x-2 transition-transform" width={24} />
            </Link>
          </div>
        </section>
      </main>

      <Footer site={data.site} social={data.social} />
    </>
  );
}
