import { Facility } from '@/data/facilities';
import { MapPin, Clock, Star, Umbrella, Shield, Zap, ArrowRight } from 'lucide-react';

export function DiscoveryCard({ f }: { f: Facility }) {
  const pct = Math.round((f.availableSpots / f.totalSpots) * 100);
  let statusColor = 'bg-warm-amber/20 text-warm-amber';
  let statusLabel = 'Moderate';
  if (pct >= 40) {
    statusColor = 'bg-fresh-teal/20 text-fresh-teal';
    statusLabel = 'High Availability';
  } else if (pct <= 10) {
    statusColor = 'bg-deep-navy/20 text-deep-navy';
    statusLabel = 'Low Availability';
  }

  // Rating stars (max 5)
  const ratingStars = Array(Math.floor(f.rating)).fill(0);
  const hasHalfStar = f.rating % 1 >= 0.5;

  return (
    <div className="group relative bg-card rounded-2xl border border-border/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Decorative top layer with subtle gradient */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-navy/5 via-action-blue/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="relative p-6 space-y-5">
        {/* Status badge */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-deep-navy" />
          <span className={`text-xs font-medium text-deep-navy/60 ${statusColor} px-2.5 py-0.5 rounded`}>
            {statusLabel}
          </span>
        </div>

        {/* Main content */}
        <div className="space-y-4">
          {/* Top row: name and rating */}
          <div className="flex items-baseline justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-deep-navy tracking-tight">{f.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 capitalize">{f.type}</p>
            </div>
            <div className="flex items-baseline gap-2 text-sm">
              {ratingStars.map((_, i) => (
                <Star key={i} className="w-4 h-4 text-action-blue" />
              ))}
              {hasHalfStar && (
                <Star className="w-4 h-4 text-action-blue" />
              )}
              <span className="text-deep-navy/60">({f.rating.toFixed(1)})</span>
            </div>
          </div>

          {/* Price and distance */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-deep-navy/90">
              <MapPin className="w-4 h-4 text-action-blue shrink-0" />
              <span>{f.distanceMeters}m · {f.walkMinutes}min walk</span>
            </div>
            <div className="flex items-center gap-2 text-deep-navy/90">
              <Clock className="w-4 h-4 text-action-blue shrink-0" />
              <span className="font-semibold">₹{f.pricePerHour}/hr</span>
            </div>
          </div>

          {/* Availability and spots */}
          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
            <span className="bg-deep-navy/[0.06] text-deep-navy px-2 py-0.5 rounded-md">
              {f.totalSpots} spots
            </span>
            <span className={`font-semibold px-3 py-1 rounded ${statusColor.replace('/20', '')}`}>
              {f.availableSpots} avail.
            </span>
            {f.evSpots > 0 && (
              <span className="text-deep-navy/70">EV: {f.evSpots}</span>
            )}
          </div>

          {/* Amenities */}
          <div className="flex items-center gap-3 pt-1 text-xs">
            {f.covered && (
              <span className="inline-flex items-center gap-1 text-deep-navy/60">
                <Umbrella className="w-3 h-3" /> Covered
              </span>
            )}
            {f.secure && (
              <span className="inline-flex items-center gap-1 text-deep-navy/60">
                <Shield className="w-3 h-3" /> Secure
              </span>
            )}
            {f.evSpots > 0 && (
              <span className="inline-flex items-center gap-1 text-deep-navy/60">
                <Zap className="w-3 h-3" /> EV Charging
              </span>
            )}
          </div>
        </div>

        {/* Action button */}
        <button className="w-full mt-2 py-3 rounded-xl bg-deep-navy text-white font-medium text-sm hover:bg-deep-navy/90 active:scale-[0.99] transition flex items-center justify-center gap-2 shadow-lg shadow-deep-navy/20">
          Book spot <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}