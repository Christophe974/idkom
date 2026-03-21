'use client';

import { useState, useEffect } from 'react';
import type { VCardData } from '@/lib/api';
import VCardPageClient from './VCardPageClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

interface Props {
  slug: string;
}

export default function VCardLoader({ slug }: Props) {
  const [card, setCard] = useState<VCardData | null>(null);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress counter
    const start = performance.now();
    const duration = 1500;
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 0.95); // Cap at 95% until data arrives
      setProgress(Math.floor(p * 100));
      if (p < 0.95) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Fetch card data
    fetch(`${API_URL}/vcards.php?action=get&slug=${encodeURIComponent(slug)}`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) {
          setProgress(100);
          // Small delay for the 100% animation to be visible
          setTimeout(() => setCard(data.data), 300);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));

    return () => cancelAnimationFrame(rafId);
  }, [slug]);

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#09090b' }}>
        <div className="text-center">
          <p className="text-zinc-400 text-lg mb-4">Carte introuvable</p>
          <a href="https://www.idkom.fr" className="text-blue-400 hover:underline text-sm">
            Visiter iDkom
          </a>
        </div>
      </div>
    );
  }

  // Card loaded → show it
  if (card) {
    return <VCardPageClient card={card} />;
  }

  // Splash screen with counter
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{ background: '#09090b' }}>
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: '#3b82f6',
            top: '20%',
            right: '-10%',
            animation: 'splashPulse 3s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{
            background: 'linear-gradient(135deg, #7928ca, #ff2d55)',
            bottom: '10%',
            left: '-10%',
            animation: 'splashPulse 3s ease-in-out infinite 1s',
          }}
        />
      </div>

      {/* Splash content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-10" style={{ animation: 'fadeIn 0.3s ease-out both' }}>
          <svg width="140" height="45" viewBox="0 0 140 45" className="opacity-90">
            <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
              fill="white" fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="32" fontWeight="700" letterSpacing="3">
              IDKOM
            </text>
          </svg>
          <p className="text-zinc-600 text-[10px] text-center tracking-[0.3em] uppercase mt-1">
            L&apos;Atelier Phygital
          </p>
        </div>

        {/* Circular progress with counter */}
        <div className="relative mb-8" style={{ animation: 'fadeIn 0.4s ease-out 0.1s both' }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
            {/* Progress circle */}
            <circle
              cx="50" cy="50" r="42" fill="none"
              stroke="url(#splashGrad)" strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.64} 264`}
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dasharray 0.3s ease-out' }}
            />
            <defs>
              <linearGradient id="splashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#7928ca" />
                <stop offset="100%" stopColor="#ff2d55" />
              </linearGradient>
            </defs>
          </svg>

          {/* Counter number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold tabular-nums">
              {progress}
              <span className="text-zinc-500 text-sm">%</span>
            </span>
          </div>
        </div>

        {/* Loading text */}
        <p
          className="text-zinc-500 text-sm font-medium"
          style={{ animation: 'fadeIn 0.4s ease-out 0.2s both' }}
        >
          Chargement de votre carte...
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashPulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
