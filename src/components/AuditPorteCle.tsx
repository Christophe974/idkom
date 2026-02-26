'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

interface AuditPorteCleProps {
  token: string;
}

export default function AuditPorteCle({ token }: AuditPorteCleProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_URL}/porte-cle.php?action=claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), qr_token: token }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  if (status === 'success') {
    return (
      <div className="mb-14">
        <div className="relative bg-gradient-to-br from-emerald-500/10 via-[#00d4ff]/5 to-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 md:p-10 max-w-2xl mx-auto text-center overflow-hidden">
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 flex items-center justify-center mx-auto mb-5">
              <Icon icon="solar:check-circle-linear" width={36} className="text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Email envoy&eacute; !
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              Consultez votre bo&icirc;te mail <span className="text-white font-medium">{email}</span> pour activer votre porte-cl&eacute; digital.
              Vous pourrez cr&eacute;er votre carte de visite en quelques clics.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-14">
      <div className="relative bg-gradient-to-br from-[#00d4ff]/8 via-[#7928ca]/5 to-[#00d4ff]/8 border border-[#00d4ff]/20 rounded-2xl p-8 md:p-10 max-w-2xl mx-auto overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-[#00d4ff]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-[#7928ca]/10 rounded-full blur-3xl" />

        <div className="relative text-center">
          {/* Icon cadeau */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-[#7928ca]/20 flex items-center justify-center mx-auto mb-5">
            <Icon icon="solar:gift-linear" width={32} className="text-[#00d4ff]" />
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            Votre porte-cl&eacute; cache un super pouvoir
          </h3>
          <p className="text-zinc-400 mb-6 leading-relaxed max-w-lg mx-auto">
            Transformez le QR code de votre porte-cl&eacute; en <span className="text-[#00d4ff] font-medium">carte de visite digitale</span> gratuite,
            ou faites-le pointer vers <span className="text-[#00d4ff] font-medium">votre site internet</span>. Un cadeau utile, offert par iDkom.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Icon
                icon="solar:letter-linear"
                width={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="w-full pl-10 pr-4 py-3.5 bg-zinc-900/80 border border-zinc-700/50 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/25 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3.5 bg-gradient-to-r from-[#00d4ff] to-[#7928ca] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Icon icon="solar:refresh-linear" width={18} className="animate-spin" />
                  Envoi...
                </>
              ) : (
                <>
                  <Icon icon="solar:magic-stick-3-linear" width={18} />
                  Activer
                </>
              )}
            </button>
          </form>

          {status === 'error' && (
            <p className="mt-3 text-red-400 text-sm flex items-center justify-center gap-1.5">
              <Icon icon="solar:danger-circle-linear" width={16} />
              {errorMsg}
            </p>
          )}

          <p className="mt-4 text-zinc-600 text-xs">
            Gratuit et sans engagement. Vous recevrez un email pour finaliser l&apos;activation.
          </p>
        </div>
      </div>
    </div>
  );
}
