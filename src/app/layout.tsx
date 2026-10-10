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
    default: "Agence événementielle à Montbéliard : animations et séminaires | iDkom",
    template: "%s | iDkom",
  },
  description: "Agence événementielle à Montbéliard : animations de séminaires, soirées d'entreprise, team building et assemblées générales, à Belfort, Besançon et Mulhouse. 30 ans de terrain, 600+ projets.",
  keywords: ["agence événementielle Montbéliard", "agence communication Montbéliard", "animation séminaire entreprise", "soirée d'entreprise", "team building", "animation assemblée générale", "agence événementielle Besançon", "animation entreprise Belfort", "bar à goodies", "Franche-Comté", "iDkom"],
  authors: [{ name: "iDkom" }],
  metadataBase: new URL("https://www.idkom.fr"),
  openGraph: {
    title: "iDkom | Animations, séminaires et soirées d'entreprise à Montbéliard",
    description: "Agence événementielle à Montbéliard : animations de séminaires, soirées d'entreprise, team building et assemblées générales, à Belfort, Besançon et Mulhouse. 30 ans de terrain, 600+ projets.",
    url: "https://www.idkom.fr",
    siteName: "iDkom",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iDkom | Animations, séminaires et soirées d'entreprise à Montbéliard",
    description: "Agence événementielle à Montbéliard : animations de séminaires, soirées d'entreprise, team building et assemblées générales, à Belfort, Besançon et Mulhouse. 30 ans de terrain, 600+ projets.",
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
        "Agence événementielle à Montbéliard : animations de séminaires et de soirées d'entreprise, team building, assemblées générales, stands BeMatrix, en Franche-Comté et partout en France.",
      foundingDate: "1996",
      sameAs: [
        "https://www.instagram.com/idkom_atelier_phygital/",
        "https://www.linkedin.com/company/idkom/",
        "https://www.facebook.com/idkom.agence",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.idkom.fr/#localbusiness",
      name: "iDkom – Agence événementielle (animations, séminaires, stands)",
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
