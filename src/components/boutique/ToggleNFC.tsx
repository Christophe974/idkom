'use client';

import { Icon } from '@iconify/react';

interface Props {
  value: boolean;
  onChange: (next: boolean) => void;
  extraPrice?: number;
  /** false si le produit ne propose pas l'option NFC */
  available?: boolean;
}

export default function ToggleNFC({
  value,
  onChange,
  extraPrice = 0,
  available = true,
}: Props) {
  if (!available) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-4">
      <div className="flex items-start gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={value}
          onClick={() => onChange(!value)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 mt-0.5 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
            value
              ? 'bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff]'
              : 'bg-zinc-700'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition ${
              value ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-white">
              Activer la puce NFC
            </span>
            {extraPrice > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#7928ca]/20 text-[#a78bfa]">
                +{extraPrice.toFixed(2)} €
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-zinc-400 flex items-start gap-1.5">
            <Icon
              icon="solar:info-circle-linear"
              className="text-[#00d4ff] flex-shrink-0 mt-0.5"
              width={14}
            />
            <span>
              Programmable depuis ton téléphone après réception : carte de
              visite digitale, lien direct, contact, paiement…
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
