"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/mariage/ui/Container";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { points } from "@/content/mariage/copy";
import { leaderboard } from "@/content/mariage/demo";
import { useInView } from "@/lib/mariage/useInView";
import { cn, formatInt } from "@/lib/mariage/utils";

/** JOUR J · Les points : un score qui suit chaque invité toute la soirée, un classement facultatif. */
export function PointsEngine() {
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.3 });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setTick((v) => v + 1), 1800);
    return () => clearInterval(t);
  }, [inView]);

  const n = points.events.length;
  const live = points.events[(tick - 1 + n) % n];
  // Points gagnés par François depuis l'arrivée dans la section (un événement par « tick »).
  let earned = 0;
  for (let j = 0; j < tick; j++) earned += points.events[j % n].pts;

  return (
    <section data-moment="jour-j" className="relative overflow-hidden bg-minuit-900 py-20 text-papier-50 sm:py-28">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-champagne-500/10 blur-3xl" aria-hidden="true" />
      <Container>
        <SectionHead tone="light" kicker={points.kicker} title={points.title} text={points.text} className="max-w-3xl" />

        <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-12">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-7">
            {points.events.map((e, i) => (
              <Reveal
                as="li"
                key={e.label}
                delay={i * 70}
                className={cn(
                  "rounded-3xl p-5 transition-colors duration-500",
                  tick > 0 && live === e ? "bg-champagne-300 text-encre-950" : "bg-papier-50/6",
                )}
              >
                <p className="m-mono text-3xl sm:text-4xl">+{e.pts}</p>
                <p className="mt-2 text-sm leading-snug opacity-80">{e.label}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={150} className="lg:col-span-5">
            <div className="rounded-3xl bg-papier-50 p-5 text-encre-900 sm:p-6">
              <div className="flex items-center justify-between">
                <p className="m-kicker text-[0.62rem] text-encre-500">Classement · écran de la salle</p>
                <span className="flex items-center gap-1.5 text-xs text-terre-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terre-500" aria-hidden="true" /> en direct
                </span>
              </div>
              <ol className="mt-4 divide-y divide-encre-900/8">
                {leaderboard.map((p, i) => (
                  <li key={p.name} className="flex items-center gap-3 py-2.5">
                    <span className="m-mono w-5 text-sm text-encre-400">{i + 1}</span>
                    <span className="flex-1">
                      <span className="font-medium">{p.name}</span> <span className="text-sm text-encre-500">· {p.table}</span>
                    </span>
                    <span className="m-mono">{formatInt(i === 0 ? p.pts + earned : p.pts)}</span>
                  </li>
                ))}
              </ol>
              <p key={tick} className="m-pop mt-4 rounded-2xl bg-papier-100 px-4 py-3 text-sm" aria-live="polite">
                {tick > 0 ? (
                  <>
                    <span className="m-mono text-terre-600">+{live.pts}</span> pour François · {live.label.toLowerCase()}
                  </>
                ) : (
                  "Le même score accompagne chaque invité toute la soirée."
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
