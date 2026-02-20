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
  title: "iDkom | L'Atelier Phygital — Stands & Digital",
  description: "Atelier créatif spécialisé stands BeMatrix, solutions digitales et événementiel. 30 ans d'expérience, 600+ projets réalisés.",
  keywords: ["stands", "BeMatrix", "événementiel", "digital", "salon professionnel", "iDkom"],
  authors: [{ name: "iDkom" }],
  metadataBase: new URL("https://www.idkom.fr"),
  openGraph: {
    title: "iDkom | L'Atelier Phygital",
    description: "Stands modulaires, expériences digitales, événements mémorables.",
    url: "https://www.idkom.fr",
    siteName: "iDkom",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iDkom | L'Atelier Phygital",
    description: "Stands modulaires, expériences digitales, événements mémorables.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.idkom.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
