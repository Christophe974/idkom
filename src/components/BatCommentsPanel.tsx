'use client';

import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { submitBatComment, type BatComment, type BatVisual } from '@/lib/api';

interface Props {
  token: string;
  visuals: BatVisual[];
  initialComments: BatComment[];
  isOpen: boolean;
  onClose: () => void;
  onAdded: (comment: BatComment) => void;
  /** Visuel cible pour les nouveaux commentaires (null = general). */
  contextVisualId?: number | null;
  canComment: boolean;
}

interface CommentNode extends BatComment {
  children: BatComment[];
}

export default function BatCommentsPanel({
  token,
  visuals,
  initialComments,
  isOpen,
  onClose,
  onAdded,
  contextVisualId = null,
  canComment,
}: Props) {
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Map visual id → visual (pour afficher le titre)
  const visualMap = useMemo(() => {
    const m = new Map<number, BatVisual>();
    visuals.forEach((v) => m.set(v.id, v));
    return m;
  }, [visuals]);

  // Tree (parent + replies)
  const tree = useMemo<CommentNode[]>(() => {
    const parents: CommentNode[] = [];
    const childByParent = new Map<number, BatComment[]>();
    initialComments.forEach((c) => {
      if (c.parent_id) {
        const arr = childByParent.get(c.parent_id) ?? [];
        arr.push(c);
        childByParent.set(c.parent_id, arr);
      } else {
        parents.push({ ...c, children: [] });
      }
    });
    parents.forEach((p) => {
      p.children = childByParent.get(p.id) ?? [];
    });
    return parents;
  }, [initialComments]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (body.trim().length < 1) return;
    setSubmitting(true);
    setError(null);
    try {
      const cmt = await submitBatComment(token, {
        body: body.trim(),
        visual_id: contextVisualId ?? null,
      });
      setBody('');
      onAdded(cmt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <aside className="fixed top-0 right-0 bottom-0 z-[56] w-full sm:w-[420px] bg-zinc-950 border-l border-zinc-800 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <Icon icon="solar:chat-round-line-linear" width={22} className="text-[#7928ca]" />
            <h3 className="text-white font-semibold">Commentaires</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
              {initialComments.length}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <Icon icon="solar:close-circle-linear" width={24} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {tree.length === 0 ? (
            <div className="text-center text-zinc-500 py-12">
              <Icon icon="solar:chat-square-linear" width={36} className="mx-auto mb-3 text-zinc-700" />
              <p className="text-sm">Aucun commentaire pour l&apos;instant.</p>
              <p className="text-xs mt-1">Posez vos questions, demandez des modifications.</p>
            </div>
          ) : (
            tree.map((node) => (
              <CommentItem key={node.id} node={node} visualMap={visualMap} />
            ))
          )}
        </div>

        {/* Form */}
        {canComment && (
          <form onSubmit={handleSubmit} className="border-t border-zinc-800 p-4 space-y-3 shrink-0">
            {contextVisualId !== null && visualMap.has(contextVisualId) && (
              <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900 rounded-lg px-3 py-2">
                <Icon icon="solar:gallery-wide-linear" width={14} />
                <span className="truncate">
                  Commenter : {visualMap.get(contextVisualId)?.title ?? 'visuel'}
                </span>
              </div>
            )}
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={2000}
              rows={3}
              placeholder="Votre commentaire..."
              disabled={submitting}
              className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#7928ca] resize-none disabled:opacity-50"
            />
            {error && (
              <div className="text-xs text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-600">{body.length}/2000</span>
              <button
                type="submit"
                disabled={submitting || body.trim().length === 0}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Icon icon="solar:refresh-linear" width={16} className="animate-spin" />
                    Envoi...
                  </>
                ) : (
                  <>
                    <Icon icon="solar:plain-2-linear" width={16} />
                    Envoyer
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </aside>
    </>
  );
}

// ============================================================
// Comment item
// ============================================================
function CommentItem({
  node,
  visualMap,
}: {
  node: CommentNode;
  visualMap: Map<number, BatVisual>;
}) {
  const isClient = node.author_type === 'client';
  const visual = node.visual_id !== null ? visualMap.get(node.visual_id) : null;
  const hasPin = node.pin_x !== null && node.pin_y !== null;

  return (
    <div className={`rounded-xl overflow-hidden border ${node.is_resolved ? 'border-zinc-800/50 opacity-60' : 'border-zinc-800'}`}>
      {/* Parent */}
      <div className={`p-4 ${isClient ? 'bg-zinc-900/50' : 'bg-[#7928ca]/5'}`}>
        <div className="flex items-start gap-3">
          {hasPin ? (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff2d55] to-[#7928ca] flex items-center justify-center text-white shrink-0">
              <Icon icon="solar:map-point-bold" width={14} />
            </div>
          ) : (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${isClient ? 'bg-zinc-700' : 'bg-[#7928ca]'}`}>
              {(node.author_name ?? '?').charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-white text-sm font-medium">{node.author_name ?? 'Anonyme'}</span>
              {!isClient && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#7928ca]/20 text-[#7928ca]">iDkom</span>
              )}
              {hasPin && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#ff2d55]/15 text-[#ff2d55]">Epingle</span>
              )}
              {node.is_resolved && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400">Resolu</span>
              )}
            </div>
            {visual && (
              <p className="text-xs text-zinc-500 mb-1.5">sur {visual.title ?? 'un visuel'}</p>
            )}
            <p className="text-zinc-300 text-sm whitespace-pre-line leading-relaxed">{node.body}</p>
            <p className="text-xs text-zinc-600 mt-2">{formatDateTime(node.created_at)}</p>
          </div>
        </div>
      </div>

      {/* Replies (admin) */}
      {node.children.map((reply) => (
        <div key={reply.id} className="px-4 py-3 pl-11 bg-zinc-900/30 border-t border-zinc-800/50">
          <div className="flex items-center gap-2 mb-1">
            <Icon icon="solar:reply-linear" width={12} className="text-[#00d4ff]" />
            <span className="text-white text-sm font-medium">{reply.author_name ?? 'iDkom'}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#00d4ff]/15 text-[#00d4ff]">iDkom</span>
          </div>
          <p className="text-zinc-300 text-sm whitespace-pre-line leading-relaxed">{reply.body}</p>
          <p className="text-xs text-zinc-600 mt-1.5">{formatDateTime(reply.created_at)}</p>
        </div>
      ))}
    </div>
  );
}

function formatDateTime(iso: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return iso;
  }
}
