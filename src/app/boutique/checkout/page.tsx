'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { useCart, useHasMounted } from '@/lib/boutique/store';
import { createCheckoutSession } from '@/lib/boutique/api';
import { getSettings } from '@/lib/api';
import type { CustomerInfo } from '@/lib/boutique/types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ZIP_FR_RE = /^\d{5}$/;

export default function CheckoutPage() {
  const router = useRouter();
  const mounted = useHasMounted();
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());

  const [shipping, setShipping] = useState({ fee: 3.9, freeThreshold: 25 });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptCgv, setAcceptCgv] = useState(false);

  const [form, setForm] = useState<CustomerInfo>({
    email: '',
    name: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    zip: '',
    city: '',
    country: 'FR',
  });

  useEffect(() => {
    getSettings('boutique')
      .then((s) => {
        const fee = Number(s.shipping_fee);
        const free = Number(s.shipping_free_threshold);
        setShipping({
          fee: Number.isFinite(fee) ? fee : 3.9,
          freeThreshold: Number.isFinite(free) ? free : 25,
        });
      })
      .catch(() => undefined);
  }, []);

  // Si pas d'items, on redirige doucement
  useEffect(() => {
    if (mounted && items.length === 0 && !submitting) {
      router.replace('/boutique/panier');
    }
  }, [mounted, items.length, submitting, router]);

  const shippingFee =
    shipping.freeThreshold > 0 && subtotal >= shipping.freeThreshold
      ? 0
      : shipping.fee;
  const total = subtotal + shippingFee;

  const validation = useMemo(() => {
    const errs: string[] = [];
    if (!form.email || !EMAIL_RE.test(form.email)) {
      errs.push("Email invalide.");
    }
    if (!form.name.trim()) errs.push('Nom complet requis.');
    if (!form.address_line1.trim()) errs.push('Adresse requise.');
    if (!form.zip || !ZIP_FR_RE.test(form.zip)) {
      errs.push('Code postal FR (5 chiffres) requis.');
    }
    if (!form.city.trim()) errs.push('Ville requise.');
    if (!acceptCgv) errs.push('Tu dois accepter les CGV.');
    return errs;
  }, [form, acceptCgv]);

  const canSubmit = validation.length === 0 && items.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      setError(validation[0] ?? 'Formulaire incomplet.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        items: items.map((i) => ({
          produit_slug: i.produit_slug,
          forme_slug: i.forme_slug,
          couleur_slug: i.couleur_slug,
          police_slug: i.police_slug,
          gravure_text: i.gravure_text,
          has_nfc: i.has_nfc,
          quantity: i.quantity,
        })),
        customer: {
          ...form,
          email: form.email.trim().toLowerCase(),
          name: form.name.trim(),
          phone: form.phone?.trim() || undefined,
          address_line1: form.address_line1.trim(),
          address_line2: form.address_line2?.trim() || undefined,
          zip: form.zip.trim(),
          city: form.city.trim(),
          country: form.country || 'FR',
        },
      };
      const result = await createCheckoutSession(payload);
      // Redirect vers Stripe Checkout
      if (typeof window !== 'undefined' && result.url) {
        window.location.href = result.url;
        return;
      }
      throw new Error("Réponse Stripe invalide.");
    } catch (e) {
      setError(
        (e as Error).message ||
          "Impossible de lancer le paiement. Réessaie dans un instant.",
      );
      setSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="h-8 w-40 rounded bg-zinc-900 animate-pulse mb-6" />
        <div className="h-96 rounded-2xl bg-zinc-900 animate-pulse" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 text-center text-zinc-400">
        Redirection vers le panier…
      </div>
    );
  }

  const setField = <K extends keyof CustomerInfo>(
    key: K,
    value: CustomerInfo[K],
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      <Link
        href="/boutique/panier"
        prefetch={false}
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white mb-6"
      >
        <Icon icon="solar:arrow-left-linear" width={14} />
        Retour au panier
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Tes informations
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form
          id="checkout-form"
          onSubmit={handleSubmit}
          className="lg:col-span-2 space-y-5"
        >
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200 text-sm flex items-start gap-2">
              <Icon
                icon="solar:danger-triangle-linear"
                width={18}
                className="flex-shrink-0 mt-0.5"
              />
              <span>{error}</span>
            </div>
          )}

          <FieldSet title="Contact">
            <Field
              label="Email"
              required
              type="email"
              value={form.email}
              onChange={(v) => setField('email', v)}
              placeholder="toi@exemple.fr"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Nom complet"
                required
                value={form.name}
                onChange={(v) => setField('name', v)}
                placeholder="Camille Dupont"
              />
              <Field
                label="Téléphone (optionnel)"
                type="tel"
                value={form.phone || ''}
                onChange={(v) => setField('phone', v)}
                placeholder="06 12 34 56 78"
              />
            </div>
          </FieldSet>

          <FieldSet title="Adresse de livraison">
            <Field
              label="Adresse"
              required
              value={form.address_line1}
              onChange={(v) => setField('address_line1', v)}
              placeholder="12 rue des Lilas"
            />
            <Field
              label="Complément (optionnel)"
              value={form.address_line2 || ''}
              onChange={(v) => setField('address_line2', v)}
              placeholder="Appartement, étage…"
            />
            <div className="grid grid-cols-3 gap-4">
              <Field
                label="Code postal"
                required
                inputMode="numeric"
                pattern="\d{5}"
                value={form.zip}
                onChange={(v) => setField('zip', v.replace(/\D/g, '').slice(0, 5))}
                placeholder="70400"
              />
              <div className="col-span-2">
                <Field
                  label="Ville"
                  required
                  value={form.city}
                  onChange={(v) => setField('city', v)}
                  placeholder="Brevilliers"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Pays
              </label>
              <select
                value={form.country}
                onChange={(e) => setField('country', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white focus:outline-none focus:border-[#ff2d55] focus:ring-2 focus:ring-[#ff2d55]/20"
              >
                <option value="FR">France</option>
              </select>
              <p className="text-xs text-zinc-500 mt-1">
                Livraison France métropolitaine uniquement pour le moment.
              </p>
            </div>
          </FieldSet>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptCgv}
              onChange={(e) => setAcceptCgv(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-white/20 bg-zinc-900 text-[#ff2d55] focus:ring-[#ff2d55]"
            />
            <span className="text-sm text-zinc-400">
              J&apos;accepte les{' '}
              <Link
                href="/mentions-legales"
                target="_blank"
                className="text-white underline hover:text-[#ff2d55]"
              >
                conditions générales de vente
              </Link>{' '}
              et la{' '}
              <Link
                href="/confidentialite"
                target="_blank"
                className="text-white underline hover:text-[#ff2d55]"
              >
                politique de confidentialité
              </Link>
              .
            </span>
          </label>
        </form>

        <aside className="lg:sticky lg:top-28 lg:self-start rounded-2xl border border-white/10 bg-zinc-900/60 p-5 space-y-4">
          <h2 className="text-lg font-bold text-white">Ta commande</h2>
          <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {items.map((i) => (
              <li
                key={i.id}
                className="flex items-start justify-between gap-3 text-sm pb-2 border-b border-white/5 last:border-0"
              >
                <div className="min-w-0">
                  <div className="text-white truncate">
                    {i.produit_name}{' '}
                    <span className="text-zinc-500">× {i.quantity}</span>
                  </div>
                  <div className="text-xs text-zinc-500 truncate">
                    {i.forme_name} · {i.couleur_name}
                    {i.has_nfc && ' · NFC'}
                  </div>
                </div>
                <div className="text-right text-white tabular-nums whitespace-nowrap">
                  {(i.unit_price * i.quantity).toFixed(2)} €
                </div>
              </li>
            ))}
          </ul>

          <dl className="space-y-2 text-sm pt-2 border-t border-white/10">
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
            <div className="border-t border-white/10 pt-2 flex items-center justify-between">
              <dt className="text-white font-semibold">Total</dt>
              <dd className="text-2xl font-bold text-white tabular-nums">
                {total.toFixed(2)} €
              </dd>
            </div>
          </dl>

          <button
            type="submit"
            form="checkout-form"
            disabled={!canSubmit || submitting}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-bold hover:shadow-[0_0_30px_rgba(255,45,85,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Icon icon="solar:refresh-linear" className="animate-spin" width={18} />
                Redirection…
              </>
            ) : (
              <>
                <Icon icon="solar:lock-keyhole-linear" width={18} />
                Payer {total.toFixed(2)} €
              </>
            )}
          </button>

          <p className="text-[11px] text-zinc-500 text-center">
            Paiement sécurisé via Stripe. Tu seras redirigé pour saisir ta
            carte bancaire.
          </p>
        </aside>
      </div>
    </div>
  );
}

function FieldSet({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5 space-y-4">
      <legend className="px-2 text-sm font-semibold text-white">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  inputMode?:
    | 'text'
    | 'email'
    | 'numeric'
    | 'tel'
    | 'decimal'
    | 'search'
    | 'url'
    | 'none';
  pattern?: string;
}

function Field({
  label,
  value,
  onChange,
  required,
  type = 'text',
  placeholder,
  inputMode,
  pattern,
}: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-white mb-2">
        {label}
        {required && <span className="text-[#ff2d55] ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        inputMode={inputMode}
        pattern={pattern}
        className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff2d55] focus:ring-2 focus:ring-[#ff2d55]/20 transition-all"
      />
    </div>
  );
}
