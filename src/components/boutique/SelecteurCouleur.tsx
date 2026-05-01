'use client';

import type { Couleur } from '@/lib/boutique/types';

interface Props {
  couleurs: Couleur[];
  value: string;
  onChange: (slug: string) => void;
}

export default function SelecteurCouleur({ couleurs, value, onChange }: Props) {
  if (!couleurs.length) return null;

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-white mb-3">
        Couleur
      </legend>
      <div className="flex flex-wrap gap-2">
        {couleurs.map((c) => {
          const checked = value === c.slug;
          return (
            <label
              key={c.id}
              className={`group relative cursor-pointer rounded-full transition-all ${
                checked
                  ? 'ring-2 ring-offset-2 ring-offset-zinc-950 ring-[#ff2d55]'
                  : 'ring-1 ring-white/10 hover:ring-white/30'
              }`}
              title={c.name}
            >
              <input
                type="radio"
                name="couleur"
                value={c.slug}
                checked={checked}
                onChange={() => onChange(c.slug)}
                className="sr-only"
              />
              <span
                className="block w-9 h-9 rounded-full border border-black/20"
                style={{ backgroundColor: c.hex_code }}
              />
              <span className="sr-only">{c.name}</span>
              {c.extra_price > 0 && (
                <span className="absolute -top-1 -right-1 text-[9px] bg-[#ff2d55] text-white rounded-full px-1 leading-tight">
                  +
                </span>
              )}
            </label>
          );
        })}
      </div>
      {/* Nom + extra_price visible de la couleur sélectionnée */}
      {couleurs.find((c) => c.slug === value) && (
        <p className="mt-2 text-xs text-zinc-400">
          {couleurs.find((c) => c.slug === value)?.name}
          {(couleurs.find((c) => c.slug === value)?.extra_price ?? 0) > 0 && (
            <span className="text-[#ff2d55] ml-1">
              (+{couleurs.find((c) => c.slug === value)?.extra_price.toFixed(2)} €)
            </span>
          )}
        </p>
      )}
    </fieldset>
  );
}
