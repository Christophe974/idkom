import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getAnimations, getHomepageData, type Animation } from '@/lib/api';
import NavbarServer from '@/components/NavbarServer';
import Footer from '@/components/Footer';
import AmbientBackground from '@/components/AmbientBackground';

export const revalidate = 300;

export const metadata = {
  title: 'Animations événementielles | iDkom - L\'Atelier Phygital',
  description: 'Découvrez nos animations événementielles : Fabrique à Souvenirs, Photobooth, expériences interactives. Des moments uniques pour vos événements.',
};

export default async function AnimationsPage() {
  let animations: Animation[] = [];
  try {
    animations = await getAnimations({ per_page: 12 });
  } catch {
    animations = [];
  }
  const homeData = await getHomepageData();

  return (
    <>
      <AmbientBackground />
      <NavbarServer />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7928ca]/10 text-[#7928ca] text-sm font-medium mb-6">
            <Icon icon="solar:mask-happly-linear" width={18} />
            Expériences uniques
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Nos <span className="gradient-text">animations</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Des expériences interactives et mémorables pour vos événements.
            Chaque animation est pensée pour engager, surprendre et laisser une trace.
          </p>
        </div>

        {/* Animations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {animations.map((anim, index) => (
            <Link
              key={anim.id}
              href={`/animations/${anim.slug}`}
              className="group relative bento-card rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-700"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                {anim.image?.url ? (
                  <img
                    src={anim.image.url}
                    alt={anim.image.alt || anim.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-grid opacity-30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon icon="solar:mask-happly-linear" className="text-zinc-700" width={64} />
                    </div>
                  </>
                )}
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Steps count badge */}
                {anim.steps_count && anim.steps_count > 0 && (
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-zinc-950/70 backdrop-blur-sm text-xs font-medium text-cyan-400 flex items-center gap-1.5">
                    <Icon icon="solar:play-circle-linear" width={14} />
                    {anim.steps_count} étape{anim.steps_count > 1 ? 's' : ''}
                  </div>
                )}

                {/* Featured badge */}
                {anim.is_featured && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#ff2d55]/20 backdrop-blur-sm text-xs font-medium text-[#ff2d55] flex items-center gap-1.5">
                    <Icon icon="solar:star-bold" width={14} />
                    Coup de coeur
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ff2d55] group-hover:via-[#7928ca] group-hover:to-[#00d4ff] transition-all duration-300">
                  {anim.title}
                </h2>
                <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{anim.excerpt}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 text-xs">
                    {anim.published_at && new Date(anim.published_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </span>
                  <span className="text-[#7928ca] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium">
                    Découvrir <Icon icon="solar:arrow-right-linear" width={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {animations.length === 0 && (
          <div className="text-center py-20">
            <Icon icon="solar:mask-happly-linear" className="text-zinc-700 mx-auto mb-4" width={64} />
            <p className="text-zinc-500 text-lg mb-2">Aucune animation pour le moment</p>
            <p className="text-zinc-600 text-sm">Nos animations arrivent bientôt !</p>
          </div>
        )}

        {/* CTA Section */}
        {animations.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-[#ff2d55]/5 via-[#7928ca]/5 to-[#00d4ff]/5 border border-zinc-800 rounded-2xl p-10">
              <h2 className="text-2xl font-bold text-white mb-3">Une animation pour votre événement ?</h2>
              <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
                Chaque animation peut être personnalisée aux couleurs de votre marque. Parlons de votre projet !
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                <Icon icon="solar:chat-round-dots-linear" width={20} />
                Nous contacter
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer site={homeData.site} social={homeData.social} />
    </>
  );
}
