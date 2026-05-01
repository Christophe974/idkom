import Link from 'next/link';
import { Icon } from '@iconify/react';
import type { Categorie } from '@/lib/boutique/types';

interface Props {
  categorie: Categorie;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

function formatMediaUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${API_URL}/${path.replace(/^\/+/, '')}`;
}

export default function CategorieCard({ categorie }: Props) {
  const img = formatMediaUrl(categorie.image);

  return (
    <Link
      href={`/boutique/${categorie.slug}`}
      prefetch={false}
      className="group relative block rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 hover:border-[#ff2d55]/50 transition-all min-h-[220px]"
    >
      <div className="absolute inset-0">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={categorie.name}
            className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff2d55]/10 via-[#7928ca]/10 to-[#00d4ff]/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
      </div>

      <div className="relative h-full p-6 flex flex-col justify-between min-h-[220px]">
        {typeof categorie.products_count === 'number' && (
          <span className="self-start inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900/80 backdrop-blur text-xs text-zinc-300 border border-white/10">
            {categorie.products_count} produit
            {categorie.products_count > 1 ? 's' : ''}
          </span>
        )}

        <div className="mt-auto">
          <h3 className="text-xl font-bold text-white group-hover:text-[#ff2d55] transition-colors">
            {categorie.name}
          </h3>
          {categorie.description && (
            <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
              {categorie.description}
            </p>
          )}
          <span className="inline-flex items-center gap-1.5 mt-3 text-sm text-white/80 group-hover:text-[#ff2d55] transition-colors">
            Découvrir
            <Icon
              icon="solar:arrow-right-linear"
              width={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
