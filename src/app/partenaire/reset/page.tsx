'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

function ResetForm() {
  const searchParams = useSearchParams();
  const resetToken = searchParams.get('token');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // If no token: show "request reset" form (email only)
  // If token present: show "new password" form
  const hasToken = !!resetToken;

  async function handleRequestReset(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/partner-auth.php?action=forgot_password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error?.message || json.error || 'Erreur lors de l\'envoi');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
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
      const res = await fetch(`${API_URL}/partner-auth.php?action=reset_password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, password }),
      });
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error?.message || json.error || 'Erreur lors de la reinitialisation');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 text-center backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <Icon icon="solar:check-circle-bold" width={28} className="text-green-400" />
            </div>
            {hasToken ? (
              <>
                <h2 className="text-xl font-semibold text-white mb-2">Mot de passe reinitialise</h2>
                <p className="text-zinc-500 text-sm mb-6">
                  Votre mot de passe a ete modifie avec succes. Vous pouvez maintenant vous connecter.
                </p>
                <Link
                  href="/partenaire/connexion"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl px-6 py-3 text-sm font-semibold hover:opacity-90 transition-all"
                >
                  <Icon icon="solar:login-2-bold" width={18} />
                  Se connecter
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-white mb-2">Email envoye</h2>
                <p className="text-zinc-500 text-sm mb-6">
                  Si un compte existe avec cette adresse email, vous recevrez un lien de reinitialisation.
                </p>
                <Link
                  href="/partenaire/connexion"
                  className="text-sm text-zinc-400 hover:text-pink-400 transition-colors"
                >
                  Retour a la connexion
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

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
              <Icon icon="solar:lock-keyhole-unlocked-bold" width={28} className="text-pink-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              {hasToken ? 'Nouveau mot de passe' : 'Mot de passe oublie'}
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              {hasToken
                ? 'Choisissez votre nouveau mot de passe'
                : 'Entrez votre email pour recevoir un lien de reinitialisation'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
              <Icon icon="solar:danger-triangle-bold" width={18} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {hasToken ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-zinc-400 mb-1.5">
                  Nouveau mot de passe
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
                    Reinitialisation...
                  </>
                ) : (
                  <>
                    <Icon icon="solar:check-circle-bold" width={18} />
                    Reinitialiser le mot de passe
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Icon
                    icon="solar:letter-bold"
                    width={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="votre@email.com"
                    className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl pl-11 pr-4 py-3 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all"
                  />
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
                    Envoi...
                  </>
                ) : (
                  <>
                    <Icon icon="solar:letter-bold" width={18} />
                    Envoyer le lien
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-4 text-center">
            <Link
              href="/partenaire/connexion"
              className="text-sm text-zinc-500 hover:text-pink-400 transition-colors inline-flex items-center gap-1"
            >
              <Icon icon="solar:arrow-left-linear" width={14} />
              Retour a la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PartnerResetPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <Icon icon="solar:spinner-bold" width={32} className="animate-spin text-pink-500" />
        </div>
      }
    >
      <ResetForm />
    </Suspense>
  );
}
