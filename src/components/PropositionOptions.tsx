'use client';

import { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import type { PropositionOption } from '@/lib/api';

const glowColors = ['glow-pink', 'glow-purple', 'glow-cyan'];

export default function PropositionOptions({ options }: { options: PropositionOption[] }) {
  if (!options || options.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {options.map((option, index) => (
        <OptionCard key={option.id} option={option} index={index} />
      ))}
    </div>
  );
}

function OptionCard({ option, index }: { option: PropositionOption; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowClass = glowColors[index % 3];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${glowClass} bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-700 hover:border-zinc-700`}
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      {option.image ? (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={option.image.url}
            alt={option.image.alt || option.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-zinc-800/50 flex items-center justify-center">
          <Icon icon="solar:star-shine-linear" className="text-zinc-700" width={40} />
        </div>
      )}

      <div className="p-5">
        <h4 className="text-lg font-semibold text-white mb-2">{option.title}</h4>
        {option.description && (
          <p className="text-zinc-400 text-sm leading-relaxed mb-3">{option.description}</p>
        )}
        {option.price !== null && (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#ff2d55]/10 via-[#7928ca]/10 to-[#00d4ff]/10 border border-zinc-700">
            <span className="text-sm font-medium gradient-text">
              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(option.price)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
