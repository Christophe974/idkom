'use client';

import { useState } from 'react';
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

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      {/* Grille */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
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
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Fermer */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors z-10"
          >
            <Icon icon="solar:close-circle-linear" width={32} />
          </button>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 p-3 text-zinc-400 hover:text-white transition-colors z-10"
              >
                <Icon icon="solar:arrow-left-linear" width={28} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 p-3 text-zinc-400 hover:text-white transition-colors z-10"
              >
                <Icon icon="solar:arrow-right-linear" width={28} />
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

          {/* Compteur */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-500 text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
