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
    <div className="h-full flex flex-col justify-between relative">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Icon icon="solar:chat-square-like-linear" className="text-[#ff2d55]/60" width={24} />
          <span className="text-xs uppercase tracking-widest text-zinc-500">Témoignages</span>
        </div>

        {/* Quote with fade transition */}
        <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          <p className="text-zinc-300 italic text-base md:text-lg leading-relaxed">
            &ldquo;{t.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Author info */}
      <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-center gap-3 mt-6">
          {t.author.avatar ? (
            <img
              src={t.author.avatar}
              alt={t.author.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-zinc-700"
            />
          ) : (
            <div className="w-11 h-11 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-white">
              {t.author.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">{t.author.name}</p>
            <p className="text-xs text-zinc-500">
              {t.author.role}
              {t.author.company && ` — ${t.author.company}`}
            </p>
          </div>
          {/* Pagination discrète */}
          {testimonials.length > 1 && (
            <span className="text-xs text-zinc-500 tabular-nums">
              {current + 1}/{testimonials.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
