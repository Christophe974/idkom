'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

export interface BookingFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
}

interface BookingFormProps {
  date: string;
  time: string;
  duration: number;
  onSubmit: (data: BookingFormValues) => void;
  onBack: () => void;
  isSubmitting: boolean;
  error: string;
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
  return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${day} ${month}`;
}

export default function BookingForm({ date, time, duration, onSubmit, onBack, isSubmitting, error }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
  });

  const formatFirstName = (value: string) => {
    return value
      .toLowerCase()
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join('-');
  };

  const formatLastName = (value: string) => value.toUpperCase();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'firstName') {
      setFormData({ ...formData, [name]: formatFirstName(value) });
    } else if (name === 'lastName') {
      setFormData({ ...formData, [name]: formatLastName(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      {/* Récapitulatif */}
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#7928ca]/10 flex items-center justify-center flex-shrink-0">
            <Icon icon="solar:videocamera-record-linear" className="text-[#7928ca]" width={20} />
          </div>
          <div>
            <p className="text-white font-medium">{formatDateFr(date)} à {time}</p>
            <p className="text-zinc-500 text-sm">Visio Google Meet · {duration} min</p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="ml-auto text-xs text-zinc-500 hover:text-white transition-colors"
          >
            Modifier
          </button>
        </div>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot */}
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-zinc-400 mb-2">
              Prénom *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#7928ca] transition-colors"
              placeholder="Jean-Pierre"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-zinc-400 mb-2">
              Nom *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#7928ca] transition-colors uppercase"
              placeholder="DUPONT"
            />
          </div>
        </div>

        <div>
          <label htmlFor="bookingEmail" className="block text-sm font-medium text-zinc-400 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="bookingEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#7928ca] transition-colors"
            placeholder="jean.dupont@exemple.fr"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bookingPhone" className="block text-sm font-medium text-zinc-400 mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              id="bookingPhone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#7928ca] transition-colors"
              placeholder="06 12 34 56 78"
            />
          </div>
          <div>
            <label htmlFor="bookingCompany" className="block text-sm font-medium text-zinc-400 mb-2">
              Entreprise
            </label>
            <input
              type="text"
              id="bookingCompany"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#7928ca] transition-colors"
              placeholder="Ma Société"
            />
          </div>
        </div>

        {error && (
          <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Icon icon="solar:spinner-bold" className="animate-spin" width={20} />
              Confirmation en cours...
            </>
          ) : (
            <>
              Confirmer le rendez-vous
              <Icon icon="solar:check-circle-linear" width={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
