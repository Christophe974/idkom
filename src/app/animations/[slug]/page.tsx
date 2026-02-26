import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getAnimationBySlug, getHomepageData } from '@/lib/api';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import AmbientBackground from '@/components/AmbientBackground';
import GlowingImageFrame from '@/components/GlowingImageFrame';
import MarkdownContent from '@/components/MarkdownContent';
import AnimationSteps from '@/components/AnimationSteps';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const anim = await getAnimationBySlug(slug);
    return {
      title: anim.seo?.title || `${anim.title} | iDkom`,
      description: anim.seo?.description || anim.excerpt,
      alternates: { canonical: `https://www.idkom.fr/animations/${slug}` },
    };
  } catch {
    return {
      title: 'Animation introuvable | iDkom',
    };
  }
}

export default async function AnimationDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let anim;
  try {
    anim = await getAnimationBySlug(slug);
  } catch {
    notFound();
  }

  const homeData = await getHomepageData();

  return (
    <>
      <AmbientBackground />
      <NavbarServer />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link prefetch={false} href="/" className="hover:text-white transition-colors">Accueil</Link>
          <Icon icon="solar:arrow-right-linear" width={14} />
          <Link prefetch={false} href="/animations" className="hover:text-white transition-colors">Animations</Link>
          <Icon icon="solar:arrow-right-linear" width={14} />
          <span className="text-zinc-300">{anim.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-16">
          {/* Featured Image */}
          {anim.featured_image?.url && (
            <div className="relative mb-10">
              <GlowingImageFrame
                src={anim.featured_image.url}
                alt={anim.featured_image.alt || anim.title}
                fallbackIcon={<Icon icon="solar:mask-happly-linear" className="text-zinc-700" width={64} />}
              />
            </div>
          )}

          {/* Title + Excerpt */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7928ca]/10 text-[#7928ca] text-sm font-medium mb-6">
              <Icon icon="solar:mask-happly-linear" width={18} />
              Animation événementielle
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="gradient-text">{anim.title}</span>
            </h1>
            {anim.excerpt && (
              <p className="text-xl text-zinc-400 leading-relaxed">{anim.excerpt}</p>
            )}
          </div>
        </div>

        {/* Description */}
        {anim.description && (
          <div className="max-w-3xl mx-auto mb-20">
            <article className="prose prose-invert prose-zinc max-w-none">
              <MarkdownContent content={anim.description} />
            </article>
          </div>
        )}

        {/* Steps Section */}
        {anim.steps && anim.steps.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Comment ça <span className="gradient-text">marche</span> ?
              </h2>
              <p className="text-zinc-500 max-w-lg mx-auto">
                {anim.steps.length} étape{anim.steps.length > 1 ? 's' : ''} pour une expérience inoubliable
              </p>
            </div>
            <AnimationSteps steps={anim.steps} />
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-[#ff2d55]/5 via-[#7928ca]/5 to-[#00d4ff]/5 border border-zinc-800 rounded-2xl p-10 max-w-2xl mx-auto">
            <Icon icon="solar:chat-round-dots-linear" className="text-[#7928ca] mx-auto mb-4" width={40} />
            <h2 className="text-2xl font-bold text-white mb-3">Cette animation vous intéresse ?</h2>
            <p className="text-zinc-400 mb-6">
              Chaque animation est personnalisable aux couleurs de votre marque.
              Parlons de votre événement !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                prefetch={false}
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                <Icon icon="solar:chat-round-dots-linear" width={20} />
                Nous contacter
              </Link>
              <Link
                prefetch={false}
                href="/animations"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 text-white font-medium rounded-lg hover:bg-zinc-700 transition-colors"
              >
                <Icon icon="solar:arrow-left-linear" width={20} />
                Toutes les animations
              </Link>
            </div>
          </div>
        </div>
      </main>

      <FooterServer site={homeData.site} social={homeData.social} />
    </>
  );
}
