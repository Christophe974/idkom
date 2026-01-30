'use client';

import { useEffect, useRef } from 'react';

interface GlowingImageFrameProps {
  src?: string;
  alt?: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

export default function GlowingImageFrame({ src, alt, className = '', fallbackIcon }: GlowingImageFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    let animationId: number;
    let angle = 0;

    const animate = () => {
      angle += 0.5; // Vitesse de rotation
      if (angle >= 360) angle = 0;

      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculer le rayon pour que le point suive le contour (ellipse)
      const radiusX = rect.width / 2 + 10;
      const radiusY = rect.height / 2 + 10;

      const rad = (angle * Math.PI) / 180;
      const x = centerX + radiusX * Math.cos(rad);
      const y = centerY + radiusY * Math.sin(rad);

      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative group ${className}`}
    >
      {/* Bordure animée gradient qui tourne */}
      <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
        <div
          className="absolute inset-0 animate-spin-slow"
          style={{
            background: 'conic-gradient(from 0deg, transparent, #ff2d55, #7928ca, #00d4ff, transparent)',
            animationDuration: '4s',
          }}
        />
        {/* Masque intérieur pour créer la bordure */}
        <div className="absolute inset-[2px] rounded-2xl bg-zinc-950" />
      </div>

      {/* Point lumineux qui tourne */}
      <div
        ref={glowRef}
        className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #fff 0%, #ff2d55 30%, transparent 70%)',
          boxShadow: '0 0 30px 15px rgba(255, 45, 85, 0.6), 0 0 60px 30px rgba(121, 40, 202, 0.4)',
          filter: 'blur(1px)',
        }}
      />

      {/* Glow trail effect */}
      <div className="absolute -inset-4 rounded-3xl opacity-50 blur-xl pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, rgba(255, 45, 85, 0.3) 25%, rgba(121, 40, 202, 0.3) 50%, rgba(0, 212, 255, 0.3) 75%, transparent 100%)',
          animation: 'spin 4s linear infinite',
        }}
      />

      {/* Container principal avec l'image */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 z-10">
        {src ? (
          <>
            <img
              src={src}
              alt={alt || ''}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay gradient subtil */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-grid opacity-30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {fallbackIcon}
            </div>
          </>
        )}

        {/* Reflet lumineux sur le bord */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Particules flottantes */}
      <div className="absolute -inset-8 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#ff2d55] rounded-full animate-float opacity-60" style={{ animationDelay: '0s' }} />
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-[#7928ca] rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[#00d4ff] rounded-full animate-float opacity-60" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white rounded-full animate-float opacity-80" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-[#ff2d55] rounded-full animate-float opacity-60" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  );
}
