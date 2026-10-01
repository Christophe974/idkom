"use client";

import { useState } from "react";
import { Container } from "@/components/mariage/ui/Container";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { wishlist } from "@/content/mariage/copy";
import { wishlistTracks } from "@/content/mariage/demo";
import { cn } from "@/lib/mariage/utils";

/** La wishlist musicale : les souhaits du couple, le DJ coche ce qui est passé. */
export function MusicWishlist() {
  const [played, setPlayed] = useState(() => wishlistTracks.map((t) => t.played));
  const done = played.filter(Boolean).length;

  return (
    <section data-moment="jour-j" className="bg-minuit-950 py-20 text-papier-50 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <SectionHead tone="light" kicker={wishlist.kicker} title={wishlist.title} text={wishlist.text} />
        </div>
        <Reveal delay={120} className="min-w-0 lg:col-span-7">
          <div className="rounded-[1.75rem] bg-minuit-800 p-4 ring-1 ring-papier-50/10 sm:p-6">
            <div className="flex items-center justify-between px-1">
              <p className="m-kicker text-[0.62rem] text-champagne-300">Souhaits de Sophie &amp; Thomas</p>
              <p className="m-mono text-xs text-papier-300">
                {done}/{wishlistTracks.length} joués
              </p>
            </div>
            <ul className="mt-4 space-y-2">
              {wishlistTracks.map((t, i) => (
                <li key={t.title} className="flex items-center gap-3 rounded-2xl bg-papier-50/5 p-3 sm:p-3.5">
                  <button
                    type="button"
                    onClick={() => setPlayed((p) => p.map((v, j) => (j === i ? !v : v)))}
                    aria-pressed={played[i]}
                    aria-label={`${t.title} : ${played[i] ? "joué" : "pas encore joué"}`}
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition-colors",
                      played[i] ? "border-champagne-300 bg-champagne-300 text-encre-950" : "border-papier-50/30 text-transparent hover:border-papier-50/60",
                    )}
                  >
                    ✓
                  </button>
                  <div className={cn("min-w-0 flex-1 transition-opacity", played[i] && "opacity-55")}>
                    <p className="truncate font-medium">
                      {t.title} <span className="font-normal text-papier-300">· {t.artist}</span>
                    </p>
                    {t.note && <p className="truncate text-xs text-papier-300">{t.note}</p>}
                  </div>
                  <span
                    className={cn(
                      "hidden rounded-full px-2.5 py-1 text-[0.68rem] sm:inline",
                      t.tag === "Important" ? "bg-terre-600/30 text-terre-300" : "bg-papier-50/10 text-papier-300",
                    )}
                  >
                    {t.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
