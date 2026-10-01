import { Arrow, Button } from "@/components/mariage/ui/Button";
import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { nfcTag } from "@/content/mariage/copy";

/** AVANT · Le faire-part : le porte-clés, les matières, la famille Martin qui l'ouvre. */
export function NFCTag() {
  return (
    <section id="avant" data-moment="avant" className="bg-papier-50 py-20 sm:py-28">
      <Container>
        <div className="flex items-center gap-4">
          <span className="m-serif text-6xl italic text-terre-600 sm:text-7xl">Avant</span>
          <span className="h-px flex-1 bg-encre-900/15" aria-hidden="true" />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="m-kicker text-terre-600">{nfcTag.kicker}</p>
            <h2 className="m-h2 mt-4">{nfcTag.title}</h2>
            <p className="m-lead mt-6 text-encre-700">{nfcTag.text}</p>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Matières">
              {nfcTag.materials.map((m) => (
                <li key={m} className="rounded-full border border-encre-900/15 px-3.5 py-1.5 text-sm text-encre-700">
                  {m}
                </li>
              ))}
            </ul>
            <Button href={nfcTag.cta.href} variant="ghost" className="mt-8 text-encre-900">
              {nfcTag.cta.label} <Arrow />
            </Button>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <figure>
              <MediaSlot
                id="INVITATION_HOME"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="aspect-[4/3] rounded-[1.75rem] sm:aspect-[3/2]"
              />
              <figcaption className="mt-5 grid gap-1 sm:grid-cols-[auto_1fr] sm:gap-6">
                <span className="m-kicker pt-1 text-encre-500">{nfcTag.scenario.kicker}</span>
                <span>
                  <span className="m-serif block text-2xl">{nfcTag.scenario.title}</span>
                  <span className="mt-1 block text-encre-700">{nfcTag.scenario.text}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div id="porte-cles" className="mt-20 grid items-center gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7 lg:order-2">
            <MediaSlot id="NFC_COLLECTION" sizes="(min-width: 1024px) 55vw, 100vw" className="aspect-[3/2] rounded-[1.75rem]" />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:order-1">
            <p className="m-serif text-[1.9rem] leading-tight sm:text-4xl">
              Bois, acrylique, PVC, impression 3D : <em className="text-terre-600">chaque collection a son caractère.</em>
            </p>
            <p className="mt-4 text-encre-700">
              Gravés et découpés dans notre atelier avec nos machines xTool, à vos initiales, vos couleurs, votre date. Un porte-clés par
              foyer, qu’on accroche à ses clés plutôt que sur le frigo.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
