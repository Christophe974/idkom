"use client";

import { useState, type DragEvent } from "react";
import { Container } from "@/components/mariage/ui/Container";
import { MediaSlot } from "@/components/mariage/ui/MediaSlot";
import { Reveal } from "@/components/mariage/ui/Reveal";
import { SectionHead } from "@/components/mariage/ui/SectionHead";
import { seating } from "@/content/mariage/copy";
import { proposedPlan, seatGuests, seatTables } from "@/content/mariage/demo";
import { cn } from "@/lib/mariage/utils";

type Plan = Record<string, string | null>;

const initialPlan = (): Plan => Object.fromEntries(seatGuests.map((g) => [g.id, g.id === "g1" ? "marrakech" : null]));

const groupTone: Record<string, string> = {
  "Famille Martin": "bg-terre-100 text-terre-700",
  "Cousins de Sophie": "bg-champagne-100 text-encre-900",
  "Amis de fac": "bg-olive-100 text-olive-900",
  "Collègues de Thomas": "bg-papier-200 text-encre-900",
  "Oncles & tantes": "bg-[#e6e1f0] text-[#3b3256]",
};

/**
 * AVANT · Plan de table. Glisser-déposer (souris) ou toucher un prénom puis une table (téléphone).
 * « Proposer un plan » regroupe couples, familles et amis en respectant les capacités.
 */
export function SeatingPlan() {
  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [selected, setSelected] = useState<string | null>(null);
  const [proposed, setProposed] = useState(false);

  const countAt = (tableId: string) => Object.values(plan).filter((t) => t === tableId).length;

  const assign = (guestId: string, tableId: string | null) => {
    if (tableId) {
      const table = seatTables.find((t) => t.id === tableId)!;
      if (plan[guestId] !== tableId && countAt(tableId) >= table.capacity) return;
    }
    setPlan((p) => ({ ...p, [guestId]: tableId }));
    setSelected(null);
    setProposed(false);
  };

  const onDrop = (tableId: string | null) => (e: DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) assign(id, tableId);
  };

  const renderChip = (id: string) => {
    const g = seatGuests.find((x) => x.id === id)!;
    return (
      <button
        key={id}
        type="button"
        draggable
        onDragStart={(e) => e.dataTransfer.setData("text/plain", id)}
        onClick={(e) => {
          e.stopPropagation();
          setSelected((s) => (s === id ? null : id));
        }}
        aria-pressed={selected === id}
        title={g.group}
        className={cn(
          "cursor-grab rounded-full px-3 py-1.5 text-sm font-medium transition-[transform,box-shadow] active:cursor-grabbing",
          groupTone[g.group],
          selected === id && "scale-105 shadow-[0_0_0_2px_var(--color-terre-500)]",
        )}
      >
        {g.name}
      </button>
    );
  };

  const unplaced = seatGuests.filter((g) => !plan[g.id]);

  return (
    <section data-moment="avant" className="bg-papier-50 py-20 sm:py-28">
      <Container>
        <SectionHead kicker={seating.kicker} title={seating.title} text={seating.text} className="max-w-3xl" />

        <Reveal delay={120} className="mt-10">
          <MediaSlot id="SEATING_PLAN_SCREEN">
            <div className="rounded-[1.75rem] bg-papier-100 p-4 ring-1 ring-encre-900/5 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-encre-500">{seating.hint}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPlan(Object.fromEntries(seatGuests.map((g) => [g.id, proposedPlan[g.id] ?? null])));
                      setProposed(true);
                      setSelected(null);
                    }}
                    className="rounded-full bg-encre-900 px-4 py-2.5 text-sm font-medium text-papier-50 hover:bg-encre-700"
                  >
                    ✦ {seating.propose}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPlan(initialPlan());
                      setProposed(false);
                    }}
                    className="rounded-full border border-encre-900/15 px-4 py-2.5 text-sm text-encre-700 hover:border-encre-900/40"
                  >
                    {seating.reset}
                  </button>
                </div>
              </div>

              {/* Invités à placer */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop(null)}
                onClick={() => selected && assign(selected, null)}
                className="mt-5 min-h-16 rounded-2xl border border-dashed border-encre-900/20 p-3"
              >
                <p className="m-kicker mb-2 text-[0.62rem] text-encre-500">À placer · {unplaced.length}</p>
                <div className="flex flex-wrap gap-2">
                  {unplaced.map((g) => renderChip(g.id))}
                  {unplaced.length === 0 && <p className="text-sm text-olive-700">Tout le monde a sa place.</p>}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {seatTables.map((t) => {
                  const here = seatGuests.filter((g) => plan[g.id] === t.id);
                  const full = here.length >= t.capacity;
                  return (
                    <div
                      key={t.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`Table ${t.name}, ${here.length} sur ${t.capacity}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={onDrop(t.id)}
                      onClick={() => selected && assign(selected, t.id)}
                      onKeyDown={(e) => {
                        if ((e.key === "Enter" || e.key === " ") && selected) {
                          e.preventDefault();
                          assign(selected, t.id);
                        }
                      }}
                      className={cn(
                        "flex min-h-28 flex-col rounded-2xl sm:min-h-44 bg-papier-50 p-3.5 transition-[box-shadow,background-color] sm:p-4",
                        selected && !full && "shadow-[0_0_0_2px_var(--color-terre-300)]",
                      )}
                    >
                      <div className="flex items-baseline justify-between">
                        <p className="m-serif text-xl sm:text-2xl">{t.name}</p>
                        <p className={cn("m-mono text-xs", full ? "text-olive-700" : "text-encre-500")}>
                          {here.length}/{t.capacity}
                        </p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {here.map((g) => renderChip(g.id))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <p aria-live="polite" className={cn("mt-4 text-sm transition-opacity", proposed ? "text-olive-700 opacity-100" : "opacity-0")}>
                Proposition faite : la famille Martin ensemble, les cousins de Sophie ensemble, les amis de fac à New York. Modifiez librement.
              </p>
            </div>
          </MediaSlot>
        </Reveal>
      </Container>
    </section>
  );
}
