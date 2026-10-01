import Image from "next/image";
import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { CountUp } from "@/components/mariage/demos/CountUp";
import { guestPhotos } from "@/content/mariage/copy";

const thumbs = ["/mariage/rencontre.jpg", "/mariage/jour-j-piste.jpg", "/mariage/silhouettes.jpg", "/mariage/boutique-table.jpg"];

/** JOUR J · Les photos des invités : elles arrivent dans une galerie privée, rien n'est publié sans les mariés. */
export function GuestPhotos() {
  return (
    <section data-moment="jour-j" className="bg-minuit-950 py-20 text-papier-50 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead tone="light" kicker={guestPhotos.kicker} title={guestPhotos.title} text={guestPhotos.text} />
          <Reveal delay={100} className="mt-8 flex items-end gap-4">
            <CountUp to={1486} className="m-mono text-6xl text-champagne-300" />
            <span className="pb-2 text-papier-300">photos reçues pendant la fête</span>
          </Reveal>
        </div>

        <Reveal delay={120} className="grid grid-cols-5 gap-3 lg:col-span-7">
          <MediaSlot id="GUEST_PHOTOS" sizes="(min-width: 1024px) 35vw, 60vw" className="col-span-3 row-span-2 aspect-[3/4] rounded-[1.5rem]" />
          {thumbs.slice(0, 2).map((src) => (
            <div key={src} className="relative col-span-2 aspect-square overflow-hidden rounded-2xl">
              <Image src={src} alt="" fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover opacity-70 blur-[1.5px]" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-minuit-950/70 px-3 py-1.5 text-xs backdrop-blur">Privé</span>
              </span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
