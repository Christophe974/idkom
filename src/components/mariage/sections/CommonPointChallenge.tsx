"use client";

import { useState } from "react";
import { Container } from "@/components/mariage/ui/Container";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { commonPoint } from "@/content/mariage/copy";
import { cn } from "@/lib/mariage/utils";

const names = ["François", "Élodie", "Maxime"];

/** Scène vécue : le DJ appelle trois invités, ils cherchent ce qu'ils ont en commun (données du RSVP). */
export function CommonPointChallenge() {
  const [revealed, setRevealed] = useState(false);
  return (
    <section data-moment="jour-j" className="bg-minuit-900 py-20 text-papier-50 sm:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="m-kicker text-champagne-300">{commonPoint.kicker}</p>
          <p className="m-serif mt-4 text-[clamp(1.7rem,4.6vw,2.9rem)] italic leading-[1.08]">{commonPoint.djLine}</p>
          <h2 className="m-h3 mt-8">{commonPoint.title}</h2>
          <p className="mt-3 text-papier-300">{commonPoint.text}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-[1.75rem] bg-papier-50/5 p-6 ring-1 ring-papier-50/10 sm:p-8">
            <div className="flex flex-wrap justify-center gap-3">
              {names.map((n, i) => (
                <span
                  key={n}
                  className={cn(
                    "m-serif rounded-full px-5 py-2.5 text-2xl transition-all duration-500",
                    revealed ? "bg-champagne-300 text-encre-950" : "bg-papier-50/10",
                  )}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  {n}
                </span>
              ))}
            </div>
            <div className="mt-8 min-h-28 text-center" aria-live="polite">
              {revealed ? (
                <div className="m-pop">
                  <p className="m-serif text-3xl sm:text-4xl">{commonPoint.answer}</p>
                  <p className="m-mono mt-3 text-champagne-300">+{commonPoint.pts} points chacun</p>
                </div>
              ) : (
                <p className="m-serif text-5xl text-papier-50/30" aria-hidden="true">
                  ? ? ?
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setRevealed((v) => !v)}
              className="mx-auto mt-4 block rounded-full bg-papier-50 px-6 py-3 text-sm font-medium text-encre-950 hover:bg-champagne-100"
            >
              {revealed ? "Rejouer" : commonPoint.reveal}
            </button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
