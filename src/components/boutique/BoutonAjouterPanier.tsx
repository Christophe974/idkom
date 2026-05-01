'use client';

import { Icon } from '@iconify/react';
import { useState } from 'react';

interface Props {
  onClick: () => void | Promise<void>;
  disabled?: boolean;
  /** Texte secondaire (prix total ou hint) */
  hint?: string;
  label?: string;
}

export default function BoutonAjouterPanier({
  onClick,
  disabled,
  hint,
  label = 'Ajouter au panier',
}: Props) {
  const [pulsing, setPulsing] = useState(false);

  const handleClick = async () => {
    if (disabled) return;
    setPulsing(true);
    try {
      await onClick();
    } finally {
      setTimeout(() => setPulsing(false), 600);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`relative w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white text-base shadow-lg transition-all overflow-hidden
        bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff]
        hover:shadow-[0_0_30px_rgba(255,45,85,0.4)] hover:scale-[1.02]
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
    >
      {pulsing && (
        <span className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />
      )}
      <Icon icon="solar:cart-plus-linear" width={20} />
      <span>{label}</span>
      {hint && <span className="ml-2 text-sm opacity-80">· {hint}</span>}
    </button>
  );
}
