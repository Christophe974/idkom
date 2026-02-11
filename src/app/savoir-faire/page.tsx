import { Icon } from '@iconify/react';
import { getHomepageData } from '@/lib/api';
import NavbarServer from '@/components/NavbarServer';
import Footer from '@/components/Footer';
import AmbientBackground from '@/components/AmbientBackground';
import CTASection from '@/components/CTASection';

export const revalidate = 300;

export const metadata = {
  title: "Savoir-Faire | iDkom - L'Atelier Phygital",
  description: "Découvrez nos expertises : stands modulaires BeMatrix, solutions digitales interactives, événementiel sur-mesure. iDkom, votre partenaire depuis 1994.",
};

const expertises = [
  {
    icon: 'solar:buildings-3-linear',
    title: 'Stands Modulaires',
    subtitle: 'BeMatrix Partner',
    description: 'Conception et réalisation de stands d\'exposition modulaires, réutilisables et éco-responsables. Du design 3D au montage clé en main.',
    features: ['Design sur-mesure', 'Système BeMatrix', 'Montage & démontage', 'Stockage & logistique'],
    color: '#ff2d55',
  },
  {
    icon: 'solar:monitor-smartphone-linear',
    title: 'Solutions Digitales',
    subtitle: 'Expériences interactives',
    description: 'Intégration de technologies digitales pour créer des expériences mémorables : écrans tactiles, réalité augmentée, applications sur-mesure.',
    features: ['Bornes interactives', 'Affichage dynamique', 'Applications événementielles', 'Réalité augmentée'],
    color: '#7928ca',
  },
  {
    icon: 'solar:calendar-mark-linear',
    title: 'Événementiel',
    subtitle: 'De A à Z',
    description: 'Organisation complète de vos événements corporate : séminaires, lancements produits, soirées d\'entreprise, team building.',
    features: ['Conception créative', 'Gestion de projet', 'Production technique', 'Coordination jour J'],
    color: '#00d4ff',
  },
];

const process = [
  {
    step: '01',
    title: 'Brief & Conseil',
    description: 'On écoute vos besoins, vos contraintes, vos ambitions. On vous conseille sur les meilleures solutions.',
  },
  {
    step: '02',
    title: 'Conception',
    description: 'Notre équipe créative imagine et conçoit votre projet en 3D. Vous validez chaque étape.',
  },
  {
    step: '03',
    title: 'Production',
    description: 'Fabrication dans nos ateliers, intégration des éléments digitaux, tests qualité.',
  },
  {
    step: '04',
    title: 'Installation',
    description: 'Montage sur site par nos équipes. On gère tout, vous n\'avez qu\'à arriver.',
  },
];

export default async function SavoirFairePage() {
  const homeData = await getHomepageData();

  return (
    <>
      <AmbientBackground />
      <NavbarServer />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
        {/* Hero */}
        <div className="max-w-4xl mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Notre <span className="gradient-text">Savoir-Faire</span>
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Trois expertises complémentaires pour donner vie à vos projets.
            <strong className="text-white"> Du stand d'exposition à l'expérience digitale</strong>,
            on maîtrise toute la chaîne.
          </p>
        </div>

        {/* Expertises */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {expertises.map((expertise, index) => (
            <div
              key={index}
              className="bento-card rounded-2xl p-8 bg-zinc-900 border border-zinc-800 group hover:border-zinc-700 transition-all"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors"
                style={{
                  backgroundColor: `${expertise.color}15`,
                  borderWidth: 1,
                  borderColor: `${expertise.color}30`,
                }}
              >
                <Icon
                  icon={expertise.icon}
                  width={32}
                  style={{ color: expertise.color }}
                />
              </div>

              <span
                className="text-xs uppercase tracking-widest mb-2 block"
                style={{ color: expertise.color }}
              >
                {expertise.subtitle}
              </span>
              <h2 className="text-2xl font-bold text-white mb-4">{expertise.title}</h2>
              <p className="text-zinc-400 mb-6 leading-relaxed">{expertise.description}</p>

              <ul className="space-y-2">
                {expertise.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-500">
                    <Icon
                      icon="solar:check-circle-linear"
                      width={18}
                      style={{ color: expertise.color }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Notre méthode</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Un processus éprouvé pour des projets réussis. De la première idée à l'installation finale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bento-card rounded-2xl p-6 bg-zinc-900 border border-zinc-800 h-full">
                  <span className="text-5xl font-bold gradient-text opacity-50 mb-4 block">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-zinc-500 text-sm">{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <Icon icon="solar:arrow-right-linear" className="text-zinc-700" width={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Why Us */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Pourquoi nous choisir ?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ff2d55]/10 border border-[#ff2d55]/20 flex items-center justify-center flex-shrink-0">
                    <Icon icon="solar:users-group-rounded-linear" className="text-[#ff2d55]" width={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Équipe intégrée</h3>
                    <p className="text-zinc-500 text-sm">Designers, techniciens, monteurs — tout est fait en interne. Pas de sous-traitance.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#7928ca]/10 border border-[#7928ca]/20 flex items-center justify-center flex-shrink-0">
                    <Icon icon="solar:box-linear" className="text-[#7928ca]" width={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Stock & Logistique</h3>
                    <p className="text-zinc-500 text-sm">2000m² d'entrepôt. On stocke vos stands entre deux salons.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center flex-shrink-0">
                    <Icon icon="solar:leaf-linear" className="text-[#00d4ff]" width={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Éco-responsable</h3>
                    <p className="text-zinc-500 text-sm">Stands modulaires réutilisables, matériaux durables, impact réduit.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#ff2d55]/20 to-[#ff2d55]/5 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl font-bold gradient-text">30+</span>
                  <p className="text-zinc-500 text-sm mt-1">ans d'expérience</p>
                </div>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#7928ca]/20 to-[#7928ca]/5 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl font-bold gradient-text">500+</span>
                  <p className="text-zinc-500 text-sm mt-1">projets réalisés</p>
                </div>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-[#00d4ff]/5 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl font-bold gradient-text">100%</span>
                  <p className="text-zinc-500 text-sm mt-1">sur-mesure</p>
                </div>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl font-bold gradient-text">24h</span>
                  <p className="text-zinc-500 text-sm mt-1">réponse garantie</p>
                </div>
              </div>
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
