interface PartnerBrandingProps {
  name: string;
  logo: string | null;
  agency: string | null;
  colorPrimary: string;
}

export default function PartnerBranding({ name, logo, agency, colorPrimary }: PartnerBrandingProps) {
  const label = agency ? `${name} — ${agency}` : name;

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed"
      style={{
        borderColor: `${colorPrimary}30`,
        background: `${colorPrimary}08`,
      }}
    >
      {/* Partner logo or initial */}
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt={name}
          className="w-8 h-8 rounded-lg object-contain bg-white/10 p-0.5 flex-shrink-0"
        />
      ) : (
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
          style={{ background: `${colorPrimary}30` }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Offert par</p>
        <p className="text-zinc-300 text-xs font-medium truncate">{label}</p>
      </div>
    </div>
  );
}
