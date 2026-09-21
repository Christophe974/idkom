import { Icon } from "@/components/noel/ui/Icon";
import type { PassParticipant, ProgrammeState } from "@/lib/noel/pass/types";
import { cn } from "@/lib/noel/utils";

const stateLabel: Record<ProgrammeState, string> = { done: "Fait", now: "Maintenant", next: "À venir" };

type Props = {
  participant: PassParticipant;
  /** Élément utilisé pour le titre « Bienvenue … » (h1 sur la page réelle, p dans la maquette). */
  as?: "h1" | "h2" | "p";
  compact?: boolean;
};

/**
 * Écran obtenu après le scan d’un Pass. Composant d’affichage pur :
 * il ne sait pas d’où viennent les données (démo aujourd’hui, PULSE demain).
 */
export function PassScreen({ participant: p, as: Title = "h1", compact = false }: Props) {
  return (
    <div className={cn("flex min-h-full flex-col bg-nuit-950 text-ivoire-100", compact ? "text-[0.92rem]" : "")}>
      <header className={cn("flex items-start justify-between gap-3 border-b hairline", compact ? "px-4 pb-3 pt-2" : "px-5 pb-4 pt-6")}>
        <div className="min-w-0">
          <p className="kicker text-[0.65rem]">Pass du {p.event.venue}</p>
          <p className="mt-1 font-poster text-lg uppercase leading-none tracking-[0.04em]">{p.event.name}</p>
        </div>
        {p.demo && (
          <span className="shrink-0 border border-ambre-400 px-2 py-1 font-poster text-[0.62rem] uppercase tracking-[0.2em] text-ambre-300">
            Démo
          </span>
        )}
      </header>

      <main className={cn("flex-1 space-y-4", compact ? "px-4 py-3" : "px-5 py-5")}>
        <div>
          <Title className={cn("font-fraunces", compact ? "text-[1.55rem]" : "text-3xl")}>Bienvenue {p.firstName} !</Title>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-ivoire-600">Entreprise</dt>
              <dd className="font-medium">{p.company}</dd>
            </div>
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-ivoire-600">Table</dt>
              <dd className="numeral text-2xl">{p.table}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-ivoire-600">Équipe</dt>
              <dd className="font-medium text-ambre-200">{p.team.name}</dd>
            </div>
          </dl>
        </div>

        {p.nextMission && (
          <section className="border hairline-strong bg-nuit-900 p-3.5">
            <p className="kicker flex items-center gap-2 text-[0.65rem]">
              <Icon name="target" className="h-3.5 w-3.5" />
              Mission {String(p.nextMission.number).padStart(2, "0")}
            </p>
            <p className="mt-1.5 font-fraunces text-[1.05rem] leading-snug">{p.nextMission.title}</p>
            <span className="mt-3 inline-flex items-center gap-2 font-poster text-[0.85rem] uppercase tracking-[0.14em] text-ambre-300">
              Ouvrir la mission
              <Icon name="arrow" className="h-3.5 w-3.5" />
            </span>
          </section>
        )}

        <section>
          <p className="kicker text-[0.65rem]">Ce soir</p>
          <ol className="mt-2 divide-y divide-cuivre-500/25 border-y hairline">
            {p.programme.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-3 py-1.5">
                <span className={cn(item.state === "done" && "text-ivoire-600 line-through", item.state === "now" && "text-ambre-200")}>
                  {item.label}
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.14em] text-ivoire-600">{stateLabel[item.state]}</span>
              </li>
            ))}
          </ol>
        </section>

        <nav aria-label="Rubriques du Pass" className="grid grid-cols-3 gap-px border hairline bg-cuivre-500/25">
          {[
            { icon: "star", label: "Points", value: String(p.points) },
            { icon: "music", label: "Votes", value: "Blind test" },
            { icon: "camera", label: "Photos", value: "Souvenirs" },
          ].map((t) => (
            <div key={t.label} className="flex flex-col items-center gap-1 bg-nuit-950 px-2 py-2.5 text-center">
              <Icon name={t.icon as "star" | "music" | "camera"} className="h-4 w-4 text-cuivre-300" />
              <span className="text-[0.6rem] uppercase tracking-[0.14em] text-ivoire-600">{t.label}</span>
              <span className="text-xs font-medium">{t.value}</span>
            </div>
          ))}
        </nav>

        {p.demo && (
          <p className="text-[0.68rem] leading-snug text-ivoire-600">
            Données fictives. Aperçu de la page obtenue après le scan d’un Pass. Aucune donnée réelle n’est enregistrée.
          </p>
        )}
      </main>
    </div>
  );
}
