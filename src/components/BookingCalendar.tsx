'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { getAvailableDates, DateAvailability } from '@/lib/api';

interface BookingCalendarProps {
  onSelectDate: (date: string) => void;
  selectedDate: string | null;
  maxAdvanceDays: number;
}

const DAYS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export default function BookingCalendar({ onSelectDate, selectedDate, maxAdvanceDays }: BookingCalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getFullYear() * 12 + today.getMonth());
  const [availableDates, setAvailableDates] = useState<Map<string, DateAvailability>>(new Map());
  const [loading, setLoading] = useState(true);

  const year = Math.floor(currentMonth / 12);
  const month = currentMonth % 12;
  const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;

  // Limites de navigation
  const minMonth = today.getFullYear() * 12 + today.getMonth();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + maxAdvanceDays);
  const maxMonth = maxDate.getFullYear() * 12 + maxDate.getMonth();

  useEffect(() => {
    setLoading(true);
    getAvailableDates(monthStr)
      .then((data) => {
        const map = new Map<string, DateAvailability>();
        data.dates.forEach((d) => map.set(d.date, d));
        setAvailableDates(map);
      })
      .catch(() => setAvailableDates(new Map()))
      .finally(() => setLoading(false));
  }, [monthStr]);

  // Générer la grille du mois
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Lundi = 0
  const daysInMonth = lastDayOfMonth.getDate();

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      {/* Header navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => setCurrentMonth((m) => Math.max(minMonth, m - 1))}
          disabled={currentMonth <= minMonth}
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Icon icon="solar:alt-arrow-left-linear" width={20} />
        </button>
        <h3 className="text-white font-semibold text-lg">
          {MONTHS_FR[month]} {year}
        </h3>
        <button
          type="button"
          onClick={() => setCurrentMonth((m) => Math.min(maxMonth, m + 1))}
          disabled={currentMonth >= maxMonth}
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Icon icon="solar:alt-arrow-right-linear" width={20} />
        </button>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_FR.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-zinc-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Grille des jours */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} />;
          }

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dateInfo = availableDates.get(dateStr);
          const isAvailable = dateInfo?.available ?? false;
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === todayStr;
          const dayOfWeek = (startDayOfWeek + day - 1) % 7;
          const isWeekend = dayOfWeek >= 5;

          let className = 'relative w-full aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all ';

          if (isSelected) {
            className += 'bg-gradient-to-br from-[#ff2d55] to-[#7928ca] text-white shadow-lg shadow-[#7928ca]/20';
          } else if (isAvailable && !loading) {
            className += 'text-white hover:bg-[#7928ca]/20 cursor-pointer';
          } else {
            className += 'text-zinc-700 cursor-not-allowed';
          }

          return (
            <button
              key={dateStr}
              type="button"
              disabled={!isAvailable || loading}
              onClick={() => isAvailable && onSelectDate(dateStr)}
              className={className}
            >
              {day}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00d4ff]" />
              )}
              {isAvailable && !isSelected && !loading && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Légende */}
      <div className="flex items-center gap-4 mt-4 text-xs text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500" /> Disponible
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00d4ff]" /> Aujourd&apos;hui
        </span>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 mt-4 text-zinc-500 text-sm">
          <Icon icon="solar:spinner-bold" className="animate-spin" width={16} />
          Chargement...
        </div>
      )}
    </div>
  );
}
