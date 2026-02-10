import { Metadata } from 'next';
import { getHomepageData } from '@/lib/api';
import BookingPageClient from './BookingPageClient';

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Prendre rendez-vous | iDkom - L'Atelier Phygital",
  description: "Réservez un créneau de 30 minutes en visioconférence avec iDkom pour discuter de votre projet de stand, digital ou événementiel.",
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
