"use client";

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-deep-navy/95 text-white backdrop-blur-md shadow-2xl border-t border-white/10 px-4 py-4 md:px-8 md:py-5 animate-in slide-in-from-bottom-4 duration-300">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <h4 className="font-bold text-sm md:text-base mb-1">Cookie Preferences</h4>
          <p className="text-xs md:text-sm text-white/70 leading-relaxed max-w-2xl">
            We use cookies to improve your experience — showing nearby spots faster and remembering preferences. You can decline without losing core booking features.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 border border-white/20 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-deep-navy hover:bg-white/90 shadow-lg shadow-black/20 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
