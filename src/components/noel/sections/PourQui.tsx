import { Container } from "@/components/noel/ui/Container";
import { SectionHeading } from "@/components/noel/ui/SectionHeading";
import { audiences } from "@/content/noel/audiences";

export function PourQui() {
  return (
    <section id="pour-qui" className="border-t hairline bg-nuit-950 py-24 sm:py-32">
      <Container className="lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            kicker="Pour qui ?"
            title={
              <>
                Toutes les tailles <em>de bande.</em>
              </>
            }
            lead="Entreprises, CSE, petites équipes ou grands groupes : la formule s’adapte, pas l’ambiance."
          />
        </div>
        <dl className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:col-span-8 lg:mt-0">
          {audiences.map((a) => (
            <div key={a.label} className="border-t hairline py-6">
              <dt className="font-poster text-3xl uppercase tracking-[0.04em] text-ivoire-100">{a.label}</dt>
              <dd className="mt-2 leading-relaxed text-ivoire-200">{a.text}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
