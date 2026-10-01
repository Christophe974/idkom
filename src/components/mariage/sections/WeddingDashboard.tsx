import { Container } from "@/components/mariage/ui/Container";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { organize } from "@/content/mariage/copy";
import { BudgetPreview } from "./BudgetPreview";

/** AVANT · L'organisation : les quelques outils utiles, au même endroit que les invités. */
export function WeddingDashboard() {
  return (
    <section data-moment="avant" className="bg-olive-900 py-20 text-papier-50 sm:py-28">
      <Container>
        <SectionHead tone="light" kicker={organize.kicker} title={organize.title} text={organize.text} className="max-w-3xl" />
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <ul className="grid content-start gap-px self-start overflow-hidden rounded-3xl bg-papier-50/10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {organize.features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 80} className="flex gap-5 bg-olive-900 p-5">
                <span className="m-mono pt-1 text-sm text-olive-300">0{i + 1}</span>
                <span>
                  <span className="m-serif block text-2xl">{f.title}</span>
                  <span className="mt-1 block text-[0.95rem] text-papier-300">{f.text}</span>
                </span>
              </Reveal>
            ))}
          </ul>
          <div className="lg:col-span-7">
            <BudgetPreview />
          </div>
        </div>
      </Container>
    </section>
  );
}
