'use client';

import { useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react';

interface Props {
  formeTemplate: string;
  couleurHex: string;
  policeFontFamily: string;
  policeFontUrl: string | null;
  gravureText: string;
  hasNfc: boolean;
  /** Texte alternatif pour accessibilité */
  alt?: string;
  className?: string;
}

/**
 * Render SVG live avec remplacements {{TEXT}}, {{COLOR}}, {{FONT}}.
 * Injecte la font_url via <link> dans <head> (idempotent par href).
 * Affiche un badge NFC en overlay si has_nfc.
 */
export default function SVGPreview({
  formeTemplate,
  couleurHex,
  policeFontFamily,
  policeFontUrl,
  gravureText,
  hasNfc,
  alt,
  className = '',
}: Props) {
  // Inject font URL once per URL (idempotent).
  useEffect(() => {
    if (!policeFontUrl || typeof document === 'undefined') return;
    const existing = document.querySelector(
      `link[data-boutique-font="${policeFontUrl}"]`,
    );
    if (existing) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = policeFontUrl;
    link.setAttribute('data-boutique-font', policeFontUrl);
    document.head.appendChild(link);
  }, [policeFontUrl]);

  const svgMarkup = useMemo(() => {
    if (!formeTemplate) return '';
    // Echapper le texte utilisateur pour SVG/XML (XSS / cassures de tag)
    const safeText = (gravureText || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

    return formeTemplate
      .replace(/\{\{\s*TEXT\s*\}\}/g, safeText)
      .replace(/\{\{\s*COLOR\s*\}\}/g, couleurHex)
      .replace(/\{\{\s*FONT\s*\}\}/g, policeFontFamily.replace(/"/g, '&quot;'));
  }, [formeTemplate, gravureText, couleurHex, policeFontFamily]);

  return (
    <div
      className={`relative aspect-square w-full max-w-md mx-auto rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur p-8 flex items-center justify-center ${className}`}
      role="img"
      aria-label={alt || 'Aperçu du porte-clé personnalisé'}
    >
      <div
        className="w-full h-full flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:max-w-full [&_svg]:max-h-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        // SVG provient de la BDD admin (trusted) + placeholders échappés ci-dessus
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />

      {hasNfc && (
        <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white text-xs font-bold shadow-lg">
          <Icon icon="solar:wi-fi-router-linear" width={14} />
          NFC
        </div>
      )}
    </div>
  );
}
