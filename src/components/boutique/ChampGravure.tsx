'use client';

interface Props {
  value: string;
  onChange: (text: string) => void;
  maxLength?: number;
  placeholder?: string;
}

export default function ChampGravure({
  value,
  onChange,
  maxLength = 50,
  placeholder = 'Bouddy',
}: Props) {
  const remaining = maxLength - value.length;
  return (
    <div>
      <label
        htmlFor="gravure-text"
        className="block text-sm font-semibold text-white mb-2"
      >
        Gravure
      </label>
      <div className="relative">
        <input
          id="gravure-text"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
          maxLength={maxLength}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-16 rounded-xl bg-zinc-900/60 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff2d55] focus:ring-2 focus:ring-[#ff2d55]/20 transition-all"
        />
        <span
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums ${
            remaining < 5 ? 'text-[#ff2d55]' : 'text-zinc-500'
          }`}
        >
          {value.length}/{maxLength}
        </span>
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        Le texte exact sera gravé. Vérifie l&apos;orthographe.
      </p>
    </div>
  );
}
