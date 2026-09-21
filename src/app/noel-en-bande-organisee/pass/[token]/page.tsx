import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PassScreen } from "@/components/noel/pass/PassScreen";
import { getPassProvider } from "@/lib/noel/pass/provider";
import { site } from "@/lib/noel/site";

export const metadata: Metadata = {
  title: `Pass du ${site.venue}`,
  robots: { index: false, follow: false },
};

/**
 * Page ouverte après le scan d’un Pass : /noel-en-bande-organisee/pass/<jeton>.
 * V1 : seul /noel-en-bande-organisee/pass/demo répond (données fictives). Les autres jetons → 404.
 */
export default async function PassPage(props: PageProps<"/noel-en-bande-organisee/pass/[token]">) {
  const { token } = await props.params;
  const participant = await getPassProvider().getParticipant(token);
  if (!participant) notFound();

  return (
    <div className="min-h-svh bg-nuit-950">
      <div className="mx-auto min-h-svh max-w-md border-x hairline">
        <PassScreen participant={participant} as="h1" />
      </div>
    </div>
  );
}
