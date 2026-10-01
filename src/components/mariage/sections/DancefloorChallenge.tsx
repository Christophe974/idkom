"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { dancefloor } from "@/content/mariage/copy";
import { useInView } from "@/lib/mariage/useInView";

const TARGET = 7;

/** Scène vécue : le DJ lance « les 10 premiers sur la piste », le compteur grimpe à l'écran. */
export function DancefloorChallenge() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.45 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setCount(TARGET), 0);
      return () => clearTimeout(t);
    }
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= TARGET) clearInterval(t);
    }, 380);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section data-moment="jour-j" className="bg-minuit-950 py-20 text-papier-50 sm:py-28">
      <Container>
        <Reveal>
          <p className="m-kicker text-champagne-300">{dancefloor.kicker}</p>
          <p className="m-serif mt-4 max-w-4xl text-[clamp(1.9rem,5.5vw,3.6rem)] italic leading-[1.05]">{dancefloor.djLine}</p>
        </Reveal>

        <div ref={ref} className="relative mt-10">
          <MediaSlot id="DANCEFLOOR" sizes="(min-width: 1152px) 1100px, 100vw" className="aspect-[4/5] rounded-[1.75rem] sm:aspect-[16/9]" imgClassName="object-[30%_50%]" />
          <div className="absolute inset-0 rounded-[1.75rem] bg-linear-to-t from-minuit-950/80 via-transparent to-transparent" aria-hidden="true" />

          {/* L'écran de la salle */}
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-minuit-950/80 p-4 backdrop-blur-md ring-1 ring-champagne-300/30 sm:bottom-6 sm:left-auto sm:right-6 sm:w-80 sm:p-5">
            <p className="m-kicker text-[0.6rem] text-champagne-300">Défi piste · +100 pts</p>
            <p className="m-mono mt-2 text-5xl" aria-live="polite">
              {count}
              <span className="text-papier-300">/10</span>
            </p>
            <p className="text-sm text-papier-300">{dancefloor.counterLabel}</p>
            <div className="mt-3 grid grid-cols-10 gap-1" aria-hidden="true">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className={i < count ? "h-2 rounded-full bg-champagne-300 transition-colors" : "h-2 rounded-full bg-papier-50/15 transition-colors"} />
              ))}
            </div>
          </div>
        </div>

        <Reveal className="mt-10 max-w-2xl">
          <h2 className="m-h3">{dancefloor.title}</h2>
          <p className="mt-3 text-papier-300">{dancefloor.text}</p>
        </Reveal>
      </Container>
    </section>
  );
}
