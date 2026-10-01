"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { PhoneFrame } from "@/components/mariage/ui/PhoneFrame";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { rsvp, rsvpDashboard } from "@/content/mariage/copy";
import { household, rsvpBase, type Presence } from "@/content/mariage/demo";
import { cn } from "@/lib/mariage/utils";

/**
 * AVANT · Réponses. Démonstration reliée : ce que la famille Martin répond sur son téléphone
 * met à jour, en direct, le tableau de suivi des mariés (avec notification).
 */
export function RSVPExperience() {
  const [members, setMembers] = useState(household.members);
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const toggle = (name: string) => {
    setMembers((ms) => ms.map((m) => (m.name === name ? { ...m, presence: (m.presence === "present" ? "absent" : "present") as Presence } : m)));
    if (sent) notify();
  };

  const notify = () => {
    setToast(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(false), 3200);
  };

  const send = () => {
    setSent(true);
    notify();
  };

  const stats = useMemo(() => {
    const present = members.filter((m) => m.presence === "present");
    const kids = present.filter((m) => m.meal.startsWith("Enfant")).length;
    const allergies = present.filter((m) => m.meal.includes("sans")).length;
    if (!sent) return { ...rsvpBase, pending: rsvpBase.invited - rsvpBase.answered };
    const answered = rsvpBase.answered + members.length;
    return {
      ...rsvpBase,
      answered,
      present: rsvpBase.present + present.length,
      absent: rsvpBase.absent + (members.length - present.length),
      children: rsvpBase.children + kids,
      allergies: rsvpBase.allergies + allergies,
      pending: rsvpBase.invited - answered,
    };
  }, [members, sent]);

  const presentCount = members.filter((m) => m.presence === "present").length;

  return (
    <section data-moment="avant" className="bg-papier-100 py-20 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-12">
          {/* Côté invités */}
          <div>
            <Reveal>
              <p className="m-kicker text-terre-600">{rsvp.kicker}</p>
              <h2 className="m-h2 mt-4">{rsvp.title}</h2>
              <p className="m-lead mt-5 text-encre-700">{rsvp.text}</p>
            </Reveal>
            <Reveal delay={100} className="mt-10">
              <MediaSlot id="RSVP_SCREEN">
                <PhoneFrame>
                  <div className="flex h-full flex-col px-4 pb-5 pt-11">
                    <p className="m-kicker text-center text-[0.58rem] text-encre-500">Sophie &amp; Thomas · 14 juin 2027</p>
                    <p className="m-serif mt-2 text-center text-[1.6rem] leading-tight">{household.name}</p>
                    <p className="mt-1 text-center text-xs text-encre-500">Serez-vous avec nous ?</p>
                    <ul className="mt-4 space-y-2">
                      {members.map((m) => (
                        <li key={m.name}>
                          <button
                            type="button"
                            onClick={() => toggle(m.name)}
                            aria-pressed={m.presence === "present"}
                            className={cn(
                              "flex w-full items-center justify-between rounded-2xl border px-3.5 py-2.5 text-left transition-colors",
                              m.presence === "present" ? "border-olive-500/40 bg-olive-100" : "border-encre-900/10 bg-papier-100",
                            )}
                          >
                            <span>
                              <span className="block text-[0.92rem] font-medium">{m.name}</span>
                              <span className="block text-[0.68rem] text-encre-500">{m.meal}</span>
                            </span>
                            <span
                              className={cn(
                                "rounded-full px-2.5 py-1 text-[0.68rem] font-medium",
                                m.presence === "present" ? "bg-olive-700 text-papier-50" : "bg-encre-900/10 text-encre-700",
                              )}
                            >
                              {(m.presence === "present" ? "Présent" : "Absent") + (m.feminine ? "e" : "")}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={send}
                      className={cn(
                        "mt-auto rounded-full py-3 text-sm font-medium transition-colors",
                        sent ? "bg-olive-700 text-papier-50" : "bg-terre-600 text-papier-50 hover:bg-terre-700",
                      )}
                    >
                      {sent ? `Merci ! ${presentCount} personne${presentCount > 1 ? "s" : ""} attendue${presentCount > 1 ? "s" : ""}` : "Envoyer notre réponse"}
                    </button>
                  </div>
                </PhoneFrame>
              </MediaSlot>
              <p className="mt-5 text-center text-sm text-encre-500">{rsvp.hint}</p>
            </Reveal>
          </div>

          {/* Côté mariés */}
          <div className="lg:pt-24">
            <Reveal>
              <p className="m-kicker text-terre-600">{rsvpDashboard.kicker}</p>
              <h3 className="m-h3 mt-4">{rsvpDashboard.title}</h3>
              <p className="mt-4 leading-relaxed text-encre-700">{rsvpDashboard.text}</p>
            </Reveal>

            <Reveal delay={120} className="relative mt-8">
              <div className="rounded-[1.75rem] bg-papier-50 p-5 shadow-[0_30px_60px_-35px_rgb(22_20_15/0.35)] sm:p-7">
                <div className="flex items-baseline justify-between">
                  <p className="font-medium">Nos invités</p>
                  <p className="m-mono text-xs text-encre-500">en direct</p>
                </div>
                <div className="mt-5 flex items-end gap-3">
                  <p className="m-mono text-5xl leading-none">{stats.answered}</p>
                  <p className="pb-1 text-encre-500">réponses sur {stats.invited} invités</p>
                </div>
                <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-papier-200">
                  <div className="h-full bg-olive-500 transition-[width] duration-700" style={{ width: `${(stats.present / stats.invited) * 100}%` }} />
                  <div className="h-full bg-terre-300 transition-[width] duration-700" style={{ width: `${(stats.absent / stats.invited) * 100}%` }} />
                </div>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                  {[
                    ["Faire-part envoyés", `${stats.sentHouseholds} foyers`],
                    ["Présents", stats.present],
                    ["Absents", stats.absent],
                    ["En attente", stats.pending],
                    ["Enfants", stats.children],
                    ["Allergies & régimes", stats.allergies],
                  ].map(([k, v]) => (
                    <div key={k as string} className="border-t border-encre-900/10 pt-3">
                      <dt className="text-xs text-encre-500">{k}</dt>
                      <dd className="m-mono mt-1 text-xl">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div
                role="status"
                aria-live="polite"
                className={cn(
                  "absolute -top-4 right-3 flex items-center gap-3 rounded-2xl bg-encre-900 px-4 py-3 text-sm text-papier-50 shadow-xl transition-all duration-500 sm:-right-4",
                  toast ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
                )}
              >
                <span className="h-2 w-2 rounded-full bg-champagne-500" aria-hidden="true" />
                {toast ? `La famille Martin a répondu : ${presentCount} présent${presentCount > 1 ? "s" : ""}` : ""}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
