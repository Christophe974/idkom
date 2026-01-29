import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getProjets, getHomepageData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientBackground from '@/components/AmbientBackground';

export const revalidate = 300;

export const metadata = {
  title: 'Réalisations | iDkom - L\'Atelier Phygital',
  description: 'Découvrez nos projets : stands BeMatrix, solutions digitales et événements. 600+ réalisations pour des marques ambitieuses.',
};

export default async function RealisationsPage() {
  const [projets, homeData] = await Promise.all([
    getProjets({ per_page: 12 }),
    getHomepageData(),
  ]);

  const categories = homeData.categories;

  return (
    <>
      <AmbientBackground />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nos <span className="gradient-text">réalisations</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Chaque projet est une histoire unique. Découvrez comment nous transformons les idées en expériences mémorables.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            href="/realisations"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white text-sm font-medium"
          >
            Tous
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/realisations?category=${cat.slug}`}
              className="px-4 py-2 rounded-full bg-zinc-800 text-zinc-400 text-sm font-medium hover:bg-zinc-700 hover:text-white transition-colors"
              style={{ borderColor: cat.color }}
            >
              {cat.name}
              {cat.count ? <span className="ml-2 text-zinc-500">({cat.count})</span> : null}
            </Link>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projets.map((projet) => (
            <Link
              key={projet.id}
              href={`/realisations/${projet.slug}`}
              className="group bento-card rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-700"
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 relative">
                <div className="absolute inset-0 bg-grid opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon icon="solar:gallery-wide-linear" className="text-zinc-700" width={48} />
                </div>
                {/* Category badge */}
                {projet.category && (
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${projet.category.color}20`, color: projet.category.color }}
                  >
                    {projet.category.name}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-[#7928ca] transition-colors">
                  {projet.title}
                </h2>
                <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{projet.excerpt}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-zinc-500">
                    {projet.location && (
                      <span className="flex items-center gap-1">
                        <Icon icon="solar:map-point-linear" width={16} />
                        {projet.location}
                      </span>
                    )}
                    {projet.client_name && (
                      <span>{projet.client_name}</span>
                    )}
                  </div>
                  <span className="text-[#7928ca] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Voir <Icon icon="solar:arrow-right-linear" width={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {projets.length === 0 && (
          <div className="text-center py-16">
            <Icon icon="solar:folder-open-linear" className="text-zinc-700 mx-auto mb-4" width={64} />
            <p className="text-zinc-500">Aucun projet pour le moment</p>
          </div>
        )}
      </main>

      <Footer site={homeData.site} social={homeData.social} />
    </>
  );
}
