"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vrai dès que l'élément entre dans l'écran (une seule fois par défaut).
 * Sert à lancer les démonstrations au bon moment, sans librairie.
 */
export function useInView<T extends Element = HTMLDivElement>(
  { once = true, threshold = 0.3, rootMargin = "0px 0px -10% 0px" } = {},
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold, rootMargin]);

  return [ref, inView] as const;
}

/** Vrai si l'utilisateur a demandé moins d'animations. */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
