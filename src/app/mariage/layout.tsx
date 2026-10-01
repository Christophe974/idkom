import type { ReactNode } from "react";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { cn } from "@/lib/mariage/utils";

// Polices propres à la page, exposées en variables lues par src/app/mariage.css.
const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-mariage-serif",
  display: "swap",
});
const sans = Geist({ subsets: ["latin"], variable: "--font-mariage-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mariage-mono", display: "swap" });

export default function MariageLayout({ children }: { children: ReactNode }) {
  return (
    <div className={cn("mariage m-grain min-h-svh overflow-x-clip", serif.variable, sans.variable, mono.variable)}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-terre-600 focus:px-4 focus:py-2 focus:text-papier-50"
      >
        Aller au contenu
      </a>
      <noscript>
        <style>{`.m-reveal{opacity:1;transform:none}.m-bar{transform:scaleX(var(--m-fill,1))}`}</style>
      </noscript>
      {children}
    </div>
  );
}
