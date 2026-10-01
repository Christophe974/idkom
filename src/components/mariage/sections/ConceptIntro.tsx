import { Container } from "@/components/mariage/ui/Container";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { conceptIntro } from "@/content/mariage/copy";

/** Le fil rouge en 4 temps : ce qu'il faut avoir compris en 10 secondes sur téléphone. */
export function ConceptIntro() {
  return (
    <section id="comment" data-moment="intro" className="bg-encre-900 py-20 text-papier-50 sm:py-28">
      <Container>
        <Reveal>
          <p className="m-kicker text-champagne-300">{conceptIntro.kicker}</p>
          <h2 className="m-h2 mt-4 max-w-3xl">{conceptIntro.title}</h2>
        </Reveal>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-papier-50/10 sm:grid-cols-2 lg:grid-cols-4">
          {conceptIntro.steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 90} className="relative bg-encre-900 p-6 sm:p-7">
              <span className="m-mono text-sm text-champagne-300">{s.n}</span>
              <p className="m-serif mt-6 text-[1.7rem] leading-[1.1]">{s.title}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-papier-300">{s.text}</p>
              {i < conceptIntro.steps.length - 1 && (
                <span className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-papier-50/25 bg-encre-900 lg:block" aria-hidden="true" />
              )}
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
