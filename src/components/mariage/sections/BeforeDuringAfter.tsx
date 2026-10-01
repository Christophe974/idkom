import { Container } from "@/components/mariage/ui/Container";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { moments } from "@/content/mariage/copy";
import { cn } from "@/lib/mariage/utils";

const tones = [
  "bg-papier-50 text-encre-900",
  "bg-minuit-900 text-papier-50",
  "bg-olive-100 text-encre-900",
];

/** La grande frise : trois moments, trois ambiances. Chaque carte mène au chapitre. */
export function BeforeDuringAfter() {
  return (
    <section id="trois-moments" data-moment="intro" className="bg-papier-100 py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="m-kicker text-terre-600">{moments.kicker}</p>
          <h2 className="m-h2 mt-4">{moments.title}</h2>
        </Reveal>

        <div className="relative mt-12">
          {/* le fil qui relie les trois moments */}
          <div className="absolute left-6 top-0 h-full w-px bg-encre-900/15 md:left-0 md:top-10 md:h-px md:w-full" aria-hidden="true" />
          <ol className="relative grid gap-5 md:grid-cols-3">
            {moments.items.map((m, i) => (
              <Reveal as="li" key={m.id} delay={i * 120} className="pl-12 md:pl-0">
                <span
                  className={cn(
                    "absolute left-[1.15rem] mt-8 h-3 w-3 rounded-full ring-4 ring-papier-100 md:static md:mb-6 md:mt-[2.15rem] md:block",
                    i === 0 ? "bg-terre-500" : i === 1 ? "bg-champagne-500" : "bg-olive-500",
                  )}
                  aria-hidden="true"
                />
                <a href={`#${m.id}`} className={cn("group block rounded-3xl p-6 transition-transform hover:-translate-y-1 sm:p-7", tones[i])}>
                  <p className="m-kicker opacity-60">0{i + 1}</p>
                  <p className="m-serif mt-3 text-[2.6rem] italic leading-none">{m.label}</p>
                  <p className="mt-5 font-medium">{m.title}</p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed opacity-75">{m.text}</p>
                  <p className="mt-6 text-sm underline-offset-4 group-hover:underline">Commencer ici →</p>
                </a>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
