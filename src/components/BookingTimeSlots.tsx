'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { getAvailableSlots, TimeSlot } from '@/lib/api';

interface BookingTimeSlotsProps {
  date: string;
  onSelectTime: (time: string) => void;
  selectedTime: string | null;
  onBack: () => void;
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

export default function BookingTimeSlots({ date, onSelectTime, selectedTime, onBack }: BookingTimeSlotsProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getAvailableSlots(date)
      .then((data) => setSlots(data.slots))
      .catch(() => setError('Impossible de charger les créneaux.'))
      .finally(() => setLoading(false));
  }, [date]);

  // Séparer matin / après-midi
  const morningSlots = slots.filter((s) => {
    const hour = parseInt(s.time.split(':')[0], 10);
    return hour < 12;
  });
  const afternoonSlots = slots.filter((s) => {
    const hour = parseInt(s.time.split(':')[0], 10);
    return hour >= 12;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Icon icon="solar:spinner-bold" className="animate-spin text-[#7928ca]" width={32} />
        <p className="text-zinc-500 text-sm">Chargement des créneaux...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error}</p>
        <button type="button" onClick={onBack} className="text-[#7928ca] hover:text-white transition-colors text-sm">
          ← Choisir une autre date
        </button>
      </div>
    );
  }

  const availableCount = slots.filter((s) => s.available).length;

  return (
    <div>
      {/* Date sélectionnée */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-white font-semibold text-lg">{formatDateFr(date)}</p>
          <p className="text-zinc-500 text-sm">{availableCount} créneau{availableCount > 1 ? 'x' : ''} disponible{availableCount > 1 ? 's' : ''}</p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <Icon icon="solar:alt-arrow-left-linear" width={16} />
          Autre date
        </button>
      </div>

      {availableCount === 0 ? (
        <div className="text-center py-8">
          <Icon icon="solar:calendar-minimalistic-linear" className="text-zinc-600 mx-auto mb-3" width={40} />
          <p className="text-zinc-500">Aucun créneau disponible pour cette date.</p>
          <button type="button" onClick={onBack} className="mt-4 text-[#7928ca] hover:text-white transition-colors text-sm">
            Choisir une autre date
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Matin */}
          {morningSlots.length > 0 && (
            <div>
              <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-3">
                <Icon icon="solar:sun-linear" width={14} className="inline-block mr-1" />
                Matin
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {morningSlots.map((slot) => (
                  <SlotButton
                    key={slot.time}
                    slot={slot}
                    isSelected={slot.time === selectedTime}
                    onClick={() => slot.available && onSelectTime(slot.time)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Après-midi */}
          {afternoonSlots.length > 0 && (
            <div>
              <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-3">
                <Icon icon="solar:moon-linear" width={14} className="inline-block mr-1" />
                Après-midi
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {afternoonSlots.map((slot) => (
                  <SlotButton
                    key={slot.time}
                    slot={slot}
                    isSelected={slot.time === selectedTime}
                    onClick={() => slot.available && onSelectTime(slot.time)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SlotButton({ slot, isSelected, onClick }: { slot: TimeSlot; isSelected: boolean; onClick: () => void }) {
  let className = 'py-3 px-2 rounded-lg text-sm font-medium text-center transition-all ';

  if (isSelected) {
    className += 'bg-gradient-to-r from-[#ff2d55] to-[#7928ca] text-white shadow-lg shadow-[#7928ca]/20';
  } else if (slot.available) {
    className += 'bg-zinc-800 border border-zinc-700 text-white hover:border-[#7928ca] cursor-pointer';
  } else {
    className += 'bg-zinc-900 text-zinc-600 cursor-not-allowed opacity-50 line-through';
  }

  return (
    <button type="button" disabled={!slot.available} onClick={onClick} className={className}>
      {slot.time}
    </button>
  );
}
