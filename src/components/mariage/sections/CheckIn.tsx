"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { checkIn } from "@/content/mariage/copy";
import { placeCards } from "@/content/mariage/demo";
import { useInView } from "@/lib/mariage/useInView";
import { cn } from "@/lib/mariage/utils";

/** JOUR J · L'accueil : on scanne, le prénom et la table s'affichent, la présence est validée. */
export function CheckIn() {
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.35 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setStep((s) => s + 1), 2600);
    return () => clearInterval(t);
  }, [inView]);

  const guest = placeCards[step % placeCards.length];
  const arrived = 63 + step;

  return (
    <section data-moment="jour-j" className="bg-minuit-950 py-20 text-papier-50 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <SectionHead tone="light" kicker={checkIn.kicker} title={checkIn.title} text={checkIn.text} />

        <Reveal delay={120}>
          <div ref={ref}>
            <MediaSlot id="CHECKIN_SCREEN">
              {/* Tablette d'accueil */}
              <div className="mx-auto max-w-lg rounded-[2rem] bg-encre-950 p-3 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] ring-1 ring-papier-50/10">
                <div className="relative overflow-hidden rounded-[1.4rem] bg-papier-50 px-6 py-8 text-center text-encre-900 sm:px-10 sm:py-10">
                  <div className="flex items-center justify-between text-xs text-encre-500">
                    <span className="m-kicker text-[0.6rem]">Accueil · Sophie &amp; Thomas</span>
                    <span className="m-mono">
                      {arrived}/96 arrivés
                    </span>
                  </div>
                  <div key={step} className="m-pop py-8 sm:py-10">
                    <p className="text-encre-500">Bienvenue</p>
                    <p className="m-serif mt-1 text-5xl italic sm:text-6xl">{guest.name} !</p>
                    <p className="m-kicker mt-6 text-terre-600">Votre table</p>
                    <p className="m-serif mt-1 text-4xl">{guest.table}</p>
                  </div>
                  <p className="flex items-center justify-center gap-2 text-sm text-olive-700">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-olive-700 text-[0.65rem] text-papier-50">✓</span>
                    Présence validée
                  </p>
                  <span className={cn("m-scan pointer-events-none absolute inset-x-6 h-px bg-terre-500/60 shadow-[0_0_12px_2px_rgb(214_90_59/0.5)]")} aria-hidden="true" />
                </div>
              </div>
            </MediaSlot>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
