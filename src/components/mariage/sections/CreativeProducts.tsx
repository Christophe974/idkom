import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { creative } from "@/content/mariage/copy";

/** Un exemple (et seulement un exemple) des animations physiques de l'atelier : les silhouettes. */
export function CreativeProducts() {
  return (
    <section data-moment="avant" className="bg-papier-100 pb-20 sm:pb-28">
      <Container>
        <div className="grid items-center gap-6 rounded-[2rem] bg-papier-50 p-4 ring-1 ring-encre-900/5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8 sm:p-6">
          <Reveal>
            <MediaSlot id="SILHOUETTES_PRODUCT" sizes="(min-width: 640px) 240px, 90vw" className="aspect-[4/3] rounded-[1.4rem] sm:aspect-[3/4]" />
          </Reveal>
          <Reveal delay={100} className="pb-2 sm:pb-0 sm:pr-4">
            <p className="m-kicker text-terre-600">{creative.kicker}</p>
            <p className="m-h3 mt-3">{creative.title}</p>
            <p className="mt-3 leading-relaxed text-encre-700">{creative.text}</p>
            <p className="mt-3 text-sm text-encre-500">{creative.note}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
