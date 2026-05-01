import Link from 'next/link';
import { Icon } from '@iconify/react';
import type { Produit } from '@/lib/boutique/types';

interface Props {
  produit: Produit;
  /** Slug de la catégorie pour construire l'URL. Fallback sur produit.category.slug. */
  categorySlug?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

function formatMediaUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${API_URL}/${path.replace(/^\/+/, '')}`;
}

export default function ProduitCard({ produit, categorySlug }: Props) {
  const cat = categorySlug || produit.category?.slug;
  const href = cat ? `/boutique/${cat}/${produit.slug}` : `/boutique`;
  const img = formatMediaUrl(produit.image);

  const finalPrice =
    Number(produit.base_price) +
    (produit.has_nfc_option ? Number(produit.nfc_extra_price) : 0);

  return (
    <Link
      href={href}
      prefetch={false}
      className="group block rounded-2xl bg-zinc-900/50 border border-white/10 overflow-hidden hover:border-[#ff2d55]/40 hover:shadow-[0_0_30px_rgba(255,45,85,0.1)] transition-all"
    >
      <div className="relative aspect-square bg-gradient-to-br from-zinc-800/80 to-zinc-950 overflow-hidden">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={produit.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
            <Icon icon="solar:gallery-linear" width={48} />
          </div>
        )}
        {produit.is_featured && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-[#ff2d55] to-[#7928ca] text-white text-[10px] font-bold uppercase">
            <Icon icon="solar:star-bold" width={10} />
            Star
          </span>
        )}
        {produit.has_nfc_option && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-zinc-900/80 backdrop-blur border border-white/10 text-white text-[10px] font-semibold">
            <Icon icon="solar:wi-fi-router-linear" width={10} className="text-[#00d4ff]" />
            NFC
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-white group-hover:text-[#ff2d55] transition-colors truncate">
          {produit.name}
        </h3>
        {produit.description && (
          <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
            {produit.description}
          </p>
        )}
        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <span className="text-xs text-zinc-500">À partir de</span>
            <div className="text-lg font-bold text-white tabular-nums">
              {finalPrice.toFixed(2)} €
            </div>
          </div>
          <span className="text-xs text-zinc-500 group-hover:text-[#ff2d55] transition-colors flex items-center gap-1">
            Personnaliser
            <Icon icon="solar:arrow-right-linear" width={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
