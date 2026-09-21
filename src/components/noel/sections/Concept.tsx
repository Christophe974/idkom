import { Container } from "@/components/noel/ui/Container";
import { SectionHeading } from "@/components/noel/ui/SectionHeading";
import { site } from "@/lib/noel/site";

const facts = [
  { value: `${site.headcount.min} à ${site.headcount.max}`, label: "personnes, en soirée privée ou partagée" },
  { value: "4", label: "chalets à traverser avant d’entrer" },
  { value: "1", label: "Pass à votre nom, pour toute la soirée" },
];

export function Concept() {
  return (
    <section id="operation" className="border-t hairline py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            kicker="L’opération · soirée de Noël entreprise & CSE"
            title={
              <>
                Ce n’est pas un repas de Noël. <em>C’est une opération.</em>
              </>
            }
          />
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-ivoire-200 lg:col-span-7 lg:pt-12">
          <p>
            Ça commence au portail du {site.venue}. Un bus qui se gare, un groom en tenue bordeaux, quatre chalets
            éclairés dans la nuit. Avant même d’avoir posé le manteau, chacun a son Pass, un verre chaud et une première
            mission.
          </p>
          <p>
            Ensuite, un vrai repas, des jeux entre les plats, un blind test où toute la salle vote, une piste de danse.
            Et un butin à ramener à la maison.
          </p>
          <p className="text-ivoire-100">
            Chacun joue s’il en a envie. Ceux qui veulent seulement dîner, rire et trinquer sont aussi bienvenus que les
            autres.
          </p>

          <dl className="grid grid-cols-1 gap-8 border-t hairline pt-8 xs:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="numeral block text-5xl">{f.value}</span>
                  <span className="mt-2 block text-sm text-ivoire-400">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
