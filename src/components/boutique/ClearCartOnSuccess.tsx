'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/boutique/store';

/**
 * Vide le panier au montage. À monter UNIQUEMENT sur la page de confirmation
 * (post-paiement Stripe), sinon on perd les items en cours.
 */
export default function ClearCartOnSuccess() {
  const clear = useCart((s) => s.clear);
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
