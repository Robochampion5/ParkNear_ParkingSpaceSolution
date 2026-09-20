"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, Sparkles } from 'lucide-react';

export default function HostForm() {
  const [step, setStep] = useState<'details' | 'pricing'>('details');
  const [form, setForm] = useState({
    address: '',
    type: 'underground lot',
    capacity: '',
    ev: false,
    evCount: '',
    price: '',
    photo: '',
    days: [] as string[],
    start: '08:00',
    end: '22:00',
  });
  const [pricing, setPricing] = useState<{ suggestedPrice: number; reason: string } | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [listed, setListed] = useState(false);
  const [suggestionAccepted, setSuggestionAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (d: string) => setForm(prev => ({ ...prev, days: prev.days.includes(d) ? prev.days.filter(x => x !== d) : [...prev.days, d] }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setForm(prev => ({ ...prev, photo: reader.result as string }));
    reader.readAsDataURL(f);
  };

  const callGemini = async () => {
    setLoadingPrice(true);
    setPricing(null);
    try {
      const res = await fetch('/api/gemini-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: form.address,
          type: form.type,
          capacity: form.capacity,
          nearbyDemandContext: 'high office traffic near UB City',
        }),
      });
      const data = await res.json();
      setPricing(data);
    } catch {
      setPricing({ suggestedPrice: 45, reason: 'Standard pricing for this capacity and area.' });
    } finally {
      setLoadingPrice(false);
    }
  };

  const handleAccept = () => {
    if (pricing) {
      setForm(prev => ({ ...prev, price: String(pricing.suggestedPrice) }));
      setSuggestionAccepted(true);
    }
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.address.trim()) next.address = 'Address is required';
    if (!form.capacity.trim()) next.capacity = 'Capacity is required';
    else if (Number(form.capacity) <= 0) next.capacity = 'Capacity must be positive';
    if (form.ev && Number(form.evCount) <= 0) next.evCount = 'EV spots must be positive';
    if (step === 'pricing' && !form.price.trim()) next.price = 'Price is required';
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      setErrors({ bot: 'Spam detected' });
      return;
    }
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    if (step === 'details') {
      setStep('pricing');
      callGemini();
    } else {
      setListed(true);
    }
  };

  const avgHours = 3.5;
  const earnings = Math.round(Number(form.price) * avgHours * 30);

  if (listed) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
        <div className="bg-card rounded-2xl border border-border/60 shadow-lg shadow-deep-navy/5 p-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-fresh-teal/15">
            <CheckCircle className="w-8 h-8 text-fresh-teal" />
          </div>
          <h2 className="text-2xl font-bold text-deep-navy">Space Listed</h2>
          <div className="text-sm text-muted-foreground">Your parking space is live.</div>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-6 space-y-4 shadow-sm">
          <h3 className="font-semibold text-deep-navy">Estimated Monthly Earnings</h3>
          <div className="text-4xl font-extrabold text-deep-navy">₹{earnings.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">Based on ₹{form.price}/hr × ~{avgHours} hrs/day × 30 days.</p>
        </div>
        <button onClick={() => { setListed(false); setStep('details'); setForm(prev => ({ ...prev, price: '', photo: '', days: [], address: '', capacity: '', ev: false, evCount: '', type: 'underground lot' })); setSuggestionAccepted(false); }} className="w-full py-3 rounded-xl bg-deep-navy text-white font-medium hover:bg-deep-navy/90 transition">List Another Space</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <input name="website" type="text" autoComplete="off" tabIndex={-1} value={honeypot} onChange={e => setHoneypot(e.target.value)} />
      </div>
      {step === 'details' && (
        <>
          <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 space-y-5">
            <h2 className="text-xl font-bold text-deep-navy">List your parking space</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium text-deep-navy">Address</label>
              <input required value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-blue/30" placeholder="e.g., Lavelle Road Building, Bengaluru" />
              {errors.address && <p className="text-xs text-red-600 font-medium">{errors.address}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-deep-navy">Facility Type</label>
                <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm">
                  <option>underground lot</option><option>office building lot</option><option>mall parking structure</option><option>gated residential lot</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-deep-navy">Total Capacity (spots)</label>
                <input type="number" required value={form.capacity} onChange={e => setForm(p => ({ ...p, capacity: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm" placeholder="e.g., 60" />
              </div>
            </div>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 text-sm font-medium text-deep-navy cursor-pointer">
                <input type="checkbox" checked={form.ev} onChange={e => setForm(p => ({ ...p, ev: e.target.checked }))} className="h-4 w-4 rounded border-input text-action-blue focus:ring-action-blue" />
                EV Charging
              </label>
              {form.ev && (
                <input type="number" value={form.evCount} onChange={e => setForm(p => ({ ...p, evCount: e.target.value }))} className="w-24 px-3 py-2 rounded-lg border border-input bg-background text-sm" placeholder="EV spots" />
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-deep-navy block mb-2">Photo</label>
              <button type="button" onClick={() => fileRef.current?.click()} className="w-full border-2 border-dashed border-border/60 rounded-2xl p-6 text-center hover:border-action-blue/40 transition-colors">
                {form.photo ? <img src={form.photo} alt="preview" className="mx-auto rounded-xl max-h-32 object-cover" /> : <><Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" /><p className="text-sm text-muted-foreground">Click to upload photo</p></>}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              </button>
            </div>
            <div>
              <label className="text-sm font-medium text-deep-navy block mb-2">Availability Schedule</label>
              <div className="flex gap-2 mb-3 flex-wrap">
                {days.map(d => (
                  <button type="button" key={d} onClick={() => toggleDay(d)} className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${form.days.includes(d) ? 'bg-deep-navy text-white' : 'bg-muted text-muted-foreground hover:bg-muted/70'}`}>{d}</button>
                ))}
              </div>
              <div className="flex gap-3">
                <div><label className="text-xs text-muted-foreground">Start</label><input type="time" value={form.start} onChange={e => setForm(p => ({ ...p, start: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" /></div>
                <div><label className="text-xs text-muted-foreground">End</label><input type="time" value={form.end} onChange={e => setForm(p => ({ ...p, end: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" /></div>
              </div>
            </div>
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-action-blue text-white font-medium hover:bg-action-blue/90 transition shadow-lg shadow-action-blue/20">Continue to Pricing</button>
        </>
      )}

      {step === 'pricing' && (
        <>
          {loadingPrice && (
            <div className="flex items-center gap-3 p-4 bg-card rounded-2xl border border-border/60 shadow-sm">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, ease: 'linear', repeat: Infinity }} className="w-6 h-6 rounded-full border-2 border-deep-navy/20 border-t-deep-navy" />
              <span className="text-sm text-muted-foreground">Analyzing nearby demand...</span>
            </div>
          )}
          {pricing && !loadingPrice && (
            <div className="bg-gradient-to-br from-deep-navy/[0.06] to-action-blue/[0.06] rounded-2xl border border-border/60 shadow-sm p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-warm-amber" />
                <h3 className="font-bold text-deep-navy">Gemini Pricing Suggestion</h3>
              </div>
              <div className="text-3xl font-extrabold text-deep-navy">₹{pricing.suggestedPrice}/hr</div>
              <p className="text-sm text-deep-navy/70">{pricing.reason}</p>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={handleAccept} className={`flex-1 py-2.5 rounded-xl font-medium text-sm border transition ${suggestionAccepted ? 'bg-fresh-teal text-white border-fresh-teal' : 'bg-deep-navy text-white border-deep-navy hover:bg-deep-navy/90'}`}>{suggestionAccepted ? 'Accepted' : 'Accept Suggestion'}</button>
                <button type="button" onClick={() => setForm(p => ({ ...p, price: String(pricing.suggestedPrice) }))} className="flex-1 py-2.5 rounded-xl font-medium text-sm border border-border/60 text-deep-navy hover:bg-muted transition">Keep My Price</button>
              </div>
            </div>
          )}
          <div className="bg-card rounded-2xl border border-border/60 p-6 space-y-4 shadow-sm">
            <h3 className="font-semibold text-deep-navy">Your Pricing</h3>
            <div className="flex gap-3 items-center">
              <span className="text-sm text-muted-foreground">Price per hour (₹)</span>
              <input required type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} className="w-32 px-3 py-2 rounded-lg border border-input bg-background text-sm font-medium" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-deep-navy text-white font-medium hover:bg-deep-navy/90 transition shadow-lg shadow-deep-navy/20">List Space</button>
          </div>
        </>
      )}
    </form>
  );
}
