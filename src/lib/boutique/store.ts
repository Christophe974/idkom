'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem } from './types';

// ============================================================
// Store panier — Zustand persist localStorage
// Key : idkom-boutique-cart, version 1.
// ============================================================

interface CartState {
  items: CartItem[];
  /** Add an item. Hash de la config = même produit + même config => merge quantity. */
  addItem: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

/**
 * Hash stable pour une config produit. Items dont tous les champs significatifs
 * sont identiques partagent le même id et sont mergés (quantity additionnée).
 */
function hashCartItem(item: Omit<CartItem, 'id'>): string {
  return [
    item.produit_slug,
    item.forme_slug,
    item.couleur_slug,
    item.police_slug,
    item.gravure_text.trim().toLowerCase(),
    item.has_nfc ? '1' : '0',
  ].join('|');
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const id = hashCartItem(item);
        const existing = get().items.find((i) => i.id === id);

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i,
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, id }] });
        }
      },

      updateQuantity: (id, quantity) => {
        const safe = Math.max(1, Math.min(99, Math.floor(quantity)));
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: safe } : i,
          ),
        });
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      clear: () => set({ items: [] }),

      totalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((s, i) => s + i.unit_price * i.quantity, 0),
    }),
    {
      name: 'idkom-boutique-cart',
      version: 1,
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') return window.localStorage;
        // Stub SSR-safe : createJSONStorage attend une Storage-like avec
        // les 3 méthodes principales utilisées par persist.
        const noop: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> = {
          getItem: () => null,
          setItem: () => undefined,
          removeItem: () => undefined,
        };
        return noop as Storage;
      }),
    },
  ),
);

/**
 * Hook SSR-safe : true seulement après le 1er render côté client,
 * pour éviter le hydration mismatch sur les composants qui lisent le panier.
 */
import { useEffect, useState } from 'react';

/**
 * Pattern canonique pour éviter le hydration mismatch sur les composants
 * qui lisent un store persisté (localStorage indisponible côté serveur).
 * Le setState au mount est volontaire ici : c'est ainsi qu'on bascule
 * du SSR (mounted=false) au CSR (mounted=true).
 */
export function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Voir docblock du hook
    setMounted(true);
  }, []);
  return mounted;
}
