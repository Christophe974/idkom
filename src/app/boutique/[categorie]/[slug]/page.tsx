import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@iconify/react';
import type { Metadata } from 'next';
import { getBoutiqueProduct } from '@/lib/boutique/api';
import ConfigurateurProduit from '@/components/boutique/ConfigurateurProduit';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ categorie: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorie, slug } = await params;
  try {
    const produit = await getBoutiqueProduct(slug);
    return {
      title: produit.name,
      description:
        produit.description ??
        `${produit.name} — porte-clé personnalisable iDkom avec option NFC.`,
      alternates: {
        canonical: `https://www.idkom.fr/boutique/${categorie}/${slug}`,
      },
      openGraph: {
        title: produit.name,
        description: produit.description ?? undefined,
        type: 'website',
      },
    };
  } catch {
    return { title: 'Produit' };
  }
}

export default async function ProduitPage({ params }: PageProps) {
  const { categorie, slug } = await params;

  let produit;
  try {
    produit = await getBoutiqueProduct(slug);
  } catch {
    notFound();
  }
  if (!produit || !produit.is_active) notFound();

  // Vérification cohérence URL/catégorie : si la catégorie réelle diffère du segment,
  // on ne 404 pas (pour permettre des liens externes), mais on s'aligne sur la donnée serveur.
  const realCategorySlug = produit.category?.slug ?? categorie;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      {/* Breadcrumb */}
      <nav className="text-xs text-zinc-500 mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href="/boutique" className="hover:text-white transition-colors">
          Boutique
        </Link>
        <Icon icon="solar:alt-arrow-right-linear" width={12} />
        <Link
          href={`/boutique/${realCategorySlug}`}
          prefetch={false}
          className="hover:text-white transition-colors"
        >
          {produit.category?.name ?? realCategorySlug}
        </Link>
        <Icon icon="solar:alt-arrow-right-linear" width={12} />
        <span className="text-zinc-300 truncate max-w-[40ch]">
          {produit.name}
        </span>
      </nav>

      <ConfigurateurProduit produit={produit} />

      {/* JSON-LD Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: produit.name,
            description: produit.description ?? undefined,
            sku: produit.sku,
            brand: { '@type': 'Brand', name: 'iDkom' },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'EUR',
              price: Number(produit.base_price).toFixed(2),
              availability: 'https://schema.org/InStock',
              url: `https://www.idkom.fr/boutique/${realCategorySlug}/${produit.slug}`,
            },
          }),
        }}
      />
    </div>
  );
}
