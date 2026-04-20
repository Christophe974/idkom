'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import type { Proposition, PropositionSection } from '@/lib/api';
import { trackPropositionEvent } from '@/lib/api';

// ============================================================
// Helpers
// ============================================================
function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined) return '';
  return value.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' €';
}

function formatDate(iso: string | null): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function getVideoEmbedUrl(url: string): string | null {
  let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0`;
  m = url.match(/vimeo\.com\/(\d+)/);
  if (m) return `https://player.vimeo.com/video/${m[1]}`;
  return null;
}

// ============================================================
// useInView — scroll-triggered color reveal (mobile-friendly)
// ============================================================
function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollHeight - h.clientHeight > 0 ? h.scrollTop / (h.scrollHeight - h.clientHeight) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

// ============================================================
// Main Component
// ============================================================
export default function PropositionPage({ proposition: prop, slug }: { proposition: Proposition; slug: string }) {
  const progress = useScrollProgress();
  const [ctaClicked, setCtaClicked] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const audioTracked = useRef(false);
  const videoTracked = useRef(false);

  const track = useCallback((event: string) => {
    trackPropositionEvent(slug, event).catch(() => {});
  }, [slug]);

  const handleCtaClick = () => {
    if (ctaClicked) return;
    setCtaClicked(true);
    track('cta_clicked');
  };

  const handleSellsyClick = () => {
    track('cta_clicked');
    // Laisse le navigateur suivre le lien ensuite
  };

  const handleMusicToggle = () => {
    const audio = musicRef.current;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
    } else {
      audio.play();
      if (!audioTracked.current) {
        track('audio_played');
        audioTracked.current = true;
      }
    }
    setMusicPlaying(!musicPlaying);
  };

  const handleAudioPlay = () => {
    if (!audioTracked.current) {
      track('audio_played');
      audioTracked.current = true;
    }
  };

  const handleVideoVisible = useCallback(() => {
    if (!videoTracked.current) {
      track('video_played');
      videoTracked.current = true;
    }
  }, [track]);

  const videoEmbedUrl = prop.media.video_url ? getVideoEmbedUrl(prop.media.video_url) : null;
  const hasRecap = prop.recap && prop.recap.items && prop.recap.items.length > 0;
  const hasTimeline = prop.timeline && prop.timeline.length > 0;
  const hasExclusions = prop.exclusions && prop.exclusions.length > 0;
  const sellsyUrl = prop.sellsy?.quickpay_url ?? null;

  return (
    <main className="relative z-10 min-h-screen text-zinc-200">
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-zinc-900/40">
        <div
          className="h-full bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Ambient music */}
      {prop.media.music_url && (
        <audio ref={musicRef} src={prop.media.music_url} loop preload="none" />
      )}
      {prop.media.music_url && (
        <button
          onClick={handleMusicToggle}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-700 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-white transition-all"
          title={musicPlaying ? 'Couper la musique' : 'Jouer la musique'}
          aria-label={musicPlaying ? 'Couper la musique' : 'Jouer la musique'}
        >
          <Icon icon={musicPlaying ? 'solar:volume-loud-linear' : 'solar:volume-cross-linear'} width={20} />
        </button>
      )}

      {/* Sticky ref strip */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-zinc-900/70">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-2 md:gap-3 text-zinc-500">
            <Icon icon="solar:document-text-linear" width={16} className="text-[#7928ca]" />
            <span className="font-medium text-zinc-300">Proposition</span>
            {prop.proposal_ref && (
              <>
                <span className="hidden sm:inline text-zinc-600">·</span>
                <span className="hidden sm:inline text-zinc-500">Réf. {prop.proposal_ref}</span>
              </>
            )}
          </div>
          <div className="text-zinc-500">
            {prop.issue_city ? <span className="hidden md:inline">{prop.issue_city}, </span> : null}
            {formatDate(prop.issue_date)}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* ============================================================ */}
        {/* HERO */}
        {/* ============================================================ */}
        <section className="pt-16 md:pt-24 pb-16 md:pb-20">
          {/* Brand mark (iDkom logo or reseller logo) */}
          <div className="flex flex-col items-center gap-3 mb-10 md:mb-14">
            {prop.reseller.logo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={prop.reseller.logo.url}
                alt={prop.reseller.logo.alt}
                className="h-10 md:h-12 w-auto"
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="/images/logo-white.svg"
                alt="iDkom"
                className="h-10 md:h-12 w-auto"
              />
            )}
            <span className="text-zinc-500 text-[10px] uppercase tracking-[0.25em] text-center">
              Agence Événementielle &amp; Solutions Digitales
            </span>
          </div>

          {/* Kicker */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs md:text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d55] animate-pulse" />
              Proposition commerciale &middot; Spécialement conçue pour vous
            </span>
          </div>

          {/* Client name */}
          <h1 className="text-center text-5xl md:text-8xl font-bold leading-[0.95] mb-4">
            <span className="gradient-text">{prop.client.company}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-center text-xl md:text-2xl text-zinc-300 font-medium mb-2">
            {prop.title}
          </p>
          {prop.client.baseline && (
            <p className="text-center text-zinc-500 mb-10">
              {prop.client.baseline}
            </p>
          )}

          {/* Meta card */}
          {(prop.proposal_ref || prop.issue_date || prop.validity_days) && (
            <div className="max-w-xl mx-auto grid grid-cols-3 gap-px rounded-2xl overflow-hidden bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
              <div className="bg-black/40 p-4 text-center">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Référence</div>
                <div className="text-zinc-200 font-medium text-sm">{prop.proposal_ref || '—'}</div>
              </div>
              <div className="bg-black/40 p-4 text-center">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Émise le</div>
                <div className="text-zinc-200 font-medium text-sm">{formatDate(prop.issue_date)}</div>
              </div>
              <div className="bg-black/40 p-4 text-center">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Valable</div>
                <div className="text-zinc-200 font-medium text-sm">{prop.validity_days} jours</div>
              </div>
            </div>
          )}
        </section>

        {/* ============================================================ */}
        {/* INTRO MESSAGE */}
        {/* ============================================================ */}
        {prop.intro_message && (
          <section className="mb-20 md:mb-28">
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute -top-4 -left-4 text-7xl md:text-9xl text-[#7928ca]/20 font-serif leading-none select-none">&ldquo;</div>
              <blockquote className="relative pl-6 md:pl-10 text-lg md:text-xl text-zinc-300 leading-relaxed font-light whitespace-pre-line">
                {prop.intro_message}
              </blockquote>
              <div className="flex items-center gap-3 mt-6 pl-6 md:pl-10">
                <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-br from-[#ff2d55] via-[#7928ca] to-[#00d4ff]">
                  {prop.reseller.avatar ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={prop.reseller.avatar.url} alt={prop.reseller.avatar.alt} className="w-full h-full rounded-full object-cover bg-black" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-sm">
                      {prop.reseller.contact.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="text-sm">
                  <div className="text-white font-medium">{prop.reseller.contact}</div>
                  <div className="text-zinc-500 text-xs">{prop.reseller.company}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* AUDIO MESSAGE */}
        {/* ============================================================ */}
        {prop.media.audio_message_url && (
          <section className="max-w-2xl mx-auto mb-20 md:mb-28">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                {prop.reseller.avatar ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={prop.reseller.avatar.url} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-zinc-700" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff2d55] to-[#7928ca] flex items-center justify-center text-white font-bold text-sm">
                    {prop.reseller.contact.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-white font-medium text-sm">Message vocal</p>
                  <p className="text-zinc-500 text-xs">{prop.reseller.contact}</p>
                </div>
              </div>
              <audio
                controls
                src={prop.media.audio_message_url}
                onPlay={handleAudioPlay}
                className="w-full h-10"
                preload="none"
              />
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* VIDEO */}
        {/* ============================================================ */}
        {videoEmbedUrl && (
          <section className="max-w-4xl mx-auto mb-20 md:mb-28">
            <VideoSection embedUrl={videoEmbedUrl} onVisible={handleVideoVisible} />
          </section>
        )}

        {/* ============================================================ */}
        {/* SECTIONS = "Ce qu'on vous crée" */}
        {/* ============================================================ */}
        {prop.sections.length > 0 && (
          <>
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-zinc-800" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Le projet</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-zinc-800 to-zinc-800" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
                Ce qu&apos;on vous <span className="gradient-text">crée</span>
              </h2>
            </section>

            <section className="mb-20 md:mb-28 space-y-6 md:space-y-8">
              {prop.sections.map((s, i) => (
                <DeliverableCard key={s.id} section={s} index={i} />
              ))}
            </section>
          </>
        )}

        {/* ============================================================ */}
        {/* OPTIONS */}
        {/* ============================================================ */}
        {prop.options.length > 0 && (
          <section className="mb-20 md:mb-28">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-zinc-800" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Pour aller plus loin</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-zinc-800 to-zinc-800" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
              Les options <span className="gradient-text">disponibles</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {prop.options.map((o, i) => (
                <OptionCard key={o.id} option={o} letter={String.fromCharCode(65 + i)} />
              ))}
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* NOT INCLUDED */}
        {/* ============================================================ */}
        {hasExclusions && (
          <section className="mb-20 md:mb-28">
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/20 p-7 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Icon icon="solar:info-circle-linear" width={20} className="text-zinc-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Ce qui n&apos;est pas inclus</h3>
              </div>
              <ul className="space-y-3">
                {prop.exclusions!.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm md:text-base">
                    <Icon icon="solar:arrow-right-linear" width={16} className="text-zinc-600 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* RECAP */}
        {/* ============================================================ */}
        {hasRecap && (
          <section className="mb-20 md:mb-28">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-zinc-800" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Le récap</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-zinc-800 to-zinc-800" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
              Récapitulatif <span className="gradient-text">tarifaire</span>
            </h2>

            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-sm overflow-hidden">
              <div className="divide-y divide-zinc-800/60">
                {prop.recap.items!.map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-6 md:px-8 py-4 hover:bg-zinc-900/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <Icon icon="solar:check-circle-bold" width={18} className="text-[#00d4ff]" />
                      <span className="text-zinc-300 text-sm md:text-base">{item.label}</span>
                    </div>
                    <span className="text-zinc-500 text-sm italic">
                      {item.amount_label ?? (item.amount != null ? formatPrice(item.amount) : 'inclus')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 bg-black/40 px-6 md:px-8 py-8 space-y-5">
                {/* TOTAL HT en héros — le plus visible */}
                {prop.recap.total_ht !== null && (
                  <div className="text-center md:text-right pb-5 border-b border-zinc-800/60">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Total HT</div>
                    <div className="text-4xl md:text-5xl font-bold">
                      <span className="gradient-text">{formatPrice(prop.recap.total_ht)}</span>
                    </div>
                  </div>
                )}

                {/* Lignes détail TVA / Réduction / TTC — plus discrets */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 text-sm">
                  {(prop.recap.reduction_ht !== null || prop.recap.reduction_percent !== null) && (
                    <div className="text-center md:text-left">
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
                        Réduction{prop.recap.reduction_percent ? ` (${prop.recap.reduction_percent.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\u00a0%)` : ''}
                      </div>
                      <div className="text-lg md:text-xl font-semibold text-zinc-400">
                        -{formatPrice(prop.recap.reduction_ht ?? (prop.recap.total_ht && prop.recap.reduction_percent ? prop.recap.total_ht * prop.recap.reduction_percent / 100 : 0))}
                      </div>
                    </div>
                  )}
                  <div className="text-center md:text-left">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
                      TVA {prop.recap.tva_rate.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %
                    </div>
                    <div className="text-lg md:text-xl font-semibold text-zinc-400">
                      {(() => {
                        const red = prop.recap.reduction_ht ?? (prop.recap.total_ht && prop.recap.reduction_percent ? prop.recap.total_ht * prop.recap.reduction_percent / 100 : 0);
                        const netHt = (prop.recap.total_ht ?? 0) - (red ?? 0);
                        return formatPrice(netHt * prop.recap.tva_rate / 100);
                      })()}
                    </div>
                  </div>
                  {prop.recap.total_ttc !== null && (
                    <div className="text-center md:text-right md:ml-auto col-span-2 md:col-span-1">
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Total TTC</div>
                      <div className="text-lg md:text-xl font-semibold text-zinc-300">
                        {formatPrice(prop.recap.total_ttc)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* TIMELINE */}
        {/* ============================================================ */}
        {hasTimeline && (
          <section className="mb-20 md:mb-28">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-zinc-800" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Next steps</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-zinc-800 to-zinc-800" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
              Comment ça <span className="gradient-text">se passe</span>
            </h2>

            <div className="relative">
              <div className="absolute left-5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[#ff2d55] via-[#7928ca] to-[#00d4ff] opacity-40" />
              <div className="space-y-8 md:space-y-12">
                {prop.timeline!.map((step, i) => (
                  <div key={i} className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-12 items-start`}>
                    <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 -top-1 w-3 h-3 rounded-full bg-gradient-to-br from-[#ff2d55] to-[#00d4ff] ring-4 ring-black" />
                    <div className="hidden md:block flex-1" />
                    <div className="pl-14 md:pl-0 flex-1">
                      <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-5 md:p-6">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                          Étape {i + 1}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* CTA */}
        {/* ============================================================ */}
        {prop.cta.enabled && (
          <section className="mb-20">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800/80">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff2d55]/10 via-[#7928ca]/10 to-[#00d4ff]/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7928ca]/10 blur-[120px] rounded-full pointer-events-none" />

              <div className="relative p-10 md:p-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-black/50 text-zinc-400 text-xs font-medium mb-6">
                  <Icon icon="solar:heart-linear" width={14} className="text-[#ff2d55]" />
                  Prêt(e) à démarrer ?
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  On <span className="gradient-text">se lance</span> ?
                </h2>

                {sellsyUrl ? (
                  <>
                    <p className="text-zinc-400 max-w-xl mx-auto mb-8 text-sm md:text-base">
                      Cliquez pour consulter et signer le devis officiel en ligne.
                    </p>
                    <a
                      href={sellsyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleSellsyClick}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-semibold shadow-lg shadow-[#7928ca]/25 hover:shadow-xl hover:shadow-[#7928ca]/40 transition-all"
                    >
                      <Icon icon="solar:document-text-bold" width={22} />
                      <span>Consulter &amp; signer le devis</span>
                      <Icon icon="solar:arrow-right-linear" width={20} />
                    </a>
                    {prop.sellsy.quote_number && (
                      <p className="text-xs text-zinc-600 mt-4">
                        Devis officiel {prop.sellsy.quote_number}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-zinc-400 max-w-xl mx-auto mb-8 text-sm md:text-base">
                      Un clic pour nous confirmer votre accord. On vous recontacte dans la foulée.
                    </p>
                    {ctaClicked ? (
                      <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
                        <Icon icon="solar:check-circle-bold" width={24} />
                        <span className="font-medium">Merci ! {prop.reseller.contact} va vous recontacter.</span>
                      </div>
                    ) : (
                      <button
                        onClick={handleCtaClick}
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-semibold shadow-lg shadow-[#7928ca]/25 hover:shadow-xl hover:shadow-[#7928ca]/40 transition-all"
                      >
                        <span>{prop.cta.text || 'Je valide cette proposition'}</span>
                        <Icon icon="solar:arrow-right-linear" width={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* SIGNATURE */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-sm p-6 md:p-8 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#ff2d55]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff2d55] via-[#7928ca] to-[#00d4ff] blur-md opacity-60" />
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full p-[2px] bg-gradient-to-br from-[#ff2d55] via-[#7928ca] to-[#00d4ff]">
                  {prop.reseller.avatar ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={prop.reseller.avatar.url} alt={prop.reseller.contact} className="w-full h-full rounded-full object-cover bg-black" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-2xl">
                      {prop.reseller.contact.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">Votre interlocuteur</div>
                <div className="text-white font-bold text-xl md:text-2xl mb-1">{prop.reseller.contact}</div>
                <div className="text-zinc-400 text-sm mb-4">{prop.reseller.company}</div>
                <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                  {prop.reseller.phone && (
                    <a
                      href={`tel:${prop.reseller.phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 bg-black/40 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors text-sm"
                    >
                      <Icon icon="solar:phone-linear" width={16} className="text-[#ff2d55]" />
                      {prop.reseller.phone}
                    </a>
                  )}
                  {prop.reseller.email && (
                    <a
                      href={`mailto:${prop.reseller.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 bg-black/40 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors text-sm"
                    >
                      <Icon icon="solar:letter-linear" width={16} className="text-[#7928ca]" />
                      {prop.reseller.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 border-t border-zinc-900 text-xs text-zinc-600 space-y-2">
          <div>iDkom — Agence Événementielle &amp; Solutions Digitales &middot; Brévilliers, Franche-Comté</div>
          {prop.proposal_ref && prop.issue_date && (
            <div>Proposition {prop.proposal_ref} &middot; valable {prop.validity_days} jours à compter du {formatDate(prop.issue_date)}</div>
          )}
        </footer>
      </div>
    </main>
  );
}

// ============================================================
// DeliverableCard
// ============================================================
function DeliverableCard({ section, index }: { section: PropositionSection; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const displayNum = index + 1;

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-zinc-700/80"
    >
      <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${inView ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`}>
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#ff2d55]/10 via-transparent to-[#00d4ff]/10" />
      </div>

      <div className="relative p-6 md:p-10">
        <div className="flex items-start gap-5 md:gap-8 mb-5">
          <div className="flex-shrink-0">
            <div className="text-5xl md:text-7xl font-bold leading-none relative">
              <span className={`bg-gradient-to-br from-zinc-700 to-zinc-900 bg-clip-text text-transparent transition-opacity duration-700 ${inView ? 'opacity-0' : 'opacity-100'} group-hover:opacity-0`}>
                {String(displayNum).padStart(2, '0')}
              </span>
              <span className={`absolute inset-0 bg-gradient-to-br from-[#ff2d55] via-[#7928ca] to-[#00d4ff] bg-clip-text text-transparent transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`}>
                {String(displayNum).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center gap-3 mb-2 text-[#7928ca]">
              {section.icon && <Icon icon={section.icon} width={22} />}
              <span className="text-xs uppercase tracking-widest text-zinc-500">Étape {displayNum}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">{section.title}</h3>
          </div>
        </div>

        {section.description && (
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed ml-0 md:ml-[calc(5rem+2rem)] whitespace-pre-line">
            {section.description}
          </p>
        )}

        {section.sub_items && section.sub_items.length > 0 && (
          <div className="mt-8 md:ml-[calc(5rem+2rem)] grid gap-3">
            {section.sub_items.map((p, i) => (
              <SubItem key={i} index={i} title={p.title} description={p.description} />
            ))}
          </div>
        )}

        {section.photos.length > 0 && (
          <div className="mt-8 md:ml-[calc(5rem+2rem)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {section.photos.map((photo, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={i}
                src={photo.url}
                alt={photo.alt || ''}
                loading="lazy"
                decoding="async"
                className="w-full h-48 object-cover rounded-xl border border-zinc-800/60"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SubItem (sub-section d'une étape : page site, checkpoint SEO...)
// ============================================================
function SubItem({ index, title, description }: { index: number; title: string; description: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-[180px_1fr] gap-3 md:gap-6 p-5 rounded-xl bg-black/30 border transition-all duration-500 ${inView ? 'border-zinc-700/80' : 'border-zinc-800/60'}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff2d55]/20 to-[#7928ca]/20 border border-zinc-800 flex items-center justify-center text-xs font-bold transition-colors duration-500 ${inView ? 'text-white' : 'text-zinc-400'}`}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="font-semibold text-white">{title}</div>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// ============================================================
// OptionCard
// ============================================================
function OptionCard({ option, letter }: { option: { title: string; description: string | null; price: number | null; image: { url: string; alt: string } | null }; letter: string }) {
  return (
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-[#ff2d55]/40 via-[#7928ca]/40 to-[#00d4ff]/40">
      <div className="relative rounded-2xl bg-black/90 backdrop-blur-sm p-7 h-full flex flex-col">
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff2d55] via-[#7928ca] to-[#00d4ff] flex items-center justify-center font-bold text-white text-lg">
            {letter}
          </div>
          {option.price !== null && (
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">Tarif</div>
              <div className="font-bold text-white whitespace-nowrap text-sm md:text-base">
                {option.price.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} € HT
              </div>
            </div>
          )}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">{option.title}</h3>
        {option.description && (
          <p className="text-zinc-400 leading-relaxed text-sm md:text-base whitespace-pre-line">{option.description}</p>
        )}
      </div>
    </div>
  );
}

// ============================================================
// VideoSection with IntersectionObserver tracking
// ============================================================
function VideoSection({ embedUrl, onVisible }: { embedUrl: string; onVisible: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <div ref={ref} className="glow-purple rounded-2xl overflow-hidden">
      <div className="relative gradient-border rounded-2xl overflow-hidden">
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            title="Vidéo de présentation"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
