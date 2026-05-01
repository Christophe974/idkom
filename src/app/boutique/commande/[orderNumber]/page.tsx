import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getOrderConfirmation } from '@/lib/boutique/api';
import ClearCartOnSuccess from '@/components/boutique/ClearCartOnSuccess';

interface PageProps {
  params: Promise<{ orderNumber: string }>;
  searchParams: Promise<{ email?: string; session_id?: string }>;
}

export const metadata = {
  title: 'Commande confirmée',
  description: 'Récapitulatif de votre commande iDkom Boutique.',
  robots: { index: false, follow: false },
};

export default async function CommandePage({
  params,
  searchParams,
}: PageProps) {
  const { orderNumber } = await params;
  const sp = await searchParams;
  const email = sp.email?.trim() ?? '';
  const fromStripe = !!sp.session_id;

  if (!email) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">
          Commande introuvable
        </h1>
        <p className="text-zinc-400">
          Le lien de confirmation est incomplet. Consulte l&apos;email de
          confirmation envoyé par iDkom.
        </p>
        <Link
          href="/boutique"
          className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold"
        >
          Retour à la boutique
        </Link>
      </div>
    );
  }

  let order;
  try {
    order = await getOrderConfirmation(orderNumber, email);
  } catch {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">
          Commande introuvable
        </h1>
        <p className="text-zinc-400">
          Aucune commande ne correspond à ces informations. Vérifie le lien
          dans ton email de confirmation.
        </p>
        <Link
          href="/boutique"
          className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold"
        >
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const isPaid = order.status === 'paid' ||
    order.status === 'in_production' ||
    order.status === 'shipped' ||
    order.status === 'delivered';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      {/* Vide le panier au mount (post-paiement) */}
      {fromStripe && isPaid && <ClearCartOnSuccess />}

      <div className="text-center mb-10">
        <div
          className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
            isPaid
              ? 'bg-gradient-to-br from-[#ff2d55] via-[#7928ca] to-[#00d4ff]'
              : 'bg-zinc-800'
          }`}
        >
          <Icon
            icon={isPaid ? 'solar:check-circle-bold' : 'solar:clock-circle-linear'}
            className="text-white"
            width={42}
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {isPaid ? 'Merci pour ta commande !' : 'Commande en attente de paiement'}
        </h1>
        <p className="text-zinc-400 mt-2">
          Numéro de commande :{' '}
          <span className="text-white font-mono font-semibold">
            {order.order_number}
          </span>
        </p>
        {isPaid && (
          <p className="text-zinc-500 mt-3 text-sm">
            On a envoyé un email de confirmation à{' '}
            <span className="text-zinc-300">{order.customer_email}</span>.
          </p>
        )}
      </div>

      {/* Récap items */}
      <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white mb-4">Récap commande</h2>
        <ul className="space-y-3">
          {order.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start justify-between gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0"
            >
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold">
                  {item.quantity}× {item.produit_name}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  {item.forme_name && `Forme : ${item.forme_name}`}
                  {item.couleur_name && ` · Couleur : ${item.couleur_name}`}
                  {item.police_name && ` · Police : ${item.police_name}`}
                  {item.has_nfc && (
                    <span className="text-[#00d4ff]"> · NFC</span>
                  )}
                </div>
                {item.gravure_text && (
                  <div className="text-xs text-zinc-400 italic mt-1">
                    Gravure : « {item.gravure_text} »
                  </div>
                )}
              </div>
              <div className="text-right tabular-nums whitespace-nowrap">
                <div className="text-white font-semibold">
                  {Number(item.line_total).toFixed(2)} €
                </div>
                <div className="text-xs text-zinc-500">
                  {Number(item.unit_price).toFixed(2)} € / unité
                </div>
              </div>
            </li>
          ))}
        </ul>

        <dl className="mt-5 pt-4 border-t border-white/10 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-zinc-400">Sous-total</dt>
            <dd className="text-white tabular-nums">
              {Number(order.subtotal).toFixed(2)} €
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-zinc-400">Livraison</dt>
            <dd className="text-white tabular-nums">
              {Number(order.shipping_fee) === 0 ? (
                <span className="text-[#00d4ff] font-semibold">Offerte</span>
              ) : (
                `${Number(order.shipping_fee).toFixed(2)} €`
              )}
            </dd>
          </div>
          <div className="border-t border-white/10 pt-2 flex items-center justify-between">
            <dt className="text-white font-semibold">Total payé</dt>
            <dd className="text-2xl font-bold text-white tabular-nums">
              {Number(order.total).toFixed(2)} €
            </dd>
          </div>
        </dl>
      </div>

      {/* Adresse de livraison */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-zinc-900/50 p-5 md:p-6">
        <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Icon icon="solar:map-point-linear" width={18} className="text-[#ff2d55]" />
          Livraison à
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed">
          <span className="text-white font-semibold">{order.customer_name}</span>
          <br />
          {order.shipping_address_line1}
          {order.shipping_address_line2 && (
            <>
              <br />
              {order.shipping_address_line2}
            </>
          )}
          <br />
          {order.shipping_zip} {order.shipping_city}
          <br />
          {order.shipping_country}
        </p>
        {isPaid && (
          <p className="mt-3 text-xs text-zinc-500">
            <Icon
              icon="solar:clock-circle-linear"
              width={14}
              className="inline -mt-0.5 mr-1 text-[#00d4ff]"
            />
            Délai de production estimé : 5 à 7 jours ouvrés.
          </p>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/boutique"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-bold hover:shadow-[0_0_30px_rgba(255,45,85,0.4)] transition-all"
        >
          <Icon icon="solar:shop-linear" width={18} />
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}
