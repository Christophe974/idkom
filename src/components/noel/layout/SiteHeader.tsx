import { navLinks } from "@/content/noel/nav";
import { Button } from "@/components/noel/ui/Button";
import { Container } from "@/components/noel/ui/Container";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b hairline bg-nuit-950/75 backdrop-blur-md">
      <Container className="relative flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex flex-col leading-none" aria-label="Noël en bande organisée, retour en haut de page">
          <span className="font-poster text-[1.3rem] uppercase tracking-[0.06em] text-ivoire-100">
            Noël en bande organisée
          </span>
          <span className="mt-0.5 font-fraunces text-[0.8rem] italic text-cuivre-300">au Domaine les 12 Ponts</span>
        </a>

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ivoire-200 transition-colors hover:text-ambre-300">
              {l.label}
            </a>
          ))}
          <Button href="#proposition" size="sm">
            Demander une proposition
          </Button>
        </nav>

        <MobileNav />
      </Container>
    </header>
  );
}
