import { Arrow, Button } from "@/components/mariage/ui/Button";
import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { PlaceCardPreview } from "@/components/mariage/demos/PlaceCardPreview";
import { shop } from "@/content/mariage/copy";

/** AVANT · L'atelier : ce que l'espace sait déjà (prénoms, tables, couleurs) devient des objets fabriqués. */
export function ShopIntegration() {
  return (
    <section data-moment="avant" className="bg-papier-100 py-20 sm:py-28">
      <Container>
        <SectionHead kicker={shop.kicker} title={shop.title} text={shop.text} className="max-w-3xl" />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-8">
            <MediaSlot id="SHOP_PRODUCTS" sizes="(min-width: 1024px) 65vw, 100vw" className="aspect-[4/3] rounded-[1.75rem] sm:aspect-[3/2]" />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4">
            <PlaceCardPreview label={shop.previewLabel} />
          </Reveal>
        </div>

        <Reveal delay={80} className="mt-10">
          <ul className="flex flex-wrap gap-2" aria-label="Ce que l'atelier peut fabriquer">
            {shop.products.map((p) => (
              <li key={p} className="rounded-full bg-papier-50 px-3.5 py-2 text-sm text-encre-700 ring-1 ring-encre-900/8">
                {p}
              </li>
            ))}
          </ul>
          <Button href={shop.cta.href} variant="ghost" className="mt-8 text-encre-900">
            {shop.cta.label} <Arrow />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
