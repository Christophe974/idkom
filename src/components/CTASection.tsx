import Link from 'next/link';
import { CalendarAddIcon, PhoneCallingIcon } from './Icons';

interface CTASectionProps {
  phone?: string;
}

export default function CTASection({ phone = '04 84 25 XX XX' }: CTASectionProps) {
  return (
    <section id="contact" className="mt-24">
      <div className="rounded-3xl p-12 md:p-16 bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-white/10 relative gradient-border text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#7928ca]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Un projet en tête ?
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto mb-8 text-lg">
            Discutons de votre prochain événement. Pas de blabla commercial,
            juste des <strong className="text-zinc-300">solutions concrètes</strong>.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              prefetch={false}
              href="/rendez-vous"
              className="px-8 py-4 rounded-full gradient-bg font-medium text-white hover:shadow-lg hover:shadow-[#7928ca]/25 transition-all duration-300 flex items-center gap-2"
            >
              <CalendarAddIcon size={20} />
              Prendre rendez-vous
            </Link>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-medium text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              <PhoneCallingIcon size={20} />
              {phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
