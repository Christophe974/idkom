import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = "iDkom - L'Atelier Phygital";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          backgroundImage:
            'radial-gradient(circle at 20% 80%, rgba(255, 45, 85, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(121, 40, 202, 0.08) 0%, transparent 50%)',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Logo and title row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '24px',
          }}
        >
          {/* Logo icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #ff2d55 0%, #7928ca 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: 'white',
              }}
            >
              iD
            </span>
          </div>

          {/* Company name */}
          <span
            style={{
              fontSize: '56px',
              fontWeight: 600,
              color: 'white',
            }}
          >
            iDkom
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: 500,
            background: 'linear-gradient(90deg, #ff2d55 0%, #7928ca 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '20px',
          }}
        >
          L&apos;Atelier Phygital
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '20px',
            color: '#a1a1aa',
            marginBottom: '40px',
          }}
        >
          Stands BeMatrix • Solutions Digitales • Événementiel
        </div>

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 24px',
            borderRadius: '50px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
            }}
          />
          <span
            style={{
              fontSize: '14px',
              color: '#a1a1aa',
            }}
          >
            Atelier créatif depuis 1994
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
