'use client';

import type { Forme } from '@/lib/boutique/types';

interface Props {
  formes: Forme[];
  value: string;
  onChange: (slug: string) => void;
  /** Couleur courante pour le rendu mini-preview, défaut zinc */
  previewColor?: string;
}

export default function SelecteurForme({
  formes,
  value,
  onChange,
  previewColor = '#3f3f46',
}: Props) {
  if (!formes.length) return null;

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-white mb-3">
        Forme
      </legend>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {formes.map((f) => {
          const checked = value === f.slug;
          // Inline mini-preview SVG : on remplace COLOR (preview) + TEXT vide + FONT sans-serif
          const mini = f.svg_template
            .replace(/\{\{\s*TEXT\s*\}\}/g, '')
            .replace(/\{\{\s*COLOR\s*\}\}/g, previewColor)
            .replace(/\{\{\s*FONT\s*\}\}/g, 'sans-serif');
          return (
            <label
              key={f.id}
              className={`group relative cursor-pointer rounded-xl border p-2 flex flex-col items-center justify-center gap-1 transition-all ${
                checked
                  ? 'border-[#ff2d55] bg-[#ff2d55]/10 ring-2 ring-[#ff2d55]/40'
                  : 'border-white/10 bg-zinc-900/40 hover:border-white/20'
              }`}
            >
              <input
                type="radio"
                name="forme"
                value={f.slug}
                checked={checked}
                onChange={() => onChange(f.slug)}
                className="sr-only"
              />
              <div
                className="w-12 h-12 [&_svg]:w-full [&_svg]:h-full"
                dangerouslySetInnerHTML={{ __html: mini }}
              />
              <span className="text-[11px] text-zinc-300 truncate max-w-full">
                {f.name}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
