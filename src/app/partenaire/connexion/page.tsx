'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { usePartnerAuth } from '../PartnerAuthProvider';

export default function PartnerLoginPage() {
  const { login } = usePartnerAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
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
            <h2 className="text-xl font-semibold text-white">Espace Partenaire</h2>
            <p className="text-zinc-500 text-sm mt-1">Connectez-vous pour acceder a votre espace</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
              <Icon icon="solar:danger-triangle-bold" width={18} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Votre mot de passe"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Icon icon="solar:spinner-bold" width={18} className="animate-spin" />
                  Connexion...
                </>
              ) : (
                <>
                  <Icon icon="solar:login-2-bold" width={18} />
                  Se connecter
                </>
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/partenaire/reset"
              className="text-sm text-zinc-500 hover:text-pink-400 transition-colors"
            >
              Mot de passe oublie ?
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-700 text-xs mt-6">
          Propulse par{' '}
          <a href="https://www.idkom.fr" className="text-zinc-500 hover:text-pink-400 transition-colors">
            iDkom
          </a>
        </p>
      </div>
    </div>
  );
}
