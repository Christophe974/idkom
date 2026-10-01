"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { PhoneFrame } from "@/components/mariage/ui/PhoneFrame";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { galleryRelease as g } from "@/content/mariage/copy";
import { cn } from "@/lib/mariage/utils";

const photos = [
  "/mariage/photos-invites.jpg",
  "/mariage/jour-j-piste.jpg",
  "/mariage/rencontre.jpg",
  "/mariage/silhouettes.jpg",
  "/mariage/boutique-table.jpg",
  "/mariage/faire-part-detail.jpg",
];

/** APRÈS · Les mariés publient la galerie ; les invités rescannent leur porte-clés et la découvrent. */
export function GalleryRelease() {
  const [published, setPublished] = useState(false);
  const [chosen, setChosen] = useState<number[]>([0, 1, 2, 3]);

  const toggleChosen = (i: number) => setChosen((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));

  return (
    <section data-moment="apres" className="bg-olive-100 pb-20 text-encre-900 sm:pb-28">
      <Container>
        <SectionHead kicker={g.kicker} title={g.title} text={g.text} className="max-w-3xl" />

        <MediaSlot id="PHOTO_GALLERY_SCREEN" className="mt-12 grid items-start gap-10 lg:grid-cols-2">
          {/* Côté mariés */}
          <Reveal>
            <div className="rounded-[1.75rem] bg-papier-50 p-5 sm:p-6">
              <p className="m-kicker text-[0.62rem] text-olive-700">{g.coupleSide}</p>
              <p className="mt-2 font-medium">Choisissez vos préférées · {chosen.length} sélectionnées</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {photos.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => toggleChosen(i)}
                    aria-pressed={chosen.includes(i)}
                    aria-label={`Photo ${i + 1}`}
                    className={cn("relative aspect-square overflow-hidden rounded-xl transition-opacity", !chosen.includes(i) && "opacity-45")}
                  >
                    <Image src={src} alt="" fill sizes="(min-width: 1024px) 12vw, 30vw" className="object-cover" />
                    {chosen.includes(i) && (
                      <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-olive-700 text-[0.65rem] text-papier-50">✓</span>
                    )}
                  </button>
                ))}
              </div>
              <label className="mt-5 flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-papier-100 p-4">
                <span className="font-medium">{g.toggle}</span>
                <input type="checkbox" className="peer sr-only" checked={published} onChange={(e) => setPublished(e.target.checked)} />
                <span
                  className="relative h-7 w-12 shrink-0 rounded-full bg-encre-900/20 transition-colors peer-checked:bg-olive-700 peer-focus-visible:outline-2 peer-focus-visible:outline-terre-500 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-papier-50 after:transition-transform peer-checked:after:translate-x-5"
                  aria-hidden="true"
                />
              </label>
            </div>
          </Reveal>

          {/* Côté invités */}
          <Reveal delay={120}>
            <p className="m-kicker mb-4 text-center text-[0.62rem] text-olive-700">{g.guestSide}</p>
            <PhoneFrame>
              <div className="h-full overflow-hidden px-4 pt-11" aria-live="polite">
                {published ? (
                  <div className="m-pop">
                    <p className="m-serif text-center text-[1.75rem] leading-tight">{g.afterTitle}</p>
                    <p className="mt-1 text-center text-xs text-encre-500">Sophie &amp; Thomas · 14 juin 2027</p>
                    <div className="mt-4 grid grid-cols-2 gap-1.5">
                      {chosen.slice(0, 6).map((i) => (
                        <div key={i} className="relative aspect-[4/5] overflow-hidden rounded-lg">
                          <Image src={photos[i]} alt="" fill sizes="140px" className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center pb-16 text-center">
                    <span className="h-14 w-14 rounded-full border-2 border-dashed border-encre-900/25" aria-hidden="true" />
                    <p className="m-serif mt-5 text-2xl">{g.before}</p>
                    <p className="mt-2 px-4 text-xs text-encre-500">Gardez votre porte-clés : il vous préviendra.</p>
                  </div>
                )}
              </div>
            </PhoneFrame>
          </Reveal>
        </MediaSlot>
      </Container>
    </section>
  );
}
