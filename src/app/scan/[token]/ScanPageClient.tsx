'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

interface PartnerInfo {
  name: string;
  logo: string | null;
  color_primary: string;
  color_secondary: string;
  agency: string | null;
  welcome_text: string | null;
}

interface ScanInfo {
  is_claimed: boolean;
  is_activated: boolean;
  partner: PartnerInfo | null;
}

interface Props {
  token: string;
}

export default function ScanPageClient({ token }: Props) {
  const [scanInfo, setScanInfo] = useState<ScanInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/porte-cle.php?action=scan_info&token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setScanInfo(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  async function handleClaim(e: React.FormEvent) {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/porte-cle.php?action=claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, qr_token: token }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error?.message || 'Une erreur est survenue');
      }
    } catch {
      setError('Erreur de connexion');
    } finally {
      setSubmitting(false);
    }
  }

  const partner = scanInfo?.partner;
  const accent = partner?.color_primary || '#3b82f6';
  const accentSecondary = partner?.color_secondary || '#7928ca';

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#09090b' }}>
        <div className="w-8 h-8 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Already claimed
  if (scanInfo?.is_claimed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#09090b' }}>
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h1 className="text-white text-xl font-bold mb-2">Porte-clé déjà activé</h1>
          <p className="text-zinc-400 text-sm mb-6">
            Ce porte-clé a déjà été réclamé. Connectez-vous à votre espace pour gérer votre carte.
          </p>
          <a
            href={`${API_URL}/mon-porte-cle/`}
            className="inline-block px-6 py-3 rounded-xl text-white font-medium text-sm"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accentSecondary})` }}
          >
            Accéder à mon espace
          </a>
        </div>
      </div>
    );
  }

  // Success - email sent
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#09090b' }}>
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[120px]"
            style={{ background: accent, top: '20%', right: '-10%' }} />
        </div>
        <div className="relative z-10 text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-green-400">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          <h1 className="text-white text-xl font-bold mb-2">Vérifiez votre email !</h1>
          <p className="text-zinc-400 text-sm mb-2">
            Un email d&apos;activation a été envoyé à :
          </p>
          <p className="text-white font-medium mb-6">{email}</p>
          <p className="text-zinc-500 text-xs">
            Cliquez sur le lien dans l&apos;email pour créer votre mot de passe et personnaliser votre carte de visite.
          </p>
        </div>
      </div>
    );
  }

  // Main onboarding form
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#09090b' }}>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[120px]"
          style={{ background: accent, top: '-10%', right: '-15%' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{ background: `linear-gradient(135deg, ${accentSecondary}, ${accent})`, bottom: '-5%', left: '-10%' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-sm">

          {/* Card */}
          <div
            className="rounded-3xl border border-white/10 overflow-hidden"
            style={{ background: 'rgba(24, 24, 27, 0.85)', backdropFilter: 'blur(40px)' }}
          >
            {/* Top gradient bar */}
            <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${accent}, ${accentSecondary})` }} />

            <div className="p-8">
              {/* Partner branding */}
              {partner && (
                <div className="text-center mb-6">
                  {partner.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12 mx-auto mb-4 object-contain"
                    />
                  ) : (
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold"
                      style={{ background: `linear-gradient(135deg, ${accent}, ${accentSecondary})` }}
                    >
                      {partner.name.charAt(0)}
                    </div>
                  )}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
                    style={{ background: `${accent}15`, color: accent }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h14v2H5zm0-4h14v2H5zm0-4h14v2H5z" />
                    </svg>
                    Carte de visite digitale offerte
                  </div>
                </div>
              )}

              {/* Welcome message */}
              <div className="text-center mb-6">
                <h1 className="text-white text-lg font-bold mb-2">
                  {partner
                    ? `${partner.name} vous offre votre carte de visite digitale`
                    : 'Activez votre porte-clé iDkom'
                  }
                </h1>
                {partner?.agency && (
                  <p className="text-zinc-500 text-sm mb-2">{partner.agency}</p>
                )}
                <p className="text-zinc-400 text-sm">
                  {partner?.welcome_text || 'Transformez ce porte-clé en carte de visite digitale. Partagez vos coordonnées d\'un simple scan NFC.'}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {[
                  { icon: 'M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75T4.05 3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.35-.025.625T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3', label: 'Partagez votre numéro, email, adresse' },
                  { icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39', label: 'Lien vers votre site web et réseaux' },
                  { icon: 'M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m-9-2V7H4v3H1v2h3v3h2v-3h3v-2zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4', label: 'Enregistrement contact en un tap' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${accent}15` }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: accent }}>
                        <path d={item.icon} />
                      </svg>
                    </div>
                    <p className="text-zinc-400 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Claim form */}
              <form onSubmit={handleClaim} className="space-y-3">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-white/20 transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                  style={{
                    background: `linear-gradient(135deg, ${accent}, ${accentSecondary})`,
                    boxShadow: `0 6px 25px ${accent}30`,
                  }}
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      Activer mon porte-clé
                    </>
                  )}
                </button>
              </form>

              <p className="text-zinc-600 text-[11px] text-center mt-4">
                Un email de confirmation vous sera envoyé pour créer votre mot de passe.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <a
              href="https://www.idkom.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-zinc-600 text-xs hover:text-zinc-400 transition-colors"
            >
              Propulsé par
              <Image
                src="/images/logo-white.svg"
                alt="iDkom"
                width={50}
                height={16}
                className="h-3.5 w-auto opacity-40"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
