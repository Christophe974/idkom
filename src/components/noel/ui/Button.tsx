import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/noel/utils";

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 border font-poster uppercase leading-none tracking-[0.12em] transition-colors duration-200 select-none";

const variants: Record<Variant, string> = {
  primary: "border-ambre-500 bg-ambre-500 text-nuit-950 hover:border-ambre-300 hover:bg-ambre-300",
  secondary: "border-ivoire-100/40 bg-transparent text-ivoire-100 hover:border-ambre-400 hover:text-ambre-200",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-[1.05rem]",
  sm: "px-4 py-2.5 text-[0.95rem]",
};

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };
type AnchorProps = CommonProps & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type ButtonProps = CommonProps & { href?: never } & Omit<ComponentProps<"button">, "className" | "children">;

/**
 * Bouton « affiche » : capitales Bebas, angles vifs.
 * Avec `href` en ancre (#…) → <a> ; avec une route → <Link> ; sinon <button>.
 */
export function Button({ variant = "primary", size = "md", className, children, ...rest }: AnchorProps | ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (typeof rest.href === "string") {
    const { href, ...anchorRest } = rest as Omit<AnchorProps, keyof CommonProps>;
    if (href.startsWith("#")) {
      return (
        <a href={href} className={classes} {...anchorRest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as Omit<ButtonProps, keyof CommonProps | "href">;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
