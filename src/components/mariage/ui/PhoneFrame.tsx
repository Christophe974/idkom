import type { ReactNode } from "react";
import { cn } from "@/lib/mariage/utils";

/** Cadre de téléphone dessiné en CSS (pas d'image) : léger et net à toutes les tailles. */
export function PhoneFrame({
  children,
  className,
  screenClassName,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  screenClassName?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[9/19] w-[min(78vw,290px)] rounded-[2.6rem] bg-encre-950 p-[9px] shadow-[0_30px_60px_-20px_rgb(22_20_15/0.45),0_0_0_1px_rgb(255_255_255/0.06)_inset]",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-[2.05rem]",
          tone === "light" ? "bg-papier-50 text-encre-900" : "bg-minuit-900 text-papier-50",
          screenClassName,
        )}
      >
        <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-encre-950" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
