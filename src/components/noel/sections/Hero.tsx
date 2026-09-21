import Image from "next/image";
import { Button } from "@/components/noel/ui/Button";
import { Container } from "@/components/noel/ui/Container";
import { site } from "@/lib/noel/site";

const billing = [
  "Entreprises & CSE",
  site.cities.join(" · "),
  `De ${site.headcount.min} à ${site.headcount.max} personnes`,
  "Avec ou sans enfants",
  "Bus sur demande",
];

const ALT =
  "Une bande de collègues et d’enfants en pulls de Noël franchit de nuit le portail du Domaine les 12 Ponts, descendue d’un bus et accueillie par un groom en tenue bordeaux devant quatre chalets éclairés.";

/** Hero façon affiche de film : visuel plein cadre, titre en bas, générique en pied. */
export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-nuit-950">
      {/* Visuel clé : recadrage vertical dédié sur téléphone */}
      <Image
        src="/noel/hero.jpg"
        alt={ALT}
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-[62%_50%] sm:block"
      />
      <Image src="/noel/hero-mobile.jpg" alt={ALT} fill priority sizes="100vw" className="object-cover object-top sm:hidden" />

      {/* voiles : lisibilité du titre en bas, du header en haut */}
      <div className="absolute inset-0 bg-linear-to-t from-nuit-950 from-5% via-nuit-950/45 via-45% to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-nuit-950/80 to-transparent" aria-hidden="true" />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-7 pt-24">
        <p className="kicker">
          {site.organizer.name} &amp; {site.partner.name} présentent
        </p>
        <h1 className="mt-4 font-poster uppercase leading-[0.86] tracking-[0.01em] text-[clamp(3.6rem,11vw,8rem)]">
          <span className="block text-ivoire-100 lg:inline">Noël</span>{" "}
          <span className="block text-ambre-500 lg:inline">en bande</span>{" "}
          <span className="block text-ivoire-100 lg:inline">organisée</span>{" "}
          <span className="mt-3 block font-fraunces text-[clamp(1.25rem,2.4vw,1.9rem)] normal-case italic tracking-normal text-ivoire-200">
            au {site.venue}
          </span>
        </h1>

        <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-lg text-lg leading-relaxed text-ivoire-200 sm:text-xl">
            {site.tagline} Soirées de fin d’année pour entreprises et CSE : vous venez à 5, 20 ou 200, on s’occupe du
            reste.
          </p>
          <div className="flex shrink-0 flex-col gap-3 xs:flex-row">
            <Button href="#operation">Découvrir l’opération</Button>
            <Button href="#proposition" variant="secondary">
              Demander une proposition
            </Button>
          </div>
        </div>

        <p className="mt-10 border-t hairline pt-5 font-poster text-[0.8rem] uppercase leading-relaxed tracking-[0.2em] text-ivoire-400 sm:text-center sm:text-[0.85rem]">
          {billing.map((b, i) => (
            <span key={b}>
              {i > 0 && <span className="mx-2 text-cuivre-500 sm:mx-3">·</span>}
              {b}
            </span>
          ))}
        </p>
      </Container>
    </section>
  );
}
