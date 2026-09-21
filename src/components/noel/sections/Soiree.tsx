import Image from "next/image";
import { Container } from "@/components/noel/ui/Container";
import { Icon } from "@/components/noel/ui/Icon";
import { SectionHeading } from "@/components/noel/ui/SectionHeading";
import { soiree } from "@/content/noel/soiree";

export function Soiree() {
  return (
    <section id="soiree" className="border-t hairline py-24 sm:py-32">
      <Container>
        <SectionHeading
          kicker="La soirée · animations, blind test, danse"
          title={
            <>
              La soirée, <em>dans l’ordre.</em>
            </>
          }
          lead="Rien n’est obligatoire, tout est prévu. Chacun choisit son rythme : jouer, dîner, chanter, danser. Ou les quatre."
        />

        <div className="relative mt-12 aspect-[16/9] overflow-hidden border hairline bg-nuit-800 sm:aspect-[21/9]">
          <Image
            src="/noel/soiree.jpg"
            alt="La soirée battant son plein : blind test sur grand écran, téléphones levés pour voter, collègues et enfants qui dansent sous les guirlandes."
            fill
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
        </div>

        <ol className="mt-10 grid gap-x-12 md:grid-cols-2">
          {soiree.map((m) => (
            <li key={m.n} className="flex gap-5 border-t hairline py-7 sm:gap-7">
              <span className="numeral w-12 shrink-0 pt-1 text-5xl sm:w-14">{m.n}</span>
              <div>
                <div className="flex items-center gap-3">
                  <Icon name={m.icon} className="h-5 w-5 text-cuivre-300" />
                  <h3 className="font-fraunces text-2xl text-ivoire-100">{m.title}</h3>
                </div>
                <p className="mt-2 leading-relaxed text-ivoire-200">{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
