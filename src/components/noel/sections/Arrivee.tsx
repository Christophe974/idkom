import Image from "next/image";
import { Container } from "@/components/noel/ui/Container";
import { Icon } from "@/components/noel/ui/Icon";
import { Reveal } from "@/components/noel/ui/Reveal";
import { SectionHeading } from "@/components/noel/ui/SectionHeading";
import { arrival } from "@/content/noel/arrival";

export function Arrivee() {
  return (
    <section id="arrivee" className="border-t hairline py-24 sm:py-32">
      <Container className="lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              kicker="L’arrivée au Domaine"
              title={
                <>
                  Ça commence au portail. <em>Pas à table.</em>
                </>
              }
              lead="Le bus, le groom, quatre chalets éclairés. Avant même de s’asseoir, la bande a déjà un Pass, un verre chaud et une première mission."
            />
          </div>
        </div>

        <ol className="relative mt-14 space-y-16 border-l hairline-strong pl-8 sm:pl-12 lg:col-span-8 lg:mt-0">
          {arrival.map((step, i) => (
            <li key={step.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[2.45rem] top-2 h-3.5 w-3.5 border border-cuivre-400 bg-nuit-900 sm:-left-[3.45rem]"
              />
              <Reveal delay={i * 40}>
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
                  <div className="shrink-0 sm:w-60 md:w-72">
                    <div className="flex items-end justify-between">
                      {step.kind === "chalet" ? (
                        <span className="numeral block text-5xl sm:text-6xl">{step.label.replace("Chalet ", "")}</span>
                      ) : (
                        <span className="flex h-12 w-12 items-center justify-center border hairline text-cuivre-300">
                          <Icon name={step.icon} className="h-6 w-6" />
                        </span>
                      )}
                      {step.kind === "chalet" && <Icon name={step.icon} className="mb-1 h-5 w-5 text-cuivre-400" />}
                    </div>
                    <div className="relative mt-3 aspect-[4/3] overflow-hidden border hairline bg-nuit-800">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        fill
                        sizes="(min-width: 768px) 288px, (min-width: 640px) 240px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="min-w-0 sm:pt-1">
                    <p className="kicker">{step.label}</p>
                    <h3 className="mt-1 font-fraunces text-2xl text-ivoire-100 sm:text-3xl">{step.title}</h3>
                    <p className="mt-3 max-w-prose leading-relaxed text-ivoire-200">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
