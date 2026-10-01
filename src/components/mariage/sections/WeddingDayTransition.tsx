import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { dayTransition } from "@/content/mariage/copy";

/** Bascule vers la nuit de la fête : le design devient plus vivant. */
export function WeddingDayTransition() {
  return (
    <section id="jour-j" data-moment="jour-j" className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-minuit-950 text-papier-50">
      <MediaSlot id="WEDDING_DAY" sizes="100vw" className="absolute inset-0 -z-10" imgClassName="object-[50%_40%] opacity-80" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-minuit-950 via-minuit-950/50 to-minuit-950/30" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-papier-100 to-transparent opacity-90" aria-hidden="true" />
      <Container className="pb-16 pt-40 sm:pb-24">
        <Reveal>
          <p className="m-kicker text-champagne-300">{dayTransition.kicker}</p>
          <h2 className="m-display mt-5 max-w-4xl">
            Et puis arrive <em className="text-champagne-300">le jour J.</em>
          </h2>
          <p className="m-lead mt-6 max-w-xl text-papier-200">{dayTransition.text}</p>
        </Reveal>
      </Container>
    </section>
  );
}
