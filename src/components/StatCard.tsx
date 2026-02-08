'use client';

import { useEffect, useRef, useState } from 'react';
import Counter from './Counter';

interface StatCardProps {
  label: string;
  value: number | string;
  index: number;
}

export default function StatCard({ label, value, index }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger: chaque carte apparaît avec un délai croissant
            setTimeout(() => setIsVisible(true), index * 150);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`group relative bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        hover:border-[#7928ca]/50`}
    >
      {/* Glow hover */}
      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-[#ff2d55]/0 via-[#7928ca]/0 to-[#00d4ff]/0 group-hover:from-[#ff2d55]/20 group-hover:via-[#7928ca]/20 group-hover:to-[#00d4ff]/20 transition-all duration-500 blur-sm pointer-events-none" />

      <div className="relative">
        <p className="text-2xl font-bold gradient-text">
          {typeof value === 'number' ? (
            <Counter
              target={value}
              className="text-2xl font-bold gradient-text"
              suffix="+"
            />
          ) : (
            value
          )}
        </p>
        <p className="text-zinc-500 text-sm capitalize mt-1">{label.replace(/_/g, ' ')}</p>
      </div>
    </div>
  );
}
