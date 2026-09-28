import Image from "next/image";
import { Container } from "@/components/noel/ui/Container";
import { SectionHeading } from "@/components/noel/ui/SectionHeading";
import { carte } from "@/content/noel/carte";
import { cn } from "@/lib/noel/utils";

export function ALaCarte() {
  return (
    <section id="a-la-carte" className="border-t hairline bg-nuit-950 py-24 sm:py-32">
      <Container>
        <SectionHeading
          kicker="À la carte · repas, spectacles, chalets"
          title={
            <>
              Vous choisissez les ingrédients. <em>On monte le coup.</em>
            </>
          }
          lead="Un caquelon ou un repas de gala, un casino ou un magicien, un chalet de plus pour les enfants. La soirée se compose comme vous l’entendez."
        />

        <div className="mt-14 grid gap-px border hairline bg-cuivre-500/35 md:grid-cols-2">
          {carte.map((g) => (
            <article key={g.id} className={cn("flex flex-col", g.id === "enfants" ? "bg-bordeaux-800/55" : "bg-nuit-900")}>
              <div className="relative aspect-[3/2] overflow-hidden bg-nuit-800">
                <Image src={g.image.src} alt={g.image.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
              </div>
              <div className="p-7 sm:p-10">
                <p className="kicker">{g.kicker}</p>
                <h3 className="mt-3 font-poster text-[2.1rem] uppercase leading-[0.95] text-ivoire-100 sm:text-[2.6rem]">
                  {g.title}
                </h3>
                <dl className="mt-6 border-b hairline">
                  {g.items.map((item) => (
                    <div key={item.name} className="border-t hairline py-4">
                      <dt className="font-fraunces text-xl text-ivoire-100">{item.name}</dt>
                      <dd className="mt-1 text-[0.95rem] leading-relaxed text-ivoire-200">{item.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm text-ivoire-600">
            Menus et spectacles donnés à titre d’exemple. Tout s’adapte : régimes particuliers, durée, horaires, nombre de
            convives.
          </p>
          <a
            href="#proposition"
            className="inline-flex shrink-0 items-center gap-2 font-poster text-[1.05rem] uppercase tracking-[0.12em] text-ambre-300 transition-colors hover:text-ambre-200"
          >
            Composer ma soirée →
          </a>
        </div>
      </Container>
    </section>
  );
}
