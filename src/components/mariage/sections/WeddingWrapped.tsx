"use client";

import { useRef } from "react";
import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { wrapped } from "@/content/mariage/copy";
import { couple, wrappedHighlights, wrappedStats } from "@/content/mariage/demo";
import { cn } from "@/lib/mariage/utils";

const palettes = [
  "bg-terre-600 text-papier-50",
  "bg-champagne-300 text-encre-950",
  "bg-olive-700 text-papier-50",
  "bg-minuit-900 text-papier-50",
  "bg-papier-50 text-encre-900",
  "bg-terre-100 text-terre-700",
];

/** APRÈS · Le récap façon « stories » : à faire défiler, pensé pour être partagé. */
export function WeddingWrapped() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * (track.current.clientWidth * 0.7), behavior: "smooth" });

  const card = "relative flex aspect-[9/16] w-[68vw] max-w-[17rem] shrink-0 flex-col justify-between overflow-hidden rounded-[1.75rem] p-6";

  return (
    <section data-moment="apres" className="bg-papier-100 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHead kicker={wrapped.kicker} title={wrapped.title} text={wrapped.text} />
          <div className="hidden gap-2 sm:flex">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => scroll(d)}
                aria-label={d < 0 ? "Carte précédente" : "Carte suivante"}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-encre-900/20 hover:border-encre-900/60"
              >
                {d < 0 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>
      </Container>

      <MediaSlot id="WEDDING_WRAPPED_SCREEN" className="mt-10">
        <div ref={track} className="m-snap flex gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))]" tabIndex={0} aria-label="Récapitulatif du mariage">
          <article className={cn(card, "bg-encre-900 text-papier-50")}>
            <p className="m-kicker text-champagne-300">Notre mariage, le récap</p>
            <div>
              <p className="m-serif text-5xl leading-[0.95]">
                {couple.a}
                <br />
                <em className="text-champagne-300">&amp;</em> {couple.b}
              </p>
              <p className="m-mono mt-4 text-sm text-papier-300">{couple.date}</p>
            </div>
            <p className="text-sm text-papier-300">{wrapped.swipe} →</p>
          </article>

          {wrappedStats.map((s, i) => (
            <article key={s.label} className={cn(card, palettes[i % palettes.length])}>
              <p className="m-mono text-xs opacity-70">0{i + 1}</p>
              <div>
                <p className="m-serif text-[4.6rem] leading-none">{s.value}</p>
                <p className="mt-3 text-xl">{s.label}</p>
              </div>
              <p className="m-kicker opacity-60">S &amp; T · 14.06.27</p>
            </article>
          ))}

          {wrappedHighlights.map((h, i) => (
            <article key={h.label} className={cn(card, palettes[(i + 3) % palettes.length])}>
              <p className="m-kicker opacity-70">{h.label}</p>
              <p className="m-serif text-[2.7rem] leading-[1.02]">{h.value}</p>
              <p className="m-kicker opacity-60">S &amp; T · 14.06.27</p>
            </article>
          ))}
        </div>
      </MediaSlot>
    </section>
  );
}
