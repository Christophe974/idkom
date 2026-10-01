"use client";

import { useState } from "react";
import { Container } from "@/components/mariage/ui/Container";
import { PhoneFrame } from "@/components/mariage/ui/PhoneFrame";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { passport } from "@/content/mariage/copy";
import { programme } from "@/content/mariage/demo";
import { cn } from "@/lib/mariage/utils";

/** JOUR J · Le passeport invité : la journée dans la poche (onglets interactifs). */
export function GuestPassport() {
  const [tab, setTab] = useState(0);

  return (
    <section data-moment="jour-j" className="bg-minuit-900 py-20 text-papier-50 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <PhoneFrame tone="dark">
            <div className="flex h-full flex-col px-4 pb-4 pt-11">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.7rem] text-papier-300">Bonsoir</p>
                  <p className="m-serif text-2xl leading-none">François</p>
                </div>
                <span className="m-mono rounded-full bg-champagne-300 px-2.5 py-1 text-xs text-encre-950">1 240 pts</span>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-1 rounded-full bg-papier-50/8 p-1" role="tablist">
                {passport.tabs.map((t, i) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === i}
                    onClick={() => setTab(i)}
                    className={cn("rounded-full py-1.5 text-[0.62rem] font-medium transition-colors", tab === i ? "bg-papier-50 text-encre-950" : "text-papier-300")}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div key={tab} className="m-pop mt-4 flex-1 overflow-hidden">
                {tab === 0 && (
                  <div className="rounded-2xl bg-papier-50/6 p-4">
                    <p className="m-kicker text-[0.58rem] text-champagne-300">Votre table</p>
                    <p className="m-serif mt-1 text-4xl">Marrakech</p>
                    <p className="mt-3 text-xs text-papier-300">Avec vous : Julie, Emma, Cyril, Laura, Paul, Nadia…</p>
                    <div className="mt-4 rounded-xl bg-champagne-300/12 p-3 text-xs text-champagne-100">
                      2 personnes à votre table ne vous connaissent pas encore. Allez dire bonjour : +30 pts.
                    </div>
                  </div>
                )}
                {tab === 1 && (
                  <ol className="space-y-2">
                    {programme.map((p) => (
                      <li key={p.time} className="flex gap-3 rounded-2xl bg-papier-50/6 p-3">
                        <span className="m-mono text-xs text-champagne-300">{p.time}</span>
                        <span>
                          <span className="block text-sm">{p.label}</span>
                          <span className="block text-[0.68rem] text-papier-300">{p.place}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
                {tab === 2 && (
                  <ul className="space-y-2">
                    {[
                      ["Photo avec un cousin de Sophie", "+30", false],
                      ["Trouver qui est né en novembre", "+50", true],
                      ["Danser sur Freed From Desire", "+40", false],
                    ].map(([l, p, done]) => (
                      <li key={l as string} className={cn("flex items-center justify-between rounded-2xl p-3 text-sm", done ? "bg-olive-700/50" : "bg-papier-50/6")}>
                        <span>{l}</span>
                        <span className="m-mono text-xs text-champagne-300">{done ? "✓" : p}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {tab === 3 && (
                  <div className="grid grid-cols-3 gap-1.5">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span
                        key={i}
                        className="aspect-square rounded-lg"
                        style={{ background: `hsl(${(i * 37) % 360} 30% ${28 + (i % 4) * 8}%)` }}
                        aria-hidden="true"
                      />
                    ))}
                    <p className="col-span-3 mt-2 text-center text-[0.68rem] text-papier-300">Envoyez vos photos, les mariés les découvriront.</p>
                  </div>
                )}
              </div>
            </div>
          </PhoneFrame>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHead tone="light" kicker={passport.kicker} title={passport.title} text={passport.text} />
        </div>
      </Container>
    </section>
  );
}
