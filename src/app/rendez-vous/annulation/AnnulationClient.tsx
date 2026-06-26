'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { cancelBooking } from '@/lib/api';

export default function AnnulationClient({ token }: { token: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>(token ? 'idle' : 'error');
  const [message, setMessage] = useState(token ? '' : 'Lien d’annulation invalide.');

  const cancel = async () => {
    setState('loading');
    try {
      const res = await cancelBooking(token);
      setMessage(res.message);
      setState('done');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Une erreur est survenue.');
      setState('error');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 bg-zinc-950">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
        <div className="h-1 -mx-8 -mt-8 mb-8 rounded-t-2xl bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff]" />

        {state === 'done' ? (
          <>
            <Icon icon="solar:check-circle-bold" className="mx-auto mb-4 text-green-400" width={56} />
            <h1 className="text-2xl font-bold text-white mb-2">Rendez-vous annulé</h1>
            <p className="text-zinc-400">{message}</p>
          </>
        ) : state === 'error' ? (
          <>
            <Icon icon="solar:close-circle-bold" className="mx-auto mb-4 text-red-400" width={56} />
            <h1 className="text-2xl font-bold text-white mb-2">Oups</h1>
            <p className="text-zinc-400">{message}</p>
          </>
        ) : (
          <>
            <Icon icon="solar:calendar-mark-linear" className="mx-auto mb-4 text-[#7928ca]" width={56} />
            <h1 className="text-2xl font-bold text-white mb-2">Annuler votre rendez-vous ?</h1>
            <p className="text-zinc-400 mb-6">Confirmez l’annulation ci-dessous. Cette action est définitive.</p>
            <button
              onClick={cancel}
              disabled={state === 'loading'}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#ff2d55] to-[#7928ca] disabled:opacity-50"
            >
              <Icon icon={state === 'loading' ? 'svg-spinners:ring-resize' : 'solar:trash-bin-trash-linear'} width={18} />
              {state === 'loading' ? 'Annulation…' : 'Confirmer l’annulation'}
            </button>
          </>
        )}

        <div className="mt-8 pt-6 border-t border-zinc-800">
          <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors">← Retour à l’accueil</Link>
        </div>
      </div>
    </main>
  );
}
