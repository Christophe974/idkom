import Image from "next/image";
import type { ReactNode } from "react";
import { media, type MediaSlotId } from "@/content/mariage/media";
import { cn } from "@/lib/mariage/utils";

/**
 * Emplacement de média identifié (voir content/mariage/media.ts).
 * - photo : affiche l'image renseignée (cadrage par `className`/`imgClassName`).
 * - écran : tant qu'aucune capture n'est fournie, affiche la démo passée en `children`.
 */
export function MediaSlot({
  id,
  children,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  fill = true,
}: {
  id: MediaSlotId;
  children?: ReactNode;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  const m = media[id];
  if (!m.src) {
    return (
      <div data-media-slot={id} className={className}>
        {children}
      </div>
    );
  }
  return (
    <div
      data-media-slot={id}
      className={cn(fill && "overflow-hidden", fill && !/\b(absolute|fixed)\b/.test(className ?? "") && "relative", className)}
    >
      {fill ? (
        <Image src={m.src} alt={m.alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imgClassName)} />
      ) : (
        <Image
          src={m.src}
          alt={m.alt}
          width={m.width ?? 1600}
          height={m.height ?? 1200}
          sizes={sizes}
          priority={priority}
          className={cn("h-auto w-full", imgClassName)}
        />
      )}
    </div>
  );
}
