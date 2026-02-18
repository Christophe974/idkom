'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function PropositionAccessCode({ slug }: { slug: string }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setError(false);
    router.push(`/p/${slug}?code=${encodeURIComponent(code.trim())}`);
  };

  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm text-center">
          <div className="w-16 h-16 rounded-full bg-[#7928ca]/10 flex items-center justify-center mx-auto mb-6">
            <Icon icon="solar:lock-keyhole-linear" className="text-[#7928ca]" width={32} />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">Accès protégé</h1>
          <p className="text-zinc-400 mb-8">
            Cette proposition est protégée par un code d&apos;accès.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code d'accès"
              maxLength={10}
              autoFocus
              className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white text-center text-lg tracking-widest font-mono focus:outline-none focus:border-[#7928ca] transition-colors ${
                error ? 'border-red-500' : 'border-zinc-700'
              }`}
            />
            {error && (
              <p className="text-red-400 text-sm">Code incorrect. Veuillez réessayer.</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Accéder à la proposition
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
