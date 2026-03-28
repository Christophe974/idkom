import Link from 'next/link';
import { Icon } from '@iconify/react';
import { ArrowRightIcon } from '@/components/Icons';
import { getHomepageData, getCityPages } from '@/lib/api';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import AmbientBackground from '@/components/AmbientBackground';
import BentoGrid from '@/components/BentoGrid';
import ProjetCard from '@/components/ProjetCard';
import CTASection from '@/components/CTASection';

export const revalidate = 300; // Revalidate every 5 minutes

export default async function Home() {
  const [data, cities] = await Promise.all([
    getHomepageData(),
    getCityPages(),
  ]);

  return (
    <>
      <AmbientBackground />
      <NavbarServer />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
        {/* Bento Grid Hero */}
        <BentoGrid data={data} />

        {/* Section Projets */}
        <section id="projets" className="mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Nos réalisations événementielles</h2>
              <p className="text-zinc-500 mt-2">Stands BeMatrix, solutions digitales et animations — des projets qui font la différence</p>
            </div>
            <Link
              prefetch={false}
              href="/realisations"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
            >
              Voir tous les projets
              <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.featured_projets.slice(0, 3).map((projet, index) => (
              <ProjetCard key={projet.id} projet={projet} index={index} />
            ))}
          </div>
        </section>

        {/* Section Animations par ville */}
        {cities.length > 0 && (
          <section className="mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Animations événementielles près de chez vous</h2>
                <p className="text-zinc-500 mt-2">Bar goodies, photobooth IA, kermesse 2.0 — nos solutions digitales partout en France</p>
              </div>
              <Link
                prefetch={false}
                href="/animations-evenementielles"
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                Toutes nos villes
                <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {cities.slice(0, 6).map((city) => (
                <Link
                  key={city.slug}
                  href={`/animations-evenementielles/${city.slug}`}
                  prefetch={false}
                  className="group p-4 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-[#ff2d55]/30 transition-all text-center"
                >
                  <Icon icon="solar:map-point-linear" className="text-[#ff2d55] mx-auto mb-2" width={24} />
                  <p className="text-white font-medium text-sm group-hover:text-[#ff2d55] transition-colors">{city.city_name}</p>
                  <p className="text-zinc-600 text-xs">{city.department_code}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA Final */}
        <CTASection phone={data.site.phone} />
      </main>

      {/* WebSite Schema — aide Google à afficher les sitelinks */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'iDkom',
            alternateName: 'iDkom — Agence Événementielle & Solutions Digitales',
            url: 'https://www.idkom.fr',
          }),
        }}
      />

      {/* ItemList Schema — pages principales */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Services iDkom',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Stands BeMatrix', url: 'https://www.idkom.fr/bematrix' },
              { '@type': 'ListItem', position: 2, name: 'Animations Événementielles', url: 'https://www.idkom.fr/animations' },
              { '@type': 'ListItem', position: 3, name: 'Réalisations', url: 'https://www.idkom.fr/realisations' },
              { '@type': 'ListItem', position: 4, name: 'Savoir-faire', url: 'https://www.idkom.fr/savoir-faire' },
              { '@type': 'ListItem', position: 5, name: 'Catalogue BeMatrix', url: 'https://www.idkom.fr/catalogue' },
              { '@type': 'ListItem', position: 6, name: 'Contact', url: 'https://www.idkom.fr/contact' },
            ],
          }),
        }}
      />

      <FooterServer site={data.site} social={data.social} />
    </>
  );
}
