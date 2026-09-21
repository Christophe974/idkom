import { Container } from "@/components/noel/ui/Container";
import { SectionHeading } from "@/components/noel/ui/SectionHeading";
import { faq } from "@/content/noel/faq";

export function Faq() {
  return (
    <section id="faq" className="border-t hairline py-24 sm:py-32">
      <Container className="lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            kicker="Questions fréquentes"
            title={
              <>
                Ce qu’on nous <em>demande souvent.</em>
              </>
            }
          />
        </div>
        <div className="mt-10 border-t hairline lg:col-span-8 lg:mt-0">
          {faq.map((item) => (
            <details key={item.q} className="faq border-b hairline">
              <summary className="flex items-start justify-between gap-6 py-5 text-left">
                <span className="font-fraunces text-xl text-ivoire-100">{item.q}</span>
                <span className="faq-icon numeral mt-0.5 shrink-0 text-2xl" aria-hidden="true" />
              </summary>
              <p className="max-w-prose pb-6 pr-10 leading-relaxed text-ivoire-200">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
