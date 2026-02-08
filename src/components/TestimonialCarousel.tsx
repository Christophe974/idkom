'use client';

import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import type { Testimonial } from '@/lib/api';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  interval?: number;
}

export default function TestimonialCarousel({ testimonials, interval = 5000 }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 400);
    }, 300);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, testimonials.length, goTo]);

  // Auto-play
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval, testimonials.length]);

  if (!testimonials.length) return null;

  const t = testimonials[current];

  return (
    <div className="h-full flex flex-col justify-center relative">
      <Icon icon="solar:chat-square-like-linear" className="text-zinc-600 mb-3" width={28} />

      {/* Quote with fade transition */}
      <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        <p className="text-zinc-300 italic text-lg leading-relaxed line-clamp-3">
          &ldquo;{t.quote}&rdquo;
        </p>
        <div className="flex items-center gap-3 mt-4">
          {t.author.avatar ? (
            <img
              src={t.author.avatar}
              alt={t.author.name}
              className="w-10 h-10 rounded-full object-cover border border-zinc-700"
            />
          ) : (
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-white">
              {t.author.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{t.author.name}</p>
            <p className="text-xs text-zinc-500 truncate">
              {t.author.role}
              {t.author.company && ` — ${t.author.company}`}
            </p>
          </div>
        </div>
      </div>

      {/* Dots indicator */}
      {testimonials.length > 1 && (
        <div className="flex items-center gap-1.5 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 bg-gradient-to-r from-[#ff2d55] to-[#7928ca]'
                  : 'w-1.5 bg-zinc-700 hover:bg-zinc-600'
              }`}
              aria-label={`Témoignage ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
