"use client";

import { useState } from "react";
import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { djConsole } from "@/content/mariage/copy";
import { leaderboard } from "@/content/mariage/demo";
import { cn, formatInt } from "@/lib/mariage/utils";

const launches = ["Défi piste · 10 premiers", "Lui ou elle", "Blind test", "Points communs", "Défi photo", "Défi surprise"];

/** La régie du DJ : accès séparé, aucune donnée privée, juste de quoi faire vivre la soirée. */
export function DJConsole() {
  const [live, setLive] = useState<string | null>(null);
  const [scores, setScores] = useState(() => leaderboard.map((p) => p.pts));

  const add = (i: number, pts: number) => setScores((s) => s.map((v, j) => (j === i ? v + pts : v)));

  return (
    <section data-moment="jour-j" className="bg-minuit-900 py-20 text-papier-50 sm:py-28">
      <Container>
        <SectionHead tone="light" kicker={djConsole.kicker} title={djConsole.title} text={djConsole.text} className="max-w-3xl" />

        <Reveal delay={120} className="mt-12">
          <MediaSlot id="DJ_SCREEN">
            <div className="rounded-[2rem] bg-encre-950 p-2.5 ring-1 ring-papier-50/10 sm:p-3">
              <div className="rounded-[1.5rem] bg-minuit-800 p-4 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-papier-50/10 pb-4">
                  <p className="font-medium">
                    Régie DJ <span className="font-normal text-papier-300">· Mariage de Sophie &amp; Thomas</span>
                  </p>
                  <p className="flex items-center gap-2 rounded-full bg-papier-50/8 px-3 py-1.5 text-xs text-papier-300">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="7" width="10" height="7" rx="1.5" />
                      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
                    </svg>
                    Aucune donnée privée
                  </p>
                </div>

                <div className="mt-5 grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="m-kicker text-[0.6rem] text-champagne-300">Lancer</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {launches.map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setLive((v) => (v === l ? null : l))}
                          aria-pressed={live === l}
                          className={cn(
                            "rounded-xl px-3 py-3.5 text-left text-sm transition-colors",
                            live === l ? "bg-champagne-300 text-encre-950" : "bg-papier-50/6 hover:bg-papier-50/12",
                          )}
                        >
                          {live === l ? "● En cours · " : ""}
                          {l}
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 min-h-5 text-xs text-papier-300" aria-live="polite">
                      {live ? `« ${live} » s’affiche sur l’écran et sur les téléphones.` : "Touchez une animation pour la lancer."}
                    </p>
                  </div>

                  <div>
                    <p className="m-kicker text-[0.6rem] text-champagne-300">Classement · donner des points</p>
                    <ol className="mt-3 space-y-1.5">
                      {leaderboard.map((p, i) => (
                        <li key={p.name} className="flex items-center gap-2 rounded-xl bg-papier-50/5 px-3 py-2">
                          <span className="flex-1 text-sm">
                            {p.name} <span className="text-papier-300">· {p.table}</span>
                          </span>
                          <span className="m-mono w-14 text-right text-sm">{formatInt(scores[i])}</span>
                          {[20, 50].map((pts) => (
                            <button
                              key={pts}
                              type="button"
                              onClick={() => add(i, pts)}
                              aria-label={`Donner ${pts} points à ${p.name}`}
                              className="m-mono rounded-lg bg-papier-50/10 px-2 py-1 text-xs hover:bg-champagne-300 hover:text-encre-950"
                            >
                              +{pts}
                            </button>
                          ))}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </MediaSlot>
        </Reveal>
      </Container>
    </section>
  );
}
