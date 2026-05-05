'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import type { BatPublic, BatVisual, BatComment } from '@/lib/api';
import { trackBatEvent, submitBatComment, requestBatRevision } from '@/lib/api';
import AuditScrollAnimator from '@/components/AuditScrollAnimator';
import BatSignatureModal from '@/components/BatSignatureModal';
import BatCommentsPanel from '@/components/BatCommentsPanel';

interface Props {
  bat: BatPublic;
}

const STATUS_LABEL: Record<BatPublic['status'], { text: string; color: string; icon: string }> = {
  draft: { text: 'Brouillon (non envoye)', color: 'text-zinc-400', icon: 'solar:pen-linear' },
  sent: { text: 'En attente de votre validation', color: 'text-blue-400', icon: 'solar:clock-circle-linear' },
  viewed: { text: 'En cours de consultation', color: 'text-cyan-400', icon: 'solar:eye-linear' },
  commented: { text: 'Commentaires en cours', color: 'text-amber-400', icon: 'solar:chat-round-line-linear' },
  signed: { text: 'BAT signe', color: 'text-green-400', icon: 'solar:check-circle-bold' },
  revision_requested: { text: 'Revision demandee', color: 'text-orange-400', icon: 'solar:refresh-linear' },
  expired: { text: 'BAT expire', color: 'text-red-400', icon: 'solar:close-circle-linear' },
  archived: { text: 'BAT archive', color: 'text-zinc-500', icon: 'solar:archive-linear' },
};

