'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientBackground from '@/components/AmbientBackground';
import { submitContactForm } from '@/lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await submitContactForm({
        ...formData,
        source: 'contact_page',
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AmbientBackground />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Parlons de votre <span className="gradient-text">projet</span>
            </h1>
            <p className="text-zinc-400 text-lg mb-10">
              Un stand à concevoir ? Un événement à organiser ? Une idée à concrétiser ?
              Discutons-en autour d'un café (virtuel ou non).
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#ff2d55]/10 flex items-center justify-center flex-shrink-0">
                  <Icon icon="solar:phone-calling-linear" className="text-[#ff2d55]" width={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Téléphone</h3>
                  <a href="tel:0484250000" className="text-zinc-400 hover:text-white transition-colors">
                    04 84 25 XX XX
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#7928ca]/10 flex items-center justify-center flex-shrink-0">
                  <Icon icon="solar:letter-linear" className="text-[#7928ca]" width={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Email</h3>
                  <a href="mailto:contact@idkom.fr" className="text-zinc-400 hover:text-white transition-colors">
                    contact@idkom.fr
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                  <Icon icon="solar:map-point-linear" className="text-[#00d4ff]" width={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Adresse</h3>
                  <p className="text-zinc-400">Franche-Comté, France</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-10">
              <p className="text-zinc-500 text-sm mb-4">Suivez-nous</p>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com/company/idkom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                >
                  <Icon icon="mdi:linkedin" width={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Icon icon="solar:check-circle-linear" className="text-green-500" width={32} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Message envoyé !</h2>
                <p className="text-zinc-400 mb-6">Nous vous répondrons dans les plus brefs délais.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-[#7928ca] hover:text-white transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#7928ca] transition-colors"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#7928ca] transition-colors"
                      placeholder="jean@exemple.fr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-400 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#7928ca] transition-colors"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-zinc-400 mb-2">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#7928ca] transition-colors"
                      placeholder="Ma Société"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-zinc-400 mb-2">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#7928ca] transition-colors"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="stand">Stand / Salon professionnel</option>
                    <option value="digital">Solutions digitales</option>
                    <option value="event">Événement</option>
                    <option value="devis">Demande de devis</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#7928ca] transition-colors resize-none"
                    placeholder="Décrivez votre projet..."
                  />
                </div>

                {status === 'error' && (
                  <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#ff2d55] via-[#7928ca] to-[#00d4ff] text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Icon icon="solar:spinner-bold" className="animate-spin" width={20} />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <Icon icon="solar:arrow-right-linear" width={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
