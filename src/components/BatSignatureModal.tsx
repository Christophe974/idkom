'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { signBat, type BatPublic } from '@/lib/api';
import BatSignaturePad, { type BatSignaturePadHandle } from './BatSignaturePad';

interface Props {
  bat: BatPublic;
  isOpen: boolean;
  onClose: () => void;
  onSigned: () => void;
}

export default function BatSignatureModal({ bat, isOpen, onClose, onSigned }: Props) {
  const padRef = useRef<BatSignaturePadHandle>(null);
  const [signerName, setSignerName] = useState(bat.client.contact_name);
  const [signerEmail, setSignerEmail] = useState('');
  const [signerRole, setSignerRole] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [padIsEmpty, setPadIsEmpty] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // NB : pas de reset explicite. Le `return null` ci-dessous demonte
  // le composant a la fermeture, le prochain `isOpen=true` le re-montera
  // avec les valeurs initiales fraiches.
  if (!isOpen) return null;

  const canSubmit =
    !padIsEmpty &&
    signerName.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signerEmail) &&
    acceptedTerms &&
    !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const dataUrl = padRef.current?.getDataURL();
    if (!dataUrl) {
      setError('Veuillez signer dans la zone prevue.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await signBat(bat.token, {
        signer_name: signerName.trim(),
        signer_email: signerEmail.trim(),
        signer_role: signerRole.trim() || null,
        signature_data: dataUrl,
        accepted_terms: acceptedTerms,
      });
      onSigned();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md overflow-y-auto">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff2d55] via-[#7928ca] to-[#00d4ff] flex items-center justify-center">
              <Icon icon="solar:pen-new-square-bold" width={18} className="text-white" />
            </div>
            <span className="text-white font-semibold">Signer le BAT</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-40"
            aria-label="Fermer"
          >
            <Icon icon="solar:close-circle-linear" width={26} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Recap du BAT */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Vous etes sur le point de valider</p>
          <p className="text-white font-semibold text-lg mb-1">{bat.title}</p>
          <p className="text-zinc-400 text-sm">
            pour <span className="text-zinc-200">{bat.client.company}</span>
            {bat.current_version > 1 && (
              <span className="text-[#7928ca]"> &middot; version {bat.current_version}</span>
            )}
            <span className="text-zinc-600"> &middot; {bat.visuals.length} maquette{bat.visuals.length > 1 ? 's' : ''}</span>
          </p>
        </div>

        {/* Identite signataire */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Icon icon="solar:user-circle-linear" width={20} className="text-[#7928ca]" />
            Vos informations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-zinc-400 mb-1.5">
                Nom complet <span className="text-[#ff2d55]">*</span>
              </label>
              <input
                type="text"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                required
                disabled={submitting}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#7928ca] disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">
                Email <span className="text-[#ff2d55]">*</span>
              </label>
              <input
                type="email"
                value={signerEmail}
                onChange={(e) => setSignerEmail(e.target.value)}
                required
                disabled={submitting}
                placeholder="vous@exemple.com"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#7928ca] disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">
                Fonction <span className="text-zinc-600">(optionnel)</span>
              </label>
              <input
                type="text"
                value={signerRole}
                onChange={(e) => setSignerRole(e.target.value)}
                disabled={submitting}
                placeholder="Directeur Marketing"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#7928ca] disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Signature pad */}
        <div>
          <h3 className="text-white font-semibold flex items-center gap-2 mb-3">
            <Icon icon="solar:pen-new-square-linear" width={20} className="text-[#7928ca]" />
            Votre signature <span className="text-[#ff2d55]">*</span>
          </h3>
          <BatSignaturePad ref={padRef} onChange={(empty) => setPadIsEmpty(empty)} />
        </div>

        {/* Acceptation */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            disabled={submitting}
            className="mt-1 w-5 h-5 rounded bg-zinc-800 border-zinc-700 text-[#7928ca] focus:ring-[#7928ca] disabled:opacity-50"
          />
          <span className="text-sm text-zinc-300 leading-relaxed">
            Je valide ce BAT et autorise iDkom a lancer la production des maquettes presentees.
            Cette signature electronique fait foi conformement aux articles 1366 et 1367 du Code civil.
          </span>
        </label>

        {/* Erreur */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl px-4 py-3 text-sm flex items-start gap-2">
            <Icon icon="solar:danger-triangle-linear" width={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-6 py-4 bg-zinc-800 text-white font-medium rounded-xl hover:bg-zinc-700 transition-colors disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Icon icon="solar:refresh-linear" width={20} className="animate-spin" />
                Validation en cours...
              </>
            ) : (
              <>
                <Icon icon="solar:check-circle-bold" width={20} />
                Confirmer ma signature
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-zinc-600 text-center pt-2">
          Une copie de la confirmation vous sera envoyee a l&apos;adresse fournie.
        </p>
      </form>
    </div>
  );
}
