export interface Booking {
  id: string;
  facilityId: string;
  facilityName: string;
  address: string;
  lat: number;
  lng: number;
  pricePerHour: number;
  hours: number;
  bookedAt: string; // ISO timestamp
  timeWindow: string; // e.g., "2:00 PM – 5:00 PM"
  status: 'upcoming' | 'completed' | 'cancelled';
}

const STORAGE_KEY = 'parknb_bookings';

export function getBookings(): Booking[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBooking(b: Booking) {
  if (typeof window === 'undefined') return;
  const current = getBookings();
  current.push(b);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

export function getBooking(id: string): Booking | undefined {
  return getBookings().find(b => b.id === id);
}
