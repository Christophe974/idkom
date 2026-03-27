import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "iDkom | Agence Événementielle & Stands sur-mesure — Franche-Comté",
    template: "%s | iDkom",
  },
  description: "Agence événementielle en Franche-Comté : événements sur-mesure, solutions digitales et stands BeMatrix. 30 ans d'expérience, 600+ projets réalisés.",
  keywords: ["agence événementielle", "stands BeMatrix", "événementiel", "salon professionnel", "agence communication", "Besançon", "Franche-Comté", "iDkom"],
  authors: [{ name: "iDkom" }],
  metadataBase: new URL("https://www.idkom.fr"),
  openGraph: {
    title: "iDkom | Agence Événementielle & Stands sur-mesure",
    description: "Événements sur-mesure, solutions digitales et stands BeMatrix. 30 ans d'expérience en Franche-Comté.",
    url: "https://www.idkom.fr",
    siteName: "iDkom",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iDkom | Agence Événementielle & Stands sur-mesure",
    description: "Événements sur-mesure, solutions digitales et stands BeMatrix. 30 ans d'expérience en Franche-Comté.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.idkom.fr",
    languages: { 'fr': 'https://www.idkom.fr' },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.idkom.fr/#organization",
      name: "iDkom",
      alternateName: "iDkom - L'Atelier Phygital",
      url: "https://www.idkom.fr",
      logo: "https://www.idkom.fr/images/idkom-favicon.svg",
      description:
        "Agence événementielle spécialisée en stands BeMatrix, solutions digitales et événementiel sur-mesure.",
      foundingDate: "1996",
      sameAs: [
        "https://www.instagram.com/idkom_atelier_phygital/",
        "https://www.linkedin.com/company/idkom/",
        "https://www.facebook.com/idkom.fr",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.idkom.fr/#localbusiness",
      name: "iDkom – Atelier Phygital (Stands & Événementiel)",
      image: "https://www.idkom.fr/images/idkom-favicon.svg",
      url: "https://www.idkom.fr",
      telephone: "+33637754064",
      email: "contact@idkom.fr",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ZA La Preusse",
        addressLocality: "Brevilliers",
        postalCode: "70400",
        addressRegion: "Franche-Comté",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 47.6217,
        longitude: 6.8456,
      },
      areaServed: [
        { "@type": "City", name: "Besançon" },
        { "@type": "City", name: "Belfort" },
        { "@type": "City", name: "Montbéliard" },
        { "@type": "City", name: "Mulhouse" },
        { "@type": "AdministrativeArea", name: "Franche-Comté" },
        { "@type": "Country", name: "France" },
      ],
      priceRange: "€€",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "16",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
