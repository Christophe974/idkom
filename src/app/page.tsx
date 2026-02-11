import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getHomepageData } from '@/lib/api';
import NavbarServer from '@/components/NavbarServer';
import Footer from '@/components/Footer';
import AmbientBackground from '@/components/AmbientBackground';
import BentoGrid from '@/components/BentoGrid';
import ProjetCard from '@/components/ProjetCard';
import CTASection from '@/components/CTASection';

export const revalidate = 300; // Revalidate every 5 minutes

export default async function Home() {
  const data = await getHomepageData();

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
              <h2 className="text-3xl md:text-4xl font-bold text-white">Dernières réalisations</h2>
              <p className="text-zinc-500 mt-2">Des projets qui font la différence sur le terrain</p>
            </div>
            <Link
              href="/realisations"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
            >
              Voir tous les projets
              <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" width={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.featured_projets.slice(0, 3).map((projet, index) => (
              <ProjetCard key={projet.id} projet={projet} index={index} />
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <CTASection phone={data.site.phone} />
      </main>

      <Footer site={data.site} social={data.social} />
    </>
  );
}
