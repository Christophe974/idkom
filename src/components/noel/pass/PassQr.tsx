import QRCode from "qrcode";

/** QR code SVG généré côté serveur (aucun JavaScript client). */
export async function PassQr({ url, size = 96, label }: { url: string; size?: number; label: string }) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#f6eedfff", light: "#00000000" },
  });
  return (
    <div
      role="img"
      aria-label={label}
      className="shrink-0 [&>svg]:h-full [&>svg]:w-full"
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
