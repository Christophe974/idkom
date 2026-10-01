"use client";

import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { budget as copy } from "@/content/mariage/copy";
import { budget as b } from "@/content/mariage/demo";
import { useInView } from "@/lib/mariage/useInView";
import { cn, euros } from "@/lib/mariage/utils";

/** Le budget en un coup d'œil : prévu, engagé, payé, reste, et la prochaine échéance. */
export function BudgetPreview() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const left = b.committed - b.paid;
  const figures: Array<[string, number, string]> = [
    ["Budget prévu", b.planned, "text-papier-50"],
    ["Engagé", b.committed, "text-champagne-300"],
    ["Payé", b.paid, "text-olive-300"],
    ["Reste à payer", left, "text-terre-300"],
  ];

  return (
    <div ref={ref} className={cn(inView && "is-visible")}>
      <p className="m-kicker text-olive-300">{copy.kicker}</p>
      <p className="m-h3 mt-3">{copy.title}</p>
      <p className="mt-3 max-w-xl text-papier-300">{copy.text}</p>

      <MediaSlot id="BUDGET_SCREEN" className="mt-7">
        <div className="rounded-[1.75rem] bg-papier-50 p-5 text-encre-900 sm:p-7">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {figures.map(([k, v], i) => (
              <div key={k} className={cn("rounded-2xl p-3.5", i === 3 ? "bg-terre-100" : "bg-papier-100")}>
                <dt className="text-xs text-encre-500">{k}</dt>
                <dd className="m-mono mt-1 text-lg sm:text-xl">{euros(v)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-papier-200" aria-hidden="true">
            <div className="relative h-full">
              <div className="m-bar absolute inset-y-0 left-0 w-full rounded-full bg-champagne-500/70" style={{ ["--m-fill" as string]: b.committed / b.planned }} />
              <div className="m-bar absolute inset-y-0 left-0 w-full rounded-full bg-olive-500" style={{ ["--m-fill" as string]: b.paid / b.planned, transitionDelay: "200ms" }} />
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {b.categories.map((c, i) => (
              <li key={c.label} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 text-sm">
                <span>{c.label}</span>
                <span className="m-mono text-encre-500">
                  {euros(c.paid)} / {euros(c.planned)}
                </span>
                <span className="col-span-2 h-1.5 overflow-hidden rounded-full bg-papier-200" aria-hidden="true">
                  <span
                    className="m-bar block h-full rounded-full bg-olive-700"
                    style={{ ["--m-fill" as string]: c.paid / c.planned, transitionDelay: `${300 + i * 90}ms` }}
                  />
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-encre-900 px-4 py-3 text-sm text-papier-50">
            <span>
              Prochaine échéance · <strong className="font-medium">{b.nextDue.label}</strong>
            </span>
            <span className="m-mono text-champagne-300">
              {euros(b.nextDue.amount)} · {b.nextDue.date}
            </span>
          </p>
        </div>
      </MediaSlot>
    </div>
  );
}
