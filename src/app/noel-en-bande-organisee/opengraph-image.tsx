import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/noel/site";

export const alt = `${site.name} — au ${site.venue}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image de partage : le visuel clé du hero, titre façon affiche en bas. */
export default async function Image() {
  const [bebas, hero] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/BebasNeue-Regular.ttf")),
    readFile(join(process.cwd(), "public/noel/og-hero.jpg")),
  ]);
  const heroSrc = `data:image/jpeg;base64,${hero.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", fontFamily: "Bebas", background: "#060b16" }}>
        <img src={heroSrc} alt="" width={1200} height={675} style={{ position: "absolute", top: -22, left: 0, width: 1200, height: 675, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(6,11,22,0.10) 0%, rgba(6,11,22,0.45) 50%, rgba(6,11,22,0.94) 100%)",
          }}
        />
        <div style={{ position: "absolute", left: 60, bottom: 44, display: "flex", flexDirection: "column", color: "#f6eedf" }}>
          <div style={{ fontSize: 24, letterSpacing: 7, color: "#d8a06a" }}>
            {`${site.organizer.name} & ${site.partner.name} présentent`.toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 14, lineHeight: 0.86 }}>
            <div style={{ fontSize: 112 }}>NOËL</div>
            <div style={{ fontSize: 112, color: "#f2a93b" }}>EN BANDE</div>
            <div style={{ fontSize: 112 }}>ORGANISÉE</div>
          </div>
          <div style={{ fontSize: 30, letterSpacing: 3, color: "#e8dcc7", marginTop: 16 }}>{`au ${site.venue}`.toUpperCase()}</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Bebas", data: bebas, style: "normal", weight: 400 }] },
  );
}
