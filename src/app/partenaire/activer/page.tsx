'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

function ActivateForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activationToken = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!activationToken) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 text-center max-w-md w-full">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <Icon icon="solar:danger-triangle-bold" width={28} className="text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Lien invalide</h2>
          <p className="text-zinc-500 text-sm">
            Ce lien d&apos;activation est invalide ou a expire. Contactez iDkom pour obtenir un nouveau lien.
          </p>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/partner-auth.php?action=activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: activationToken, password, password_confirm: confirmPassword }),
      });
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error?.message || json.error || 'Erreur lors de l\'activation');
      }

      // Store the JWT and redirect
      localStorage.setItem('partner_token', json.data.token);
      router.replace('/partenaire');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  const passwordStrength = password.length === 0 ? 0 : password.length < 8 ? 1 : password.length < 12 ? 2 : 3;
  const strengthLabels = ['', 'Faible', 'Correct', 'Fort'];
  const strengthColors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'];

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              IDKOM
            </span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1">L&apos;Atelier Phygital</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 backdrop-blur-xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4">
              <Icon icon="solar:key-bold" width={28} className="text-pink-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Bienvenue !</h2>
            <p className="text-zinc-500 text-sm mt-1">
              Choisissez un mot de passe pour activer votre espace partenaire
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
              <Icon icon="solar:danger-triangle-bold" width={18} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-400 mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <Icon
                  icon="solar:lock-keyhole-bold"
                  width={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Minimum 8 caracteres"
                  className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl pl-11 pr-11 py-3 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <Icon icon={showPassword ? 'solar:eye-closed-bold' : 'solar:eye-bold'} width={18} />
                </button>
              </div>
              {/* Password strength bar */}
              {password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1 rounded-full bg-zinc-800 overflow-hidden flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`flex-1 h-full rounded-full transition-all duration-300 ${
                          passwordStrength >= level ? strengthColors[passwordStrength] : 'bg-zinc-800'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500">{strengthLabels[passwordStrength]}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-zinc-400 mb-1.5">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Icon
                  icon="solar:lock-keyhole-bold"
                  width={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  id="confirm"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirmez votre mot de passe"
                  className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl pl-11 pr-4 py-3 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all"
                />
                {confirmPassword.length > 0 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {password === confirmPassword ? (
                      <Icon icon="solar:check-circle-bold" width={18} className="text-green-400" />
                    ) : (
                      <Icon icon="solar:close-circle-bold" width={18} className="text-red-400" />
                    )}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Icon icon="solar:spinner-bold" width={18} className="animate-spin" />
                  Activation...
                </>
              ) : (
                <>
                  <Icon icon="solar:check-circle-bold" width={18} />
                  Activer mon espace
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function PartnerActivatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <Icon icon="solar:spinner-bold" width={32} className="animate-spin text-pink-500" />
        </div>
      }
    >
      <ActivateForm />
    </Suspense>
  );
}
