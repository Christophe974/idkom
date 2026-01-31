import { Metadata } from 'next';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientBackground from '@/components/AmbientBackground';
import CatalogueBematrix from '@/components/CatalogueBematrix';
import { getHomepageData } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Catalogue Be Matrix | Stock en temps réel | iDkom',
  description: 'Consultez notre stock de pièces Be Matrix en temps réel. Cadres, jonctions, accessoires - tout notre inventaire disponible pour vos projets de stands.',
};

export const revalidate = 60; // Revalidate every minute for fresh stock data

// Loading skeleton for the catalogue
function CatalogueLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl bg-zinc-900/50 border border-white/10 p-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-800"></div>
              <div>
                <div className="h-8 w-20 bg-zinc-800 rounded mb-2"></div>
                <div className="h-4 w-16 bg-zinc-800/50 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Filter skeleton */}
      <div className="rounded-2xl bg-zinc-900/50 border border-white/10 p-6 mb-8 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 h-12 bg-zinc-800 rounded-xl"></div>
          <div className="w-48 h-12 bg-zinc-800 rounded-xl"></div>
          <div className="w-48 h-12 bg-zinc-800 rounded-xl"></div>
        </div>
      </div>
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="rounded-2xl bg-zinc-900/50 border border-white/10 overflow-hidden animate-pulse">
            <div className="aspect-square bg-zinc-800/50"></div>
            <div className="p-4">
              <div className="h-3 w-16 bg-zinc-800 rounded mb-2"></div>
              <div className="h-4 w-full bg-zinc-800/70 rounded mb-3"></div>
              <div className="h-8 w-12 bg-zinc-800 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function CataloguePage() {
  const data = await getHomepageData();

  return (
    <>
      <AmbientBackground />
      <Navbar />

      <main className="relative z-10 min-h-screen pt-28 pb-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ff2d55]/20 via-[#7928ca]/10 to-transparent backdrop-blur-sm border border-white/10 p-8 md:p-12">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 mb-6">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Stock en temps réel
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Catalogue <span className="gradient-text">Be Matrix</span>
              </h1>
              <p className="text-zinc-400 text-lg max-w-2xl">
                Consultez l&apos;ensemble de nos pièces Be Matrix disponibles en stock.
                Recherchez par référence, désignation ou filtrez par catégorie.
              </p>
            </div>
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#ff2d55]/30 via-[#7928ca]/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>

        {/* Catalogue Component with Suspense for useSearchParams */}
        <Suspense fallback={<CatalogueLoading />}>
          <CatalogueBematrix />
        </Suspense>
      </main>

      <Footer site={data.site} social={data.social} />
    </>
  );
}
