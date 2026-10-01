"use client";

import { useState } from "react";
import { Container } from "@/components/mariage/ui/Container";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { blindTest } from "@/content/mariage/copy";
import { blindTrack as t } from "@/content/mariage/demo";
import { cn } from "@/lib/mariage/utils";

/** Blind test personnalisé : leurs morceaux, leurs anecdotes. La réponse révèle l'histoire. */
export function BlindTest() {
  const [picked, setPicked] = useState<string | null>(null);
  const good = `${t.artist} — ${t.title}`;

  return (
    <section data-moment="jour-j" className="bg-minuit-900 py-20 text-papier-50 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <SectionHead tone="light" kicker={blindTest.kicker} title={blindTest.title} text={blindTest.text} />

        <Reveal delay={120}>
          <div className="rounded-[1.75rem] bg-papier-50 p-5 text-encre-900 sm:p-7">
            <div className="flex items-center gap-4">
              {/* égaliseur */}
              <div className="flex h-12 items-end gap-1" aria-hidden="true">
                {[0.5, 0.9, 0.35, 0.75, 0.6, 1, 0.45].map((h, i) => (
                  <span
                    key={i}
                    className="w-1.5 origin-bottom animate-pulse rounded-full bg-terre-500"
                    style={{ height: `${h * 100}%`, animationDelay: `${i * 140}ms`, animationDuration: `${0.8 + (i % 3) * 0.25}s` }}
                  />
                ))}
              </div>
              <div>
                <p className="m-kicker text-[0.62rem] text-encre-500">Morceau 4 sur 12</p>
                <p className="font-medium">Quel est ce titre ?</p>
              </div>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {t.options.map((o) => {
                const isGood = o === good;
                return (
                  <button
                    key={o}
                    type="button"
                    disabled={picked !== null}
                    onClick={() => setPicked(o)}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-left text-sm transition-colors",
                      picked === null && "border-encre-900/12 hover:border-encre-900/40",
                      picked !== null && isGood && "border-olive-500 bg-olive-100 text-olive-900",
                      picked === o && !isGood && "border-terre-300 bg-terre-100 text-terre-700",
                      picked !== null && !isGood && picked !== o && "border-encre-900/8 opacity-50",
                    )}
                  >
                    {o}
                  </button>
                );
              })}
            </div>

            <div className={cn("grid transition-[grid-template-rows] duration-500", picked ? "grid-rows-[1fr]" : "grid-rows-[0fr]")} aria-live="polite">
              <div className="overflow-hidden">
                <div className="mt-5 rounded-2xl bg-papier-100 p-5">
                  <p className="m-kicker text-[0.6rem] text-terre-600">L’anecdote de Sophie &amp; Thomas</p>
                  <p className="m-serif mt-2 text-xl italic leading-snug">« {t.anecdote} »</p>
                  <p className="m-mono mt-4 text-xs text-encre-500">
                    {t.answered} réponses · {t.right} bonnes · +80 pts
                  </p>
                  <button type="button" onClick={() => setPicked(null)} className="mt-3 text-sm text-encre-700 underline underline-offset-4">
                    Rejouer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
