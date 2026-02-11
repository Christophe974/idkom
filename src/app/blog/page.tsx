import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { getBlogArticles, getHomepageData } from '@/lib/api';
import NavbarServer from '@/components/NavbarServer';
import Footer from '@/components/Footer';
import AmbientBackground from '@/components/AmbientBackground';

export const revalidate = 300;

export const metadata = {
  title: 'Blog | iDkom - L\'Atelier Phygital',
  description: 'Actualités, conseils et coulisses de l\'Atelier Phygital. Découvrez nos articles sur les stands, le digital et l\'événementiel.',
};

export default async function BlogPage() {
  let articles: Awaited<ReturnType<typeof getBlogArticles>> = [];
  let homeData: Awaited<ReturnType<typeof getHomepageData>> | null = null;

  try {
    [articles, homeData] = await Promise.all([
      getBlogArticles({ per_page: 12 }),
      getHomepageData(),
    ]);
  } catch (error) {
    console.error('Failed to fetch blog data:', error);
  }

  return (
    <>
      <AmbientBackground />
      <NavbarServer />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Le <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Actualités, conseils et coulisses de l'Atelier Phygital.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group bento-card rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-700"
            >
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                {article.image?.url ? (
                  <img
                    src={article.image.url}
                    alt={article.image.alt || article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-grid opacity-30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon icon="solar:document-text-linear" className="text-zinc-700" width={48} />
                    </div>
                  </>
                )}
                {/* Category badge */}
                {article.category && (
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                    style={{ backgroundColor: `${article.category.color}40`, color: article.category.color }}
                  >
                    {article.category.name}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3">
                  {article.reading_time && (
                    <span className="flex items-center gap-1">
                      <Icon icon="solar:clock-circle-linear" width={14} />
                      {article.reading_time} min
                    </span>
                  )}
                  {article.published_at && (
                    <span>
                      {new Date(article.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-[#7928ca] transition-colors line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-zinc-500 text-sm line-clamp-3">{article.excerpt}</p>

                <div className="mt-4 text-[#7928ca] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Lire l'article
                  <Icon icon="solar:arrow-right-linear" width={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-16">
            <Icon icon="solar:document-text-linear" className="text-zinc-700 mx-auto mb-4" width={64} />
            <p className="text-zinc-500">Aucun article pour le moment</p>
          </div>
        )}
      </main>

      <Footer site={homeData?.site} social={homeData?.social} />
    </>
  );
}
