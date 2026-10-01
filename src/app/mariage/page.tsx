import type { Metadata } from "next";
import { SiteFooter } from "@/components/mariage/layout/SiteFooter";
import { SiteHeader } from "@/components/mariage/layout/SiteHeader";
import { AfterWedding } from "@/components/mariage/sections/AfterWedding";
import { BeforeDuringAfter } from "@/components/mariage/sections/BeforeDuringAfter";
import { BlindTest } from "@/components/mariage/sections/BlindTest";
import { CheckIn } from "@/components/mariage/sections/CheckIn";
import { CommonPointChallenge } from "@/components/mariage/sections/CommonPointChallenge";
import { ConceptIntro } from "@/components/mariage/sections/ConceptIntro";
import { CreativeProducts } from "@/components/mariage/sections/CreativeProducts";
import { DancefloorChallenge } from "@/components/mariage/sections/DancefloorChallenge";
import { DJConsole } from "@/components/mariage/sections/DJConsole";
import { FinalCTA } from "@/components/mariage/sections/FinalCTA";
import { FunBirthday } from "@/components/mariage/sections/FunBirthday";
import { GalleryRelease } from "@/components/mariage/sections/GalleryRelease";
import { GuestPassport } from "@/components/mariage/sections/GuestPassport";
import { GuestPhotos } from "@/components/mariage/sections/GuestPhotos";
import { GuestProfiles } from "@/components/mariage/sections/GuestProfiles";
import { Hero } from "@/components/mariage/sections/Hero";
import { HimHerGame } from "@/components/mariage/sections/HimHerGame";
import { MeetGuests } from "@/components/mariage/sections/MeetGuests";
import { MusicWishlist } from "@/components/mariage/sections/MusicWishlist";
import { NFCAfterWedding } from "@/components/mariage/sections/NFCAfterWedding";
import { NFCTag } from "@/components/mariage/sections/NFCTag";
import { PointsEngine } from "@/components/mariage/sections/PointsEngine";
import { RSVPExperience } from "@/components/mariage/sections/RSVPExperience";
import { SeatingPlan } from "@/components/mariage/sections/SeatingPlan";
import { ShopIntegration } from "@/components/mariage/sections/ShopIntegration";
import { WeddingBook } from "@/components/mariage/sections/WeddingBook";
import { WeddingDashboard } from "@/components/mariage/sections/WeddingDashboard";
import { WeddingDayTransition } from "@/components/mariage/sections/WeddingDayTransition";
import { WeddingWrapped } from "@/components/mariage/sections/WeddingWrapped";
import { WhyDifferent } from "@/components/mariage/sections/WhyDifferent";
import { site } from "@/content/mariage/copy";

// Page concept « Le mariage iDkom » : le scroll raconte un mariage, de l'invitation au souvenir.
// Univers visuel propre (src/app/mariage.css, components/mariage/), textes dans content/mariage/copy.ts,
// médias repérés par emplacement dans content/mariage/media.ts.

const URL = `https://www.idkom.fr${site.path}`;
const TITLE = `${site.title} | iDkom`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: site.description,
  keywords: [
    "faire-part mariage original",
    "faire-part porte-clés",
    "porte-clés mariage personnalisé",
    "animation mariage invités",
    "jeux mariage DJ",
    "plan de table mariage",
    "galerie photos invités mariage",
    "RSVP mariage en ligne",
  ],
  alternates: { canonical: URL, languages: { fr: URL } },
  openGraph: { title: TITLE, description: site.description, url: URL, siteName: "iDkom", locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: site.description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: site.name,
  serviceType: "Faire-part porte-clés personnalisé et animation de mariage",
  description: site.description,
  url: URL,
  areaServed: { "@type": "Country", name: "France" },
  provider: { "@id": "https://www.idkom.fr/#organization" },
};

export default function MariagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main id="main">
        {/* Découverte */}
        <Hero />
        <ConceptIntro />
        <BeforeDuringAfter />
        {/* AVANT */}
        <NFCTag />
        <RSVPExperience />
        <GuestProfiles />
        <FunBirthday />
        <WeddingDashboard />
        <SeatingPlan />
        <ShopIntegration />
        <CreativeProducts />
        {/* JOUR J */}
        <WeddingDayTransition />
        <CheckIn />
        <GuestPassport />
        <MeetGuests />
        <PointsEngine />
        <DancefloorChallenge />
        <CommonPointChallenge />
        <HimHerGame />
        <BlindTest />
        <MusicWishlist />
        <DJConsole />
        <GuestPhotos />
        {/* APRÈS */}
        <AfterWedding />
        <GalleryRelease />
        <WeddingWrapped />
        <WeddingBook />
        <NFCAfterWedding />
        <WhyDifferent />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
