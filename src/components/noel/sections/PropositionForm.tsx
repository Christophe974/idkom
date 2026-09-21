"use client";

import { useActionState, useId, useState, useTransition, type FormEvent, type ReactNode } from "react";
import { submitProposal } from "@/app/noel-en-bande-organisee/actions";
import { Button } from "@/components/noel/ui/Button";
import { Icon } from "@/components/noel/ui/Icon";
import { BUS_OPTIONS, CHILDREN_OPTIONS, FORMULE_OPTIONS, type LeadErrors, type SubmitState } from "@/lib/noel/leads/types";
import { hasErrors, parseLead } from "@/lib/noel/leads/validate";
import { site } from "@/lib/noel/site";
import { cn } from "@/lib/noel/utils";

function Field({
  label,
  name,
  error,
  required,
  hint,
  children,
  className,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={name} className="text-[0.72rem] uppercase tracking-[0.16em] text-ivoire-400">
        {label}
        {required && (
          <span className="ml-1 text-ambre-400" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${name}-hint`} className="mt-1.5 text-xs text-ivoire-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-xs text-bordeaux-400">
          {error}
        </p>
      )}
    </div>
  );
}

function Choices({
  legend,
  name,
  options,
  error,
  required,
}: {
  legend: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
  required?: boolean;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined} aria-invalid={error ? true : undefined}>
      <legend className="text-[0.72rem] uppercase tracking-[0.16em] text-ivoire-400">
        {legend}
        {required && (
          <span className="ml-1 text-ambre-400" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="choice relative">
            <input type="radio" name={name} value={o.value} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-xs text-bordeaux-400">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function PropositionForm() {
  const [state, formAction, pending] = useActionState<SubmitState, FormData>(submitProposal, null);
  const [clientErrors, setClientErrors] = useState<LeadErrors>({});
  const [, startTransition] = useTransition();
  const citiesId = useId();

  const errors: LeadErrors = hasErrors(clientErrors) ? clientErrors : state?.status === "invalid" ? state.errors : {};

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const { errors: found } = parseLead(fd);
    setClientErrors(found);
    if (hasErrors(found)) {
      const first = Object.keys(found)[0];
      const el = form.elements.namedItem(first);
      if (el instanceof HTMLElement) el.focus();
      else if (el instanceof RadioNodeList && el[0] instanceof HTMLElement) el[0].focus();
      return;
    }
    // Soumission manuelle dans une transition : le formulaire garde ses valeurs.
    startTransition(() => formAction(fd));
  }

  const describe = (name: keyof LeadErrors, hint?: boolean) =>
    errors[name] ? `${name}-error` : hint ? `${name}-hint` : undefined;

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="space-y-10">
      {/* champ piège, invisible pour les humains */}
      <div className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Site web
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Entreprise" name="company" required error={errors.company} className="sm:col-span-2">
          <input
            id="company"
            name="company"
            className="field"
            autoComplete="organization"
            aria-invalid={!!errors.company}
            aria-describedby={describe("company")}
          />
        </Field>
        <Field label="Nom" name="lastName" required error={errors.lastName}>
          <input id="lastName" name="lastName" className="field" autoComplete="family-name" aria-invalid={!!errors.lastName} aria-describedby={describe("lastName")} />
        </Field>
        <Field label="Prénom" name="firstName" required error={errors.firstName}>
          <input id="firstName" name="firstName" className="field" autoComplete="given-name" aria-invalid={!!errors.firstName} aria-describedby={describe("firstName")} />
        </Field>
        <Field label="E-mail" name="email" required error={errors.email}>
          <input id="email" name="email" type="email" inputMode="email" className="field" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={describe("email")} />
        </Field>
        <Field label="Téléphone" name="phone" error={errors.phone}>
          <input id="phone" name="phone" type="tel" inputMode="tel" className="field" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={describe("phone")} />
        </Field>
        <Field label="Ville de départ" name="departureCity" error={errors.departureCity} hint="Utile si un bus vous intéresse.">
          <input
            id="departureCity"
            name="departureCity"
            className="field"
            list={citiesId}
            autoComplete="address-level2"
            aria-describedby={describe("departureCity", true)}
          />
          <datalist id={citiesId}>
            {site.cities.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>
        <Field label="Nombre estimé de participants" name="headcount" required error={errors.headcount}>
          <input
            id="headcount"
            name="headcount"
            type="number"
            inputMode="numeric"
            min={1}
            max={2000}
            className="field"
            aria-invalid={!!errors.headcount}
            aria-describedby={describe("headcount")}
          />
        </Field>
      </div>

      <div className="grid gap-8 sm:grid-cols-3">
        <Choices legend="Formule envisagée" name="formule" options={FORMULE_OPTIONS} error={errors.formule} required />
        <Choices legend="Présence d’enfants" name="children" options={CHILDREN_OPTIONS} error={errors.children} />
        <Choices legend="Besoin d’un bus" name="bus" options={BUS_OPTIONS} error={errors.bus} />
      </div>

      <Field label="Message" name="message" error={errors.message} hint="Date souhaitée, contraintes, envies : tout ce qui nous aide à préparer la proposition.">
        <textarea id="message" name="message" rows={4} className="field" aria-describedby={describe("message", true)} />
      </Field>

      <div>
        <label className="flex items-start gap-3 text-sm text-ivoire-200">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 h-4 w-4 shrink-0 appearance-none border border-ivoire-100/40 bg-transparent checked:border-ambre-400 checked:bg-ambre-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ambre-400"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            J’accepte que ces informations soient utilisées par {site.organizer.name} et le {site.partner.name} pour répondre
            à ma demande.
            <span className="ml-1 text-ambre-400" aria-hidden="true">
              *
            </span>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" role="alert" className="mt-1.5 text-xs text-bordeaux-400">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={pending} aria-busy={pending} className="disabled:opacity-60">
          {pending ? "Envoi…" : "Envoyer ma demande"}
          {!pending && <Icon name="arrow" className="h-4 w-4" />}
        </Button>
        <p className="text-xs text-ivoire-600">* Champs nécessaires pour vous répondre.</p>
      </div>

      {state?.status === "not_configured" && (
        <div role="status" className="border border-ambre-500/60 bg-ambre-500/10 p-5 sm:p-6">
          <p className="kicker">Version de démonstration</p>
          <p className="mt-2 font-fraunces text-xl text-ivoire-100">Votre demande est prête, mais l’envoi n’est pas encore activé.</p>
          <p className="mt-2 text-sm leading-relaxed text-ivoire-200">
            Rien n’a été transmis. Vos réponses restent affichées ci-dessus : l’envoi sera activé à la mise en ligne du site.
          </p>
        </div>
      )}
      {state?.status === "sent" && (
        <div role="status" className="border border-ambre-500/60 bg-ambre-500/10 p-5 sm:p-6">
          <p className="kicker">Demande envoyée</p>
          <p className="mt-2 font-fraunces text-xl text-ivoire-100">Merci, votre demande est bien arrivée.</p>
          <p className="mt-2 text-sm text-ivoire-200">
            Nous revenons vers vous rapidement avec une proposition. Vos réponses restent affichées ci-dessus.
          </p>
        </div>
      )}
      {state?.status === "error" && (
        <div role="alert" className="border border-bordeaux-400/70 bg-bordeaux-800/40 p-5 sm:p-6">
          <p className="font-fraunces text-xl text-ivoire-100">Impossible d’envoyer pour le moment.</p>
          <p className="mt-2 text-sm text-ivoire-200">Réessayez dans quelques minutes.</p>
        </div>
      )}
    </form>
  );
}
