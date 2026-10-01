"use client";

import { useEffect, useState } from "react";
import { moments } from "@/content/mariage/copy";
import { cn } from "@/lib/mariage/utils";

type Moment = "intro" | "avant" | "jour-j" | "apres" | "fin";

/**
 * En-tête fixe + la grande frise AVANT · JOUR J · APRÈS.
 * Le moment actif suit le scroll (sections marquées data-moment), et l'en-tête
 * passe en version nuit pendant le jour J.
 */
export function SiteHeader() {
  const [moment, setMoment] = useState<Moment>("intro");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-moment]"));

    // À chaque frame de scroll : la section qui traverse le milieu de l'écran donne « le moment ».
    let raf = 0;
    const update = () => {
      const mid = window.innerHeight / 2;
      const current = sections.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= mid && r.bottom > mid;
      });
      if (current) setMoment(current.dataset.moment as Moment);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const night = moment === "jour-j" || moment === "fin";
  const showRail = moment !== "intro";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md transition-colors duration-500",
        night ? "border-papier-50/10 bg-minuit-950/75 text-papier-50" : "border-encre-900/10 bg-papier-100/80 text-encre-900",
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
        <a href="#top" className="flex items-baseline gap-2 leading-none" aria-label="Retour en haut de la page">
          <span className="m-serif whitespace-nowrap text-[1.45rem] italic">le mariage</span>
          <span className={cn("m-kicker hidden sm:inline", night ? "text-champagne-300" : "text-terre-600")}>par iDkom</span>
        </a>

        <nav aria-label="Les trois moments" className="hidden items-center gap-1 md:flex">
          {moments.items.map((m, i) => {
            const active = moment === m.id;
            return (
              <a
                key={m.id}
                href={`#${m.id}`}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  active
                    ? night
                      ? "bg-champagne-300 text-encre-950"
                      : "bg-encre-900 text-papier-50"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                <span className="m-mono text-[0.7rem] opacity-70">0{i + 1}</span>
                {m.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#creer"
          className={cn(
            "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
            night ? "bg-papier-50 text-encre-950 hover:bg-champagne-100" : "bg-terre-600 text-papier-50 hover:bg-terre-700",
          )}
        >
          <span className="sm:hidden">Nous parler</span>
          <span className="hidden sm:inline">Imaginer notre mariage</span>
        </a>
      </div>

      {/* La frise sur téléphone : visible dès qu'on quitte l'intro */}
      <nav
        aria-label="Les trois moments"
        className={cn(
          "grid grid-cols-3 overflow-hidden text-center transition-[max-height,opacity] duration-500 md:hidden",
          showRail ? "max-h-10 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        {moments.items.map((m) => {
          const active = moment === m.id;
          return (
            <a
              key={m.id}
              href={`#${m.id}`}
              aria-current={active ? "step" : undefined}
              className={cn("m-kicker py-2 transition-opacity", active ? "opacity-100" : "opacity-45")}
            >
              {m.label}
            </a>
          );
        })}
      </nav>

      <div className="h-[2px] w-full bg-current/5" aria-hidden="true">
        <div
          className={cn("h-full origin-left", night ? "bg-champagne-300" : "bg-terre-500")}
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </header>
  );
}
