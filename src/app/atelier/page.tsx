import { Icon } from '@iconify/react';
import { getHomepageData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientBackground from '@/components/AmbientBackground';
import Counter from '@/components/Counter';
import CTASection from '@/components/CTASection';

export const revalidate = 300;

export const metadata = {
  title: "L'Atelier | iDkom - L'Atelier Phygital",
  description: "Découvrez l'histoire d'iDkom, atelier créatif spécialisé dans les stands modulaires, solutions digitales et événementiel depuis 1994.",
};

export default async function AtelierPage() {
  const homeData = await getHomepageData();
  const { stats } = homeData;

  return (
    <>
      <AmbientBackground />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
        {/* Hero */}
        <div className="max-w-4xl mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            L'Atelier <span className="gradient-text">Phygital</span>
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Depuis 1994, nous créons des expériences qui marquent les esprits.
            <strong className="text-white"> Stands modulaires, solutions digitales, événements sur-mesure</strong> —
            notre métier, c'est de donner vie à vos idées.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bento-card rounded-2xl p-8 bg-zinc-900 border border-zinc-800 text-center glow-pink">
            <Counter target={stats.years} className="text-6xl font-bold gradient-text" />
            <span className="text-2xl gradient-text font-bold">+</span>
            <p className="text-zinc-500 mt-2">années d'expérience</p>
          </div>
          <div className="bento-card rounded-2xl p-8 bg-zinc-900 border border-zinc-800 text-center glow-purple">
            <Counter target={stats.projects} className="text-6xl font-bold gradient-text" />
            <span className="text-2xl gradient-text font-bold">+</span>
            <p className="text-zinc-500 mt-2">projets réalisés</p>
          </div>
          <div className="bento-card rounded-2xl p-8 bg-zinc-900 border border-zinc-800 text-center glow-cyan">
            <Counter target={stats.clients} className="text-6xl font-bold gradient-text" />
            <span className="text-2xl gradient-text font-bold">+</span>
            <p className="text-zinc-500 mt-2">clients fidèles</p>
          </div>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Notre histoire</h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Tout a commencé en 1994, avec une passion pour le métier de l'événementiel
                et la conviction que chaque marque mérite une présence remarquable.
              </p>
              <p>
                Au fil des années, nous avons évolué avec notre industrie. Des premiers stands
                traditionnels aux systèmes modulaires BeMatrix, des affichages statiques aux
                expériences digitales interactives.
              </p>
              <p>
                Aujourd'hui, nous sommes un <strong className="text-white">atelier phygital</strong> —
                un pont entre le physique et le digital, entre l'artisanat et la technologie.
              </p>
            </div>
          </div>
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon icon="solar:users-group-rounded-linear" className="text-zinc-700" width={96} />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bento-card rounded-2xl p-8 bg-zinc-900 border border-zinc-800 group">
              <div className="w-14 h-14 rounded-xl bg-[#ff2d55]/10 border border-[#ff2d55]/20 flex items-center justify-center mb-6 group-hover:bg-[#ff2d55] transition-colors">
                <Icon icon="solar:hand-shake-linear" className="text-[#ff2d55] group-hover:text-white transition-colors" width={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Proximité</h3>
              <p className="text-zinc-500">
                Un interlocuteur unique, de la conception au montage. Pas de sous-traitance,
                pas de distance — juste une équipe engagée.
              </p>
            </div>

            <div className="bento-card rounded-2xl p-8 bg-zinc-900 border border-zinc-800 group">
              <div className="w-14 h-14 rounded-xl bg-[#7928ca]/10 border border-[#7928ca]/20 flex items-center justify-center mb-6 group-hover:bg-[#7928ca] transition-colors">
                <Icon icon="solar:lightbulb-bolt-linear" className="text-[#7928ca] group-hover:text-white transition-colors" width={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
              <p className="text-zinc-500">
                Toujours en veille, toujours curieux. Nous explorons les nouvelles technologies
                pour créer des expériences qui surprennent.
              </p>
            </div>

            <div className="bento-card rounded-2xl p-8 bg-zinc-900 border border-zinc-800 group">
              <div className="w-14 h-14 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center mb-6 group-hover:bg-[#00d4ff] transition-colors">
                <Icon icon="solar:shield-check-linear" className="text-[#00d4ff] group-hover:text-white transition-colors" width={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Fiabilité</h3>
              <p className="text-zinc-500">
                Les délais serrés, on connaît. Notre force : livrer à temps,
                sans compromis sur la qualité.
              </p>
            </div>
          </div>
        </div>

        {/* Partner */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12 mb-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-zinc-500 mb-2 block">Partenaire officiel</span>
              <h3 className="text-3xl font-bold text-white mb-4">BeMatrix</h3>
              <p className="text-zinc-400 max-w-lg">
                Nous sommes partenaire officiel du système modulaire BeMatrix,
                leader mondial des solutions de stands réutilisables.
                Qualité premium, flexibilité maximale, impact environnemental réduit.
              </p>
            </div>
            <div className="w-32 h-32 rounded-2xl bg-zinc-800 flex items-center justify-center">
              <span className="text-2xl font-bold text-zinc-500">BeMatrix</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <CTASection phone={homeData.site.phone} />
      </main>

      <Footer site={homeData.site} social={homeData.social} />
    </>
  );
}
