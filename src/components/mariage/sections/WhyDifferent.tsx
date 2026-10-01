import { Container } from "@/components/mariage/ui/Container";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { whyDifferent as w } from "@/content/mariage/copy";
import { cn } from "@/lib/mariage/utils";

/** Notre différence : la cascade « C'est le faire-part… et finalement, c'est le souvenir. » */
export function WhyDifferent() {
  return (
    <section id="difference" data-moment="apres" className="bg-encre-900 py-20 text-papier-50 sm:py-32">
      <Container>
        <Reveal>
          <p className="m-kicker text-champagne-300">{w.kicker}</p>
          <h2 className="m-display mt-5 max-w-4xl">{w.title}</h2>
        </Reveal>

        <ol className="mt-14 space-y-1 sm:mt-20">
          {w.steps.map((s, i) => {
            const last = i === w.steps.length - 1;
            return (
              <Reveal as="li" key={s} delay={i * 60}>
                <p
                  className={cn(
                    "m-serif leading-[1.05]",
                    last ? "mt-6 text-[clamp(2.3rem,7vw,4.8rem)] italic text-champagne-300" : "text-[clamp(1.9rem,5.6vw,3.6rem)]",
                  )}
                  style={last ? undefined : { opacity: 0.45 + (i / w.steps.length) * 0.55 }}
                >
                  {s}
                </p>
                {!last && (
                  <span className="ml-1 block h-5 w-px bg-papier-50/25 sm:h-6" aria-hidden="true" />
                )}
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-16 border-t border-papier-50/15 pt-10 sm:mt-24">
          <p className="m-h3 max-w-3xl">
            {w.closing[0]} <span className="text-papier-300">{w.closing[1]}</span>
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <p className="m-kicker text-papier-300">{w.valuesTitle}</p>
          <div className="mt-5 overflow-hidden" aria-hidden="true">
            <div className="m-marquee flex w-max gap-3">
              {[...w.values, ...w.values].map((v, i) => (
                <span key={i} className="m-serif whitespace-nowrap rounded-full border border-papier-50/20 px-5 py-2 text-2xl italic">
                  {v}
                </span>
              ))}
            </div>
          </div>
          <ul className="sr-only">
            {w.values.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
