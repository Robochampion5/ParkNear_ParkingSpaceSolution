import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ParkNear — Smart Parking in Bangalore';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex', width: '100%', height: '100%',
          background: 'linear-gradient(135deg, #0F172A 0%, #1a223a 100%)',
          alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          fontFamily: 'Inter, system-ui, sans-serif', color: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: 80 }}>
          <div style={{ width: 100, height: 100, borderRadius: 24, background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(16,185,129,0.35)' }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16"/><path d="M2 20h20"/><circle cx="12" cy="6" r="1.5" fill="#fff" stroke="none"/></svg>
          </div>
          <div>
            <h1 style={{ fontSize: 72, fontWeight: 800, letterSpacing: -2, margin: 0, color: '#fff', lineHeight: 1.05 }}>ParkNear</h1>
            <p style={{ fontSize: 28, color: '#10B981', fontWeight: 600, margin: 12, letterSpacing: 1 }}>Book with certainty. Park without circling.</p>
          </div>
        </div>
      </div>
    ),
    { ...size, alt }
  );
}
