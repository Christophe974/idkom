import type { ReactNode } from "react";
import { Bebas_Neue, Fraunces, Manrope } from "next/font/google";
import { cn } from "@/lib/noel/utils";

// Polices propres à la page (auto-hébergées par next/font), exposées en variables CSS
// lues par src/app/noel.css : --font-bebas, --font-fraunces-var, --font-manrope-var.
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces-var",
  display: "swap",
});
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-manrope-var", display: "swap" });

export default function NoelLayout({ children }: { children: ReactNode }) {
  return (
    <div className={cn("noel grain min-h-svh", bebas.variable, fraunces.variable, manrope.variable)}>
      <a
        href="#main"
        className="sr-only font-poster uppercase tracking-widest focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-ambre-500 focus:px-4 focus:py-2 focus:text-nuit-950"
      >
        Aller au contenu
      </a>
      <noscript>
        <style>{`.reveal{opacity:1;transform:none}`}</style>
      </noscript>
      {children}
    </div>
  );
}
