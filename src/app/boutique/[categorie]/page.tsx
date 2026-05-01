import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@iconify/react';
import {
  getBoutiqueCategory,
  getBoutiqueProducts,
} from '@/lib/boutique/api';
import ProduitCard from '@/components/boutique/ProduitCard';
import type { Metadata } from 'next';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ categorie: string }>;
  searchParams: Promise<{ search?: string; page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorie } = await params;
  try {
    const cat = await getBoutiqueCategory(categorie);
    return {
      title: cat.name,
      description: cat.description ?? `Porte-clés personnalisés iDkom — ${cat.name}`,
      alternates: { canonical: `https://www.idkom.fr/boutique/${cat.slug}` },
    };
  } catch {
    return { title: 'Catégorie' };
  }
}

const PER_PAGE = 20;

export default async function CategoriePage({ params, searchParams }: PageProps) {
  const { categorie } = await params;
  const sp = await searchParams;
  const search = sp.search?.trim() || '';
  const page = Math.max(1, Number(sp.page) || 1);

  let cat;
  try {
    cat = await getBoutiqueCategory(categorie);
  } catch {
    notFound();
  }
  if (!cat) notFound();

  const productsResult = await getBoutiqueProducts({
    category: categorie,
    search: search || undefined,
    page,
    per_page: PER_PAGE,
  }).catch(() => ({ data: [], pagination: undefined }));

  const products = productsResult.data ?? [];
  const pagination = productsResult.pagination;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      {/* Breadcrumb */}
      <nav className="text-xs text-zinc-500 mb-6 flex items-center gap-1.5">
        <Link href="/boutique" className="hover:text-white transition-colors">
          Boutique
        </Link>
        <Icon icon="solar:alt-arrow-right-linear" width={12} />
        <span className="text-zinc-300">{cat.name}</span>
      </nav>

      {/* Header catégorie */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          {cat.name}
        </h1>
        {cat.description && (
          <p className="mt-3 text-zinc-400 max-w-2xl">{cat.description}</p>
        )}
      </header>

      {/* Filtre recherche (formulaire GET, server-side) */}
      <form
        action={`/boutique/${cat.slug}`}
        method="GET"
        className="mb-8 flex gap-2"
      >
        <div className="relative flex-1 max-w-md">
          <Icon
            icon="solar:magnifer-linear"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            width={18}
          />
          <input
            type="search"
            name="search"
            defaultValue={search}
            placeholder="Rechercher un produit…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/60 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff2d55] focus:ring-2 focus:ring-[#ff2d55]/20 transition-all"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors"
        >
          Rechercher
        </button>
        {search && (
          <Link
            href={`/boutique/${cat.slug}`}
            prefetch={false}
            className="px-3 py-2.5 rounded-xl text-zinc-400 hover:text-white text-sm transition-colors inline-flex items-center"
          >
            Effacer
          </Link>
        )}
      </form>

      {/* Liste produits */}
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProduitCard
                key={p.id}
                produit={p}
                categorySlug={cat.slug}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.total_pages > 1 && (
            <nav
              className="mt-10 flex items-center justify-center gap-2"
              aria-label="Pagination"
            >
              {pagination.has_prev && (
                <Link
                  href={`/boutique/${cat.slug}?${new URLSearchParams({
                    ...(search && { search }),
                    page: String(page - 1),
                  }).toString()}`}
                  prefetch={false}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-white/10 text-zinc-300 hover:bg-white/5 text-sm transition-colors"
                >
                  <Icon icon="solar:arrow-left-linear" width={14} />
                  Précédent
                </Link>
              )}
              <span className="px-4 py-2 text-sm text-zinc-400">
                Page {pagination.page} / {pagination.total_pages}
              </span>
              {pagination.has_next && (
                <Link
                  href={`/boutique/${cat.slug}?${new URLSearchParams({
                    ...(search && { search }),
                    page: String(page + 1),
                  }).toString()}`}
                  prefetch={false}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-white/10 text-zinc-300 hover:bg-white/5 text-sm transition-colors"
                >
                  Suivant
                  <Icon icon="solar:arrow-right-linear" width={14} />
                </Link>
              )}
            </nav>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-10 text-center">
          <Icon
            icon="solar:box-minimalistic-linear"
            className="text-zinc-700 mx-auto mb-3"
            width={48}
          />
          <p className="text-zinc-300 font-semibold">
            {search ? 'Aucun produit ne correspond à ta recherche.' : 'Aucun produit dans cette catégorie pour le moment.'}
          </p>
          {search && (
            <Link
              href={`/boutique/${cat.slug}`}
              prefetch={false}
              className="inline-block mt-4 text-sm text-[#ff2d55] hover:text-white transition-colors"
            >
              Voir tous les produits
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
