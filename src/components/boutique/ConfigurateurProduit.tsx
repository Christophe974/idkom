'use client';

import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { useCart } from '@/lib/boutique/store';
import type { ProduitDetail } from '@/lib/boutique/types';
import SVGPreview from './SVGPreview';
import SelecteurForme from './SelecteurForme';
import SelecteurCouleur from './SelecteurCouleur';
import SelecteurPolice from './SelecteurPolice';
import ChampGravure from './ChampGravure';
import ToggleNFC from './ToggleNFC';
import BoutonAjouterPanier from './BoutonAjouterPanier';

interface Props {
  produit: ProduitDetail;
}

/**
 * Orchestre l'état de configuration et l'aperçu live d'un produit.
 * Server (la page produit) charge la donnée — ce composant gère le state.
 */
export default function ConfigurateurProduit({ produit }: Props) {
  const formes = useMemo(() => produit.formes ?? [], [produit.formes]);
  const couleurs = useMemo(() => produit.couleurs ?? [], [produit.couleurs]);
  const polices = useMemo(() => produit.polices ?? [], [produit.polices]);

  const [formeSlug, setFormeSlug] = useState(formes[0]?.slug ?? '');
  const [couleurSlug, setCouleurSlug] = useState(couleurs[0]?.slug ?? '');
  const [policeSlug, setPoliceSlug] = useState(polices[0]?.slug ?? '');
  const [gravureText, setGravureText] = useState('');
  const [hasNfc, setHasNfc] = useState(produit.has_nfc_option);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const addItem = useCart((s) => s.addItem);

  const forme = useMemo(
    () => formes.find((f) => f.slug === formeSlug) ?? formes[0],
    [formes, formeSlug],
  );
  const couleur = useMemo(
    () => couleurs.find((c) => c.slug === couleurSlug) ?? couleurs[0],
    [couleurs, couleurSlug],
  );
  const police = useMemo(
    () => polices.find((p) => p.slug === policeSlug) ?? polices[0],
    [polices, policeSlug],
  );

  // Recalcul prix unitaire (preview seulement — serveur ré-autoritatif au checkout)
  const unitPrice = useMemo(() => {
    const base = Number(produit.base_price) || 0;
    const nfc = hasNfc ? Number(produit.nfc_extra_price) || 0 : 0;
    const couleurExtra = couleur ? Number(couleur.extra_price) || 0 : 0;
    return base + nfc + couleurExtra;
  }, [produit.base_price, produit.nfc_extra_price, hasNfc, couleur]);

  const totalPrice = unitPrice * quantity;

  // Toast auto-fade
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const canAdd = !!forme && !!couleur && !!police && quantity >= 1;

  const handleAdd = () => {
    if (!forme || !couleur || !police) return;
    addItem({
      produit_slug: produit.slug,
      produit_name: produit.name,
      produit_image: produit.image,
      forme_slug: forme.slug,
      forme_name: forme.name,
      forme_template: forme.svg_template,
      couleur_slug: couleur.slug,
      couleur_name: couleur.name,
      couleur_hex: couleur.hex_code,
      police_slug: police.slug,
      police_name: police.name,
      police_font_family: police.font_family,
      police_font_url: police.font_url,
      gravure_text: gravureText.trim(),
      has_nfc: hasNfc,
      quantity,
      unit_price: unitPrice,
      category_slug: produit.category?.slug ?? '',
    });
    setToast('Ajouté au panier');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!forme || !couleur || !police) {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-amber-200 text-sm">
        Ce produit n&apos;est pas configurable pour le moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Colonne gauche : preview sticky */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SVGPreview
          formeTemplate={forme.svg_template}
          couleurHex={couleur.hex_code}
          policeFontFamily={police.font_family}
          policeFontUrl={police.font_url}
          gravureText={gravureText || produit.name}
          hasNfc={hasNfc}
          alt={`${produit.name} - ${forme.name} ${couleur.name}`}
        />
        <p className="text-center text-xs text-zinc-500 mt-3">
          Aperçu indicatif — la gravure réelle peut varier selon la forme.
        </p>
      </div>

      {/* Colonne droite : sélecteurs */}
      <div className="space-y-6">
        <header>
          <p className="text-xs uppercase tracking-wider text-[#ff2d55] font-semibold">
            {produit.category?.name}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">
            {produit.name}
          </h1>
          {produit.description && (
            <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
              {produit.description}
            </p>
          )}
        </header>

        <SelecteurForme
          formes={formes}
          value={formeSlug}
          onChange={setFormeSlug}
          previewColor={couleur.hex_code}
        />

        <SelecteurCouleur
          couleurs={couleurs}
          value={couleurSlug}
          onChange={setCouleurSlug}
        />

        <SelecteurPolice
          polices={polices}
          value={policeSlug}
          onChange={setPoliceSlug}
        />

        <ChampGravure
          value={gravureText}
          onChange={setGravureText}
          maxLength={50}
          placeholder={produit.name}
        />

        <ToggleNFC
          value={hasNfc}
          onChange={setHasNfc}
          extraPrice={Number(produit.nfc_extra_price) || 0}
          available={produit.has_nfc_option}
        />

        {/* Quantité + récap prix */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-white block mb-2">
              Quantité
            </span>
            <div className="inline-flex items-center rounded-lg border border-white/10 bg-zinc-950">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="px-3 py-1.5 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
                aria-label="Diminuer la quantité"
              >
                <Icon icon="solar:minus-square-linear" width={20} />
              </button>
              <span className="px-4 py-1.5 text-base font-bold text-white tabular-nums min-w-[3ch] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                disabled={quantity >= 99}
                className="px-3 py-1.5 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
                aria-label="Augmenter la quantité"
              >
                <Icon icon="solar:add-square-linear" width={20} />
              </button>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-zinc-500">Total</span>
            <div className="text-2xl font-bold text-white tabular-nums">
              {totalPrice.toFixed(2)} €
            </div>
            {quantity > 1 && (
              <span className="text-xs text-zinc-500 tabular-nums">
                ({unitPrice.toFixed(2)} € l&apos;unité)
              </span>
            )}
          </div>
        </div>

        <BoutonAjouterPanier
          onClick={handleAdd}
          disabled={!canAdd}
          hint={`${totalPrice.toFixed(2)} €`}
        />

        {/* Toast confirmation */}
        {toast && (
          <div
            role="status"
            aria-live="polite"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-semibold shadow-2xl animate-fade-in-up"
          >
            <Icon icon="solar:check-circle-bold" width={18} />
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
