'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import type { Proposition } from '@/lib/api';
import { trackPropositionEvent } from '@/lib/api';
import GlowingImageFrame from './GlowingImageFrame';
import MarkdownContent from './MarkdownContent';
import PropositionSections from './PropositionSections';
import PropositionOptions from './PropositionOptions';

// ============================================================
// Video embed helper
// ============================================================
function getVideoEmbedUrl(url: string): string | null {
  // YouTube
  let match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (match) return `https://www.youtube.com/embed/${match[1]}?rel=0`;

  // Vimeo
  match = url.match(/vimeo\.com\/(\d+)/);
  if (match) return `https://player.vimeo.com/video/${match[1]}`;

  return null;
}

// ============================================================
// Main Component
// ============================================================
export default function PropositionPage({ proposition: prop, slug }: { proposition: Proposition; slug: string }) {
  const [ctaClicked, setCtaClicked] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const audioTracked = useRef(false);
  const videoTracked = useRef(false);

  const trackEvent = useCallback((event: string) => {
    trackPropositionEvent(slug, event).catch(() => {});
  }, [slug]);

  const handleCtaClick = async () => {
    if (ctaClicked) return;
    setCtaClicked(true);
    trackEvent('cta_clicked');
  };

  const handleMusicToggle = () => {
    const audio = musicRef.current;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
    } else {
      audio.play();
      if (!audioTracked.current) {
        trackEvent('audio_played');
        audioTracked.current = true;
      }
    }
    setMusicPlaying(!musicPlaying);
  };

  const handleAudioPlay = () => {
    if (!audioTracked.current) {
      trackEvent('audio_played');
      audioTracked.current = true;
    }
  };

  const handleVideoVisible = useCallback(() => {
    if (!videoTracked.current) {
      trackEvent('video_played');
      videoTracked.current = true;
    }
  }, [trackEvent]);

  const videoEmbedUrl = prop.media.video_url ? getVideoEmbedUrl(prop.media.video_url) : null;

  return (
    <main className="relative z-10 min-h-screen">
      {/* Ambient music (hidden audio) */}
      {prop.media.music_url && (
        <audio ref={musicRef} src={prop.media.music_url} loop preload="none" />
      )}

      {/* Music toggle button (floating) */}
      {prop.media.music_url && (
        <button
          onClick={handleMusicToggle}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-700 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
          title={musicPlaying ? 'Couper la musique' : 'Jouer la musique'}
        >
          <Icon icon={musicPlaying ? 'solar:volume-loud-linear' : 'solar:volume-cross-linear'} width={20} />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-16">

        {/* ============================================================ */}
        {/* HERO: Logos + Title + Presenter */}
        {/* ============================================================ */}
        <div className="text-center mb-20">
          {/* Two logos side by side */}
          {(prop.reseller.logo || prop.client.logo) && (
            <div className="flex items-center justify-center gap-6 md:gap-10 mb-10">
              {prop.reseller.logo && (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 flex items-center justify-center backdrop-blur-sm">
                  <img src={prop.reseller.logo.url} alt={prop.reseller.logo.alt} className="max-w-full max-h-full object-contain" />
                </div>
              )}
              {prop.reseller.logo && prop.client.logo && (
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-px bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff]" />
                  <span className="text-zinc-600 text-xs font-medium">x</span>
                  <div className="w-8 h-px bg-gradient-to-r from-[#00d4ff] via-[#7928ca] to-[#ff2d55]" />
                </div>
              )}
              {prop.client.logo && (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 flex items-center justify-center backdrop-blur-sm">
                  <img src={prop.client.logo.url} alt={prop.client.logo.alt} className="max-w-full max-h-full object-contain" />
                </div>
              )}
            </div>
          )}

          {/* "Spécialement pour" badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7928ca]/10 text-[#7928ca] text-sm font-medium mb-6">
            <Icon icon="solar:star-shine-linear" width={18} />
            Spécialement conçu pour {prop.client.company}
          </div>

          {/* Concept title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="gradient-text">{prop.title}</span>
          </h1>

          {/* Presenter */}
          <div className="flex items-center justify-center gap-3">
            {prop.reseller.avatar ? (
              <img
                src={prop.reseller.avatar.url}
                alt={prop.reseller.avatar.alt}
                className="w-10 h-10 rounded-full object-cover border-2 border-zinc-700"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff2d55] to-[#7928ca] flex items-center justify-center text-white font-bold text-sm">
                {prop.reseller.contact.charAt(0).toUpperCase()}
              </div>
            )}
            <p className="text-zinc-400">
              Proposé par <span className="text-white font-medium">{prop.reseller.contact}</span>
              <span className="text-zinc-600"> &mdash; {prop.reseller.company}</span>
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PRESENTATION TEXT */}
        {/* ============================================================ */}
        {prop.presentation && (
          <div className="max-w-3xl mx-auto mb-20">
            <article className="prose prose-invert prose-zinc max-w-none">
              <MarkdownContent content={prop.presentation} />
            </article>
          </div>
        )}

        {/* ============================================================ */}
        {/* FEATURED IMAGE */}
        {/* ============================================================ */}
        {prop.featured_image?.url && (
          <div className="mb-20">
            <GlowingImageFrame
              src={prop.featured_image.url}
              alt={prop.featured_image.alt || prop.title}
              fallbackIcon={<Icon icon="solar:star-shine-linear" className="text-zinc-700" width={64} />}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* AUDIO MESSAGE (before sections) */}
        {/* ============================================================ */}
        {prop.media.audio_message_url && (
          <div className="max-w-2xl mx-auto mb-20">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                {prop.reseller.avatar ? (
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
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTIONS */}
        {/* ============================================================ */}
        {(prop.sections.length > 0 || videoEmbedUrl) && (
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Notre <span className="gradient-text">concept</span>
              </h2>
              <p className="text-zinc-500 max-w-lg mx-auto">
                Découvrez en détail ce que nous avons imaginé pour vous
              </p>
            </div>

            {/* Video after title, before steps */}
            {videoEmbedUrl && (
              <div className="max-w-4xl mx-auto mb-16">
                <VideoSection embedUrl={videoEmbedUrl} onVisible={handleVideoVisible} />
              </div>
            )}

            {prop.sections.length > 0 && <PropositionSections sections={prop.sections} />}
          </div>
        )}

        {/* ============================================================ */}
        {/* OPTIONS / EXTRAS */}
        {/* ============================================================ */}
        {prop.options.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Options & <span className="gradient-text">extras</span>
              </h2>
              <p className="text-zinc-500 max-w-lg mx-auto">
                Pour enrichir encore plus votre expérience
              </p>
            </div>
            <PropositionOptions options={prop.options} />
          </div>
        )}

        {/* ============================================================ */}
        {/* CTA */}
        {/* ============================================================ */}
        {prop.cta.enabled && (
          <div className="text-center mb-16">
            <div className="bg-gradient-to-br from-[#ff2d55]/5 via-[#7928ca]/5 to-[#00d4ff]/5 border border-zinc-800 rounded-2xl p-10 max-w-2xl mx-auto">
              <Icon icon="solar:chat-round-dots-linear" className="text-[#7928ca] mx-auto mb-4" width={40} />
              <h2 className="text-2xl font-bold text-white mb-3">Intéressé(e) ?</h2>
              <p className="text-zinc-400 mb-6">
                Faites-nous savoir que cette proposition vous intéresse, nous vous recontactons rapidement.
              </p>
              {ctaClicked ? (
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg">
                  <Icon icon="solar:check-circle-linear" width={20} />
                  Merci ! Votre intérêt a été transmis.
                </div>
              ) : (
                <button
                  onClick={handleCtaClick}
                  className="px-12 py-4 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white text-lg font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-[#7928ca]/25"
                >
                  {prop.cta.text}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MINI FOOTER */}
        {/* ============================================================ */}
        <div className="text-center py-8 text-zinc-600 text-xs">
          Propulsé par{' '}
          <a href="https://www.idkom.fr" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
            iDkom
          </a>
        </div>
      </div>
    </main>
  );
}

// ============================================================
// Video section with IntersectionObserver tracking
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
