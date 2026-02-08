'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  target: number;
  duration?: number;
  className?: string;
  suffix?: string;
  onComplete?: () => void;
}

export default function Counter({ target, duration = 2000, className = '', suffix, onComplete }: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showSuffix, setShowSuffix] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter();
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

  const animateCounter = () => {
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        if (suffix) setShowSuffix(true);
        onComplete?.();
      }
    };

    requestAnimationFrame(updateCounter);
  };

  return (
    <span ref={ref} className={`counter ${className}`}>
      {count}
      {suffix && (
        <span
          className={`inline-block transition-all duration-500 ${
            showSuffix ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          {suffix}
        </span>
      )}
    </span>
  );
}
