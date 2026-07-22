import { Metadata } from 'next';
import { getHomepageData } from '@/lib/api';
import BookingPageClient from './BookingPageClient';

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Prendre rendez-vous | iDkom - L'Atelier Phygital",
  description: "Réservez un créneau de 30 minutes en visioconférence avec iDkom pour discuter de votre projet de stand, digital ou événementiel.",
  alternates: { canonical: "https://www.idkom.fr/rendez-vous" },
  // Sans openGraph propre, la page héritait de l'og:url de la home → au partage (Messenger/
  // SMS) le lien retombait sur la page d'accueil. On fixe l'URL partagée sur /rendez-vous.
  openGraph: {
    title: "Prendre rendez-vous en visio avec iDkom",
    description: "Réservez un créneau de 30 minutes en visioconférence pour parler de votre projet de stand, digital ou événementiel.",
    url: "https://www.idkom.fr/rendez-vous",
    siteName: "iDkom",
    locale: "fr_FR",
    type: "website",
  },
};

export default async function BookingPage() {
  const homeData = await getHomepageData();

  return (
    <BookingPageClient
      site={homeData.site}
      social={homeData.social}
    />
  );
}
