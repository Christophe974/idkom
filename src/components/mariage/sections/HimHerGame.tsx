"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { PhoneFrame } from "@/components/mariage/ui/PhoneFrame";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { himHer } from "@/content/mariage/copy";
import { himHerVotes } from "@/content/mariage/demo";
import { useInView } from "@/lib/mariage/useInView";
import { cn } from "@/lib/mariage/utils";

type Choice = "him" | "her" | null;

/** Jeu Lui ou Elle : vote sur le téléphone (30 s, accélérées ici), résultat à l'écran, révélation des mariés. */
export function HimHerGame() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [seconds, setSeconds] = useState(30);
  const [vote, setVote] = useState<Choice>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!inView || seconds === 0 || vote) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 350);
    return () => clearTimeout(t);
  }, [inView, seconds, vote]);

  const closed = seconds === 0 || vote !== null;
  const right = vote === "her";

  const choiceBtn = (c: "him" | "her", label: string) => (
    <button
      type="button"
      disabled={closed}
      onClick={() => setVote(c)}
      aria-pressed={vote === c}
      className={cn(
        "m-serif flex-1 rounded-2xl py-6 text-3xl italic transition-all",
        vote === c ? "bg-champagne-300 text-encre-950" : "bg-papier-50/8 text-papier-50",
        closed && vote !== c && "opacity-40",
      )}
    >
      {label}
    </button>
  );

  return (
    <section data-moment="jour-j" className="bg-minuit-950 py-20 text-papier-50 sm:py-28">
      <Container>
        <SectionHead tone="light" kicker={himHer.kicker} title={himHer.title} text={himHer.text} className="max-w-3xl" />

        <div ref={ref} className="mt-12">
          <MediaSlot id="GAME_SCREEN" className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <PhoneFrame tone="dark">
                <div className="flex h-full flex-col px-4 pb-5 pt-12">
                  <div className="flex items-center justify-between text-xs text-papier-300">
                    <span className="m-kicker text-[0.58rem]">Lui ou elle</span>
                    <span className="m-mono">{closed ? "Votes clos" : `0:${String(seconds).padStart(2, "0")}`}</span>
                  </div>
                  <p className="m-serif mt-6 text-center text-[1.65rem] leading-tight">{himHer.title}</p>
                  <div className="mt-auto flex gap-3">
                    {choiceBtn("him", himHer.him)}
                    {choiceBtn("her", himHer.her)}
                  </div>
                  <p className="mt-4 min-h-10 text-center text-xs text-papier-300" aria-live="polite">
                    {revealed && vote ? (right ? "Bonne réponse ! +50 pts" : "Raté… ce sera pour la prochaine !") : vote ? "Vote enregistré. Regardez l’écran !" : "Votez avant la fin du temps."}
                  </p>
                </div>
              </PhoneFrame>
            </Reveal>

            <Reveal delay={150}>
              {/* L'écran de la salle */}
              <div className="rounded-[1.75rem] bg-minuit-800 p-6 ring-1 ring-papier-50/10 sm:p-8">
                <p className="m-kicker text-[0.62rem] text-champagne-300">Sur l’écran</p>
                <div className="mt-6 space-y-5">
                  {[
                    { key: "her", label: himHer.her, pct: himHerVotes.her },
                    { key: "him", label: himHer.him, pct: himHerVotes.him },
                  ].map((r) => {
                    const winner = revealed && r.label === himHer.answer;
                    return (
                      <div key={r.key}>
                        <div className="flex items-baseline justify-between">
                          <span className={cn("m-serif text-3xl italic", winner && "text-champagne-300")}>
                            {r.label} {winner && "✓"}
                          </span>
                          <span className="m-mono text-2xl">{closed ? `${r.pct} %` : "…"}</span>
                        </div>
                        <div className="mt-2 h-3 overflow-hidden rounded-full bg-papier-50/10">
                          <div
                            className={cn("h-full rounded-full transition-[width] duration-1000", winner ? "bg-champagne-300" : "bg-papier-50/60")}
                            style={{ width: closed ? `${r.pct}%` : "0%" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={!closed || revealed}
                    onClick={() => setRevealed(true)}
                    className="rounded-full bg-papier-50 px-5 py-3 text-sm font-medium text-encre-950 transition-opacity hover:bg-champagne-100 disabled:opacity-40"
                  >
                    {himHer.reveal}
                  </button>
                  {revealed && (
                    <button
                      type="button"
                      onClick={() => {
                        setVote(null);
                        setRevealed(false);
                        setSeconds(30);
                      }}
                      className="rounded-full border border-papier-50/25 px-5 py-3 text-sm"
                    >
                      Rejouer
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          </MediaSlot>
        </div>
      </Container>
    </section>
  );
}
