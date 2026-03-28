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
    default: "iDkom | Agence Événementielle & Solutions Digitales — Franche-Comté",
    template: "%s | iDkom",
  },
  description: "Agence événementielle et solutions digitales pour l'événementiel en Franche-Comté : stands BeMatrix, animations innovantes, bar goodies et photobooth IA. 30 ans d'expérience, 600+ projets.",
  keywords: ["agence événementielle", "solution digitale événementiel", "solutions digitales évènementielles", "stands BeMatrix", "événementiel", "salon professionnel", "agence communication Montbéliard", "bar goodies", "Besançon", "Franche-Comté", "iDkom"],
  authors: [{ name: "iDkom" }],
  metadataBase: new URL("https://www.idkom.fr"),
  openGraph: {
    title: "iDkom | Agence Événementielle & Solutions Digitales",
    description: "Solutions digitales pour l'événementiel, stands BeMatrix et animations innovantes. 30 ans d'expérience en Franche-Comté.",
    url: "https://www.idkom.fr",
    siteName: "iDkom",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iDkom | Agence Événementielle & Solutions Digitales",
    description: "Solutions digitales pour l'événementiel, stands BeMatrix et animations innovantes. 30 ans d'expérience en Franche-Comté.",
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
        "Agence événementielle spécialisée en solutions digitales pour l'événementiel, stands BeMatrix, animations innovantes et événementiel sur-mesure en Franche-Comté.",
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
        { "@type": "City", name: "Strasbourg" },
        { "@type": "City", name: "Lyon" },
        { "@type": "AdministrativeArea", name: "Franche-Comté" },
        { "@type": "AdministrativeArea", name: "Grand Est" },
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
