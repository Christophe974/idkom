import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/mariage/utils";

type Variant = "primary" | "ghost" | "light";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.98rem] font-medium tracking-[-0.005em] transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.98] select-none";

const variants: Record<Variant, string> = {
  primary: "bg-terre-600 text-papier-50 hover:bg-terre-700",
  ghost: "border border-current/25 text-current hover:border-current/60",
  light: "bg-papier-50 text-encre-900 hover:bg-champagne-100",
};

type CommonProps = { variant?: Variant; className?: string; children: ReactNode };
type AnchorProps = CommonProps & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type ButtonProps = CommonProps & { href?: never } & Omit<ComponentProps<"button">, "className" | "children">;

/** Bouton arrondi, sobre. Avec `href` → <a> (ancres de la page), sinon <button>. */
export function Button({ variant = "primary", className, children, ...rest }: AnchorProps | ButtonProps) {
  const classes = cn(base, variants[variant], className);
  if (typeof rest.href === "string") {
    return (
      <a className={classes} {...(rest as Omit<AnchorProps, keyof CommonProps>)}>
        {children}
      </a>
    );
  }
  const { type = "button", ...buttonRest } = rest as Omit<ButtonProps, keyof CommonProps | "href">;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={cn("h-4 w-4", className)} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
