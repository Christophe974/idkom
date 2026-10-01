import type { ReactNode } from "react";
import { cn } from "@/lib/mariage/utils";
import { Reveal } from "./Reveal";

/** Surtitre + titre + texte : le bloc d'en-tête commun à toutes les sections. */
export function SectionHead({
  kicker,
  title,
  text,
  className,
  tone = "dark",
  size = "h2",
  children,
}: {
  kicker?: string;
  title: string;
  text?: string;
  className?: string;
  tone?: "dark" | "light";
  size?: "h2" | "h3";
  children?: ReactNode;
}) {
  const Title = size === "h2" ? "h2" : "h3";
  return (
    <Reveal className={className ?? "max-w-2xl"}>
      {kicker && (
        <p className={cn("m-kicker", tone === "dark" ? "text-terre-600" : "text-champagne-300")}>{kicker}</p>
      )}
      <Title className={cn(size === "h2" ? "m-h2" : "m-h3", "mt-4")}>{title}</Title>
      {text && (
        <p className={cn("m-lead mt-5", tone === "dark" ? "text-encre-700" : "text-papier-200")}>{text}</p>
      )}
      {children}
    </Reveal>
  );
}
