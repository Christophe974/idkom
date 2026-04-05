'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import type { VCardData } from '@/lib/api';
import { downloadVcf } from './generateVcf';
import QRCode from './QRCode';
import PartnerBranding from './PartnerBranding';

interface Props {
  card: VCardData;
}

export default function VCardPageClient({ card }: Props) {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'about' | 'portfolio'>('contact');

  const fullName = `${card.first_name} ${card.last_name}`;
  const accent = card.accent_color || '#ff2d55';
  const pageUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://www.idkom.fr/carte/${card.slug}`;

  // For partner cards (porte-clé), hide About/Portfolio tabs and RDV link
  const isPartnerCard = card.source === 'portecle' && !!card.partner;

  // WhatsApp link - only show if whatsapp number is explicitly provided
  const whatsappUrl = card.whatsapp
    ? `https://wa.me/${card.whatsapp.replace(/[^0-9+]/g, '').replace(/^0/, '33')}`
    : null;

  // SMS link
  const smsUrl = card.phone ? `sms:${card.phone}` : null;

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
      {/* Animated mesh gradient background — GPU-optimized */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]"
          style={{
            background: accent,
            top: '-10%',
            right: '-10%',
            animation: 'meshFloat1 8s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute w-[350px] h-[350px] rounded-full opacity-10 blur-[70px]"
          style={{
            background: `linear-gradient(135deg, ${accent}, #7928ca)`,
            bottom: '-5%',
            left: '-10%',
            animation: 'meshFloat2 10s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute w-[200px] h-[200px] rounded-full opacity-10 blur-[60px]"
          style={{
            background: '#00d4ff',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'meshFloat3 12s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">

          {/* ========== QUICKVIEW HERO ========== */}
          <div
            className="rounded-3xl border border-white/10 overflow-hidden animate-fade-in-up"
            style={{
              background: 'rgba(24, 24, 27, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Cover Banner */}
            <div className="relative h-32 overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${accent}40, #7928ca30, ${accent}20)`,
                }}
              />
              {/* Animated pattern overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, ${accent}60 1px, transparent 1px), radial-gradient(circle at 80% 20%, ${accent}40 1px, transparent 1px), radial-gradient(circle at 60% 80%, #7928ca40 1px, transparent 1px)`,
                backgroundSize: '60px 60px, 40px 40px, 80px 80px',
                animation: 'patternMove 20s linear infinite',
              }} />
              {/* Logo iDkom in banner — only for non-partner cards */}
              {!isPartnerCard && (
                <div className="absolute top-3 right-3">
                  <a href="https://www.idkom.fr" target="_blank" rel="noopener noreferrer">
                    <Image
                      src="/images/logo-white.svg"
                      alt="iDkom"
                      width={70}
                      height={22}
                      className="h-5 w-auto opacity-40 hover:opacity-80 transition-opacity duration-300"
                    />
                  </a>
                </div>
              )}
              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-16" style={{
                background: 'linear-gradient(transparent, rgba(24, 24, 27, 0.85))',
              }} />
            </div>

            {/* Photo - overlapping banner */}
            <div className="flex justify-center -mt-14 relative z-10 animate-fade-in-up delay-100">
              <div className="relative">
                <div
                  className="w-24 h-24 rounded-full overflow-hidden border-[3px] p-[2px]"
                  style={{
                    borderColor: accent,
                    boxShadow: `0 0 30px ${accent}40, 0 4px 20px rgba(0,0,0,0.5)`,
                    background: '#18181b',
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
                      <Icon icon="solar:user-bold" width={40} className="text-zinc-600" />
                    </div>
                  )}
                </div>
                {/* Online pulse */}
                <div className="absolute bottom-0.5 right-0.5">
                  <div
                    className="w-4 h-4 rounded-full border-[2.5px] border-zinc-900"
                    style={{ background: '#22c55e' }}
                  />
                  <div
                    className="absolute inset-0 w-4 h-4 rounded-full animate-ping opacity-40"
                    style={{ background: '#22c55e' }}
                  />
                </div>
              </div>
            </div>

            {/* Name & title - compact */}
            <div className="text-center px-6 mt-3 animate-fade-in-up delay-200">
              <h1 className="text-xl font-bold text-white">{fullName}</h1>
              <div className="flex items-center justify-center gap-2 mt-1">
                {card.job_title && (
                  <span className="font-medium text-sm" style={{ color: accent }}>
                    {card.job_title}
                  </span>
                )}
                {card.job_title && card.company && (
                  <span className="text-zinc-600 text-xs">•</span>
                )}
                {card.company && (
                  <span className="text-zinc-400 text-sm">{card.company}</span>
                )}
              </div>
            </div>

            {/* ========== QUICK ACTION BAR ========== */}
            <div className="flex justify-center gap-4 px-6 mt-5 animate-fade-in-up delay-300">
              {card.phone && (
                <a
                  href={`tel:${card.phone}`}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95"
                    style={{ background: `${accent}20`, boxShadow: `0 4px 15px ${accent}15` }}
                  >
                    <Icon icon="solar:phone-bold" width={22} style={{ color: accent }} />
                  </div>
                  <span className="text-[10px] text-zinc-500 font-medium">Appeler</span>
                </a>
              )}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-500/15 transition-all duration-300 group-hover:scale-110 group-active:scale-95" style={{ boxShadow: '0 4px 15px rgba(16,185,129,0.1)' }}>
                    <Icon icon="mdi:whatsapp" width={24} className="text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-zinc-500 font-medium">WhatsApp</span>
                </a>
              )}
              {card.email && (
                <a
                  href={`mailto:${card.email}`}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-cyan-500/15 transition-all duration-300 group-hover:scale-110 group-active:scale-95" style={{ boxShadow: '0 4px 15px rgba(6,182,212,0.1)' }}>
                    <Icon icon="solar:letter-bold" width={22} className="text-cyan-400" />
                  </div>
                  <span className="text-[10px] text-zinc-500 font-medium">Email</span>
                </a>
              )}
              {smsUrl && (
                <a
                  href={smsUrl}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-purple-500/15 transition-all duration-300 group-hover:scale-110 group-active:scale-95" style={{ boxShadow: '0 4px 15px rgba(168,85,247,0.1)' }}>
                    <Icon icon="solar:chat-round-dots-bold" width={22} className="text-purple-400" />
                  </div>
                  <span className="text-[10px] text-zinc-500 font-medium">SMS</span>
                </a>
              )}
              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 transition-all duration-300 group-hover:scale-110 group-active:scale-95 border border-white/5">
                  <Icon icon="solar:share-bold" width={20} className="text-zinc-400" />
                </div>
                <span className="text-[10px] text-zinc-500 font-medium">
                  {copied ? 'Copié !' : 'Partager'}
                </span>
              </button>
            </div>

            {/* ========== SAVE CONTACT CTA ========== */}
            <div className="px-6 mt-5 animate-fade-in-up delay-300">
              <button
                onClick={handleDownload}
                className="w-full py-3 rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                  boxShadow: `0 6px 25px ${accent}35`,
                }}
              >
                {downloaded ? (
                  <>
                    <Icon icon="solar:check-circle-bold" width={20} />
                    Contact enregistré !
                  </>
                ) : (
                  <>
                    <Icon icon="solar:user-plus-bold" width={20} />
                    Enregistrer le contact
                  </>
                )}
              </button>
            </div>

            {/* ========== TAB NAVIGATION ========== */}
            {!isPartnerCard ? (
              <div className="flex border-b border-white/5 mt-5 px-6 animate-fade-in-up delay-400">
                {(['contact', 'about', 'portfolio'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 border-b-2 ${
                      activeTab === tab
                        ? 'border-current'
                        : 'border-transparent text-zinc-600 hover:text-zinc-400'
                    }`}
                    style={activeTab === tab ? { color: accent } : undefined}
                  >
                    {tab === 'contact' ? 'Contact' : tab === 'about' ? 'À propos' : 'Portfolio'}
                  </button>
                ))}
              </div>
            ) : (
              <div className="border-b border-white/5 mt-5" />
            )}

            {/* ========== TAB CONTENT ========== */}
              <div className="px-6 py-5 animate-fade-in-up">

                {/* ===== TAB: CONTACT ===== */}
                {activeTab === 'contact' && (
                  <div className="space-y-2.5">
                    {card.phone && (
                      <a
                        href={`tel:${card.phone}`}
                        className="flex items-center gap-3 w-full p-3 rounded-xl border border-white/5 transition-all duration-300 hover:border-white/15 hover:translate-x-1 group"
                        style={{ background: 'rgba(255,255,255,0.02)' }}
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${accent}15` }}>
                          <Icon icon="solar:phone-bold" width={18} style={{ color: accent }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium">Téléphone</p>
                          <p className="text-zinc-500 text-xs truncate">{card.phone}</p>
                        </div>
                        <Icon icon="solar:arrow-right-linear" width={14} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                      </a>
                    )}

                    {card.phone_secondary && (
                      <a
                        href={`tel:${card.phone_secondary}`}
                        className="flex items-center gap-3 w-full p-3 rounded-xl border border-white/5 transition-all duration-300 hover:border-white/15 hover:translate-x-1 group"
                        style={{ background: 'rgba(255,255,255,0.02)' }}
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-500/10">
                          <Icon icon="solar:phone-bold" width={18} className="text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium">Tél. secondaire</p>
                          <p className="text-zinc-500 text-xs truncate">{card.phone_secondary}</p>
                        </div>
                        <Icon icon="solar:arrow-right-linear" width={14} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                      </a>
                    )}

                    {card.email && (
                      <a
                        href={`mailto:${card.email}`}
                        className="flex items-center gap-3 w-full p-3 rounded-xl border border-white/5 transition-all duration-300 hover:border-white/15 hover:translate-x-1 group"
                        style={{ background: 'rgba(255,255,255,0.02)' }}
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-cyan-500/10">
                          <Icon icon="solar:letter-bold" width={18} className="text-cyan-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium">Email</p>
                          <p className="text-zinc-500 text-xs truncate">{card.email}</p>
                        </div>
                        <Icon icon="solar:arrow-right-linear" width={14} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                      </a>
                    )}

                    {card.address && googleMapsUrl && (
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full p-3 rounded-xl border border-white/5 transition-all duration-300 hover:border-white/15 hover:translate-x-1 group"
                        style={{ background: 'rgba(255,255,255,0.02)' }}
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-green-500/10">
                          <Icon icon="solar:map-point-bold" width={18} className="text-green-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium">Adresse</p>
                          <p className="text-zinc-500 text-xs truncate">{card.address}</p>
                        </div>
                        <Icon icon="solar:arrow-right-linear" width={14} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                      </a>
                    )}

                    {card.website && (
                      <a
                        href={card.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full p-3 rounded-xl border border-white/5 transition-all duration-300 hover:border-white/15 hover:translate-x-1 group"
                        style={{ background: 'rgba(255,255,255,0.02)' }}
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-500/10">
                          <Icon icon="solar:global-bold" width={18} className="text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium">Site web</p>
                          <p className="text-zinc-500 text-xs truncate">{card.website.replace(/^https?:\/\//, '')}</p>
                        </div>
                        <Icon icon="solar:arrow-right-linear" width={14} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                      </a>
                    )}

                    {/* Social links inline */}
                    {(card.linkedin || card.instagram || card.facebook) && (
                      <div className="flex gap-2 pt-2">
                        {card.linkedin && (
                          <a
                            href={card.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2 border border-white/5 transition-all duration-300 hover:border-white/15 hover:scale-105 bg-white/[0.02]"
                          >
                            <Icon icon="mdi:linkedin" width={18} className="text-[#0A66C2]" />
                            <span className="text-xs text-zinc-500">LinkedIn</span>
                          </a>
                        )}
                        {card.instagram && (
                          <a
                            href={card.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2 border border-white/5 transition-all duration-300 hover:border-white/15 hover:scale-105 bg-white/[0.02]"
                          >
                            <Icon icon="mdi:instagram" width={18} className="text-[#E4405F]" />
                            <span className="text-xs text-zinc-500">Instagram</span>
                          </a>
                        )}
                        {card.facebook && (
                          <a
                            href={card.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2 border border-white/5 transition-all duration-300 hover:border-white/15 hover:scale-105 bg-white/[0.02]"
                          >
                            <Icon icon="mdi:facebook" width={18} className="text-[#1877F2]" />
                            <span className="text-xs text-zinc-500">Facebook</span>
                          </a>
                        )}
                      </div>
                    )}

                    {/* RDV Button - only for iDkom cards */}
                    {!isPartnerCard && (
                      <a
                        href="https://www.idkom.fr/rendez-vous"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full p-3 rounded-xl border border-dashed transition-all duration-300 hover:translate-x-1 group mt-2"
                        style={{
                          borderColor: `${accent}30`,
                          background: `${accent}08`,
                        }}
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${accent}20` }}>
                          <Icon icon="solar:calendar-bold" width={18} style={{ color: accent }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium">Prendre rendez-vous</p>
                          <p className="text-zinc-500 text-xs">Réservez un créneau en ligne</p>
                        </div>
                        <Icon icon="solar:arrow-right-linear" width={14} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                      </a>
                    )}
                  </div>
                )}

                {/* ===== TAB: ABOUT ===== */}
                {activeTab === 'about' && (
                  <div className="space-y-5">
                    {/* Bio */}
                    {card.bio && (
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Bio</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed">{card.bio}</p>
                      </div>
                    )}

                    {/* Expertise tags */}
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Stands BeMatrix', 'Événementiel', 'Solutions digitales', 'NFC & QR', 'Impression 3D', 'Design'].map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/5"
                            style={{ background: `${accent}10`, color: accent }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key numbers */}
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Chiffres clés</h3>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                          <p className="text-white font-bold text-lg">1996</p>
                          <p className="text-zinc-500 text-[10px] font-medium mt-0.5">Fondée</p>
                        </div>
                        <div className="text-center p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                          <p className="text-white font-bold text-lg">500+</p>
                          <p className="text-zinc-500 text-[10px] font-medium mt-0.5">Événements</p>
                        </div>
                        <div className="text-center p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                          <div className="flex items-center justify-center gap-1">
                            <p className="text-white font-bold text-lg">5.0</p>
                            <Icon icon="solar:star-bold" width={14} className="text-yellow-400" />
                          </div>
                          <p className="text-zinc-500 text-[10px] font-medium mt-0.5">Google</p>
                        </div>
                      </div>
                    </div>

                    {/* Company */}
                    {card.company && (
                      <a
                        href="https://www.idkom.fr/atelier"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                          <Image
                            src="/images/logo-white.svg"
                            alt={card.company}
                            width={28}
                            height={28}
                            className="w-7 h-auto"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{card.company}</p>
                          <p className="text-zinc-500 text-xs">L&apos;Atelier Phygital</p>
                        </div>
                        <Icon icon="solar:arrow-right-linear" width={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                      </a>
                    )}
                  </div>
                )}

                {/* ===== TAB: PORTFOLIO ===== */}
                {activeTab === 'portfolio' && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Nos réalisations</h3>

                    {/* Gallery grid — links to site albums */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Stands BeMatrix', icon: 'solar:widget-5-bold', category: 'stands-bematrix', gradient: `linear-gradient(135deg, ${accent}30, #7928ca20)` },
                        { label: 'Événementiel', icon: 'solar:calendar-bold', category: 'evenementiel', gradient: 'linear-gradient(135deg, #0ea5e930, #06b6d420)' },
                        { label: 'Solutions Digitales', icon: 'solar:monitor-smartphone-bold', category: 'solutions-digitales', gradient: 'linear-gradient(135deg, #22c55e30, #10b98120)' },
                        { label: 'Créations & Print', icon: 'solar:printer-bold', category: 'creations-print', gradient: 'linear-gradient(135deg, #f59e0b30, #eab30820)' },
                      ].map((item) => (
                        <a
                          key={item.label}
                          href={`https://www.idkom.fr/realisations?category=${item.category}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="aspect-square rounded-xl border border-white/5 flex items-center justify-center transition-all duration-300 hover:scale-[1.03] cursor-pointer group"
                          style={{ background: item.gradient }}
                        >
                          <div className="text-center">
                            <Icon icon={item.icon} width={28} className="text-white/40 group-hover:text-white/60 mx-auto mb-2 transition-colors" />
                            <span className="text-white/50 group-hover:text-white/70 text-xs font-medium transition-colors">{item.label}</span>
                          </div>
                        </a>
                      ))}
                    </div>

                    {/* CTA */}
                    <a
                      href="https://www.idkom.fr/realisations"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 rounded-xl text-center text-sm font-medium border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition-all duration-300 bg-white/[0.02]"
                    >
                      Découvrir tous nos projets →
                    </a>
                  </div>
                )}
              </div>
          </div>

          {/* ========== PARTNER BRANDING (before QR) ========== */}
          {card.partner && (
            <div className="mt-5 animate-fade-in-up delay-500">
              <div
                className="rounded-2xl border border-white/5 p-4 flex items-center gap-4"
                style={{ background: 'rgba(24, 24, 27, 0.7)' }}
              >
                {card.partner.logo && (
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center flex-shrink-0 p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.partner.logo}
                      alt={card.partner.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-medium">Offert par</p>
                  <p className="text-white text-sm font-semibold truncate">{card.partner.name}</p>
                  {card.partner.agency && (
                    <p className="text-zinc-500 text-xs truncate">{card.partner.agency}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* QR Code section — cliquable pour agrandir/réduire */}
          <div className="mt-5 flex flex-col items-center animate-fade-in-up delay-600">
            <QRCode url={pageUrl} size={80} color="ffffff" />
            <p className="text-zinc-600 text-xs mt-1.5">Touchez pour agrandir</p>
          </div>

          {/* ========== PROMO iDKOM ========== */}
          <div className="mt-6 animate-fade-in-up delay-600">
            <a
              href="https://www.idkom.fr/carte-de-visite-nfc"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-white/5 p-5 text-center transition-all duration-300 hover:border-white/10 group"
              style={{ background: 'rgba(24, 24, 27, 0.5)' }}
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center">
                <Icon icon="solar:nfc-bold" width={22} className="text-pink-400" />
              </div>
              <p className="text-white text-sm font-semibold mb-1">
                Vous aussi, adoptez la carte de visite NFC
              </p>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Offrez à vos clients un porte-clé connecté à leur image. Moderne, mémorable, et toujours à jour.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium group-hover:gap-2.5 transition-all duration-300" style={{ color: accent }}>
                En savoir plus
                <Icon icon="solar:arrow-right-linear" width={14} />
              </div>
            </a>
          </div>

          {/* Footer */}
          <div className="mt-4 mb-2 text-center animate-fade-in-up delay-600">
            <a
              href="https://www.idkom.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-700 text-xs hover:text-zinc-500 transition-colors"
            >
              Propulsé par <span className="gradient-text font-medium">iDkom</span>
            </a>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
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
        @keyframes patternMove {
          0% { background-position: 0 0, 0 0, 0 0; }
          100% { background-position: 60px 60px, -40px 40px, 80px -80px; }
        }
      `}</style>
    </div>
  );
}
