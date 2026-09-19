"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Facility } from '@/data/facilities';
import {
  Clock, Shield, Umbrella, Zap, Star, ArrowLeft, Check, CheckCircle2,
  MapPin, Navigation
} from 'lucide-react';

interface Props {
  facility: Facility;
  open: boolean;
  onClose: () => void;
  onConfirm: (data: { hours: number; timeWindow: string }) => void;
}

export default function BookingModal({ facility, open, onClose, onConfirm }: Props) {
  const [step, setStep] = useState<'select' | 'confirming' | 'confirmed'>('select');
  const [hours, setHours] = useState(1);
  const [confirmedData, setConfirmedData] = useState<{ hours: number; timeWindow: string } | null>(null);

  if (!open || !facility) return null;

  const total = facility.pricePerHour * hours;
  const timeWindow = () => {
    const now = new Date();
    const start = new Date(now.getTime() + 30 * 60000);
    const end = new Date(start.getTime() + hours * 60 * 60000);
    return `${start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} – ${end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  };

  const handleConfirm = () => {
    setStep('confirming');
    const tw = timeWindow();
    setTimeout(() => {
      setStep('confirmed');
      setConfirmedData({ hours, timeWindow: tw });
    }, 800);
  };

  const handleDone = () => {
    if (confirmedData) onConfirm(confirmedData);
    setStep('select');
    setHours(1);
    setConfirmedData(null);
    onClose();
  };

  const availableStr = `${facility.availableSpots} available (${facility.evSpots} EV)`;

  const baseColor = 'bg-deep-navy';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-deep-navy/60 backdrop-blur-sm flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="w-full md:max-w-xl md:rounded-3xl rounded-t-3xl bg-background shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-border/40 bg-gradient-to-r from-deep-navy/5 to-action-blue/5">
          <button onClick={onClose} className="absolute left-4 top-4 p-2 hover:bg-muted rounded-full transition-colors" aria-label="Close">
            <ArrowLeft className="w-5 h-5 text-deep-navy" />
          </button>
          {step === 'confirmed' ? (
            <div className="text-center py-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-fresh-teal/15 mb-3">
                <CheckCircle2 className="w-7 h-7 text-fresh-teal" />
              </div>
              <h2 className="text-xl font-bold text-deep-navy">Booking Confirmed</h2>
            </div>
          ) : (
            <div className="text-center py-2">
              <h2 className="text-xl font-bold text-deep-navy">{facility.name}</h2>
              <p className="text-sm text-muted-foreground capitalize">{facility.type}</p>
            </div>
          )}
        </div>

        <div className="px-6 py-5 space-y-5">
          {step === 'select' && (
            <>
              <div className="space-y-3 text-sm text-deep-navy/80">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="font-semibold text-deep-navy">₹{facility.pricePerHour}/hr</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance</span>
                  <span className="font-semibold text-deep-navy">{facility.distanceMeters}m · {facility.walkMinutes}min walk</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating</span>
                  <span className="font-semibold text-deep-navy flex items-center gap-1"><Star className="w-3.5 h-3.5 text-action-blue" /> {facility.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span>Availability</span>
                  <span className="font-semibold text-fresh-teal">{availableStr}</span>
                </div>
              </div>

              <div className="flex gap-2 text-xs text-muted-foreground">
                {facility.covered && <span className="inline-flex items-center gap-1"><Umbrella className="w-3 h-3" /> Covered</span>}
                {facility.secure && <span className="inline-flex items-center gap-1"><Shield className="w-3 h-3" /> Secure</span>}
                {facility.evSpots > 0 && <span className="inline-flex items-center gap-1"><Zap className="w-3 h-3" /> EV Charging</span>}
              </div>

              <div>
                <label className="text-xs font-medium text-deep-navy/70 mb-2 block">Duration</label>
                <div className="flex gap-2">
                  {[1, 2, 3].map((h) => (
                    <button
                      key={h}
                      onClick={() => setHours(h)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition ${hours === h ? 'bg-deep-navy text-white border-deep-navy' : 'bg-card text-deep-navy border-border/60 hover:border-deep-navy/30'}`}
                    >
                      {h} hr{h > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-muted-foreground">Total</div>
                <div className="text-2xl font-bold text-deep-navy">₹{total}</div>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full py-3.5 rounded-xl bg-deep-navy text-white font-semibold text-sm hover:bg-deep-navy/90 active:scale-[0.99] transition shadow-lg shadow-deep-navy/20"
              >
                Confirm Booking
              </button>
            </>
          )}

          {step === 'confirming' && (
            <div className="py-6 text-center space-y-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }}
                className="mx-auto w-12 h-12 rounded-full border-4 border-deep-navy/20 border-t-deep-navy flex items-center justify-center"
              />
              <p className="text-sm text-muted-foreground">Confirming your booking...</p>
            </div>
          )}

          {step === 'confirmed' && confirmedData && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              <div className="bg-deep-navy/5 rounded-2xl p-5 space-y-3 text-sm text-deep-navy/80">
                <div className="flex justify-between font-medium">
                  <span>Booking Reference</span>
                  <span className="font-mono text-deep-navy">PK-{Math.floor(Math.random() * 90000 + 10000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Facility</span>
                  <span className="font-semibold text-deep-navy">{facility.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Address</span>
                  <span className="font-semibold text-deep-navy text-right max-w-[60%]">UB City, MG Road, Bangalore</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Window</span>
                  <span className="font-semibold text-deep-navy">{confirmedData.timeWindow}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-semibold text-deep-navy">{confirmedData.hours} hr{confirmedData.hours > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Paid</span>
                  <span className="font-semibold text-deep-navy">₹{facility.pricePerHour * confirmedData.hours}</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                {/* QR placeholder */}
                <div className="w-40 h-40 bg-card border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-1 shadow-inner">
                  <div className="w-28 h-28 bg-deep-navy rounded-lg relative overflow-hidden">
                    {/* Stylized QR pattern */}
                    <svg viewBox="0 0 56 56" className="w-full h-full text-deep-navy/80" fill="currentColor">
                      <rect x="4" y="4" width="12" height="12" />
                      <rect x="24" y="4" width="6" height="6" />
                      <rect x="36" y="4" width="12" height="12" />
                      <rect x="4" y="18" width="6" height="6" />
                      <rect x="12" y="14" width="6" height="6" />
                      <rect x="24" y="20" width="6" height="6" />
                      <rect x="40" y="18" width="6" height="6" />
                      <rect x="4" y="36" width="12" height="12" />
                      <rect x="20" y="34" width="6" height="6" />
                      <rect x="34" y="36" width="12" height="12" />
                      <rect x="8" y="8" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <rect x="28" y="8" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <rect x="8" y="38" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <rect x="20" y="38" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-deep-navy/50 font-medium">Digital Pass</span>
                </div>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-action-blue text-white font-semibold text-sm hover:bg-action-blue/90 active:scale-[0.99] transition shadow-lg shadow-action-blue/20"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>

                <button
                  onClick={handleDone}
                  className="w-full py-3 rounded-xl bg-deep-navy text-white font-medium text-sm hover:bg-deep-navy/90 active:scale-[0.99] transition shadow-lg shadow-deep-navy/20"
                >
                  Done
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}