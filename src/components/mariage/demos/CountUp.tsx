"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/mariage/useInView";
import { formatInt } from "@/lib/mariage/utils";

/** Compteur qui grimpe quand il entre dans l'écran. */
export function CountUp({ to, duration = 1600, className }: { to: number; duration?: number; className?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.6 });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setV(to), 0);
      return () => clearTimeout(t);
    }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {formatInt(v)}
    </span>
  );
}
