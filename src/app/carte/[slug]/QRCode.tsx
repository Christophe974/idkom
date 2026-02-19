'use client';

import { useState } from 'react';

// QR Code generator using a simple SVG approach via external API
// We use a deterministic QR SVG rendered client-side

interface QRCodeProps {
  url: string;
  size?: number;
  color?: string;
}

export default function QRCode({ url, size = 140, color = '#ffffff' }: QRCodeProps) {
  const [showModal, setShowModal] = useState(false);

  // Use Google Charts QR API for simplicity (no dependency needed)
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&bgcolor=00000000&color=${color.replace('#', '')}&format=svg`;
  const qrSrcLarge = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&bgcolor=00000000&color=${color.replace('#', '')}&format=svg`;

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="group relative"
        title="Agrandir le QR code"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrSrc}
          alt="QR Code"
          width={size}
          height={size}
          className="rounded-lg transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
          </svg>
        </div>
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-zinc-900 rounded-2xl p-8 max-w-sm w-full text-center border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white font-semibold mb-4">Scannez ce QR code</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrSrcLarge}
              alt="QR Code"
              width={300}
              height={300}
              className="mx-auto rounded-lg"
            />
            <p className="text-zinc-500 text-xs mt-4 break-all">{url}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-6 py-2 bg-zinc-800 text-zinc-400 rounded-lg hover:bg-zinc-700 transition-colors text-sm"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
