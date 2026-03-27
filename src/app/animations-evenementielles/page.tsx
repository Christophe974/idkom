import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import AmbientBackground from '@/components/AmbientBackground';
import { getHomepageData, getCityPages } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Animations événementielles en France',
  description: 'iDkom déploie ses animations événementielles partout en France : bar goodies, photobooth IA, kermesse 2.0, stands BeMatrix, quiz interactif. Découvrez nos implantations.',
  alternates: {
    canonical: 'https://www.idkom.fr/animations-evenementielles',
    languages: { 'fr': 'https://www.idkom.fr/animations-evenementielles' },
  },
  openGraph: {
    title: 'Animations événementielles en France | iDkom',
    description: 'Découvrez nos animations événementielles innovantes dans votre ville. Bar goodies, photobooth, kermesse 2.0, stands BeMatrix.',
    url: 'https://www.idkom.fr/animations-evenementielles',
    siteName: 'iDkom',
    locale: 'fr_FR',
    type: 'website',
  },
};

export const revalidate = 3600;

const defaultConcepts = [
  { name: 'Bar Goodies', icon: 'solar:gift-linear', color: '#ff2d55' },
  { name: 'Photobooth IA', icon: 'solar:camera-linear', color: '#7928ca' },
  { name: 'Kermesse 2.0', icon: 'solar:gamepad-linear', color: '#00d4ff' },
  { name: 'Stands BeMatrix', icon: 'solar:widget-linear', color: '#22c55e' },
  { name: 'Roue des Avis', icon: 'solar:star-shine-linear', color: '#f59e0b' },
  { name: 'Quiz Interactif', icon: 'solar:question-circle-linear', color: '#ec4899' },
];

export default async function AnimationsEvenementiellesPage() {
  const [data, cities] = await Promise.all([
    getHomepageData(),
    getCityPages(),
  ]);

  return (
    <>
      <AmbientBackground />
      <NavbarServer />

      <main className="relative z-10 min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff2d55]/10 border border-[#ff2d55]/20 text-sm text-[#ff2d55] mb-6">
              <Icon icon="solar:map-point-linear" width={18} />
              Nos implantations en France
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Animations <span className="gradient-text">événementielles</span>
              <br />
              <span className="text-zinc-400 text-3xl md:text-4xl">partout en France</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Basés en Franche-Comté, nous déployons nos concepts événementiels innovants
              dans toute la France. Bar goodies, photobooth IA, kermesse 2.0, stands BeMatrix
              — découvrez nos animations dans votre ville.
            </p>
          </div>
        </section>

        {/* Concepts */}
        <section className="pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {defaultConcepts.map((concept) => (
                <div
                  key={concept.name}
                  className="p-4 rounded-2xl bg-zinc-900/50 border border-white/10 text-center hover:border-white/20 transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${concept.color}15` }}
                  >
                    <Icon icon={concept.icon} style={{ color: concept.color }} width={24} />
                  </div>
                  <p className="text-white text-sm font-medium">{concept.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="py-20 px-6 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Nos <span className="gradient-text">villes d'intervention</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Cliquez sur une ville pour découvrir nos animations et références locales.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/animations-evenementielles/${city.slug}`}
                  prefetch={false}
                  className="group p-6 rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 hover:border-[#ff2d55]/30 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-[#ff2d55] transition-colors">
                        {city.city_name}
                      </h3>
                      <p className="text-zinc-500 text-sm">
                        {city.department} ({city.department_code})
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#ff2d55]/10 flex items-center justify-center group-hover:bg-[#ff2d55]/20 transition-colors">
                      <Icon icon="solar:map-point-linear" className="text-[#ff2d55]" width={20} />
                    </div>
                  </div>
                  {city.description && (
                    <p className="text-zinc-400 text-sm line-clamp-2 mb-4">{city.description}</p>
                  )}
                  <div className="flex items-center text-sm text-[#ff2d55] group-hover:gap-2 transition-all">
                    Découvrir
                    <Icon icon="solar:arrow-right-linear" className="ml-1 group-hover:translate-x-1 transition-transform" width={16} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Votre ville n'est pas listée ?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Nous intervenons dans toute la France. Contactez-nous pour discuter
              de votre projet événementiel, où que vous soyez.
            </p>
            <Link
              prefetch={false}
              href="/contact"
              className="group px-10 py-5 rounded-full gradient-bg font-semibold text-lg text-white hover:shadow-xl hover:shadow-[#7928ca]/30 transition-all duration-300 inline-flex items-center"
            >
              Parlons de votre projet
              <Icon icon="solar:arrow-right-linear" className="ml-3 group-hover:translate-x-2 transition-transform" width={24} />
            </Link>
          </div>
        </section>
      </main>

      {/* ItemList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Animations événementielles iDkom en France',
            numberOfItems: cities.length,
            itemListElement: cities.map((city, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: `Animations événementielles à ${city.city_name}`,
              url: `https://www.idkom.fr/animations-evenementielles/${city.slug}`,
            })),
          }),
        }}
      />

      <FooterServer site={data.site} social={data.social} />
    </>
  );
}
