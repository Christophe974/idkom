'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';

interface BookingConfirmationProps {
  booking: {
    date: string;
    time: string;
    duration: number;
    meeting_link: string;
  };
  clientName: string;
}

const MONTHS_FR = [
  '', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
];
const DAYS_FR = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

function formatDateFr(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const dayName = DAYS_FR[d.getDay()];
  const day = d.getDate();
  const month = MONTHS_FR[d.getMonth() + 1];
  const year = d.getFullYear();
  return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${day} ${month} ${year}`;
}

function generateIcsContent(booking: BookingConfirmationProps['booking']): string {
  const startDate = booking.date.replace(/-/g, '');
  const startTime = booking.time.replace(':', '') + '00';
  const endMinutes = parseInt(booking.time.split(':')[1], 10) + booking.duration;
  const endHour = parseInt(booking.time.split(':')[0], 10) + Math.floor(endMinutes / 60);
  const endMin = endMinutes % 60;
  const endTime = `${String(endHour).padStart(2, '0')}${String(endMin).padStart(2, '0')}00`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//iDkom//Booking//FR',
    'BEGIN:VEVENT',
    `DTSTART;TZID=Europe/Paris:${startDate}T${startTime}`,
    `DTEND;TZID=Europe/Paris:${startDate}T${endTime}`,
    'SUMMARY:Rendez-vous iDkom',
    `DESCRIPTION:Visioconférence Google Meet\\n${booking.meeting_link}`,
    `LOCATION:${booking.meeting_link}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function downloadIcs(booking: BookingConfirmationProps['booking']) {
  const content = generateIcsContent(booking);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rdv-idkom-${booking.date}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function BookingConfirmation({ booking, clientName }: BookingConfirmationProps) {
  return (
    <div className="text-center py-4">
      {/* Icône succès */}
      <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
        <Icon icon="solar:check-circle-bold" className="text-green-500" width={44} />
      </div>

      <h2 className="text-2xl font-bold text-white mb-2 animate-fade-in-up delay-100">
        Rendez-vous confirmé !
      </h2>
      <p className="text-zinc-400 mb-8 animate-fade-in-up delay-200">
        Merci {clientName.split(' ')[0]}, un email de confirmation vous a été envoyé.
      </p>

      {/* Carte récapitulatif */}
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-left mb-6 animate-fade-in-up delay-300">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Icon icon="solar:calendar-linear" className="text-[#7928ca]" width={18} />
            <span className="text-zinc-400 text-sm">Date</span>
            <span className="text-white font-medium ml-auto">{formatDateFr(booking.date)}</span>
          </div>
          <div className="flex items-center gap-3">
            <Icon icon="solar:clock-circle-linear" className="text-[#7928ca]" width={18} />
            <span className="text-zinc-400 text-sm">Heure</span>
            <span className="text-white font-medium ml-auto">{booking.time}</span>
          </div>
          <div className="flex items-center gap-3">
            <Icon icon="solar:hourglass-linear" className="text-[#7928ca]" width={18} />
            <span className="text-zinc-400 text-sm">Durée</span>
            <span className="text-white font-medium ml-auto">{booking.duration} minutes</span>
          </div>
          <div className="flex items-center gap-3">
            <Icon icon="solar:videocamera-record-linear" className="text-[#7928ca]" width={18} />
            <span className="text-zinc-400 text-sm">Format</span>
            <span className="text-white font-medium ml-auto">Visio Google Meet</span>
          </div>
        </div>

        {booking.meeting_link && (
          <a
            href={booking.meeting_link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-[#ff2d55] to-[#7928ca] text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Icon icon="solar:videocamera-record-linear" width={18} />
            Rejoindre le Google Meet
          </a>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-400">
        <button
          type="button"
          onClick={() => downloadIcs(booking)}
          className="flex-1 py-3 px-4 bg-zinc-800 border border-zinc-700 text-white rounded-lg hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Icon icon="solar:calendar-add-linear" width={18} />
          Ajouter au calendrier
        </button>
        <Link
          href="/"
          className="flex-1 py-3 px-4 bg-zinc-800 border border-zinc-700 text-white rounded-lg hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Icon icon="solar:home-2-linear" width={18} />
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
