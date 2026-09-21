import type { Metadata } from "next";
import { SiteFooter } from "@/components/noel/layout/SiteFooter";
import { SiteHeader } from "@/components/noel/layout/SiteHeader";
import { Arrivee } from "@/components/noel/sections/Arrivee";
import { Concept } from "@/components/noel/sections/Concept";
import { Faq } from "@/components/noel/sections/Faq";
import { Formules } from "@/components/noel/sections/Formules";
import { Hero } from "@/components/noel/sections/Hero";
import { PassSection } from "@/components/noel/sections/PassSection";
import { PourQui } from "@/components/noel/sections/PourQui";
import { Proposition } from "@/components/noel/sections/Proposition";
import { Soiree } from "@/components/noel/sections/Soiree";
import { Transport } from "@/components/noel/sections/Transport";
import { buildNoelJsonLd, jsonLdString } from "@/lib/noel/seo";
import { PAGE_URL, site } from "@/lib/noel/site";

// Page de l’opération « Noël en bande organisée » (iDkom × Domaine les 12 Ponts).
// Landing autonome dans son univers visuel (voir src/app/noel.css et components/noel/).

const TITLE = `${site.name} — Soirée de Noël entreprise et CSE au ${site.venue}`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: site.description,
  keywords: [
    "soirée de Noël entreprise Belfort",
    "soirée CSE Montbéliard",
    "repas de Noël entreprise Vesoul",
    "soirée interentreprises Franche-Comté",
    "arbre de Noël entreprise",
    "soirée de fin d’année avec animations",
    "Domaine les 12 Ponts",
  ],
  alternates: { canonical: PAGE_URL, languages: { fr: PAGE_URL } },
  openGraph: {
    title: TITLE,
    description: site.description,
    url: PAGE_URL,
    siteName: site.organizer.name,
    locale: site.locale,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: site.description },
};

export default function NoelEnBandeOrganiseePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(buildNoelJsonLd()) }} />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Concept />
        <Formules />
        <Arrivee />
        <PassSection />
        <Soiree />
        <PourQui />
        <Transport />
        <Proposition />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
