import { Container } from "@/components/noel/ui/Container";
import { SectionHeading } from "@/components/noel/ui/SectionHeading";
import { site } from "@/lib/noel/site";
import { cn } from "@/lib/noel/utils";

const stops = [
  ...site.cities.map((c) => ({ label: c, note: "Départ possible" })),
  { label: "Votre ville\u00a0?", note: "Sur demande" },
];

export function Transport() {
  return (
    <section id="transport" className="border-t hairline py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            kicker="Transport · en option"
            title={
              <>
                Le bus pour venir. <em>Le bus pour rentrer.</em>
              </>
            }
            lead={`Selon la demande, un aller-retour en bus peut être organisé depuis ${site.cities.join(", ")} ou d’autres villes. Les points de départ et les horaires sont fixés soirée par soirée, dans la proposition.`}
          />
        </div>

        <div className="lg:col-span-7">
          <ol className="relative flex flex-col gap-7 before:absolute before:bottom-3 before:left-[7px] before:top-3 before:w-px before:bg-cuivre-500/50 sm:flex-row sm:gap-4 sm:before:bottom-auto sm:before:left-2 sm:before:right-2 sm:before:top-[7px] sm:before:h-px sm:before:w-auto">
            {stops.map((s) => (
              <li key={s.label} className="relative pl-8 sm:flex-1 sm:pl-0 sm:pt-8">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-4 w-4 rounded-full border border-cuivre-400 bg-nuit-900 sm:top-0"
                />
                <p className="font-fraunces text-xl text-ivoire-100">{s.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ivoire-600">{s.note}</p>
              </li>
            ))}
            <li className={cn("relative pl-8 sm:flex-[1.4] sm:pl-0 sm:pt-8")}>
              <span aria-hidden="true" className="absolute left-0 top-1 h-4 w-4 rounded-full bg-ambre-500 sm:top-0" />
              <p className="font-poster text-2xl uppercase leading-none tracking-[0.04em] text-ambre-300">{site.venue}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ivoire-600">Arrivée · et retour en fin de soirée</p>
              <p className="mt-2 text-sm text-ivoire-400">
                {site.partner.address.street}, {site.partner.address.postalCode} {site.partner.address.city}
              </p>
            </li>
          </ol>
          <p className="mt-8 max-w-xl text-sm text-ivoire-600">
            Option proposée selon les soirées et le nombre de participants. Aucune ligne, aucun horaire ni aucun tarif n’est
            fixé à ce stade : tout est précisé dans la proposition.
          </p>
        </div>
      </Container>
    </section>
  );
}
