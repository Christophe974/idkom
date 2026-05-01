'use client';

import { Icon } from '@iconify/react';
import { useCart } from '@/lib/boutique/store';
import type { CartItem } from '@/lib/boutique/types';

interface Props {
  item: CartItem;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

function formatMediaUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${API_URL}/${path.replace(/^\/+/, '')}`;
}

export default function PanierItem({ item }: Props) {
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);

  // Mini-preview SVG : on remplace COLOR/TEXT/FONT
  const safeText = (item.gravure_text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  const mini = item.forme_template
    ?.replace(/\{\{\s*TEXT\s*\}\}/g, safeText)
    .replace(/\{\{\s*COLOR\s*\}\}/g, item.couleur_hex)
    .replace(/\{\{\s*FONT\s*\}\}/g, item.police_font_family.replace(/"/g, '&quot;')) || '';

  const lineTotal = item.unit_price * item.quantity;
  const productImg = formatMediaUrl(item.produit_image);

  return (
    <div className="flex gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/10">
      <div className="flex-shrink-0 w-24 h-24 rounded-xl bg-zinc-800/60 border border-white/5 flex items-center justify-center overflow-hidden">
        {mini ? (
          <div
            className="w-full h-full flex items-center justify-center [&_svg]:w-full [&_svg]:h-full p-2"
            dangerouslySetInnerHTML={{ __html: mini }}
          />
        ) : productImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={productImg} alt={item.produit_name} className="w-full h-full object-contain" />
        ) : (
          <Icon icon="solar:gallery-linear" className="text-zinc-600" width={32} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">
              {item.produit_name}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5 truncate">
              {item.forme_name} · {item.couleur_name} · {item.police_name}
              {item.has_nfc && (
                <span className="ml-1 text-[#00d4ff]">· NFC</span>
              )}
            </p>
            {item.gravure_text && (
              <p className="text-xs text-zinc-500 mt-1 italic truncate">
                « {item.gravure_text} »
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="flex-shrink-0 p-1.5 rounded-lg text-zinc-500 hover:text-[#ff2d55] hover:bg-[#ff2d55]/10 transition-colors"
            aria-label="Supprimer cet article"
          >
            <Icon icon="solar:trash-bin-trash-linear" width={16} />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="inline-flex items-center rounded-lg border border-white/10 bg-zinc-950">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="px-2.5 py-1 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
              aria-label="Diminuer la quantité"
            >
              <Icon icon="solar:minus-square-linear" width={18} />
            </button>
            <span className="px-3 py-1 text-sm font-semibold text-white tabular-nums min-w-[2ch] text-center">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= 99}
              className="px-2.5 py-1 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
              aria-label="Augmenter la quantité"
            >
              <Icon icon="solar:add-square-linear" width={18} />
            </button>
          </div>

          <div className="text-right">
            <div className="text-xs text-zinc-500 tabular-nums">
              {item.unit_price.toFixed(2)} € × {item.quantity}
            </div>
            <div className="text-base font-bold text-white tabular-nums">
              {lineTotal.toFixed(2)} €
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
