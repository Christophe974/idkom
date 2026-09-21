import Image from "next/image";
import { Container } from "@/components/noel/ui/Container";
import { Icon } from "@/components/noel/ui/Icon";
import { SectionHeading } from "@/components/noel/ui/SectionHeading";
import { formules } from "@/content/noel/formules";
import { cn } from "@/lib/noel/utils";

export function Formules() {
  return (
    <section id="participer" className="border-t hairline bg-nuit-950 py-24 sm:py-32">
      <Container>
        <SectionHeading
          kicker="Deux façons de participer"
          title={
            <>
              Deux façons d’entrer <em>dans la bande.</em>
            </>
          }
        />

        <div className="mt-14 grid gap-px border hairline bg-cuivre-500/35 md:grid-cols-2">
          {formules.map((f) => (
            <article
              key={f.id}
              className={cn("flex flex-col p-7 sm:p-10", f.id === "privee" ? "bg-bordeaux-800/55" : "bg-nuit-900")}
            >
              <div className="relative -mx-7 -mt-7 mb-7 aspect-[3/2] overflow-hidden sm:-mx-10 sm:-mt-10 sm:mb-8">
                <Image src={f.image.src} alt={f.image.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
              </div>
              <p className="kicker">{f.kicker}</p>
              <h3 className="mt-3 font-poster text-[2.4rem] uppercase leading-[0.95] text-ivoire-100 sm:text-5xl">
                {f.title}
              </h3>
              <p className="mt-5 leading-relaxed text-ivoire-200">{f.text}</p>
              <ul className="mt-6 space-y-2.5 text-sm text-ivoire-200">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-cuivre-300" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <a
                  href="#proposition"
                  className="inline-flex items-center gap-2 font-poster text-[1.05rem] uppercase tracking-[0.12em] text-ambre-300 transition-colors hover:text-ambre-200"
                >
                  Demander une proposition
                  <Icon name="arrow" className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-sm text-ivoire-600">
          Aucun tarif n’est affiché : chaque proposition est chiffrée sur mesure, selon la formule, le nombre de convives
          et les options retenues.
        </p>
      </Container>
    </section>
  );
}
