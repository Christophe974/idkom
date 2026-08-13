'use client';

import { useEffect } from 'react';

/**
 * Comptage de vue côté navigateur.
 * - S'exécute une seule fois par article et par session (garde sessionStorage),
 *   ce qui neutralise le double-rendu React StrictMode et les rechargements.
 * - La vraie déduplication (1 vue / visiteur / jour) + l'exclusion des bots
 *   se font côté serveur dans /api/blog/track.
 * - Les bots qui n'exécutent pas de JS ne déclenchent jamais ce beacon.
 */
export default function BlogViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    if (!slug || typeof window === 'undefined') return;

    const today = new Date().toISOString().slice(0, 10);
    const key = `bvt:${slug}:${today}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      // sessionStorage indispo (navigation privée stricte) : on continue quand même,
      // la dédup serveur fait le reste.
    }

    const body = JSON.stringify({ slug });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/blog/track', new Blob([body], { type: 'application/json' }));
      } else {
        fetch('/api/blog/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // ne jamais casser la page pour un compteur
    }
  }, [slug]);

  return null;
}
