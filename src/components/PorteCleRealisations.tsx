'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ITEMS: [string, string][] = [
  ['/pro/r-cci.webp', 'CCI'],
  ['/pro/r-creditmutuel.webp', 'Crédit Mutuel'],
  ['/pro/r-dynabuy.webp', 'Dynabuy'],
  ['/pro/r-edf.webp', 'EDF'],
  ['/pro/r-gregimmo.webp', 'Greg Immo'],
  ['/pro/r-les12ponts.webp', 'Les 12 Ponts'],
  ['/pro/r-sied70.webp', 'SIED 70'],
  ['/pro/r-yincka.webp', 'Yincka'],
  ['/pro/idkom.webp', 'iDkom'],
  ['/pro/timeprod.webp', 'Timeprod'],
];

/** Carrousel infini des réalisations : défile en continu, ralentit au survol,
 *  porte-clés qui flottent, glow au survol. Version vitrine (rose/violet/cyan). */
export default function PorteCleRealisations() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current, wrap = wrapRef.current;
    if (!track || !wrap) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, { xPercent: -50, duration: 48, ease: 'none', repeat: -1 });
      if (reduce) tween.pause();

      const slow = () => gsap.to(tween, { timeScale: 0.12, duration: 0.5, overwrite: true });
      const fast = () => gsap.to(tween, { timeScale: 1, duration: 0.5, overwrite: true });
      wrap.addEventListener('pointerenter', slow);
      wrap.addEventListener('pointerleave', fast);

      // chaque porte-clé respire
      gsap.utils.toArray<HTMLElement>('[data-rk]').forEach((img, i) => {
        gsap.to(img, { y: -9, rotation: i % 2 ? 2.5 : -2.5, duration: 2.6 + (i % 4) * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.18 });
      });

      // apparition du bloc au scroll
      gsap.from(wrap, { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: wrap, start: 'top 88%', once: true } });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  const row = [...ITEMS, ...ITEMS];

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden py-4"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
      }}
    >
      <div ref={trackRef} className="flex w-max gap-5">
        {row.map(([src, name], i) => (
          <div
            key={i}
            className="group relative w-[210px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-5 transition-all duration-300 hover:border-[#ff2d55]/40 hover:shadow-[0_0_45px_rgba(255,45,85,0.25)] sm:w-[240px]"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: 'radial-gradient(60% 55% at 50% 42%, rgba(255,45,85,0.20), transparent)' }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-rk
              src={src}
              alt={`Porte-clé NFC ${name}`}
              className="relative aspect-square w-full object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,0.55)] transition-transform duration-300 will-change-transform group-hover:scale-[1.12]"
              loading="lazy"
            />
            <p className="relative mt-1 text-center text-sm font-semibold text-zinc-300">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
