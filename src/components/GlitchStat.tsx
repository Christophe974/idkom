'use client';

import { useEffect, useRef, useState } from 'react';

interface GlitchStatProps {
  pastValue: string;
  futureValue: string;
  pastLabel: string;
  futureLabel: string;
  delay?: number;
  className?: string;
}

export default function GlitchStat({
  pastValue,
  futureValue,
  pastLabel,
  futureLabel,
  delay = 2000,
  className = '',
}: GlitchStatProps) {
  const [phase, setPhase] = useState<'past' | 'glitching' | 'future'>('past');
  const [displayValue, setDisplayValue] = useState(pastValue);
  const [displayLabel, setDisplayLabel] = useState(pastLabel);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            startAnimation();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const startAnimation = () => {
    // Wait before starting glitch
    setTimeout(() => {
      setPhase('glitching');

      // Glitch effect - rapid random characters
      const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789';
      let glitchCount = 0;
      const maxGlitches = 10;

      const glitchInterval = setInterval(() => {
        // Random glitch value
        const randomValue = Array.from({ length: futureValue.length }, () =>
          glitchChars[Math.floor(Math.random() * glitchChars.length)]
        ).join('');
        setDisplayValue(randomValue);

        // Random glitch label
        const randomLabel = Array.from({ length: futureLabel.length }, () =>
          glitchChars[Math.floor(Math.random() * glitchChars.length)]
        ).join('');
        setDisplayLabel(randomLabel);

        glitchCount++;

        if (glitchCount >= maxGlitches) {
          clearInterval(glitchInterval);
          setPhase('future');
          setDisplayValue(futureValue);
          setDisplayLabel(futureLabel);
        }
      }, 80);
    }, delay);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        className={`transition-all duration-300 ${
          phase === 'glitching' ? 'animate-pulse' : ''
        }`}
      >
        <span
          className={`text-5xl font-bold gradient-text block ${
            phase === 'glitching' ? 'opacity-80 blur-[1px]' : ''
          }`}
          style={{
            textShadow: phase === 'glitching'
              ? '2px 0 #ff2d55, -2px 0 #00d4ff'
              : 'none',
          }}
        >
          {displayValue}
        </span>
        <span className="text-xl gradient-text font-bold">+</span>
        <span
          className={`text-zinc-500 text-sm mt-1 block transition-all ${
            phase === 'glitching' ? 'opacity-60' : ''
          }`}
        >
          {displayLabel}
        </span>
      </div>

      {/* Glitch overlay effect */}
      {phase === 'glitching' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff2d55]/10 via-transparent to-[#00d4ff]/10 animate-pulse" />
        </div>
      )}
    </div>
  );
}
