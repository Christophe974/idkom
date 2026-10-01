import { hero } from "@/content/mariage/copy";
import { cn } from "@/lib/mariage/utils";

/** L'écran que découvre l'invité en approchant le porte-clés : l'invitation à son nom. */
export function InvitationScreen({ household = "Famille Martin", className }: { household?: string; className?: string }) {
  const p = hero.phone;
  return (
    <div className={cn("flex h-full flex-col items-center justify-between bg-papier-50 px-5 pb-6 pt-12 text-center", className)}>
      <p className="m-kicker text-[0.6rem] text-encre-500">Pour la {household}</p>
      <div>
        <svg viewBox="0 0 60 24" className="mx-auto h-5 w-14 text-olive-500" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M2 12c8-10 18-10 28 0s20 10 28 0" strokeLinecap="round" />
        </svg>
        <p className="m-serif mt-4 text-[2.15rem] leading-[1.02] text-encre-900">
          Sophie
          <br />
          <span className="italic text-terre-600">&amp;</span> Thomas
        </p>
        <p className="m-mono mt-4 text-[0.72rem] uppercase tracking-[0.18em] text-encre-500">{p.date}</p>
        <p className="m-serif mt-5 text-2xl italic text-encre-900">{p.line}</p>
      </div>
      <div className="w-full">
        <p className="text-[0.8rem] text-encre-700">{p.cta}</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[0.8rem] font-medium">
          <span className="rounded-full bg-terre-600 py-2.5 text-papier-50">Oui, on vient</span>
          <span className="rounded-full border border-encre-900/15 py-2.5 text-encre-700">Répondre</span>
        </div>
      </div>
    </div>
  );
}
