"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { book } from "@/content/mariage/copy";
import { bookPages } from "@/content/mariage/demo";
import { cn } from "@/lib/mariage/utils";

/** APRÈS · Le souvenir final : garder en ligne, ou générer le livre du mariage (démo de composition). */
export function WeddingBook() {
  const [built, setBuilt] = useState(-1);
  const running = built >= 0 && built < bookPages.length;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setBuilt((b) => b + 1), 420);
    return () => clearTimeout(t);
  }, [running, built]);

  return (
    <section data-moment="apres" className="bg-papier-50 py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="m-kicker text-olive-700">{book.kicker}</p>
          <h2 className="m-h2 mt-4">{book.title}</h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal className="rounded-[1.75rem] bg-olive-100 p-6 sm:p-8 lg:col-span-4">
            <p className="m-mono text-sm text-olive-700">01</p>
            <p className="m-h3 mt-4">{book.online.title}</p>
            <p className="mt-3 text-encre-700">{book.online.text}</p>
          </Reveal>

          <Reveal delay={100} className="rounded-[1.75rem] bg-encre-900 p-6 text-papier-50 sm:p-8 lg:col-span-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="m-mono text-sm text-champagne-300">02</p>
                <p className="m-h3 mt-4">{book.printed.title}</p>
                <p className="mt-3 text-papier-300">{book.printed.text}</p>
                <button
                  type="button"
                  onClick={() => setBuilt(0)}
                  disabled={running}
                  className="mt-6 rounded-full bg-papier-50 px-6 py-3 text-sm font-medium text-encre-950 hover:bg-champagne-100 disabled:opacity-60"
                >
                  {built >= bookPages.length ? "Recréer notre souvenir" : book.printed.cta}
                </button>
              </div>

              <MediaSlot id="WEDDING_BOOK">
                <div className="relative mx-auto aspect-[3/4] w-full max-w-[15rem]">
                  {/* le livre : pages empilées qui se composent */}
                  {bookPages.map((p, i) => {
                    const shown = built > i;
                    return (
                      <div
                        key={p}
                        className={cn(
                          "absolute inset-0 flex flex-col justify-between rounded-r-xl rounded-l-sm border-l-4 border-terre-600 bg-papier-50 p-5 text-encre-900 shadow-lg transition-all duration-500",
                          shown ? "opacity-100" : "opacity-0",
                        )}
                        style={{ transform: shown ? `translate(${i * 3}px, ${-i * 3}px) rotate(${(i % 2 ? 1 : -1) * 1.2}deg)` : "translateY(16px)", zIndex: i }}
                        aria-hidden={!shown}
                      >
                        <p className="m-mono text-[0.6rem] text-encre-500">
                          p. {String(i * 8 + 1).padStart(2, "0")}
                        </p>
                        <p className="m-serif text-2xl leading-tight">{p}</p>
                        <div className="space-y-1.5" aria-hidden="true">
                          <span className="block h-1.5 w-full rounded bg-papier-200" />
                          <span className="block h-1.5 w-4/5 rounded bg-papier-200" />
                          <span className="block h-1.5 w-3/5 rounded bg-papier-200" />
                        </div>
                      </div>
                    );
                  })}
                  {built < 1 && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-papier-50/30 p-6 text-center text-sm text-papier-300">
                      Votre livre se composera ici.
                    </div>
                  )}
                </div>
                <p className="mt-4 min-h-5 text-center text-xs text-papier-300" aria-live="polite">
                  {running ? `Composition : ${bookPages[Math.max(0, built)]}…` : built >= bookPages.length ? "PDF prêt · à garder, imprimer ou relier en album" : ""}
                </p>
              </MediaSlot>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
