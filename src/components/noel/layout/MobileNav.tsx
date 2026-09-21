"use client";

import { useEffect, useId, useState } from "react";
import { navLinks } from "@/content/noel/nav";
import { Button } from "@/components/noel/ui/Button";
import { Icon } from "@/components/noel/ui/Icon";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="-mr-2 flex h-11 w-11 items-center justify-center text-ivoire-100 hover:text-ambre-300"
      >
        <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
        <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b hairline bg-nuit-950/95 backdrop-blur-md"
      >
        <nav aria-label="Navigation principale" className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b hairline py-3.5 font-fraunces text-xl text-ivoire-100 last:border-b-0 hover:text-ambre-300"
            >
              {l.label}
            </a>
          ))}
          <div className="pb-2 pt-5">
            <Button href="#proposition" onClick={() => setOpen(false)} className="w-full">
              Demander une proposition
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
