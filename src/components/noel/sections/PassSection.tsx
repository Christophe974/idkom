import { PassQr } from "@/components/noel/pass/PassQr";
import { PassScreen } from "@/components/noel/pass/PassScreen";
import { PhoneMockup } from "@/components/noel/pass/PhoneMockup";
import { Container } from "@/components/noel/ui/Container";
import { Icon } from "@/components/noel/ui/Icon";
import { SectionHeading } from "@/components/noel/ui/SectionHeading";
import { passFeatures } from "@/content/noel/pass";
import { DEMO_PASS_TOKEN, demoParticipant } from "@/lib/noel/pass/demo";
import { absoluteUrl, site } from "@/lib/noel/site";

export function PassSection() {
  const demoUrl = absoluteUrl(`${site.path}/pass/${DEMO_PASS_TOKEN}`);
  return (
    <section id="pass" className="border-t hairline bg-nuit-950 py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHeading
            kicker={`Le Pass du ${site.venue}`}
            title={
              <>
                Un Pass. Un QR code. <em>Toute la soirée dedans.</em>
              </>
            }
            lead="Chaque participant reçoit un Pass à son nom. Un scan et il retrouve sa table, son équipe, le programme, ses missions, les votes du blind test et les photos."
          />

          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-2.5 text-ivoire-200 xs:grid-cols-2">
            {passFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-cuivre-300" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex max-w-md items-center gap-5 border hairline p-4">
            <PassQr url={demoUrl} size={84} label="QR code ouvrant la démonstration du Pass" />
            <p className="text-sm leading-relaxed text-ivoire-400">
              Scannez pour ouvrir la démonstration sur votre téléphone.{" "}
              <span className="text-ivoire-600">Données fictives, aucune inscription.</span>
            </p>
          </div>
        </div>

        <div className="flex justify-center lg:col-span-6">
          <div className="relative pt-4">
            <span className="kicker absolute left-1/2 top-0 z-10 -translate-x-1/2 whitespace-nowrap border hairline bg-nuit-900 px-3 py-1 text-[0.68rem]">
              Démonstration · données fictives
            </span>
            <PhoneMockup>
              <PassScreen participant={demoParticipant} as="p" compact />
            </PhoneMockup>
          </div>
        </div>
      </Container>
    </section>
  );
}
