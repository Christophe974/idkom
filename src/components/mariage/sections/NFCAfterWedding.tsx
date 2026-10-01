import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { nfcAfter } from "@/content/mariage/copy";

/**
 * APRÈS · Le porte-clés reste. Côté technique : la puce pointe vers une adresse courte et stable
 * (redirection gérée par iDkom), dont la destination évolue sans reprogrammer l'objet.
 */
export function NFCAfterWedding() {
  return (
    <section data-moment="apres" className="bg-papier-50 pb-20 sm:pb-28">
      <Container>
        <div className="grid items-center gap-8 rounded-[2rem] bg-papier-100 p-4 sm:grid-cols-[14rem_1fr] sm:p-6">
          <Reveal>
            <MediaSlot id="HERO_NFC" sizes="(min-width: 640px) 224px, 90vw" className="aspect-[4/3] rounded-[1.4rem] sm:aspect-square" imgClassName="object-[50%_60%]" />
          </Reveal>
          <Reveal delay={100} className="pb-2 sm:pb-0 sm:pr-6">
            <p className="m-h3">{nfcAfter.title}</p>
            <p className="mt-3 max-w-2xl leading-relaxed text-encre-700">{nfcAfter.text}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
