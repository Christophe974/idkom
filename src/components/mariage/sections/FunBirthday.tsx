"use client";

import { useId, useMemo, useState, useSyncExternalStore } from "react";
import { Container } from "@/components/mariage/ui/Container";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { funBirthday } from "@/content/mariage/copy";
import { birthdayFacts, maskFrenchDate, parseFrenchDate, roughBillions } from "@/lib/mariage/birthday";
import { cn } from "@/lib/mariage/utils";

const noopSubscribe = () => () => {};

/** AVANT · L'inscription ludique : la date de naissance devient un petit moment (saisie libre JJ/MM/AAAA). */
export function FunBirthday() {
  const [value, setValue] = useState(funBirthday.defaultValue);
  const inputId = useId();
  // Calcul côté navigateur uniquement (dépend de la date du jour : évite tout écart avec le rendu serveur).
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const date = useMemo(() => (mounted ? parseFrenchDate(value) : null), [value, mounted]);
  const facts = useMemo(() => (date ? birthdayFacts(date) : null), [date]);

  const cards = facts
    ? [
        { big: `${facts.age}`, text: "tours autour du Soleil", emoji: "🌍", tone: "bg-olive-100 text-olive-900" },
        { big: `≈ ${roughBillions(facts.beats)}`, text: "de battements de cœur (environ)", emoji: "❤️", tone: "bg-terre-100 text-terre-700" },
        { big: facts.zodiac, text: "votre signe chinois", emoji: "🏮", tone: "bg-champagne-100 text-encre-900" },
        { big: facts.weekday.charAt(0).toUpperCase() + facts.weekday.slice(1), text: "le jour de votre arrivée au monde", emoji: "📅", tone: "bg-papier-200 text-encre-900" },
      ]
    : [];

  return (
    <section data-moment="avant" className="bg-papier-100 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead kicker={funBirthday.kicker} title={funBirthday.title} text={funBirthday.text} />
          <Reveal delay={100} className="mt-8">
            <label htmlFor={inputId} className="text-sm text-encre-500">
              {funBirthday.label}
            </label>
            <input
              id={inputId}
              inputMode="numeric"
              autoComplete="bday"
              placeholder={funBirthday.placeholder}
              value={value}
              onChange={(e) => setValue(maskFrenchDate(e.target.value))}
              aria-invalid={value.length === 10 && !date}
              className="m-mono mt-2 block w-full max-w-xs border-b-2 border-encre-900/20 bg-transparent py-2 text-3xl tracking-wider outline-none transition-colors focus:border-terre-500 aria-[invalid=true]:border-terre-300"
            />
            <p className="mt-3 min-h-5 text-xs text-encre-500">
              {value.length === 10 && !date ? "Cette date ne semble pas exister. Essayez JJ/MM/AAAA." : funBirthday.disclaimer}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7" aria-live="polite">
          {facts ? (
            <div key={value} className="grid grid-cols-2 gap-3 sm:gap-4">
              {cards.map((c, i) => (
                <div key={c.text} className={cn("m-pop rounded-3xl p-5 sm:p-6", c.tone)} style={{ animationDelay: `${i * 90}ms` }}>
                  <span className="text-2xl" aria-hidden="true">
                    {c.emoji}
                  </span>
                  <p className="m-serif mt-4 text-[1.9rem] leading-none sm:text-[2.6rem]">{c.big}</p>
                  <p className="mt-2 text-sm leading-snug opacity-80">{c.text}</p>
                </div>
              ))}
              <p className="m-pop col-span-2 rounded-3xl border border-dashed border-encre-900/20 p-5 text-encre-700" style={{ animationDelay: "380ms" }}>
                <span className="m-kicker mr-2 text-terre-600">Le jour J</span>
                Vous êtes né·e en {facts.month} : le DJ pourrait bien vous appeler avec les autres invités du même mois…
              </p>
            </div>
          ) : (
            <div className="flex h-full min-h-64 items-center justify-center rounded-3xl border border-dashed border-encre-900/20 p-8 text-center text-encre-500">
              Tapez une date pour voir la magie opérer.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
