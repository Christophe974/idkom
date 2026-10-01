import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { guestProfiles } from "@/content/mariage/copy";
import { guestProfile as g } from "@/content/mariage/demo";

/** AVANT · La fiche invité, enrichie par les mariés : elle nourrira le plan de table, les rencontres et les jeux. */
export function GuestProfiles() {
  const rows: Array<[string, string]> = [
    ["Réponse", g.presence],
    ["Côté", g.side],
    ["Groupe", g.group],
    ["Lien", g.relation],
    ["Table", g.table],
    ["Anniversaire", g.birthday],
  ];
  return (
    <section data-moment="avant" className="bg-papier-50 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHead kicker={guestProfiles.kicker} title={guestProfiles.title} text={guestProfiles.text} />
          <Reveal delay={100}>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Exemples de liens">
              {guestProfiles.tags.map((t, i) => (
                <li
                  key={t}
                  className={
                    i % 5 === 1
                      ? "rounded-full bg-terre-100 px-3 py-1.5 text-sm text-terre-700"
                      : i % 5 === 3
                        ? "rounded-full bg-olive-100 px-3 py-1.5 text-sm text-olive-700"
                        : "rounded-full border border-encre-900/12 px-3 py-1.5 text-sm text-encre-700"
                  }
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <MediaSlot id="GUEST_PROFILE_SCREEN">
            <article className="mx-auto max-w-md rounded-[1.75rem] bg-papier-100 p-6 shadow-[0_30px_60px_-35px_rgb(22_20_15/0.35)] ring-1 ring-encre-900/5 sm:p-8">
              <header className="flex items-center gap-4">
                <span className="m-serif flex h-14 w-14 items-center justify-center rounded-full bg-olive-700 text-xl text-papier-50">{g.initials}</span>
                <div>
                  <p className="m-serif text-[1.75rem] leading-none">{g.name}</p>
                  <p className="mt-1.5 text-sm text-encre-500">{g.household}</p>
                </div>
              </header>
              <dl className="mt-6 divide-y divide-encre-900/10 border-y border-encre-900/10">
                {rows.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-2.5 text-[0.95rem]">
                    <dt className="text-encre-500">{k}</dt>
                    <dd className={k === "Réponse" ? "rounded-full bg-olive-100 px-2.5 py-0.5 text-sm text-olive-700" : "font-medium"}>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 rounded-2xl bg-papier-50 p-4">
                <p className="m-kicker text-[0.62rem] text-encre-500">Note privée · visible par vous seuls</p>
                <p className="m-serif mt-2 text-lg italic">« {g.note} »</p>
              </div>
            </article>
          </MediaSlot>
        </Reveal>
      </Container>
    </section>
  );
}
