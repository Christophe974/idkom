"use client";

import { useActionState, useState } from "react";
import { submitWeddingLead } from "@/app/mariage/actions";
import { Container } from "@/components/mariage/ui/Container";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { finalCta as c, site } from "@/content/mariage/copy";
import { maskFrenchDate } from "@/lib/mariage/birthday";
import type { WeddingLeadState } from "@/lib/mariage/leads";

const initial: WeddingLeadState = { status: "idle" };

/** L'appel final + le formulaire « Créer notre mariage » (relié au CRM). */
export function FinalCTA() {
  const [state, action, pending] = useActionState(submitWeddingLead, initial);
  const [date, setDate] = useState("");
  const err = state.status === "invalid" ? state.errors : {};
  const f = c.fields;

  const field = (name: "names" | "email" | "phone" | "guests", label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block">
      <span className="text-sm text-papier-300">{label}</span>
      <input name={name} className="m-field" aria-invalid={Boolean(err[name])} {...props} />
      {err[name] && <span className="mt-1 block text-xs text-terre-300">{err[name]}</span>}
    </label>
  );

  return (
    <section id="creer" data-moment="fin" className="relative overflow-hidden bg-minuit-950 py-20 text-papier-50 sm:py-32">
      <div className="pointer-events-none absolute -left-40 top-20 h-[34rem] w-[34rem] rounded-full bg-terre-600/15 blur-3xl" aria-hidden="true" />
      <Container className="relative grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <h2 className="m-display">{c.title}</h2>
          <p className="m-serif mt-6 text-[clamp(1.5rem,3.5vw,2.2rem)] italic text-champagne-300">{c.subtitle}</p>
          <a href={c.secondary.href} className="mt-10 inline-block text-sm text-papier-300 underline underline-offset-4 hover:text-papier-50">
            {c.secondary.label}
          </a>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6">
          <div className="rounded-[1.75rem] bg-papier-50/5 p-6 ring-1 ring-papier-50/10 sm:p-8">
            <p className="m-h3">{c.formTitle}</p>
            <p className="mt-2 text-sm text-papier-300">{c.formText}</p>

            {state.status === "sent" ? (
              <p role="status" className="m-pop mt-8 rounded-2xl bg-olive-700 p-5 text-papier-50">
                {c.sent}
              </p>
            ) : (
              <form action={action} className="mt-6 space-y-5" noValidate>
                {field("names", f.names, { placeholder: f.namesPlaceholder, autoComplete: "name", required: true })}
                <div className="grid gap-5 sm:grid-cols-2">
                  {field("email", f.email, { type: "email", autoComplete: "email", inputMode: "email", required: true })}
                  {field("phone", f.phone, { type: "tel", autoComplete: "tel", inputMode: "tel" })}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm text-papier-300">{f.date}</span>
                    <input
                      name="date"
                      inputMode="numeric"
                      placeholder={f.datePlaceholder}
                      value={date}
                      onChange={(e) => setDate(maskFrenchDate(e.target.value))}
                      className="m-field m-mono"
                      aria-invalid={Boolean(err.date)}
                    />
                    {err.date && <span className="mt-1 block text-xs text-terre-300">{err.date}</span>}
                  </label>
                  {field("guests", f.guests, { inputMode: "numeric", placeholder: "100" })}
                </div>
                <label className="block">
                  <span className="text-sm text-papier-300">{f.message}</span>
                  <textarea name="message" placeholder={f.messagePlaceholder} className="m-field" rows={3} />
                </label>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                {state.status === "error" && (
                  <p role="alert" className="text-sm text-terre-300">
                    {c.error}{" "}
                    <a href={`mailto:${site.contactEmail}`} className="underline">
                      {site.contactEmail}
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="w-full rounded-full bg-terre-600 py-4 text-base font-medium text-papier-50 transition-colors hover:bg-terre-500 disabled:opacity-60"
                >
                  {pending ? "Envoi…" : c.submit}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
