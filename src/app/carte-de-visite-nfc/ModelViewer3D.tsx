'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ModelViewer3D() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import('@google/model-viewer').then(() => {
      if (!cancelled) setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-[#ff2d55]/40 via-[#7928ca]/40 to-[#00d4ff]/30 blur-[80px] animate-pulse-slow" />
      </div>

      {!loaded && (
        <Image
          src="/images/porte-cle-nfc-hero.png"
          alt="Porte-clé NFC iDkom"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 384px"
          className="object-contain drop-shadow-[0_20px_50px_rgba(121,40,202,0.4)]"
        />
      )}

      {loaded && (
        <model-viewer
          src="/models/porte-cle-nfc.glb"
          alt="Porte-clé NFC iDkom"
          auto-rotate
          camera-controls
          touch-action="pan-y"
          shadow-intensity="1"
          shadow-softness="0.8"
          exposure="1.1"
          environment-image="neutral"
          rotation-per-second="20deg"
          auto-rotate-delay="0"
          interaction-prompt="none"
          loading="eager"
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            filter: 'drop-shadow(0 20px 50px rgba(121, 40, 202, 0.4))',
          }}
        />
      )}
    </div>
  );
}
