'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useCart, useHasMounted } from '@/lib/boutique/store';
import PanierItem from '@/components/boutique/PanierItem';
import { getSettings } from '@/lib/api';

interface ShippingConfig {
  fee: number;
  freeThreshold: number;
}

export default function PanierPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <div className="h-8 w-40 rounded bg-zinc-900 animate-pulse mb-6" />
          <div className="h-32 rounded-2xl bg-zinc-900 animate-pulse" />
        </div>
      }
    >
      <PanierContent />
    </Suspense>
  );
}

function PanierContent() {
  const mounted = useHasMounted();
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const totalItems = useCart((s) => s.totalItems());
  const searchParams = useSearchParams();
  const cancelled = searchParams.get('cancelled') === '1';

  const [shipping, setShipping] = useState<ShippingConfig>({
    fee: 3.9,
    freeThreshold: 25,
  });

  useEffect(() => {
    let cancel = false;
    getSettings('boutique')
      .then((s) => {
        if (cancel) return;
        const fee = Number(s.shipping_fee);
        const free = Number(s.shipping_free_threshold);
        setShipping({
          fee: Number.isFinite(fee) ? fee : 3.9,
          freeThreshold: Number.isFinite(free) ? free : 25,
        });
      })
      .catch(() => {
        // Garde la valeur par défaut
      });
    return () => {
      cancel = true;
    };
  }, []);

  const shippingFee =
    shipping.freeThreshold > 0 && subtotal >= shipping.freeThreshold
      ? 0
      : shipping.fee;
  const total = subtotal + shippingFee;
  const freeIn = Math.max(0, shipping.freeThreshold - subtotal);

  if (!mounted) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="h-8 w-40 rounded bg-zinc-900 animate-pulse mb-6" />
        <div className="h-32 rounded-2xl bg-zinc-900 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
        Mon panier
      </h1>
      <p className="text-zinc-500 mb-8">
        {totalItems > 0
          ? `${totalItems} article${totalItems > 1 ? 's' : ''}`
          : 'Vide pour le moment'}
      </p>

      {cancelled && (
        <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200 text-sm flex items-start gap-2">
          <Icon icon="solar:info-circle-linear" width={18} className="flex-shrink-0 mt-0.5" />
          <span>
            Le paiement a été annulé. Tes articles sont toujours dans ton panier,
            tu peux réessayer quand tu veux.
          </span>
        </div>
      )}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-10 text-center">
          <Icon
            icon="solar:cart-cross-linear"
            className="text-zinc-700 mx-auto mb-3"
            width={56}
          />
          <p className="text-zinc-200 font-semibold text-lg">
            Ton panier est vide
          </p>
          <p className="text-zinc-500 mt-1 text-sm">
            Direction la boutique pour personnaliser ton premier porte-clé.
          </p>
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-semibold hover:shadow-[0_0_30px_rgba(255,45,85,0.4)] transition-all"
          >
            <Icon icon="solar:shop-linear" width={18} />
            Aller à la boutique
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <PanierItem key={item.id} item={item} />
            ))}
            <Link
              href="/boutique"
              prefetch={false}
              className="inline-flex items-center gap-1.5 mt-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <Icon icon="solar:arrow-left-linear" width={14} />
              Continuer mes achats
            </Link>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start rounded-2xl border border-white/10 bg-zinc-900/60 p-5 space-y-4">
            <h2 className="text-lg font-bold text-white">Récapitulatif</h2>

            <dl className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-zinc-400">Sous-total</dt>
                <dd className="text-white tabular-nums">
                  {subtotal.toFixed(2)} €
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-zinc-400">Livraison</dt>
                <dd className="text-white tabular-nums">
                  {shippingFee === 0 ? (
                    <span className="text-[#00d4ff] font-semibold">Offerte</span>
                  ) : (
                    `${shippingFee.toFixed(2)} €`
                  )}
                </dd>
              </div>
              {shipping.freeThreshold > 0 && freeIn > 0 && (
                <div className="text-xs text-zinc-500 italic">
                  Plus que {freeIn.toFixed(2)} € pour la livraison offerte.
                </div>
              )}
              <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                <dt className="text-white font-semibold">Total</dt>
                <dd className="text-2xl font-bold text-white tabular-nums">
                  {total.toFixed(2)} €
                </dd>
              </div>
            </dl>

            <Link
              href="/boutique/checkout"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-bold hover:shadow-[0_0_30px_rgba(255,45,85,0.4)] transition-all"
            >
              <Icon icon="solar:lock-keyhole-linear" width={18} />
              Procéder au paiement
            </Link>

            <p className="text-[11px] text-zinc-500 text-center">
              Paiement sécurisé via Stripe · TVA incluse
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
