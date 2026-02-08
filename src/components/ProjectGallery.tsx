'use client';

import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';

interface GalleryImage {
  url: string;
  alt?: string;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isOpen = lightboxIndex !== null;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => prev !== null ? (prev + 1) % images.length : null);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => prev !== null ? (prev - 1 + images.length) % images.length : null);
  }, [images.length]);

  // Bloquer le scroll quand la lightbox est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Raccourcis clavier
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, closeLightbox, goNext, goPrev]);

  return (
    <>
      {/* Grille */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="group aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-[#7928ca]/50 transition-all duration-300 relative"
          >
            <img
              src={img.url}
              alt={img.alt || `Photo ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <Icon
                icon="solar:magnifer-linear"
                width={24}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center"
          style={{ zIndex: 9999 }}
          onClick={closeLightbox}
        >
          {/* Bouton fermer - bien visible */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-full transition-colors backdrop-blur-sm"
          >
            <Icon icon="solar:close-circle-linear" width={20} />
            <span className="text-sm font-medium">Fermer</span>
            <kbd className="text-xs text-zinc-500 ml-1 px-1.5 py-0.5 bg-zinc-900 rounded">Esc</kbd>
          </button>

          {/* Navigation gauche */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-zinc-800/60 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <Icon icon="solar:arrow-left-linear" width={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-zinc-800/60 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <Icon icon="solar:arrow-right-linear" width={24} />
              </button>
            </>
          )}

          {/* Image */}
          <img
            src={images[lightboxIndex].url}
            alt={images[lightboxIndex].alt || ''}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Compteur + indication */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <span className="text-zinc-400 text-sm">
              {lightboxIndex + 1} / {images.length}
            </span>
            {images.length > 1 && (
              <span className="text-zinc-600 text-xs flex items-center gap-1">
                <Icon icon="solar:arrow-left-linear" width={12} />
                <Icon icon="solar:arrow-right-linear" width={12} />
                pour naviguer
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
