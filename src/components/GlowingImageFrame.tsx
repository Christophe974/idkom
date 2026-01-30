'use client';

interface GlowingImageFrameProps {
  src?: string;
  alt?: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

export default function GlowingImageFrame({ src, alt, className = '', fallbackIcon }: GlowingImageFrameProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Bordure animée gradient qui tourne - légère */}
      <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, #ff2d55 15%, transparent 30%, transparent 50%, #7928ca 65%, transparent 80%, #00d4ff 90%, transparent 100%)',
            animation: 'spin 8s linear infinite',
          }}
        />
        {/* Masque intérieur pour créer juste la bordure fine */}
        <div className="absolute inset-[1px] rounded-2xl bg-zinc-950" />
      </div>

      {/* Container principal avec l'image */}
      <div className="relative aspect-video rounded-2xl overflow-hidden z-10">
        {src ? (
          <img
            src={src}
            alt={alt || ''}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900"></div>
            <div className="absolute inset-0 bg-grid opacity-30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {fallbackIcon}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
