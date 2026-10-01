"use client";

import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { meet } from "@/content/mariage/copy";
import { meetPair } from "@/content/mariage/demo";
import { useInView } from "@/lib/mariage/useInView";
import { cn } from "@/lib/mariage/utils";

/** JOUR J · Briser la glace : deux invités se scannent, chacun découvre qui est l'autre, puis un défi. */
export function MeetGuests() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });

  const renderCard = ({ who, sees, delay }: { who: typeof meetPair.a; sees: typeof meetPair.b; delay: number }) => (
    <div
      className={cn(
        "rounded-3xl bg-papier-50 p-4 text-encre-900 shadow-xl transition-all duration-700 sm:p-5",
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="m-kicker text-[0.58rem] text-encre-500">{who.name} découvre</p>
      <div className="mt-3 flex items-center gap-3">
        <span className="m-serif flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-terre-600 text-lg text-papier-50">{sees.initials}</span>
        <div>
          <p className="m-serif text-2xl leading-none">{sees.name}</p>
          <p className="mt-1 text-sm text-encre-700">{sees.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section data-moment="jour-j" className="bg-minuit-950 py-20 text-papier-50 sm:py-28">
      <Container>
        <SectionHead tone="light" kicker={meet.kicker} title={meet.title} text={meet.text} className="max-w-3xl" />

        <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
          <Reveal className="relative lg:col-span-6">
            <MediaSlot id="MEET_GUESTS" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/5] rounded-[1.75rem] sm:aspect-[4/3] lg:aspect-[4/5]" />
            <div className="pointer-events-none absolute left-1/2 top-[38%] h-20 w-20 -translate-x-1/2" aria-hidden="true">
              <span className="m-ripple absolute inset-0 rounded-full border-2 border-champagne-300" />
              <span className="m-ripple m-ripple-2 absolute inset-0 rounded-full border-2 border-champagne-300" />
            </div>
          </Reveal>

          <div className="space-y-4 lg:col-span-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {renderCard({ who: meetPair.a, sees: meetPair.b, delay: 150 })}
              {renderCard({ who: meetPair.b, sees: meetPair.a, delay: 450 })}
            </div>
            <ul className="space-y-2.5">
              {meet.challenges.map((c, i) => (
                <li
                  key={c.label}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-2xl border border-papier-50/12 px-4 py-3.5 transition-all duration-700",
                    inView ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
                  )}
                  style={{ transitionDelay: `${800 + i * 200}ms` }}
                >
                  <span className="text-[0.98rem]">{c.label}</span>
                  <span className="m-mono shrink-0 rounded-full bg-champagne-300 px-2.5 py-1 text-sm text-encre-950">+{c.pts}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
