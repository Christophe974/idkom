'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientBackground from '@/components/AmbientBackground';
import BookingCalendar from '@/components/BookingCalendar';
import BookingTimeSlots from '@/components/BookingTimeSlots';
import BookingForm, { BookingFormValues } from '@/components/BookingForm';
import BookingConfirmation from '@/components/BookingConfirmation';
import { getBookingSettings, submitBooking, BookingSettings, BookingResult, SiteSettings, Social } from '@/lib/api';

type BookingStep = 'date' | 'time' | 'form' | 'confirmation';

interface BookingPageClientProps {
  site: SiteSettings;
  social: Social;
}

const STEPS = [
  { key: 'date', label: 'Date', icon: 'solar:calendar-linear' },
  { key: 'time', label: 'Heure', icon: 'solar:clock-circle-linear' },
  { key: 'form', label: 'Infos', icon: 'solar:user-linear' },
  { key: 'confirmation', label: 'Confirmé', icon: 'solar:check-circle-linear' },
] as const;

export default function BookingPageClient({ site, social }: BookingPageClientProps) {
  const [step, setStep] = useState<BookingStep>('date');
  const [settings, setSettings] = useState<BookingSettings | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);
  const [clientName, setClientName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [loadingSettings, setLoadingSettings] = useState(true);

  useEffect(() => {
    getBookingSettings()
      .then(setSettings)
      .catch(() => setSettings(null))
      .finally(() => setLoadingSettings(false));
  }, []);

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setStep('time');
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setStep('form');
  };

  const handleSubmitForm = async (data: BookingFormValues) => {
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setError('');

    try {
      const result = await submitBooking({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company || undefined,
        date: selectedDate,
        time: selectedTime,
      });

      setBookingResult(result);
      setClientName(`${data.firstName} ${data.lastName}`);
      setStep('confirmation');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  // Pas de booking si désactivé ou en chargement
  if (loadingSettings) {
    return (
      <>
        <AmbientBackground />
        <Navbar />
        <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
          <div className="flex items-center justify-center py-20 gap-3">
            <Icon icon="solar:spinner-bold" className="animate-spin text-[#7928ca]" width={32} />
            <span className="text-zinc-400">Chargement...</span>
          </div>
        </main>
        <Footer site={site} social={social} />
      </>
    );
  }

  if (!settings?.enabled) {
    return (
      <>
        <AmbientBackground />
        <Navbar />
        <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
          <div className="text-center py-20">
            <Icon icon="solar:calendar-minimalistic-linear" className="text-zinc-600 mx-auto mb-4" width={64} />
            <h1 className="text-2xl font-bold text-white mb-4">Prise de rendez-vous indisponible</h1>
            <p className="text-zinc-400 mb-6">
              Le système de prise de rendez-vous est temporairement désactivé.
              Contactez-nous directement.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Nous contacter
              <Icon icon="solar:arrow-right-linear" width={18} />
            </a>
          </div>
        </main>
        <Footer site={site} social={social} />
      </>
    );
  }

  return (
    <>
      <AmbientBackground />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left - Info (2 cols) */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prendre <span className="gradient-text">rendez-vous</span>
            </h1>
            <p className="text-zinc-400 text-lg mb-10">
              30 minutes en visio pour discuter de votre projet.
              Choisissez un créneau qui vous convient.
            </p>

            {/* Avantages */}
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#ff2d55]/10 flex items-center justify-center flex-shrink-0">
                  <Icon icon="solar:videocamera-record-linear" className="text-[#ff2d55]" width={20} />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Visioconférence</h3>
                  <p className="text-zinc-500 text-sm">Rendez-vous en Google Meet, sans déplacement</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#7928ca]/10 flex items-center justify-center flex-shrink-0">
                  <Icon icon="solar:clock-circle-linear" className="text-[#7928ca]" width={20} />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">30 minutes</h3>
                  <p className="text-zinc-500 text-sm">Un échange efficace et ciblé sur vos besoins</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                  <Icon icon="solar:check-circle-linear" className="text-[#00d4ff]" width={20} />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Confirmation immédiate</h3>
                  <p className="text-zinc-500 text-sm">Email de confirmation + rappel 24h avant</p>
                </div>
              </div>
            </div>

            {/* Stepper (desktop) */}
            <div className="hidden lg:block mt-12">
              <div className="space-y-3">
                {STEPS.map((s, i) => {
                  const isCurrent = i === stepIndex;
                  const isDone = i < stepIndex;
                  return (
                    <div key={s.key} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                        isDone
                          ? 'bg-green-500/20 text-green-400'
                          : isCurrent
                            ? 'bg-gradient-to-br from-[#ff2d55] to-[#7928ca] text-white'
                            : 'bg-zinc-800 text-zinc-600'
                      }`}>
                        {isDone ? (
                          <Icon icon="solar:check-circle-linear" width={16} />
                        ) : (
                          <Icon icon={s.icon} width={16} />
                        )}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${
                        isCurrent ? 'text-white' : isDone ? 'text-green-400' : 'text-zinc-600'
                      }`}>
                        {s.label}
                      </span>
                      {i === 0 && selectedDate && (
                        <span className="text-xs text-zinc-500 ml-auto">{selectedDate}</span>
                      )}
                      {i === 1 && selectedTime && (
                        <span className="text-xs text-zinc-500 ml-auto">{selectedTime}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right - Booking Flow (3 cols) */}
          <div className="lg:col-span-3">
            {/* Stepper mobile */}
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
              {STEPS.map((s, i) => (
                <div key={s.key} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                    i < stepIndex
                      ? 'bg-green-500/20 text-green-400'
                      : i === stepIndex
                        ? 'bg-gradient-to-br from-[#ff2d55] to-[#7928ca] text-white'
                        : 'bg-zinc-800 text-zinc-600'
                  }`}>
                    {i < stepIndex ? (
                      <Icon icon="solar:check-circle-linear" width={14} />
                    ) : (
                      <Icon icon={s.icon} width={14} />
                    )}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`w-6 h-0.5 ${i < stepIndex ? 'bg-green-500/40' : 'bg-zinc-800'}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
              {step === 'date' && (
                <BookingCalendar
                  onSelectDate={handleSelectDate}
                  selectedDate={selectedDate}
                  maxAdvanceDays={settings.max_advance_days}
                />
              )}

              {step === 'time' && selectedDate && (
                <BookingTimeSlots
                  date={selectedDate}
                  onSelectTime={handleSelectTime}
                  selectedTime={selectedTime}
                  onBack={() => setStep('date')}
                />
              )}

              {step === 'form' && selectedDate && selectedTime && (
                <BookingForm
                  date={selectedDate}
                  time={selectedTime}
                  duration={settings.duration}
                  onSubmit={handleSubmitForm}
                  onBack={() => setStep('time')}
                  isSubmitting={isSubmitting}
                  error={error}
                />
              )}

              {step === 'confirmation' && bookingResult && (
                <BookingConfirmation
                  booking={bookingResult.booking}
                  clientName={clientName}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer site={site} social={social} />
    </>
  );
}
