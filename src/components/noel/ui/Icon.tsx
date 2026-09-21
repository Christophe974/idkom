import type { ReactNode, SVGProps } from "react";
import { cn } from "@/lib/noel/utils";

/* Pictos au trait, 24 × 24, dessinés pour le site (aucune dépendance). */
const ICONS = {
  bus: (
    <>
      <rect x="4" y="4" width="16" height="13" rx="2" />
      <path d="M4 10h16M8 17v2.5M16 17v2.5M7.5 13.5h.01M16.5 13.5h.01" />
    </>
  ),
  gate: (
    <>
      <path d="M3 20V9l2.5-3L8 9v11M16 20V9l2.5-3L21 9v11M8 12h8M8 16h8M12 12v8" />
    </>
  ),
  pass: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M8 7h3v3H8zM13 7h3v3h-3zM8 12h3v3H8zM13 12h1.5M15.5 13.5H16M13 15h3M8 18h8" />
    </>
  ),
  mug: (
    <>
      <path d="M5 9h10v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9zM15 11h1.5a2.5 2.5 0 0 1 0 5H15" />
      <path d="M8 3c0 1.5 1 1.5 1 3M11.5 3c0 1.5 1 1.5 1 3" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  qr: (
    <>
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM6.5 6.5h1v1h-1zM16.5 6.5h1v1h-1zM6.5 16.5h1v1h-1zM14 14h2v2h-2zM18 14h2v2h-2zM16 16h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z" />
    </>
  ),
  plate: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
    </>
  ),
  dice: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8.5 8.5h.01M15.5 8.5h.01M12 12h.01M8.5 15.5h.01M15.5 15.5h.01" strokeWidth="2.5" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  disco: (
    <>
      <circle cx="12" cy="13" r="7" />
      <path d="M12 2v4M5 13h14M12 6c2.5 2 2.5 12 0 14M12 6c-2.5 2-2.5 12 0 14" />
    </>
  ),
  gift: (
    <>
      <path d="M3 9h18v3H3zM5 12v9h14v-9M12 9v12M12 9c-1.5-3.5-5-4-5-2s3 2 5 2c2 0 5 0 5-2s-3.5-1.5-5 2" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M5 12l4 4L19 7" />,
  pin: (
    <>
      <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M17 6.5a2.5 2.5 0 1 1 0 5M15.5 14.5a5 5 0 0 1 6 5" />
    </>
  ),
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof ICONS;

type Props = { name: IconName } & Omit<SVGProps<SVGSVGElement>, "name">;

export function Icon({ name, className, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("h-6 w-6", className)}
      {...rest}
    >
      {ICONS[name]}
    </svg>
  );
}
