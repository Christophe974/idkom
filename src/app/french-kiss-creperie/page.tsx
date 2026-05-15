import type { Metadata } from "next";
import FrenchKissMenu from "./FrenchKissMenu";

export const metadata: Metadata = {
  title: "French Kiss Créperie — Menú",
  description:
    "Carta French Kiss Créperie : crêpes signature, bubble waffles, galettes de trigo sarraceno, batidos, cafés y bebidas frías.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.idkom.fr/french-kiss-creperie" },
  openGraph: {
    title: "French Kiss Créperie — Menú",
    description:
      "Crêpes signature, bubble waffles, galettes salées, batidos y bebidas.",
    type: "website",
    url: "https://www.idkom.fr/french-kiss-creperie",
  },
};

export default function FrenchKissCreperiePage() {
  return <FrenchKissMenu />;
}
