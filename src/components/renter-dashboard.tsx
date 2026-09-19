"use client";

import { useState } from 'react';
import { SearchBar } from '@/components/search-bar';
import { MapView } from '@/components/map-view';
import { FacilityList } from '@/components/facility-list';
import { Facility } from '@/data/facilities';
import BookingModal from '@/components/booking-modal';
import { getBookings, saveBooking } from '@/lib/bookings';
import { CalendarDays, Clock } from 'lucide-react';
import { EmptyBookings } from './empty-states';
import { SkeletonListRow } from './skeleton';

export default function RenterDashboard() {
  const [openFacility, setOpenFacility] = useState<Facility | null>(null);
  const [showBookings, setShowBookings] = useState(false);
  const [bookingsRefresh, setBookingsRefresh] = useState(0);
  const bookings = getBookings();

  const handleConfirm = (data: { hours: number; timeWindow: string }) => {
    if (!openFacility) return;
    saveBooking({
      id: `PK-${Math.floor(Math.random() * 90000 + 10000)}`,
      facilityId: openFacility.id,
      facilityName: openFacility.name,
      address: 'UB City, MG Road, Bangalore',
      lat: openFacility.lat,
      lng: openFacility.lng,
      pricePerHour: openFacility.pricePerHour,
      hours: data.hours,
      bookedAt: new Date().toISOString(),
      timeWindow: data.timeWindow,
      status: 'upcoming',
    });
    setBookingsRefresh(r => r + 1);
    setOpenFacility(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-card/50 rounded-xl p-6 border border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Find Parking</h2>
          <p className="text-muted-foreground">Search for parking spots near your destination and book with confidence.</p>
        </div>
        <button
          onClick={() => setShowBookings(!showBookings)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-deep-navy/10 text-deep-navy font-medium text-sm hover:bg-deep-navy/20 transition-colors"
        >
          <CalendarDays className="w-4 h-4" />
          {showBookings ? 'Hide' : 'My Bookings'}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="bg-card/50 rounded-xl p-5 border border-border/50 shadow-sm">
          <MapView />
        </div>
        <div className="space-y-5">
          <div className="bg-card/50 rounded-xl p-5 border border-border/50">
            <h3 className="font-semibold mb-3">Discover Parking</h3>
            <SearchBar />
          </div>
          <FacilityList onBook={setOpenFacility} />
        </div>
      </div>

      {showBookings && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h3 className="text-xl font-bold text-deep-navy mb-4">My Bookings</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bookings.length === 0 ? <EmptyBookings /> : (
              bookings.map((b) => (
                <div key={b.id + bookingsRefresh} className="bg-card rounded-2xl border border-border/60 shadow-sm p-5 space-y-3 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-deep-navy">{b.facilityName}</h4>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${b.status === 'upcoming' ? 'bg-fresh-teal/20 text-fresh-teal' : 'bg-deep-navy/10 text-deep-navy'}`}>
                      {b.status}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">{b.address}</div>
                  <div className="flex items-center gap-3 text-sm text-deep-navy/80">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-action-blue" /> {b.timeWindow}</span>
                    <span>· {b.hours} hr{b.hours > 1 ? 's' : ''}</span>
                  </div>
                  <div className="text-sm font-semibold text-deep-navy">₹{b.pricePerHour * b.hours}</div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-action-blue hover:underline font-medium"
                  >
                    Get Directions →
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <BookingModal
        facility={openFacility!}
        open={!!openFacility}
        onClose={() => setOpenFacility(null)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
