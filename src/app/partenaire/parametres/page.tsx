'use client';

import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { usePartnerAuth } from '../PartnerAuthProvider';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';

export default function PartnerSettingsPage() {
  const { partner, token, loading: authLoading, isAuthenticated, refreshPartner } = usePartnerAuth();

  const [phone, setPhone] = useState('');
  const [welcomeText, setWelcomeText] = useState('');
  const [colorPrimary, setColorPrimary] = useState('#ff2d55');
  const [colorSecondary, setColorSecondary] = useState('#7928ca');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Populate form from partner data
  useEffect(() => {
    if (partner) {
      setPhone(partner.phone || '');
      setWelcomeText(partner.welcome_text || '');
      setColorPrimary(partner.color_primary || '#ff2d55');
      setColorSecondary(partner.color_secondary || '#7928ca');
      setLogoPreview(partner.logo);
    }
  }, [partner]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${API_URL}/partner-portal.php?action=update_settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone,
          welcome_text: welcomeText,
          color_primary: colorPrimary,
          color_secondary: colorSecondary,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Erreur de sauvegarde');

      await refreshPartner();
      setSuccess('Parametres enregistres avec succes');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setSaving(false);
    }
  }

  async function handleLogoUpload(file: File) {
    if (!token) return;
    if (!file.type.startsWith('image/')) {
      setError('Seuls les fichiers image sont acceptes');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Le fichier ne doit pas depasser 5 Mo');
      return;
    }

    setUploadingLogo(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('logo', file);

      const res = await fetch(`${API_URL}/partner-portal.php?action=upload_logo`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Erreur d\'upload');

      setLogoPreview(json.data.logo_url);
      setLogoFile(null);
      await refreshPartner();
      setSuccess('Logo mis a jour');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur d\'upload');
    } finally {
      setUploadingLogo(false);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
      handleLogoUpload(file);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
      handleLogoUpload(file);
    }
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Icon icon="solar:spinner-bold" width={32} className="animate-spin text-pink-500" />
      </div>
    );
  }

  if (!partner) return null;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Parametres
          </span>
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Personnalisez votre espace partenaire</p>
      </div>

      {/* Notifications */}
      {success && (
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-2">
          <Icon icon="solar:check-circle-bold" width={18} className="text-green-400" />
          <p className="text-green-400 text-sm">{success}</p>
        </div>
      )}
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
          <Icon icon="solar:danger-triangle-bold" width={18} className="text-red-400" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Partner info (read-only) */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Icon icon="solar:building-bold" width={18} className="text-pink-400" />
              Informations partenaire
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">Nom du partenaire</label>
                <div className="bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 rounded-xl px-4 py-3 text-sm">
                  {partner.name}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">Agence</label>
                <div className="bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 rounded-xl px-4 py-3 text-sm">
                  {partner.agency || 'Non definie'}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">Email</label>
                <div className="bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 rounded-xl px-4 py-3 text-sm">
                  {partner.email}
                </div>
              </div>
            </div>
            <p className="text-xs text-zinc-600 mt-3 flex items-center gap-1">
              <Icon icon="solar:info-circle-bold" width={14} />
              Ces informations sont gerees par iDkom
            </p>
          </div>

          {/* Editable settings */}
          <form onSubmit={handleSave}>
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-5">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Icon icon="solar:pen-bold" width={18} className="text-purple-400" />
                Personnalisation
              </h3>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-zinc-400 mb-1.5">
                  Telephone
                </label>
                <div className="relative">
                  <Icon
                    icon="solar:phone-bold"
                    width={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 12 34 56 78"
                    className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl pl-11 pr-4 py-3 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Welcome text */}
              <div>
                <label htmlFor="welcome" className="block text-sm font-medium text-zinc-400 mb-1.5">
                  Message de bienvenue
                </label>
                <textarea
                  id="welcome"
                  value={welcomeText}
                  onChange={(e) => setWelcomeText(e.target.value)}
                  rows={3}
                  placeholder="Texte affiche sur les cartes de visite de vos collaborateurs..."
                  className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all resize-none"
                />
              </div>

              {/* Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="color_primary" className="block text-sm font-medium text-zinc-400 mb-1.5">
                    Couleur principale
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      id="color_primary"
                      value={colorPrimary}
                      onChange={(e) => setColorPrimary(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-zinc-700 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={colorPrimary}
                      onChange={(e) => setColorPrimary(e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="color_secondary" className="block text-sm font-medium text-zinc-400 mb-1.5">
                    Couleur secondaire
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      id="color_secondary"
                      value={colorSecondary}
                      onChange={(e) => setColorSecondary(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-zinc-700 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={colorSecondary}
                      onChange={(e) => setColorSecondary(e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Logo upload */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Logo</label>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                    isDragging
                      ? 'border-pink-500 bg-pink-500/5'
                      : 'border-zinc-700 hover:border-zinc-600 bg-zinc-900/50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  {uploadingLogo ? (
                    <div className="flex flex-col items-center gap-2">
                      <Icon icon="solar:spinner-bold" width={24} className="animate-spin text-pink-400" />
                      <p className="text-sm text-zinc-400">Upload en cours...</p>
                    </div>
                  ) : logoPreview ? (
                    <div className="flex flex-col items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="h-16 w-auto rounded-lg object-contain"
                      />
                      <p className="text-xs text-zinc-500">Cliquez ou glissez pour changer</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Icon icon="solar:cloud-upload-bold" width={32} className="text-zinc-600" />
                      <p className="text-sm text-zinc-400">Glissez votre logo ici</p>
                      <p className="text-xs text-zinc-600">PNG, JPG, SVG - Max 5 Mo</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Save button */}
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Icon icon="solar:spinner-bold" width={18} className="animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Icon icon="solar:check-circle-bold" width={18} />
                    Enregistrer les modifications
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-zinc-400 mb-3 flex items-center gap-2">
              <Icon icon="solar:eye-bold" width={16} />
              Apercu en direct
            </h3>
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden">
              {/* Preview card header */}
              <div
                className="h-20 relative"
                style={{
                  background: `linear-gradient(135deg, ${colorPrimary}40, ${colorSecondary}30, ${colorPrimary}20)`,
                }}
              />
              {/* Preview content */}
              <div className="px-5 pb-5 -mt-6">
                {/* Logo */}
                <div className="flex justify-center mb-3">
                  {logoPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logoPreview}
                      alt="Preview logo"
                      className="h-12 w-auto rounded-lg bg-zinc-800 p-1.5 border border-zinc-700"
                    />
                  ) : (
                    <div
                      className="h-12 w-12 rounded-lg flex items-center justify-center text-white font-bold text-lg border border-zinc-700"
                      style={{ background: `linear-gradient(135deg, ${colorPrimary}, ${colorSecondary})` }}
                    >
                      {partner.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Partner name */}
                <p className="text-center text-white font-semibold text-sm">{partner.name}</p>
                {partner.agency && (
                  <p className="text-center text-zinc-500 text-xs mt-0.5">{partner.agency}</p>
                )}

                {/* Welcome text preview */}
                {welcomeText && (
                  <div className="mt-3 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-zinc-400 text-xs leading-relaxed">{welcomeText}</p>
                  </div>
                )}

                {/* Sample card preview */}
                <div className="mt-3 p-3 rounded-xl border border-zinc-700/50 bg-zinc-800/30">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: `${colorPrimary}20` }}
                    >
                      <Icon icon="solar:user-bold" width={16} style={{ color: colorPrimary }} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">Jean Dupont</p>
                      <p className="text-zinc-600 text-[10px]">Commercial</p>
                    </div>
                  </div>
                  <button
                    className="w-full mt-2.5 py-1.5 rounded-lg text-white text-[10px] font-medium"
                    style={{
                      background: `linear-gradient(135deg, ${colorPrimary}, ${colorSecondary})`,
                    }}
                  >
                    Enregistrer le contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
