import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getHomepageData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientBackground from '@/components/AmbientBackground';
import Counter from '@/components/Counter';
import CTASection from '@/components/CTASection';

export const revalidate = 300;

export const metadata = {
  title: "Histoire d'iDkom : de Besançon (1996) à l'Atelier Phygital (stands BeMatrix & digital)",
  description: "Depuis 1996 à Besançon (Franche-Comté), iDkom conçoit stands, signalétique et expériences digitales. CARECO 120 m² (2016), BIO360 (2017) : l'Atelier Phygital.",
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
            Depuis 1996, nous créons des expériences qui marquent les esprits.
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

        {/* Fondateur + intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Notre histoire</h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                L&apos;aventure démarre en 1996 à Besançon avec la création de Krystal Communication.
                Dès le départ, une conviction nous guide : <strong className="text-white">chaque marque mérite une présence remarquable.</strong>
              </p>
              <p>
                Au fil des années, nous avons évolué avec notre industrie. Des premiers supports graphiques
                aux systèmes modulaires BeMatrix, des plateformes SMS aux expériences digitales interactives.
              </p>
              <p>
                Aujourd&apos;hui, nous sommes un <strong className="text-white">atelier phygital</strong> —
                un pont entre le physique et le digital, entre l&apos;artisanat et la technologie.
              </p>
            </div>
          </div>
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden gradient-border glow-pink">
            <img
              src="/images/Christophe-Bracchini-Idkom.webp"
              alt="Christophe Bracchini - Fondateur d'iDkom"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Timeline / Fresque historique */}
        <div className="mb-20">
          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff2d55] via-[#7928ca] to-[#00d4ff]" />

            {/* 1996 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16">
              <div className="md:text-right md:pr-12 pl-12 md:pl-0">
                <span className="text-[#ff2d55] font-bold text-lg">1996</span>
                <h3 className="text-xl font-semibold text-white mt-1 mb-3">Les débuts à Besançon</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Création de <strong className="text-zinc-300">Krystal Communication</strong> (entreprise individuelle).
                  À l&apos;origine, notre métier est le graphisme : conception d&apos;affiches, flyers et supports
                  de communication pour des établissements locaux.
                </p>
              </div>
              <div className="hidden md:block" />
              <div className="absolute left-4 md:left-1/2 top-1 w-3 h-3 rounded-full bg-[#ff2d55] -translate-x-1/2 ring-4 ring-zinc-950" />
            </div>

            {/* 1998 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16">
              <div className="hidden md:block" />
              <div className="md:pl-12 pl-12">
                <span className="text-[#ff2d55] font-bold text-lg">1998</span>
                <h3 className="text-xl font-semibold text-white mt-1 mb-3">Le digital avant l&apos;heure</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Lancement de notre première <strong className="text-zinc-300">plateforme d&apos;envoi de SMS</strong> pour
                  annoncer des soirées et événements. Mêler créativité et outils — c&apos;est l&apos;ADN d&apos;iDkom qui se dessine.
                </p>
              </div>
              <div className="absolute left-4 md:left-1/2 top-1 w-3 h-3 rounded-full bg-[#ff2d55] -translate-x-1/2 ring-4 ring-zinc-950" />
            </div>

            {/* Années 2000 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16">
              <div className="md:text-right md:pr-12 pl-12 md:pl-0">
                <span className="text-[#7928ca] font-bold text-lg">Années 2000</span>
                <h3 className="text-xl font-semibold text-white mt-1 mb-3">Une offre qui s&apos;élargit</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Communication ciblée, newsletters, sites web, réseaux sociaux, signalétique,
                  communication événementielle… L&apos;accompagnement s&apos;étend et <strong className="text-zinc-300">l&apos;événementiel prend
                  une place centrale</strong>.
                </p>
              </div>
              <div className="hidden md:block" />
              <div className="absolute left-4 md:left-1/2 top-1 w-3 h-3 rounded-full bg-[#7928ca] -translate-x-1/2 ring-4 ring-zinc-950" />
            </div>

            {/* 2004 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16">
              <div className="hidden md:block" />
              <div className="md:pl-12 pl-12">
                <span className="text-[#7928ca] font-bold text-lg">2004</span>
                <h3 className="text-xl font-semibold text-white mt-1 mb-3">Naissance d&apos;iDkom (SARL)</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Krystal Communication devient <strong className="text-zinc-300">iDkom</strong>. Structuration forte :
                  plus de projets, une organisation robuste, et une ambition claire — accompagner les marques
                  avec une production fiable et une exécution maîtrisée.
                </p>
              </div>
              <div className="absolute left-4 md:left-1/2 top-1 w-3 h-3 rounded-full bg-[#7928ca] -translate-x-1/2 ring-4 ring-zinc-950" />
            </div>

            {/* 2010 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16">
              <div className="md:text-right md:pr-12 pl-12 md:pl-0">
                <span className="text-[#7928ca] font-bold text-lg">2010</span>
                <h3 className="text-xl font-semibold text-white mt-1 mb-3">Accélération</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Augmentation de capital à <strong className="text-zinc-300">60 000 €</strong>.
                  Objectif : renforcer les moyens, développer l&apos;outil de production et répondre
                  à des dispositifs plus ambitieux.
                </p>
              </div>
              <div className="hidden md:block" />
              <div className="absolute left-4 md:left-1/2 top-1 w-3 h-3 rounded-full bg-[#7928ca] -translate-x-1/2 ring-4 ring-zinc-950" />
            </div>

            {/* 2016 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16">
              <div className="hidden md:block" />
              <div className="md:pl-12 pl-12">
                <span className="text-[#00d4ff] font-bold text-lg">2016</span>
                <h3 className="text-xl font-semibold text-white mt-1 mb-3">Premier très grand stand</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Un stand de <strong className="text-zinc-300">120 m² pour CARECO</strong>. Gestion de volumes importants,
                  coordination, fabrication, logistique — et une nouvelle exigence dans la mise en scène de marque.
                </p>
              </div>
              <div className="absolute left-4 md:left-1/2 top-1 w-3 h-3 rounded-full bg-[#00d4ff] -translate-x-1/2 ring-4 ring-zinc-950" />
            </div>

            {/* 2017 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16">
              <div className="md:text-right md:pr-12 pl-12 md:pl-0">
                <span className="text-[#00d4ff] font-bold text-lg">2017</span>
                <h3 className="text-xl font-semibold text-white mt-1 mb-3">L&apos;événementiel grande échelle</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Premier gros salon <strong className="text-zinc-300">BIO360</strong>, qui confirme notre capacité
                  à gérer des opérations d&apos;envergure. Et l&apos;achat de notre <strong className="text-zinc-300">second bâtiment</strong> pour
                  renforcer nos capacités de préparation, stockage et production.
                </p>
              </div>
              <div className="hidden md:block" />
              <div className="absolute left-4 md:left-1/2 top-1 w-3 h-3 rounded-full bg-[#00d4ff] -translate-x-1/2 ring-4 ring-zinc-950" />
            </div>

            {/* Aujourd'hui */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <div className="hidden md:block" />
              <div className="md:pl-12 pl-12">
                <span className="gradient-text font-bold text-lg">Aujourd&apos;hui</span>
                <h3 className="text-xl font-semibold text-white mt-1 mb-3">L&apos;Atelier Phygital</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Nous concevons et produisons des <strong className="text-zinc-300">stands modulaires BeMatrix</strong>,
                  de la signalétique, et des <strong className="text-zinc-300">expériences digitales interactives</strong>.
                  Notre objectif reste le même depuis le premier jour : créer des présences qui attirent,
                  engagent et marquent.
                </p>
              </div>
              <div className="absolute left-4 md:left-1/2 top-1 w-4 h-4 rounded-full bg-gradient-to-r from-[#ff2d55] to-[#00d4ff] -translate-x-1/2 ring-4 ring-zinc-950" />
            </div>
          </div>
        </div>

        {/* Marques clients */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Des marques qui font partie de l&apos;aventure</h2>
          <p className="text-zinc-500 mb-10 max-w-2xl mx-auto">
            Chaque projet nourrit notre moteur : fabriquer des dispositifs solides, efficaces et mémorables.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['EDF', 'La Poste', 'Crédit Mutuel', 'CARECO', 'ENGIE', 'Dalkia', 'Néolia', 'Idéha', 'Casino JOA', 'NRJ Global Régions', 'BAT', 'La Vie Claire', 'Manpower'].map((brand) => (
              <span key={brand} className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm hover:border-zinc-600 hover:text-zinc-300 transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Galerie Atelier */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div className="aspect-video rounded-2xl overflow-hidden relative gradient-border glow-purple">
            <img
              src="/images/atelier-exterieur.webp"
              alt="Bâtiment iDkom - Vue extérieure"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg z-10">
              <span className="text-white text-sm font-medium">Notre atelier</span>
            </div>
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden relative gradient-border glow-cyan">
            <img
              src="/images/stock-bematrix.webp"
              alt="Stock BeMatrix - Intérieur de l'atelier"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg z-10">
              <span className="text-white text-sm font-medium">Notre stock BeMatrix</span>
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
        <Link href="/bematrix" className="block bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12 mb-20 group hover:border-[#7928ca]/30 transition-colors">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-zinc-500 mb-2 block">Partenaire</span>
              <h3 className="text-3xl font-bold text-white mb-4">BeMatrix</h3>
              <p className="text-zinc-400 max-w-lg">
                Nous sommes partenaire du système modulaire BeMatrix,
                leader mondial des solutions de stands réutilisables.
                Qualité premium, flexibilité maximale, impact environnemental réduit.
              </p>
              <span className="inline-flex items-center gap-2 text-[#7928ca] text-sm font-medium mt-4 group-hover:gap-3 transition-all">
                Découvrir BeMatrix
                <Icon icon="solar:arrow-right-linear" width={16} />
              </span>
            </div>
            <div className="w-32 h-32 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-[#7928ca]/10 transition-colors">
              <span className="text-2xl font-bold text-zinc-500 group-hover:text-[#7928ca] transition-colors">BeMatrix</span>
            </div>
          </div>
        </Link>

        {/* CTA */}
        <CTASection phone={homeData.site.phone} />
      </main>

      <Footer site={homeData.site} social={homeData.social} />
    </>
  );
}
