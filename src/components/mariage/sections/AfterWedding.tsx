import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { after } from "@/content/mariage/copy";

/** Bascule vers l'après : la lumière calme du lundi matin. */
export function AfterWedding() {
  return (
    <section id="apres" data-moment="apres" className="relative bg-olive-100 pb-20 pt-24 text-encre-900 sm:pb-28 sm:pt-32">
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-minuit-950 to-transparent opacity-90" aria-hidden="true" />
      <Container>
        <div className="flex items-center gap-4">
          <span className="m-serif text-6xl italic text-olive-700 sm:text-7xl">Après</span>
          <span className="h-px flex-1 bg-encre-900/15" aria-hidden="true" />
        </div>
        <div className="mt-12 grid items-end gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="m-kicker text-olive-700">{after.kicker}</p>
            <h2 className="m-h2 mt-4">{after.title}</h2>
            <p className="m-lead mt-5 text-encre-700">{after.text}</p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <MediaSlot id="AFTER_MORNING" sizes="(min-width: 1024px) 55vw, 100vw" className="aspect-[3/2] rounded-[1.75rem]" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
