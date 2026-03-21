'use client';

import { useEffect, useState } from 'react';
import type { VCardData } from '@/lib/api';
import VCardPageClient from './VCardPageClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

interface Props {
  slug: string;
}

export default function VCardLoader({ slug }: Props) {
  const [card, setCard] = useState<VCardData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/vcards.php?action=get&slug=${encodeURIComponent(slug)}`)
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          setCard(json.data);
          // Update page title dynamically
          document.title = `${json.data.first_name} ${json.data.last_name} - ${json.data.company || 'iDkom'}`;
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, [slug]);

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-4xl mb-4">😕</div>
          <p className="text-white text-lg font-medium">Carte introuvable</p>
          <p className="text-zinc-500 text-sm mt-2">Cette carte de visite n&apos;existe pas ou a été désactivée.</p>
        </div>
      </div>
    );
  }

  // Loading state - splash screen
  if (!card) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <p className="text-zinc-500 text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  return <VCardPageClient card={card} />;
}
