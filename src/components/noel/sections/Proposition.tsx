import { Container } from "@/components/noel/ui/Container";
import { SectionHeading } from "@/components/noel/ui/SectionHeading";
import { PropositionForm } from "./PropositionForm";

export function Proposition() {
  return (
    <section id="proposition" className="border-t hairline bg-nuit-950 py-24 sm:py-32">
      <Container className="lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              kicker="Demander une proposition"
              title={
                <>
                  Dites-nous qui vient. <em>On prépare le plan.</em>
                </>
              }
              lead="Cinq minutes suffisent. Vous recevez une proposition sur mesure : formule, repas, animations, options de transport."
            />
          </div>
        </div>
        <div className="relative mt-12 lg:col-span-8 lg:mt-0">
          <PropositionForm />
        </div>
      </Container>
    </section>
  );
}
