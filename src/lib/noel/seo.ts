import { faq } from "@/content/noel/faq";
import { PAGE_URL, site } from "@/lib/noel/site";

/**
 * Données structurées de la page.
 * iDkom est déjà décrit dans le layout racine (Organization + LocalBusiness) :
 * on le référence par son @id. Pas d’Event (aucune date), pas de prix.
 */
export function buildNoelJsonLd() {
  const organizerId = `${site.organizer.url}/#organization`;
  const partnerId = `${PAGE_URL}#domaine-les-12-ponts`;
  const p = site.partner;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: `${site.name} — soirée de Noël entreprise et CSE au ${site.venue}`,
        description: site.description,
        inLanguage: "fr-FR",
        isPartOf: { "@type": "WebSite", url: site.organizer.url, name: site.organizer.name },
        about: { "@id": `${PAGE_URL}#service` },
      },
      {
        "@type": "Organization",
        "@id": partnerId,
        name: p.name,
        url: p.url,
        telephone: p.phone,
        email: p.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: p.address.street,
          postalCode: p.address.postalCode,
          addressLocality: p.address.city,
          addressRegion: site.region,
          addressCountry: "FR",
        },
        sameAs: p.socials.map((s) => s.url),
      },
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: `${site.name} — soirée de Noël pour entreprises et CSE`,
        serviceType: "Soirée de fin d’année pour entreprises et CSE",
        description: site.description,
        url: PAGE_URL,
        inLanguage: "fr-FR",
        provider: { "@id": organizerId },
        broker: { "@id": partnerId },
        areaServed: [
          ...site.cities.map((name) => ({ "@type": "City", name })),
          { "@type": "AdministrativeArea", name: site.region },
        ],
        audience: { "@type": "BusinessAudience", audienceType: "Entreprises, CSE, TPE, PME, grands groupes" },
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

/** Sérialisation sûre pour un <script type="application/ld+json">. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
