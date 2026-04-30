'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import type { BatPublic, BatVisual } from '@/lib/api';
import { trackBatEvent } from '@/lib/api';
import AuditScrollAnimator from '@/components/AuditScrollAnimator';

interface Props {
  bat: BatPublic;
}

const STATUS_LABEL: Record<BatPublic['status'], { text: string; color: string; icon: string }> = {
  sent: { text: 'En attente de votre validation', color: 'text-blue-400', icon: 'solar:clock-circle-linear' },
  viewed: { text: 'En cours de consultation', color: 'text-cyan-400', icon: 'solar:eye-linear' },
  commented: { text: 'Commentaires en cours', color: 'text-amber-400', icon: 'solar:chat-round-line-linear' },
  signed: { text: 'BAT signe', color: 'text-green-400', icon: 'solar:check-circle-bold' },
  revision_requested: { text: 'Revision demandee', color: 'text-orange-400', icon: 'solar:refresh-linear' },
  expired: { text: 'BAT expire', color: 'text-red-400', icon: 'solar:close-circle-linear' },
};

export default function BatClient({ bat }: Props) {
  const [zoomVisual, setZoomVisual] = useState<BatVisual | null>(null);
  const trackedZoom = useRef(new Set<number>());

  // Keyboard close on lightbox
  useEffect(() => {
    if (!zoomVisual) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomVisual(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [zoomVisual]);

  const handleZoom = (visual: BatVisual) => {
    setZoomVisual(visual);
    if (!trackedZoom.current.has(visual.id)) {
      trackedZoom.current.add(visual.id);
      trackBatEvent(bat.token, 'visual_zoomed', visual.id).catch(() => {});
    }
  };

  const status = STATUS_LABEL[bat.status] ?? STATUS_LABEL.sent;
  const firstName = bat.client.contact_name.trim().split(' ')[0] || '';
  const totalVisuals = bat.visuals.length;

  return (
    <>
      {/* Header sticky minimal */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-white.svg"
              alt="iDkom"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <div className={`flex items-center gap-2 text-sm ${status.color}`}>
            <Icon icon={status.icon} width={18} />
            <span className="hidden sm:inline">{status.text}</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24">
        {/* HERO CINEMATIQUE */}
        <AuditScrollAnimator>
          <div className="text-center mb-16 md:mb-24">
            {/* Pastille gradient */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#ff2d55]/15 via-[#7928ca]/15 to-[#00d4ff]/15 border border-[#7928ca]/20 text-sm font-medium text-zinc-200 mb-8">
              <Icon icon="solar:pen-new-square-linear" width={18} className="text-[#7928ca]" />
              Bon a tirer
            </div>

            {/* Greeting */}
            {firstName && (
              <p className="text-zinc-500 text-sm uppercase tracking-[0.2em] mb-4">
                Bonjour {firstName}
              </p>
            )}

            {/* Titre projet */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-[1.1]">
              {bat.title}
            </h1>

            {/* Client + ref */}
            <p className="text-zinc-400 text-lg mb-2">
              <span className="text-zinc-500">pour</span>{' '}
              <span className="text-white">{bat.client.company}</span>
            </p>
            {bat.project_ref && (
              <p className="text-zinc-600 text-xs uppercase tracking-wider">Reference {bat.project_ref}</p>
            )}

            {/* Compteur visuels + version */}
            <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 bg-zinc-900/60 border border-zinc-800 rounded-full text-sm">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Icon icon="solar:gallery-wide-linear" width={16} />
                {totalVisuals} maquette{totalVisuals > 1 ? 's' : ''}
              </span>
              {bat.current_version > 1 && (
                <>
                  <span className="text-zinc-700">·</span>
                  <span className="text-[#7928ca]">Version {bat.current_version}</span>
                </>
              )}
              {bat.expiry_date && bat.status !== 'signed' && (
                <>
                  <span className="text-zinc-700">·</span>
                  <span className="text-zinc-500">a valider avant le {formatFr(bat.expiry_date)}</span>
                </>
              )}
            </div>
          </div>
        </AuditScrollAnimator>

        {/* Carte commercial (si dispo) */}
        {bat.sender && (bat.sender.first_name || bat.sender.avatar_url) && (
          <AuditScrollAnimator delay={0.1}>
            <div className="mb-12 max-w-xl mx-auto">
              <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-5 flex items-center gap-4 backdrop-blur-sm">
                {bat.sender.avatar_url ? (
                  <Image
                    src={bat.sender.avatar_url}
                    alt={`${bat.sender.first_name ?? ''}`}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#7928ca]/30 shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff2d55] to-[#7928ca] flex items-center justify-center text-white text-lg font-bold shrink-0">
                    {(bat.sender.first_name ?? 'I').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium">
                    {bat.sender.first_name} {bat.sender.last_name}
                  </p>
                  <p className="text-[#7928ca] text-xs">Votre interlocuteur iDkom</p>
                </div>
              </div>
            </div>
          </AuditScrollAnimator>
        )}

        {/* Message d'intro perso */}
        {bat.intro_message && (
          <AuditScrollAnimator delay={0.15}>
            <div className="mb-16 max-w-3xl mx-auto">
              <div className="relative bg-gradient-to-br from-[#7928ca]/8 via-transparent to-[#00d4ff]/8 border border-zinc-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <Icon
                  icon="solar:quote-up-square-linear"
                  width={28}
                  className="text-[#7928ca]/40 absolute top-4 left-4"
                />
                <div className="text-zinc-200 leading-relaxed pl-10 whitespace-pre-line text-lg">
                  {renderLightMarkdown(bat.intro_message)}
                </div>
              </div>
            </div>
          </AuditScrollAnimator>
        )}

        {/* GALERIE VISUELS */}
        <div className="mb-16">
          <AuditScrollAnimator delay={0.1}>
            <div className="text-center mb-10">
              <p className="text-xs text-zinc-600 uppercase tracking-[0.2em] mb-2">Vos maquettes</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Decouvrez le projet en{' '}
                <span className="bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] bg-clip-text text-transparent">
                  detail
                </span>
              </h2>
            </div>
          </AuditScrollAnimator>

          {totalVisuals === 0 ? (
            <div className="text-center text-zinc-500 py-12">Aucune maquette disponible.</div>
          ) : (
            <div className="space-y-8">
              {bat.visuals.map((v, i) => (
                <AuditScrollAnimator key={v.id} delay={0.05 * i}>
                  <BatVisualCard visual={v} index={i + 1} total={totalVisuals} onZoom={handleZoom} />
                </AuditScrollAnimator>
              ))}
            </div>
          )}
        </div>

        {/* CTA bandeau (Phase 6 ajoutera la signature) */}
        {bat.has_signed ? (
          <AuditScrollAnimator delay={0.1}>
            <div className="bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent border border-green-500/30 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-500/15 flex items-center justify-center">
                <Icon icon="solar:check-circle-bold" width={36} className="text-green-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">BAT valide</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                Merci d&apos;avoir signe ce bon a tirer. Notre equipe a recu votre validation et lance la production.
              </p>
            </div>
          </AuditScrollAnimator>
        ) : bat.status === 'expired' ? (
          <AuditScrollAnimator delay={0.1}>
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 text-center">
              <Icon icon="solar:close-circle-linear" width={36} className="text-red-400 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-white mb-2">Lien expire</h2>
              <p className="text-zinc-400">
                Ce BAT a depasse sa date de validation. Contactez votre interlocuteur iDkom pour le reactiver.
              </p>
            </div>
          </AuditScrollAnimator>
        ) : (
          <AuditScrollAnimator delay={0.1}>
            <div className="relative bg-gradient-to-br from-[#ff2d55]/10 via-[#7928ca]/10 to-[#00d4ff]/10 border border-zinc-800 rounded-2xl p-10 md:p-14 text-center overflow-hidden">
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#ff2d55]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#00d4ff]/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff2d55] via-[#7928ca] to-[#00d4ff] mb-5">
                  <Icon icon="solar:pen-new-square-bold" width={32} className="text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Pret a valider votre BAT&nbsp;?
                </h2>
                <p className="text-zinc-400 mb-2 max-w-xl mx-auto leading-relaxed">
                  La signature en ligne et les commentaires sur visuels arrivent tres bientot.
                </p>
                <p className="text-zinc-500 text-sm mb-8 max-w-xl mx-auto">
                  En attendant, contactez{' '}
                  {bat.sender?.first_name ? (
                    <span className="text-white">{bat.sender.first_name}</span>
                  ) : (
                    <span className="text-white">votre interlocuteur iDkom</span>
                  )}{' '}
                  pour valider ce BAT.
                </p>
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 text-zinc-500 font-medium rounded-xl cursor-not-allowed"
                  title="Disponible tres bientot"
                >
                  <Icon icon="solar:pen-new-square-linear" width={20} />
                  Signer ce BAT (bientot disponible)
                </button>
              </div>
            </div>
          </AuditScrollAnimator>
        )}

        {/* Footer leger */}
        <div className="mt-16 text-center border-t border-zinc-800/50 pt-8">
          <p className="text-zinc-600 text-sm">
            BAT envoye par{' '}
            <Link href="/" className="text-[#7928ca] hover:underline">
              iDkom
            </Link>{' '}
            &mdash; L&apos;Atelier Phygital
          </p>
          <p className="text-zinc-700 text-xs mt-1">www.idkom.fr</p>
        </div>
      </main>

      {/* LIGHTBOX */}
      {zoomVisual && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col"
          onClick={() => setZoomVisual(null)}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/50 shrink-0">
            <div className="flex items-center gap-3">
              {zoomVisual.title && (
                <span className="text-white font-medium">{zoomVisual.title}</span>
              )}
              <span className="text-zinc-600 text-xs">
                {zoomVisual.width && zoomVisual.height
                  ? `${zoomVisual.width} × ${zoomVisual.height} px`
                  : zoomVisual.is_pdf
                  ? 'Document PDF'
                  : ''}
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setZoomVisual(null);
              }}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Fermer"
            >
              <Icon icon="solar:close-circle-linear" width={28} />
            </button>
          </div>

          {/* Content */}
          <div
            className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {zoomVisual.is_pdf ? (
              <iframe
                src={zoomVisual.url}
                className="w-full h-full max-w-5xl bg-white rounded-lg"
                title={zoomVisual.title ?? 'Document PDF'}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={zoomVisual.url}
                alt={zoomVisual.title ?? ''}
                className="max-w-full max-h-full object-contain rounded-lg"
                style={{ touchAction: 'pinch-zoom' }}
              />
            )}
          </div>

          {/* Caption */}
          {zoomVisual.caption && (
            <div className="px-6 py-4 border-t border-zinc-800/50 text-zinc-400 text-sm text-center max-w-3xl mx-auto shrink-0">
              {zoomVisual.caption}
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ============================================================
// Visual card
// ============================================================
interface VisualCardProps {
  visual: BatVisual;
  index: number;
  total: number;
  onZoom: (v: BatVisual) => void;
}

function BatVisualCard({ visual, index, total, onZoom }: VisualCardProps) {
  const aspectRatio =
    visual.width && visual.height ? `${visual.width} / ${visual.height}` : '16 / 9';

  return (
    <article className="group bg-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-zinc-700 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-zinc-500">
            {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          {visual.title && (
            <span className="text-white font-medium text-sm">{visual.title}</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => onZoom(visual)}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <Icon icon="solar:magnifer-zoom-in-linear" width={16} />
          Agrandir
        </button>
      </div>

      {/* Visual */}
      <button
        type="button"
        onClick={() => onZoom(visual)}
        className="block w-full bg-black/40 cursor-zoom-in"
      >
        <div className="relative w-full" style={{ aspectRatio }}>
          {visual.is_pdf ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400">
              <Icon icon="solar:document-bold" width={64} className="text-red-400 mb-3" />
              <p className="text-sm">Document PDF</p>
              {visual.pages_count && (
                <p className="text-xs text-zinc-600 mt-1">
                  {visual.pages_count} page{visual.pages_count > 1 ? 's' : ''}
                </p>
              )}
              <p className="text-xs text-[#7928ca] mt-3">Cliquez pour ouvrir</p>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={visual.url}
              alt={visual.title ?? `Visuel ${index}`}
              className="absolute inset-0 w-full h-full object-contain group-hover:scale-[1.01] transition-transform duration-500"
              loading="lazy"
            />
          )}
        </div>
      </button>

      {/* Caption */}
      {visual.caption && (
        <div className="px-5 py-4 text-zinc-400 text-sm leading-relaxed">{visual.caption}</div>
      )}
    </article>
  );
}

// ============================================================
// Helpers
// ============================================================
function formatFr(date: string): string {
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date));
  } catch {
    return date;
  }
}

/**
 * Markdown très léger : **gras**, *italique*, sauts de ligne, liens.
 * Sécurisé : on échappe d'abord, puis on ré-injecte du HTML contrôlé.
 */
function renderLightMarkdown(text: string): React.ReactNode {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const html = escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    .replace(
      /(https?:\/\/[^\s<]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#7928ca] underline">$1</a>',
    );

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
