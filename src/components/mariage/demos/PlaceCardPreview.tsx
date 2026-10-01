"use client";

import { useEffect, useState } from "react";
import { placeCards } from "@/content/mariage/demo";
import { useInView } from "@/lib/mariage/useInView";

/** Marque-place « généré » à partir du plan de table : le prénom et la table défilent. */
export function PlaceCardPreview({ label }: { label: string }) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.4 });
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % placeCards.length), 2200);
    return () => clearInterval(t);
  }, [inView]);

  const c = placeCards[i];
  return (
    <div ref={ref} className="rounded-3xl bg-papier-50 p-5 shadow-[0_30px_60px_-35px_rgb(22_20_15/0.45)]">
      <p className="m-kicker text-[0.62rem] text-encre-500">{label}</p>
      {/* le marque-place en bois, dessiné */}
      <div className="relative mx-auto mt-5 w-full max-w-[17rem]">
        <div className="relative overflow-hidden rounded-t-[7rem] rounded-b-md bg-[linear-gradient(135deg,#e9d3b2,#d8b88d)] px-6 pb-6 pt-12 text-center text-[#5a3a1c] shadow-inner">
          <div className="absolute inset-0 opacity-30 [background:repeating-linear-gradient(95deg,transparent_0_9px,rgb(120_80_40/0.18)_9px_10px)]" aria-hidden="true" />
          <p key={c.name} className="m-serif m-pop relative text-[2.4rem] italic leading-none">
            {c.name}
          </p>
          <p key={c.table} className="m-mono m-pop relative mt-3 text-[0.7rem] uppercase tracking-[0.25em]">
            Table {c.table}
          </p>
          <p className="m-mono relative mt-4 text-[0.6rem] tracking-[0.2em] opacity-70">S &amp; T · 14.06.2027</p>
        </div>
        <div className="mx-auto h-2 w-[86%] rounded-b-md bg-[#b8956a]" aria-hidden="true" />
      </div>
      <p className="mt-4 text-center text-xs text-encre-500">Gravé au laser dans notre atelier</p>
    </div>
  );
}
