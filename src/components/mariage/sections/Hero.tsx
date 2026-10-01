import { Arrow, Button } from "@/components/mariage/ui/Button";
import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { PhoneFrame } from "@/components/mariage/ui/PhoneFrame";
import { InvitationScreen } from "@/components/mariage/demos/InvitationScreen";
import { hero } from "@/content/mariage/copy";

/** Hero : l'émotion d'abord (le faire-part qu'on garde), la technique en coulisses (le téléphone qui s'ouvre). */
export function Hero() {
  return (
    <section id="top" data-moment="intro" className="relative overflow-hidden bg-papier-100 pt-24 sm:pt-28">
      <Container className="grid items-center gap-12 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="lg:col-span-6">
          <p className="m-kicker m-pop text-terre-600">{hero.kicker}</p>
          <h1 className="m-display m-pop mt-5 text-encre-900" style={{ animationDelay: "80ms" }}>
            Votre mariage commence <em className="text-terre-600">bien avant</em> le jour&nbsp;J.
          </h1>
          <ul className="m-pop mt-7 space-y-1.5 text-[1.08rem] leading-snug text-encre-700 sm:text-xl" style={{ animationDelay: "160ms" }}>
            {hero.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <div className="m-pop mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
            <Button href={hero.ctaPrimary.href}>
              {hero.ctaPrimary.label} <Arrow />
            </Button>
            <Button href={hero.ctaSecondary.href} variant="ghost" className="text-encre-900">
              {hero.ctaSecondary.label}
            </Button>
          </div>
        </div>

        {/* Visuel : le faire-part (photo), le téléphone qui s'ouvre, un bout du suivi des mariés */}
        <div className="relative lg:col-span-6">
          <div className="relative ml-auto w-[86%] sm:w-[72%] lg:w-[82%]">
            <MediaSlot
              id="HERO_NFC"
              priority
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="aspect-[3/4] rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(22_20_15/0.5)]"
            />
            {/* Ondes au-dessus du porte-clés */}
            <div className="pointer-events-none absolute left-[46%] top-[52%] h-24 w-24 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
              <span className="m-ripple absolute inset-0 rounded-full border-2 border-papier-50/90" />
              <span className="m-ripple m-ripple-2 absolute inset-0 rounded-full border-2 border-papier-50/90" />
              <span className="m-ripple m-ripple-3 absolute inset-0 rounded-full border-2 border-papier-50/90" />
            </div>

            {/* Carte « suivi » en arrière-plan */}
            <div
              className="m-float absolute -top-5 right-3 hidden rounded-2xl bg-papier-50/95 px-4 py-3 text-encre-900 shadow-lg backdrop-blur sm:block"
              style={{ ["--m-rot" as string]: "2deg" }}
              aria-hidden="true"
            >
              <p className="m-kicker text-[0.6rem] text-encre-500">Réponses</p>
              <p className="m-mono mt-1 text-2xl">
                62<span className="text-encre-400">/96</span>
              </p>
              <div className="mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-papier-200">
                <div className="h-full w-[65%] rounded-full bg-olive-500" />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 left-0 w-[52%] sm:left-[4%] sm:w-[40%] lg:-left-6 lg:w-[46%]">
            <div className="m-float" style={{ ["--m-rot" as string]: "-4deg" }}>
              <PhoneFrame className="w-full">
                <InvitationScreen />
              </PhoneFrame>
            </div>
          </div>

          <p className="m-kicker absolute -bottom-12 right-0 hidden text-encre-500 sm:block">{hero.tapHint}</p>
        </div>
      </Container>
    </section>
  );
}
