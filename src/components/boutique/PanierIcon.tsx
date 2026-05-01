'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useCart, useHasMounted } from '@/lib/boutique/store';

export default function PanierIcon() {
  const mounted = useHasMounted();
  const total = useCart((s) => s.totalItems());

  return (
    <Link
      href="/boutique/panier"
      prefetch
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-zinc-900/60 text-white hover:border-[#ff2d55]/50 hover:text-[#ff2d55] transition-colors"
      aria-label="Voir le panier"
    >
      <Icon icon="solar:cart-large-2-linear" width={20} />
      {mounted && total > 0 && (
        <span
          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-[#ff2d55] to-[#7928ca] text-white text-[10px] font-bold flex items-center justify-center shadow-lg"
          aria-live="polite"
        >
          {total > 99 ? '99+' : total}
        </span>
      )}
    </Link>
  );
}
