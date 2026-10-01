"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/mariage/useInView";
import { cn } from "@/lib/mariage/utils";

/** Révélation douce à l'entrée dans l'écran (une fois). Sans JS, tout reste visible (voir layout). */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "p";
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  return (
    <Tag
      ref={ref as never}
      className={cn("m-reveal", inView && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
