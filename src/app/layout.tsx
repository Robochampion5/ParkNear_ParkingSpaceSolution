import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ToastProvider } from '@/components/toast-provider';
import { Analytics } from '@vercel/analytics/react';
import CookieBanner from '@/components/cookie-banner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ParkNear — Parking, Reserved.',
  description: 'Book with certainty. Park without circling. Smart parking reservations near UB City, MG Road, Bangalore.',
  keywords: ['parking', 'reservation', 'Bangalore', 'UB City', 'MG Road', 'EV charging', 'smart parking'],
  authors: [{ name: 'ParkNear Team' }],
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'ParkNear — Parking, Reserved.',
    description: 'Book with certainty. Park without circling. Smart parking reservations near UB City, MG Road.',
    url: 'https://parknnear.vercel.app/',
    siteName: 'ParkNear',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://parknnear.vercel.app/og-image.jpg', width: 1200, height: 630, alt: 'ParkNear — Smart Parking in Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ParkNear — Parking, Reserved.',
    description: 'Book with certainty. Park without circling.',
    images: ['https://parknnear.vercel.app/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-[#F4F6FB] text-foreground font-sans antialiased">
        <ToastProvider />
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}