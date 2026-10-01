import Link from "next/link";
import { Container } from "@/components/mariage/ui/Container";
import { site } from "@/content/mariage/copy";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const link = "underline-offset-4 hover:text-champagne-300 hover:underline";
  return (
    <footer className="bg-minuit-950 text-papier-200" data-moment="fin">
      <Container className="grid gap-10 border-t border-papier-50/10 py-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="m-serif text-3xl italic text-papier-50">le mariage</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-papier-300">
            Imaginé et fabriqué par iDkom, atelier événementiel à Brevilliers, entre Belfort et Montbéliard. Les porte-clés et les
            objets du mariage sortent de nos machines, en France.
          </p>
        </div>
        <div className="text-sm md:col-span-3">
          <p className="m-kicker text-champagne-300">Nous écrire</p>
          <ul className="mt-3 space-y-1.5">
            <li>
              <a href={`mailto:${site.contactEmail}`} className={link}>
                {site.contactEmail}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone}`} className={link}>
                {site.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
        <div className="text-sm md:col-span-3">
          <p className="m-kicker text-champagne-300">iDkom</p>
          <ul className="mt-3 space-y-1.5">
            <li>
              <Link href="/" className={link}>
                www.idkom.fr
              </Link>
            </li>
            <li>
              <Link href="/porte-cles-nfc" className={link}>
                Nos porte-clés
              </Link>
            </li>
            <li>
              <Link href="/atelier" className={link}>
                L’atelier
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-papier-50/10 py-5 text-xs text-papier-300/70 sm:flex-row sm:justify-between">
        <p>© {year} iDkom · L’Atelier Phygital</p>
        <nav aria-label="Liens secondaires" className="flex gap-5">
          <Link href="/mentions-legales" className="hover:text-papier-50">
            Mentions légales
          </Link>
          <Link href="/confidentialite" className="hover:text-papier-50">
            Confidentialité
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
