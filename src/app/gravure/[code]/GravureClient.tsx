'use client';

import { useState, useEffect } from 'react';
import { getGravureEvent, submitGravure, type GravureEvent } from '@/lib/api';

export default function GravureClient({ code }: { code: string }) {
  const [event, setEvent] = useState<GravureEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');

  // Flow state
  const [step, setStep] = useState<'form' | 'confirm' | 'success' | 'error'>('form');
  const [submitting, setSubmitting] = useState(false);
  const [queueNumber, setQueueNumber] = useState(0);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    getGravureEvent(code)
      .then(setEvent)
      .catch(() => setError('Événement non trouvé ou terminé.'))
      .finally(() => setLoading(false));
  }, [code]);

  const handleSubmit = async () => {
    if (!event) return;
    setSubmitting(true);
    setSubmitError('');

    try {
      const result = await submitGravure({
        event_code: code,
        line_1: line1.trim(),
        line_2: line2.trim(),
      });
      setQueueNumber(result.queue_number);
      setStep('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setSubmitError(message);
      setStep('form');
    } finally {
      setSubmitting(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // Event not found
  if (error || !event) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">😕</div>
          <h1 className="text-xl font-semibold text-white mb-2">Oups !</h1>
          <p className="text-zinc-400">{error || 'Événement non trouvé.'}</p>
        </div>
      </div>
    );
  }

  // No slots remaining
  if (event.slots_remaining <= 0 && step === 'form') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          {event.logo_url && (
            <img src={event.logo_url} alt={event.client_name} className="h-16 mx-auto mb-6 object-contain" />
          )}
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-xl font-semibold text-white mb-2">Complet !</h1>
          <p className="text-zinc-400">Toutes les planches ont été réservées. Merci !</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo client */}
        {event.logo_url && (
          <div className="flex justify-center mb-8">
            <img
              src={event.logo_url}
              alt={event.client_name}
              className="h-16 object-contain"
            />
          </div>
        )}

        {/* STEP: Form */}
        {step === 'form' && (
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-white mb-1">
                Personnalisez votre planche
              </h1>
              <p className="text-zinc-400 text-sm">
                Que souhaitez-vous faire graver ?
              </p>
            </div>

            {submitError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}

            {/* Ligne 1 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Première ligne <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={line1}
                onChange={(e) => setLine1(e.target.value.slice(0, event.max_chars_line1))}
                placeholder="Ex : Prénom, Nom, Message..."
                maxLength={event.max_chars_line1}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg tracking-wide"
                autoFocus
                autoComplete="off"
              />
              <div className="flex justify-end mt-1">
                <span className={`text-xs ${line1.length >= event.max_chars_line1 ? 'text-red-400' : 'text-zinc-500'}`}>
                  {line1.length}/{event.max_chars_line1}
                </span>
              </div>
            </div>

            {/* Ligne 2 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Seconde ligne <span className="text-zinc-500">(optionnel)</span>
              </label>
              <input
                type="text"
                value={line2}
                onChange={(e) => setLine2(e.target.value.slice(0, event.max_chars_line2))}
                placeholder="Ex : Date, lieu, souvenir..."
                maxLength={event.max_chars_line2}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg tracking-wide"
                autoComplete="off"
              />
              <div className="flex justify-end mt-1">
                <span className={`text-xs ${line2.length >= event.max_chars_line2 ? 'text-red-400' : 'text-zinc-500'}`}>
                  {line2.length}/{event.max_chars_line2}
                </span>
              </div>
            </div>

            {/* Aperçu */}
            {line1.trim() && (
              <div className="mb-6 bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2 text-center">Aperçu</p>
                <div className="text-center space-y-0.5">
                  <p className="text-white font-semibold text-lg tracking-widest uppercase">
                    {line1.trim()}
                  </p>
                  {line2.trim() && (
                    <p className="text-zinc-300 text-base tracking-widest uppercase">
                      {line2.trim()}
                    </p>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={() => setStep('confirm')}
              disabled={!line1.trim()}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold py-3.5 rounded-xl transition-colors text-base"
            >
              Valider ma gravure
            </button>

            <p className="text-zinc-600 text-xs text-center mt-3">
              {event.slots_remaining} place{event.slots_remaining > 1 ? 's' : ''} restante{event.slots_remaining > 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* STEP: Confirm */}
        {step === 'confirm' && (
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-1">
                Confirmez votre gravure
              </h2>
              <p className="text-zinc-400 text-sm">
                Vérifiez bien votre texte, il ne pourra plus être modifié.
              </p>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/50 mb-6">
              <div className="text-center space-y-1">
                <p className="text-white font-bold text-xl tracking-widest uppercase">
                  {line1.trim()}
                </p>
                {line2.trim() && (
                  <p className="text-zinc-300 text-lg tracking-widest uppercase">
                    {line2.trim()}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('form')}
                disabled={submitting}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium py-3.5 rounded-xl transition-colors"
              >
                Modifier
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi...
                  </>
                ) : (
                  'Confirmer'
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP: Success */}
        {step === 'success' && (
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 text-center">
            <div className="text-5xl mb-4">✨</div>
            <h2 className="text-xl font-bold text-white mb-2">
              C&apos;est enregistré !
            </h2>
            <p className="text-zinc-400 mb-6">
              Votre demande de gravure a bien été prise en compte.
            </p>

            <div className="bg-purple-600/10 border border-purple-500/30 rounded-xl p-4 mb-4">
              <p className="text-purple-300 text-sm mb-1">Votre numéro</p>
              <p className="text-4xl font-bold text-white">
                N°{queueNumber}
              </p>
            </div>

            <p className="text-zinc-500 text-sm">
              Votre planche sera gravée sous peu.
              <br />Gardez ce numéro, on vous appellera !
            </p>
          </div>
        )}

        {/* Footer branding */}
        <div className="mt-6 text-center">
          <p className="text-zinc-600 text-xs">
            Propulsé par{' '}
            <a href="https://www.idkom.fr" target="_blank" rel="noopener" className="text-zinc-500 hover:text-zinc-400">
              iDkom
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
