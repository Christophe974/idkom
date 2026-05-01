'use client';

import { useEffect } from 'react';
import type { Police } from '@/lib/boutique/types';

interface Props {
  polices: Police[];
  value: string;
  onChange: (slug: string) => void;
}

/**
 * Cards "AaBbCc" rendues avec font_family. Injecte les font_url dans <head>
 * pour que les previews soient correctement rendues.
 */
export default function SelecteurPolice({ polices, value, onChange }: Props) {
  // Pré-charger toutes les fonts pour rendre toutes les previews correctement
  useEffect(() => {
    if (typeof document === 'undefined') return;
    polices.forEach((p) => {
      if (!p.font_url) return;
      const existing = document.querySelector(
        `link[data-boutique-font="${p.font_url}"]`,
      );
      if (existing) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = p.font_url;
      link.setAttribute('data-boutique-font', p.font_url);
      document.head.appendChild(link);
    });
  }, [polices]);

  if (!polices.length) return null;

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-white mb-3">
        Police de gravure
      </legend>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {polices.map((p) => {
          const checked = value === p.slug;
          return (
            <label
              key={p.id}
              className={`cursor-pointer rounded-xl border p-3 flex flex-col items-center gap-1 transition-all ${
                checked
                  ? 'border-[#ff2d55] bg-[#ff2d55]/10 ring-2 ring-[#ff2d55]/40'
                  : 'border-white/10 bg-zinc-900/40 hover:border-white/20'
              }`}
            >
              <input
                type="radio"
                name="police"
                value={p.slug}
                checked={checked}
                onChange={() => onChange(p.slug)}
                className="sr-only"
              />
              <span
                className="text-2xl text-white leading-none"
                style={{ fontFamily: p.font_family }}
              >
                AaBb
              </span>
              <span className="text-[11px] text-zinc-400 truncate max-w-full">
                {p.name}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
