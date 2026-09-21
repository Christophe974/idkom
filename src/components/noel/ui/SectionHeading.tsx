import type { ReactNode } from "react";
import { cn } from "@/lib/noel/utils";

type Props = {
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  /** Niveau de titre (h2 par défaut). */
  as?: "h1" | "h2" | "h3";
};

/**
 * En-tête de section : petit surtitre en capitales espacées,
 * titre en serif (l’italique sert d’accent), chapô optionnel.
 */
export function SectionHeading({ kicker, title, lead, className, as: Tag = "h2" }: Props) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {kicker && <p className="kicker">{kicker}</p>}
      <Tag className="mt-4 font-fraunces text-[2rem] leading-[1.06] tracking-tight text-ivoire-100 sm:text-[2.6rem] lg:text-[3rem] [&_em]:font-normal [&_em]:italic [&_em]:text-ambre-300">
        {title}
      </Tag>
      {lead && <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivoire-200">{lead}</p>}
    </div>
  );
}
