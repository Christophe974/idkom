'use client';

import { useEffect, useRef, useState } from 'react';

interface CategoryBar {
  key: string;
  label: string;
  score: number;
  color: string;
  icon: string;
}

interface Props {
  categories: CategoryBar[];
}

export default function AuditBarChart({ categories }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setAnimate(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-3">
      {categories.map((cat, i) => {
        const scoreColor = cat.score >= 70 ? '#22c55e' : cat.score >= 40 ? '#eab308' : '#ef4444';
        return (
          <div key={cat.key} className="flex items-center gap-3">
            <div className="w-24 text-right">
              <span className="text-xs text-zinc-400 font-medium">{cat.label}</span>
            </div>
            <div className="flex-1 h-7 bg-zinc-800/50 rounded-full overflow-hidden relative">
              <div
                className={`audit-bar-fill h-full rounded-full ${animate ? 'audit-bar-animate' : ''}`}
                style={{
                  width: animate ? `${cat.score}%` : '0%',
                  background: `linear-gradient(90deg, ${cat.color}, ${scoreColor})`,
                  '--bar-delay': `${i * 0.12}s`,
                } as React.CSSProperties}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold transition-opacity duration-500"
                style={{
                  color: scoreColor,
                  opacity: animate ? 1 : 0,
                  transitionDelay: `${0.8 + i * 0.12}s`,
                }}
              >
                {cat.score}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
