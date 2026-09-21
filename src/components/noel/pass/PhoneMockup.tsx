import type { ReactNode } from "react";

/** Cadre de téléphone neutre pour présenter un écran mobile. */
export function PhoneMockup({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative aspect-[9/19.2] w-[300px] overflow-hidden rounded-[2.4rem] border-[6px] border-nuit-700 bg-nuit-950 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.85)] sm:w-[320px]"
      role="img"
      aria-label="Maquette de téléphone présentant la page d’un participant après le scan de son Pass (données fictives)."
    >
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-nuit-700" aria-hidden="true" />
      <div className="h-full overflow-hidden pt-8">{children}</div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-nuit-950 to-transparent" aria-hidden="true" />
    </div>
  );
}