export default function BatClient({ bat }: Props) {
  const has3dVisual = useMemo(() => bat.visuals.some((v) => v.is_3d), [bat.visuals]);
  const [modelViewerReady, setModelViewerReady] = useState(false);
  const [zoomVisual, setZoomVisual] = useState<BatVisual | null>(null);
  const [signOpen, setSignOpen] = useState(false);
  const [hasSigned, setHasSigned] = useState(bat.has_signed);
  const [justSigned, setJustSigned] = useState(false);
  // Commentaires
  const [comments, setComments] = useState<BatComment[]>(bat.comments);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelContextVisualId, setPanelContextVisualId] = useState<number | null>(null);
  // Mode annoter dans le lightbox + pin temporaire
  const [annotateMode, setAnnotateMode] = useState(false);
  const [pendingPin, setPendingPin] = useState<{ visualId: number; x: number; y: number } | null>(null);
  const [pinBody, setPinBody] = useState('');
  const [pinSubmitting, setPinSubmitting] = useState(false);
  const [pinError, setPinError] = useState<string | null>(null);
  // Demande de revision
  const [revisionOpen, setRevisionOpen] = useState(false);
  const [revisionMsg, setRevisionMsg] = useState('');
  const [revisionSubmitting, setRevisionSubmitting] = useState(false);
  const [revisionError, setRevisionError] = useState<string | null>(null);
  const [statusOverride, setStatusOverride] = useState<BatPublic['status'] | null>(null);
  const trackedZoom = useRef(new Set<number>());

  // Lazy-load model-viewer apres que la page soit interactive (idle).
  // Le bundle pese ~290 Ko + 7s d evaluation main thread (Three.js + Web Component) ;
  // l importer au mount detruit le TBT/LCP. Avec requestIdleCallback, le 3D arrive
  // ~1s apres l affichage de la page, pour un TBT proche de 0.
  useEffect(() => {
    if (!has3dVisual) return;
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const start = () => {
      if (cancelled) return;
      import('@google/model-viewer')
        .then(() => {
          if (!cancelled) setModelViewerReady(true);
        })
        .catch(() => {
          // Si le bundle echoue (offline / CDN HS), on laisse le placeholder
        });
    };

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === 'function') {
      idleId = win.requestIdleCallback(start, { timeout: 3000 });
    } else {
      // Fallback Safari (pas de requestIdleCallback) : on differe d 1.5s
      timeoutId = window.setTimeout(start, 1500);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof win.cancelIdleCallback === 'function') {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [has3dVisual]);

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
    setAnnotateMode(false);
    setPendingPin(null);
    if (!trackedZoom.current.has(visual.id)) {
      trackedZoom.current.add(visual.id);
      trackBatEvent(bat.token, 'visual_zoomed', visual.id).catch(() => {});
    }
  };

  // Pose un pin a la position cliquee dans l image du lightbox
  const handleVisualClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!annotateMode || !zoomVisual) return;
    e.stopPropagation();
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPendingPin({ visualId: zoomVisual.id, x, y });
    setPinBody('');
    setPinError(null);
  };

  const submitPin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingPin || pinBody.trim().length < 1) return;
    setPinSubmitting(true);
    setPinError(null);
    try {
      const cmt = await submitBatComment(bat.token, {
        body: pinBody.trim(),
        visual_id: pendingPin.visualId,
        pin_x: Number(pendingPin.x.toFixed(2)),
        pin_y: Number(pendingPin.y.toFixed(2)),
      });
      setComments((prev) => [...prev, cmt]);
      setPendingPin(null);
      setPinBody('');
    } catch (err) {
      setPinError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setPinSubmitting(false);
    }
  };

  // Click sur un pin existant : ouvre le side panel filtre sur ce visuel
  const openPanelForVisual = (visualId: number | null) => {
    setPanelContextVisualId(visualId);
    setPanelOpen(true);
  };

  const handleCommentAdded = (cmt: BatComment) => {
    setComments((prev) => [...prev, cmt]);
  };

  // Pins groupes par visuel (pour overlay dans le lightbox)
  const pinsByVisual = useMemo(() => {
    const m = new Map<number, BatComment[]>();
    comments.forEach((c) => {
      if (c.pin_x !== null && c.pin_y !== null && c.visual_id !== null && !c.parent_id) {
        const arr = m.get(c.visual_id) ?? [];
        arr.push(c);
        m.set(c.visual_id, arr);
      }
    });
    return m;
  }, [comments]);

  // Compteurs de commentaires par visuel (pour badge dans la galerie)
  const commentCountByVisual = useMemo(() => {
    const m = new Map<number, number>();
    comments.forEach((c) => {
      if (c.visual_id !== null && !c.parent_id) {
        m.set(c.visual_id, (m.get(c.visual_id) ?? 0) + 1);
      }
    });
    return m;
  }, [comments]);

  // Confettis aux couleurs iDkom apres une signature reussie
  const handleSigned = async () => {
    setHasSigned(true);
    setJustSigned(true);
    setSignOpen(false);
    try {
      const confetti = (await import('canvas-confetti')).default;
      const colors = ['#ff2d55', '#7928ca', '#00d4ff'];
      const fire = (origin: { x: number; y: number }) =>
        confetti({
          particleCount: 80,
          spread: 70,
          startVelocity: 45,
          origin,
          colors,
          ticks: 200,
        });
      // 3 bursts pour un effet plus riche
      fire({ x: 0.5, y: 0.6 });
      setTimeout(() => fire({ x: 0.2, y: 0.7 }), 200);
      setTimeout(() => fire({ x: 0.8, y: 0.7 }), 400);
    } catch {
      // canvas-confetti facultatif : si import echoue on continue sans
    }
    // Scroll vers le bandeau success
    setTimeout(() => {
      document.getElementById('bat-signed-banner')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleRequestRevision = async (e: React.FormEvent) => {
    e.preventDefault();
    setRevisionSubmitting(true);
    setRevisionError(null);
    try {
      await requestBatRevision(bat.token, revisionMsg.trim());
      setStatusOverride('revision_requested');
      setRevisionOpen(false);
      setRevisionMsg('');
    } catch (err) {
      setRevisionError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setRevisionSubmitting(false);
    }
  };

  const effectiveStatus = statusOverride ?? bat.status;
  const status = STATUS_LABEL[effectiveStatus] ?? STATUS_LABEL.sent;
  const firstName = bat.client.contact_name.trim().split(' ')[0] || '';
  const totalVisuals = bat.visuals.length;
  const isPreview = bat.is_preview;
  const canSign = !isPreview
    && bat.config.require_signature
    && !hasSigned
    && effectiveStatus !== 'expired'
    && effectiveStatus !== 'revision_requested';
  const canRequestRevision = !isPreview
    && !hasSigned
    && effectiveStatus !== 'expired'
    && effectiveStatus !== 'revision_requested';

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

      {isPreview && (
        <div className="fixed top-16 left-0 right-0 z-30 bg-gradient-to-r from-[#7928ca] via-[#ff2d55] to-[#00d4ff] text-white text-sm font-medium px-6 py-2.5 flex items-center justify-center gap-3 shadow-lg">
          <Icon icon="solar:eye-linear" width={18} />
          <span>Mode aper&ccedil;u (admin) &mdash; les actions sont desactivees, le client ne voit pas ce bandeau.</span>
        </div>
      )}

      <main className={`relative z-10 max-w-6xl mx-auto px-6 ${isPreview ? 'pt-40' : 'pt-28'} pb-24`}>
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
                  <BatVisualCard
                    visual={v}
                    index={i + 1}
                    total={totalVisuals}
                    onZoom={handleZoom}
                    commentCount={commentCountByVisual.get(v.id) ?? 0}
                    onShowComments={() => openPanelForVisual(v.id)}
                    modelViewerReady={modelViewerReady}
                  />
                </AuditScrollAnimator>
              ))}
            </div>
          )}
        </div>

        {/* CTA bandeau de signature */}
        {hasSigned ? (
          <AuditScrollAnimator delay={0.1}>
            <div
              id="bat-signed-banner"
              className="bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent border border-green-500/30 rounded-2xl p-10 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-500/15 flex items-center justify-center">
                <Icon icon="solar:check-circle-bold" width={36} className="text-green-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {justSigned ? 'Merci, votre BAT est signe !' : 'BAT valide'}
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                {justSigned
                  ? "Une confirmation vient d'etre envoyee dans votre boite mail. Notre equipe lance la production."
                  : "Merci d'avoir signe ce bon a tirer. Notre equipe a recu votre validation et lance la production."}
              </p>
            </div>
          </AuditScrollAnimator>
        ) : effectiveStatus === 'expired' ? (
          <AuditScrollAnimator delay={0.1}>
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 text-center">
              <Icon icon="solar:close-circle-linear" width={36} className="text-red-400 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-white mb-2">Lien expire</h2>
              <p className="text-zinc-400">
                Ce BAT a depasse sa date de validation. Contactez votre interlocuteur iDkom pour le reactiver.
              </p>
            </div>
          </AuditScrollAnimator>
        ) : effectiveStatus === 'revision_requested' ? (
          <AuditScrollAnimator delay={0.1}>
            <div className="bg-orange-500/5 border border-orange-500/30 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-orange-500/15 flex items-center justify-center">
                <Icon icon="solar:refresh-linear" width={36} className="text-orange-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Revision en cours de preparation</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                Votre demande a ete transmise. {bat.sender?.first_name ?? 'Notre equipe'} prepare une nouvelle version
                qui vous sera envoyee tres prochainement.
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
                <p className="text-zinc-400 mb-8 max-w-xl mx-auto leading-relaxed">
                  Signez electroniquement pour donner votre accord et lancer la production.
                  Si quelque chose ne vous convient pas, demandez une revision.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  {canSign ? (
                    <button
                      type="button"
                      onClick={() => setSignOpen(true)}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-lg shadow-lg shadow-[#7928ca]/20"
                    >
                      <Icon icon="solar:pen-new-square-bold" width={22} />
                      Signer ce BAT
                    </button>
                  ) : (
                    <p className="text-zinc-500 text-sm">
                      La signature n&apos;est pas requise sur ce BAT. Contactez{' '}
                      {bat.sender?.first_name ? (
                        <span className="text-white">{bat.sender.first_name}</span>
                      ) : (
                        <span className="text-white">votre interlocuteur iDkom</span>
                      )}{' '}
                      pour valider.
                    </p>
                  )}
                  {canRequestRevision && (
                    <button
                      type="button"
                      onClick={() => setRevisionOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-medium rounded-xl transition-colors"
                    >
                      <Icon icon="solar:refresh-linear" width={20} />
                      Demander une revision
                    </button>
                  )}
                </div>
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
      {zoomVisual && (() => {
        const visualPins = pinsByVisual.get(zoomVisual.id) ?? [];
        const canAnnotate = !isPreview && bat.config.allow_comments && !hasSigned && bat.status !== 'expired' && !zoomVisual.is_pdf && !zoomVisual.is_3d;
        return (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col"
          onClick={() => {
            if (annotateMode || pendingPin) return; // ne pas fermer en cours d annotation
            setZoomVisual(null);
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/50 shrink-0">
            <div className="flex items-center gap-3">
              {zoomVisual.title && (
                <span className="text-white font-medium">{zoomVisual.title}</span>
              )}
              <span className="text-zinc-600 text-xs">
                {zoomVisual.is_3d
                  ? 'Modele 3D'
                  : zoomVisual.is_pdf
                  ? 'Document PDF'
                  : zoomVisual.width && zoomVisual.height
                  ? `${zoomVisual.width} × ${zoomVisual.height} px`
                  : ''}
              </span>
              {formatDimensions(zoomVisual) && (
                <span className="flex items-center gap-1 text-xs text-[#00d4ff]">
                  <Icon icon="solar:ruler-linear" width={13} />
                  {formatDimensions(zoomVisual)}
                </span>
              )}
              {visualPins.length > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#7928ca]/20 text-[#7928ca]">
                  {visualPins.length} epingle{visualPins.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {canAnnotate && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAnnotateMode((v) => !v);
                    setPendingPin(null);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${annotateMode ? 'bg-[#7928ca] text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                >
                  <Icon icon="solar:map-point-add-linear" width={16} />
                  {annotateMode ? 'Mode annotation actif' : 'Annoter'}
                </button>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomVisual(null);
                  setAnnotateMode(false);
                  setPendingPin(null);
                }}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                aria-label="Fermer"
              >
                <Icon icon="solar:close-circle-linear" width={28} />
              </button>
            </div>
          </div>

          {/* Hint mode annoter */}
          {annotateMode && !pendingPin && (
            <div className="px-6 py-2 bg-[#7928ca]/15 border-b border-[#7928ca]/20 text-center text-sm text-[#c4a5ff] shrink-0">
              <Icon icon="solar:cursor-linear" width={14} className="inline-block mr-1" />
              Cliquez sur la maquette a l&apos;endroit que vous souhaitez commenter.
            </div>
          )}

          {/* Content */}
          <div
            className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {zoomVisual.is_pdf ? (
              <div className="text-center max-w-md">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
                  <Icon icon="solar:document-bold" width={56} className="text-red-400" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">{zoomVisual.title ?? 'Document PDF'}</h3>
                {zoomVisual.pages_count && (
                  <p className="text-zinc-500 text-sm mb-6">
                    {zoomVisual.pages_count} page{zoomVisual.pages_count > 1 ? 's' : ''}
                  </p>
                )}
                <a
                  href={zoomVisual.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Icon icon="solar:square-arrow-right-up-linear" width={20} />
                  Ouvrir le PDF dans un nouvel onglet
                </a>
              </div>
            ) : zoomVisual.is_3d ? (
              <div className="w-full h-full max-w-5xl mx-auto flex items-center justify-center">
                {modelViewerReady ? (
                  <model-viewer
                    src={zoomVisual.url}
                    alt={zoomVisual.title ?? 'Modele 3D'}
                    auto-rotate
                    camera-controls
                    touch-action="pan-y"
                    shadow-intensity="1"
                    shadow-softness="0.8"
                    exposure="1.1"
                    environment-image="neutral"
                    rotation-per-second="20deg"
                    auto-rotate-delay="0"
                    interaction-prompt="when-focused"
                    loading="eager"
                    style={{
                      width: '100%',
                      height: '80vh',
                      background: 'transparent',
                    }}
                  />
                ) : (
                  <div className="text-zinc-500 text-sm flex items-center gap-2">
                    <Icon icon="solar:cube-linear" width={20} className="animate-pulse" />
                    Chargement du modele 3D...
                  </div>
                )}
              </div>
            ) : (
              <div className="relative inline-block max-w-full max-h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={zoomVisual.url}
                  alt={zoomVisual.title ?? ''}
                  className={`max-w-full max-h-[80vh] object-contain rounded-lg ${annotateMode ? 'cursor-crosshair' : ''}`}
                  style={{ touchAction: annotateMode ? 'none' : 'pinch-zoom' }}
                  onClick={handleVisualClick}
                />
                {/* Pins existants */}
                {visualPins.map((pin, i) => (
                  <button
                    key={pin.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openPanelForVisual(zoomVisual.id);
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group/pin"
                    style={{ left: `${pin.pin_x}%`, top: `${pin.pin_y}%` }}
                    title={pin.body}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#ff2d55] to-[#7928ca] flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-black/50 ring-2 ring-white/80 group-hover/pin:scale-110 transition-transform">
                      {i + 1}
                    </div>
                  </button>
                ))}
                {/* Pin temporaire (en cours de saisie) */}
                {pendingPin && pendingPin.visualId === zoomVisual.id && (
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: `${pendingPin.x}%`, top: `${pendingPin.y}%` }}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#ff2d55] to-[#7928ca] ring-2 ring-white/80 animate-pulse" />
                    {/* Popup */}
                    <form
                      onSubmit={submitPin}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-9 left-1/2 -translate-x-1/2 w-72 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-3 z-20"
                    >
                      <textarea
                        value={pinBody}
                        onChange={(e) => setPinBody(e.target.value)}
                        autoFocus
                        rows={3}
                        maxLength={2000}
                        placeholder="Votre commentaire sur cette zone..."
                        disabled={pinSubmitting}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#7928ca] resize-none disabled:opacity-50"
                      />
                      {pinError && (
                        <p className="text-xs text-red-300 mt-1">{pinError}</p>
                      )}
                      <div className="flex items-center justify-between gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => setPendingPin(null)}
                          disabled={pinSubmitting}
                          className="text-xs text-zinc-400 hover:text-white px-2 py-1 disabled:opacity-50"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          disabled={pinSubmitting || pinBody.trim().length === 0}
                          className="text-xs px-3 py-1.5 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          {pinSubmitting ? 'Envoi...' : 'Ajouter'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Caption */}
          {zoomVisual.caption && (
            <div className="px-6 py-4 border-t border-zinc-800/50 text-zinc-400 text-sm text-center max-w-3xl mx-auto shrink-0">
              {zoomVisual.caption}
            </div>
          )}
        </div>
        );
      })()}

      {/* FAB commentaires (flottant en bas-droite) */}
      {!isPreview && bat.config.allow_comments && !hasSigned && bat.status !== 'expired' && (
        <button
          type="button"
          onClick={() => {
            setPanelContextVisualId(null);
            setPanelOpen(true);
          }}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-medium rounded-full shadow-2xl shadow-[#7928ca]/30 hover:opacity-90 transition-opacity"
        >
          <Icon icon="solar:chat-round-line-bold" width={18} />
          <span className="hidden sm:inline">Commentaires</span>
          {comments.length > 0 && (
            <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {comments.length}
            </span>
          )}
        </button>
      )}

      {/* Side panel commentaires */}
      <BatCommentsPanel
        token={bat.token}
        visuals={bat.visuals}
        initialComments={comments}
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        onAdded={handleCommentAdded}
        contextVisualId={panelContextVisualId}
        canComment={bat.config.allow_comments && !hasSigned && bat.status !== 'expired'}
      />

      {/* Modal de signature */}
      <BatSignatureModal
        bat={bat}
        isOpen={signOpen}
        onClose={() => setSignOpen(false)}
        onSigned={handleSigned}
      />

      {/* Modal demande de revision */}
      {revisionOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => !revisionSubmitting && setRevisionOpen(false)}>
          <form
            onSubmit={handleRequestRevision}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center shrink-0">
                <Icon icon="solar:refresh-linear" width={20} className="text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">Demander une revision</h3>
                <p className="text-zinc-400 text-sm">
                  Decrivez ce qui doit etre ajuste. Notre equipe preparera une nouvelle version.
                </p>
              </div>
            </div>
            <textarea
              value={revisionMsg}
              onChange={(e) => setRevisionMsg(e.target.value)}
              maxLength={2000}
              rows={5}
              placeholder="Ex: les couleurs du logo doivent etre plus vives, et la position du visuel 2 a ajuster..."
              disabled={revisionSubmitting}
              className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-orange-400 resize-none disabled:opacity-50"
            />
            {revisionError && (
              <div className="text-xs text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {revisionError}
              </div>
            )}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setRevisionOpen(false)}
                disabled={revisionSubmitting}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={revisionSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {revisionSubmitting ? (
                  <>
                    <Icon icon="solar:refresh-linear" width={16} className="animate-spin" />
                    Envoi...
                  </>
                ) : (
                  <>
                    <Icon icon="solar:plain-2-linear" width={16} />
                    Envoyer la demande
                  </>
                )}
              </button>
            </div>
          </form>
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
  commentCount: number;
  onShowComments: () => void;
  modelViewerReady: boolean;
}

function BatVisualCard({ visual, index, total, onZoom, commentCount, onShowComments, modelViewerReady }: VisualCardProps) {
  const aspectRatio =
    visual.width && visual.height ? `${visual.width} / ${visual.height}` : '16 / 9';
  const dims = formatDimensions(visual);

  return (
    <article className="group bg-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-zinc-700 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/50 gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-medium text-zinc-500">
            {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          {visual.title && (
            <span className="text-white font-medium text-sm">{visual.title}</span>
          )}
          {visual.is_3d && (
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-[#7928ca]/20 to-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/20">
              <Icon icon="solar:cube-linear" width={11} />
              3D
            </span>
          )}
          {dims && (
            <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
              <Icon icon="solar:ruler-linear" width={13} className="text-[#00d4ff]" />
              {dims}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {commentCount > 0 && (
            <button
              type="button"
              onClick={onShowComments}
              className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 px-3 py-1.5 rounded-lg hover:bg-amber-500/10 transition-colors"
              title="Voir les commentaires de ce visuel"
            >
              <Icon icon="solar:chat-round-line-bold" width={14} />
              {commentCount}
            </button>
          )}
          {visual.is_pdf ? (
            <a
              href={visual.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Icon icon="solar:square-arrow-right-up-linear" width={16} />
              Ouvrir
            </a>
          ) : visual.is_3d ? (
            <button
              type="button"
              onClick={() => onZoom(visual)}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Icon icon="solar:full-screen-linear" width={16} />
              Plein ecran
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onZoom(visual)}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Icon icon="solar:magnifer-zoom-in-linear" width={16} />
              Agrandir
            </button>
          )}
        </div>
      </div>

      {/* Visual */}
      {visual.is_pdf ? (
        <a
          href={visual.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-black/40 cursor-pointer group/pdf"
        >
          <div className="relative w-full flex items-center justify-center py-16 bg-gradient-to-br from-red-500/5 via-transparent to-[#7928ca]/5">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 mb-4 group-hover/pdf:scale-105 transition-transform">
                <Icon icon="solar:document-bold" width={44} className="text-red-400" />
              </div>
              <p className="text-white font-medium mb-1">Document PDF</p>
              {visual.pages_count && (
                <p className="text-xs text-zinc-500 mb-3">
                  {visual.pages_count} page{visual.pages_count > 1 ? 's' : ''}
                </p>
              )}
              <p className="inline-flex items-center gap-1.5 text-sm text-[#7928ca] group-hover/pdf:text-[#a78bfa]">
                <Icon icon="solar:square-arrow-right-up-linear" width={16} />
                Ouvrir le PDF dans un nouvel onglet
              </p>
            </div>
          </div>
        </a>
      ) : visual.is_3d ? (
        <div className="relative w-full bg-gradient-to-br from-[#0f0f1a] via-[#1a1530] to-[#0f1a25] aspect-square sm:aspect-[16/10]">
          {modelViewerReady ? (
            <model-viewer
              src={visual.url}
              alt={visual.title ?? `Modele 3D ${index}`}
              auto-rotate
              camera-controls
              touch-action="pan-y"
              shadow-intensity="1"
              shadow-softness="0.8"
              exposure="1.1"
              environment-image="neutral"
              rotation-per-second="20deg"
              auto-rotate-delay="0"
              interaction-prompt="when-focused"
              loading="lazy"
              style={{ width: '100%', height: '100%', background: 'transparent' }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-sm gap-2">
              <Icon icon="solar:cube-linear" width={20} className="animate-pulse" />
              Chargement du modele 3D...
            </div>
          )}
          {/* Indicateur d interaction discret */}
          <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 text-[11px] text-zinc-400 bg-black/40 backdrop-blur px-2.5 py-1 rounded-full pointer-events-none">
            <Icon icon="solar:hand-shake-linear" width={12} />
            Tournez avec la souris
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onZoom(visual)}
          className="block w-full bg-black/40 cursor-zoom-in"
        >
          <div className="relative w-full" style={{ aspectRatio }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={visual.url}
              alt={visual.title ?? `Visuel ${index}`}
              className="absolute inset-0 w-full h-full object-contain group-hover:scale-[1.01] transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </button>
      )}

      {/* Caption */}
      {visual.caption && (
        <div className="px-5 py-4 text-zinc-400 text-sm leading-relaxed">{visual.caption}</div>
      )}
    </article>
  );
}

// ============================================================
// Format dimensions: returns "50 × 30 × 8 mm" or null
// ============================================================
function formatDimensions(visual: BatVisual): string | null {
  const { dim_width_mm, dim_height_mm, dim_depth_mm, dim_unit } = visual;
  if (!dim_width_mm && !dim_height_mm && !dim_depth_mm) return null;
  const div = dim_unit === 'mm' ? 1 : 10;
  const fmt = (mm: number | null) => {
    if (mm === null) return null;
    const v = mm / div;
    // Pas de decimales inutiles
    return Number.isInteger(v) ? String(v) : v.toFixed(1).replace(/\.0$/, '');
  };
  const parts = [fmt(dim_width_mm), fmt(dim_height_mm), fmt(dim_depth_mm)].filter(
    (p): p is string => p !== null,
  );
  if (parts.length === 0) return null;
  return `${parts.join(' × ')} ${dim_unit}`;
}

// ============================================================
// Helpers
// ============================================================
// Formatage deterministe (sans Intl, sans Date) — identique cote serveur (Node ICU)
// et cote navigateur, donc pas de risque d hydration mismatch (React #418).
const MONTHS_FR = [
  'janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre',
];
function formatFr(date: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(date);
  if (!m) return date;
  const [, y, mo, d] = m;
  const monthName = MONTHS_FR[parseInt(mo, 10) - 1];
  if (!monthName) return date;
  return `${parseInt(d, 10)} ${monthName} ${y}`;
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
