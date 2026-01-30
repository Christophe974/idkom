import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getBlogArticleBySlug, getHomepageData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientBackground from '@/components/AmbientBackground';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const article = await getBlogArticleBySlug(slug);
    return {
      title: `${article.title} | Blog iDkom`,
      description: article.excerpt || article.meta_description,
    };
  } catch {
    return {
      title: 'Article introuvable | iDkom',
    };
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  let article;
  try {
    article = await getBlogArticleBySlug(slug);
  } catch {
    notFound();
  }

  const homeData = await getHomepageData();

  return (
    <>
      <AmbientBackground />
      <Navbar />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <Icon icon="solar:arrow-right-linear" width={14} />
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Icon icon="solar:arrow-right-linear" width={14} />
          <span className="text-zinc-300 truncate max-w-[200px]">{article.title}</span>
        </nav>

        {/* Category & Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {article.category && (
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: `${article.category.color}20`, color: article.category.color }}
            >
              {article.category.name}
            </span>
          )}
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            {article.reading_time && (
              <span className="flex items-center gap-1">
                <Icon icon="solar:clock-circle-linear" width={16} />
                {article.reading_time} min de lecture
              </span>
            )}
            {article.published_at && (
              <span>
                {new Date(article.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
            {article.excerpt}
          </p>
        )}

        {/* Featured Image */}
        <div className="aspect-video rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 mb-10 relative overflow-hidden">
          {article.featured_image?.url ? (
            <img
              src={article.featured_image.url}
              alt={article.featured_image.alt || article.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-grid opacity-30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon icon="solar:gallery-wide-linear" className="text-zinc-700" width={64} />
              </div>
            </>
          )}
        </div>

        {/* Content */}
        {article.content && (
          <article className="prose prose-invert prose-zinc prose-lg max-w-none">
            <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{article.content}</div>
          </article>
        )}

        {/* Author */}
        {article.author_name && (
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <p className="text-zinc-500">
              Écrit par <span className="text-white font-medium">{article.author_name}</span>
            </p>
          </div>
        )}

        {/* Share & Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-800">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <Icon icon="solar:arrow-left-linear" width={16} />
            Retour au blog
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-zinc-500 text-sm">Partager</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.idkom.fr/blog/${article.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-zinc-800 text-zinc-400 rounded-lg hover:text-white hover:bg-[#1877f2] transition-colors"
              title="Partager sur Facebook"
            >
              <Icon icon="mdi:facebook" width={18} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://www.idkom.fr/blog/${article.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-zinc-800 text-zinc-400 rounded-lg hover:text-white hover:bg-black transition-colors"
              title="Partager sur X"
            >
              <Icon icon="ri:twitter-x-fill" width={18} />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.idkom.fr/blog/${article.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-zinc-800 text-zinc-400 rounded-lg hover:text-white hover:bg-[#0077b5] transition-colors"
              title="Partager sur LinkedIn"
            >
              <Icon icon="mdi:linkedin" width={18} />
            </a>
          </div>
        </div>
      </main>

      <Footer site={homeData.site} social={homeData.social} />
    </>
  );
}
