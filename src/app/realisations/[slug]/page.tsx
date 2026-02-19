import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getProjetBySlug, getHomepageData } from '@/lib/api';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import AmbientBackground from '@/components/AmbientBackground';
import MarkdownContent from '@/components/MarkdownContent';
import GlowingImageFrame from '@/components/GlowingImageFrame';
import StatCard from '@/components/StatCard';
import ProjectGallery from '@/components/ProjectGallery';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const projet = await getProjetBySlug(slug);
    return {
      title: `${projet.title} | iDkom`,
      description: projet.excerpt || projet.meta_description,
    };
  } catch {
    return {
      title: 'Projet introuvable | iDkom',
    };
  }
}

export default async function ProjetPage({ params }: PageProps) {
  const { slug } = await params;

  let projet;
  try {
    projet = await getProjetBySlug(slug);
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
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <Icon icon="solar:arrow-right-linear" width={14} />
          <Link href="/realisations" className="hover:text-white transition-colors">Réalisations</Link>
          <Icon icon="solar:arrow-right-linear" width={14} />
          <span className="text-zinc-300">{projet.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image avec cadre lumineux */}
            <div className="relative mb-8">
              <GlowingImageFrame
                src={projet.featured_image?.url}
                alt={projet.featured_image?.alt || projet.title}
                fallbackIcon={<Icon icon="solar:gallery-wide-linear" className="text-zinc-700" width={64} />}
              />
              {projet.category && (
                <div
                  className="absolute top-6 left-6 z-20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                  style={{ backgroundColor: `${projet.category.color}40`, color: projet.category.color }}
                >
                  {projet.category.name}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{projet.title}</h1>

            {/* Excerpt */}
            {projet.excerpt && (
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">{projet.excerpt}</p>
            )}

            {/* Stats avec compteurs animés */}
            {projet.stats && Object.keys(projet.stats).length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {Object.entries(projet.stats).map(([key, value], i) => (
                  <StatCard key={key} label={key} value={value as number | string} index={i} />
                ))}
              </div>
            )}

            {/* Content */}
            {projet.content && (
              <article className="prose prose-invert prose-zinc max-w-none">
                <MarkdownContent content={projet.content} />
              </article>
            )}

            {/* Galerie photos */}
            {projet.gallery && projet.gallery.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Galerie</h2>
                <ProjectGallery images={projet.gallery} />
              </div>
            )}

            {/* Testimonial */}
            {projet.testimonial && (
              <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <Icon icon="solar:chat-square-like-linear" className="text-[#7928ca] mb-4" width={32} />
                <blockquote className="text-xl text-zinc-300 italic mb-6">
                  &ldquo;{projet.testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  {projet.testimonial.image && (
                    <img
                      src={projet.testimonial.image}
                      alt={projet.testimonial.author || 'Client'}
                      className="w-14 h-14 rounded-full object-cover border-2 border-zinc-700"
                    />
                  )}
                  <div>
                    {projet.testimonial.author && (
                      <p className="text-white font-medium">{projet.testimonial.author}</p>
                    )}
                    {(projet.testimonial.role || projet.testimonial.company) && (
                      <p className="text-zinc-500 text-sm">
                        {projet.testimonial.role}
                        {projet.testimonial.role && projet.testimonial.company && ' — '}
                        {projet.testimonial.company}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Informations</h3>
              <dl className="space-y-4">
                {projet.client_name && (
                  <div>
                    <dt className="text-zinc-500 text-sm">Client</dt>
                    <dd className="text-white font-medium">{projet.client_name}</dd>
                  </div>
                )}
                {projet.location && (
                  <div>
                    <dt className="text-zinc-500 text-sm">Lieu</dt>
                    <dd className="text-white font-medium flex items-center gap-2">
                      <Icon icon="solar:map-point-linear" width={16} className="text-zinc-500" />
                      {projet.location}
                    </dd>
                  </div>
                )}
                {projet.event_name && (
                  <div>
                    <dt className="text-zinc-500 text-sm">Événement</dt>
                    <dd className="text-white font-medium">{projet.event_name}</dd>
                  </div>
                )}
                {projet.surface && (
                  <div>
                    <dt className="text-zinc-500 text-sm">Surface</dt>
                    <dd className="text-white font-medium">{projet.surface}</dd>
                  </div>
                )}
                {projet.project_date && (
                  <div>
                    <dt className="text-zinc-500 text-sm">Date</dt>
                    <dd className="text-white font-medium">
                      {new Date(projet.project_date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#ff2d55]/10 via-[#7928ca]/10 to-[#00d4ff]/10 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Un projet similaire ?</h3>
              <p className="text-zinc-400 text-sm mb-4">Discutons de votre prochain événement.</p>
              <Link
                href="/contact"
                className="block w-full py-3 px-4 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-medium rounded-lg text-center hover:opacity-90 transition-opacity"
              >
                Nous contacter
              </Link>
            </div>

            {/* Back link */}
            <Link
              href="/realisations"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Icon icon="solar:arrow-left-linear" width={16} />
              Retour aux réalisations
            </Link>
          </div>
        </div>
      </main>

      <FooterServer site={homeData.site} social={homeData.social} />
    </>
  );
}
