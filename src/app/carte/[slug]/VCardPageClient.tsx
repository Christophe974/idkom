'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import type { VCardData } from '@/lib/api';
import { downloadVcf } from './generateVcf';
import QRCode from './QRCode';

interface Props {
  card: VCardData;
}

export default function VCardPageClient({ card }: Props) {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const fullName = `${card.first_name} ${card.last_name}`;
  const accent = card.accent_color || '#ff2d55';
  const pageUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://idkom.vercel.app/carte/${card.slug}`;

  function handleDownload() {
    downloadVcf(card);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${fullName} - ${card.company}`,
          text: `Carte de visite de ${fullName}`,
          url: pageUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const googleMapsUrl = card.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.address)}`
    : null;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#09090b' }}>
      {/* Animated mesh gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: accent,
            top: '-10%',
            right: '-10%',
            animation: 'meshFloat1 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
          style={{
            background: `linear-gradient(135deg, ${accent}, #7928ca)`,
            bottom: '-5%',
            left: '-10%',
            animation: 'meshFloat2 10s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]"
          style={{
            background: '#00d4ff',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'meshFloat3 12s ease-in-out infinite',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Glass card */}
        <div className="w-full max-w-md">

          {/* Main card */}
          <div
            className="rounded-3xl border border-white/10 p-8 animate-fade-in-up"
            style={{
              background: 'rgba(24, 24, 27, 0.8)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
            }}
          >
            {/* Photo */}
            <div className="flex justify-center mb-6 animate-fade-in-up delay-100">
              <div className="relative">
                <div
                  className="w-28 h-28 rounded-full overflow-hidden border-[3px] p-[2px]"
                  style={{
                    borderColor: accent,
                    boxShadow: `0 0 40px ${accent}33`,
                  }}
                >
                  {card.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={card.photo}
                      alt={fullName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center">
                      <Icon icon="solar:user-rounded-bold" width={48} className="text-zinc-600" />
                    </div>
                  )}
                </div>
                {/* Online indicator */}
                <div
                  className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-zinc-900"
                  style={{ background: accent }}
                />
              </div>
            </div>

            {/* Name & title */}
            <div className="text-center mb-6 animate-fade-in-up delay-200">
              <h1 className="text-2xl font-bold text-white mb-1">{fullName}</h1>
              {card.job_title && (
                <p className="font-medium mb-1" style={{ color: accent }}>
                  {card.job_title}
                </p>
              )}
              {card.company && (
                <p className="text-zinc-500 text-sm">{card.company}</p>
              )}
            </div>

            {/* Bio */}
            {card.bio && (
              <p className="text-zinc-400 text-sm text-center mb-6 animate-fade-in-up delay-300">
                {card.bio}
              </p>
            )}

            {/* Action buttons - one tap */}
            <div className="space-y-3 mb-6 animate-fade-in-up delay-300">
              {card.phone && (
                <a
                  href={`tel:${card.phone}`}
                  className="flex items-center gap-4 w-full p-4 rounded-2xl border border-white/5 transition-all duration-300 hover:border-white/15 hover:translate-x-1 group"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${accent}20` }}>
                    <Icon icon="solar:phone-bold" width={20} style={{ color: accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">Appeler</p>
                    <p className="text-zinc-500 text-xs truncate">{card.phone}</p>
                  </div>
                  <Icon icon="solar:arrow-right-linear" width={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </a>
              )}

              {card.phone_secondary && (
                <a
                  href={`tel:${card.phone_secondary}`}
                  className="flex items-center gap-4 w-full p-4 rounded-2xl border border-white/5 transition-all duration-300 hover:border-white/15 hover:translate-x-1 group"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-purple-500/10">
                    <Icon icon="solar:phone-bold" width={20} className="text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">Tél. secondaire</p>
                    <p className="text-zinc-500 text-xs truncate">{card.phone_secondary}</p>
                  </div>
                  <Icon icon="solar:arrow-right-linear" width={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </a>
              )}

              {card.email && (
                <a
                  href={`mailto:${card.email}`}
                  className="flex items-center gap-4 w-full p-4 rounded-2xl border border-white/5 transition-all duration-300 hover:border-white/15 hover:translate-x-1 group"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-cyan-500/10">
                    <Icon icon="solar:letter-bold" width={20} className="text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">Email</p>
                    <p className="text-zinc-500 text-xs truncate">{card.email}</p>
                  </div>
                  <Icon icon="solar:arrow-right-linear" width={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </a>
              )}

              {card.address && googleMapsUrl && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 rounded-2xl border border-white/5 transition-all duration-300 hover:border-white/15 hover:translate-x-1 group"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-green-500/10">
                    <Icon icon="solar:map-point-bold" width={20} className="text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">Adresse</p>
                    <p className="text-zinc-500 text-xs truncate">{card.address}</p>
                  </div>
                  <Icon icon="solar:arrow-right-linear" width={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </a>
              )}

              {card.website && (
                <a
                  href={card.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 rounded-2xl border border-white/5 transition-all duration-300 hover:border-white/15 hover:translate-x-1 group"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-500/10">
                    <Icon icon="solar:global-bold" width={20} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">Site web</p>
                    <p className="text-zinc-500 text-xs truncate">{card.website.replace(/^https?:\/\//, '')}</p>
                  </div>
                  <Icon icon="solar:arrow-right-linear" width={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </a>
              )}
            </div>

            {/* Social links */}
            {(card.linkedin || card.instagram) && (
              <div className="flex justify-center gap-3 mb-6 animate-fade-in-up delay-400">
                {card.linkedin && (
                  <a
                    href={card.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 transition-all duration-300 hover:border-white/15 hover:scale-110 bg-white/[0.03]"
                    title="LinkedIn"
                  >
                    <Icon icon="mdi:linkedin" width={24} className="text-[#0A66C2]" />
                  </a>
                )}
                {card.instagram && (
                  <a
                    href={card.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 transition-all duration-300 hover:border-white/15 hover:scale-110 bg-white/[0.03]"
                    title="Instagram"
                  >
                    <Icon icon="mdi:instagram" width={24} className="text-[#E4405F]" />
                  </a>
                )}
              </div>
            )}

            {/* Main CTA - Save contact */}
            <div className="space-y-3 animate-fade-in-up delay-500">
              <button
                onClick={handleDownload}
                className="w-full py-4 rounded-2xl text-white font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                  boxShadow: `0 8px 30px ${accent}40`,
                }}
              >
                {downloaded ? (
                  <>
                    <Icon icon="solar:check-circle-bold" width={22} />
                    Contact enregistré !
                  </>
                ) : (
                  <>
                    <Icon icon="solar:user-plus-bold" width={22} />
                    Enregistrer le contact
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="w-full py-3 rounded-2xl text-zinc-400 font-medium text-sm flex items-center justify-center gap-2 border border-white/5 transition-all duration-300 hover:border-white/15 hover:text-white bg-white/[0.03]"
              >
                {copied ? (
                  <>
                    <Icon icon="solar:check-circle-bold" width={18} />
                    Lien copié !
                  </>
                ) : (
                  <>
                    <Icon icon="solar:share-bold" width={18} />
                    Partager cette carte
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QR Code section */}
          <div className="mt-6 flex flex-col items-center animate-fade-in-up delay-600">
            <QRCode url={pageUrl} size={100} color="ffffff" />
            <p className="text-zinc-600 text-xs mt-2">Scannez pour partager</p>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center animate-fade-in-up delay-600">
            <a
              href="https://idkom.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-700 text-xs hover:text-zinc-500 transition-colors"
            >
              Propulsé par <span className="gradient-text font-medium">iDkom</span>
            </a>
          </div>
        </div>
      </div>

      {/* CSS Animations for mesh background */}
      <style jsx>{`
        @keyframes meshFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.95); }
        }
        @keyframes meshFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 30px) scale(1.1); }
        }
        @keyframes meshFloat3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.3); }
        }
      `}</style>
    </div>
  );
}
