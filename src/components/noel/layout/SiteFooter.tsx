import Link from "next/link";
import { Container } from "@/components/noel/ui/Container";
import { site } from "@/lib/noel/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const o = site.organizer;
  const p = site.partner;
  const link = "text-ambre-300 underline-offset-4 hover:text-ambre-200 hover:underline";

  return (
    <footer className="border-t hairline bg-nuit-950">
      <Container className="grid gap-10 py-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="kicker">Une opération imaginée par</p>
          <p className="mt-3 font-poster text-3xl uppercase leading-[0.95] text-ivoire-100 sm:text-4xl">
            {o.name} <span className="text-cuivre-400">×</span> {p.name}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivoire-400">
            Soirées de Noël pour entreprises et CSE de {site.cities.join(", ")} et des environs, en {site.region}.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="font-fraunces text-lg text-ivoire-100">{o.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-ivoire-400">
            Atelier événementiel et digital. Conception de l’opération, animations, Pass et jeux.
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <Link href="/" className={link}>
                www.idkom.fr
              </Link>
            </li>
            <li>
              <a href={`mailto:${o.email}`} className={link}>
                {o.email}
              </a>
            </li>
            <li>
              <a href={`tel:${o.phone}`} className={link}>
                {o.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="font-fraunces text-lg text-ivoire-100">{p.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-ivoire-400">
            Le lieu de l’opération : le portail, les chalets, la salle, la table et la piste.
          </p>
          <address className="mt-3 space-y-1 text-sm not-italic text-ivoire-200">
            <p>
              {p.address.street}
              <br />
              {p.address.postalCode} {p.address.city}
            </p>
            <p>
              <a href={`tel:${p.phone}`} className={link}>
                {p.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${p.email}`} className={link}>
                {p.email}
              </a>
            </p>
            <p>
              <a href={p.url} rel="noopener" className={link}>
                {p.urlDisplay}
              </a>
            </p>
          </address>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.14em] text-ivoire-600">
            {p.socials.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="noopener" className="hover:text-ivoire-200">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t hairline">
        <Container className="flex flex-col gap-3 py-5 text-xs text-ivoire-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {o.name} · {p.name}
          </p>
          <nav aria-label="Liens secondaires" className="flex gap-5">
            <Link href="/mentions-legales" className="hover:text-ivoire-200">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-ivoire-200">
              Confidentialité
            </Link>
            <a href="#proposition" className="hover:text-ivoire-200">
              Nous écrire
            </a>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
