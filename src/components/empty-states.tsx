import { Search, CalendarDays, AlertTriangle, PackageOpen } from "lucide-react";

export function EmptyBookings() {
  return (
    <div className="bg-card/50 rounded-2xl border border-border/60 p-8 text-center space-y-4 shadow-sm">
      <div className="mx-auto w-14 h-14 rounded-full bg-deep-navy/8 flex items-center justify-center">
        <CalendarDays className="w-7 h-7 text-deep-navy/40" />
      </div>
      <h3 className="font-semibold text-deep-navy">No bookings yet</h3>
      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
        Your parking reservations will appear here once you book a spot.
      </p>
    </div>
  );
}

export function EmptyListings() {
  return (
    <div className="bg-card/50 rounded-2xl border border-border/60 p-8 text-center space-y-4 shadow-sm">
      <div className="mx-auto w-14 h-14 rounded-full bg-fresh-teal/10 flex items-center justify-center">
        <PackageOpen className="w-7 h-7 text-fresh-teal" />
      </div>
      <h3 className="font-semibold text-deep-navy">No listings yet</h3>
      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
        List your space and start earning. It takes less than a minute.
      </p>
    </div>
  );
}

export function EmptyFlagged() {
  return (
    <div className="bg-card/50 rounded-2xl border border-border/60 p-8 text-center space-y-4 shadow-sm">
      <div className="mx-auto w-14 h-14 rounded-full bg-warm-amber/10 flex items-center justify-center">
        <AlertTriangle className="w-7 h-7 text-warm-amber/70" />
      </div>
      <h3 className="font-semibold text-deep-navy">All clear</h3>
      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
        No flagged items requiring review at this time.
      </p>
    </div>
  );
}

export function EmptySearch() {
  return (
    <div className="bg-card/50 rounded-2xl border border-border/60 p-8 text-center space-y-4 shadow-sm">
      <div className="mx-auto w-14 h-14 rounded-full bg-action-blue/8 flex items-center justify-center">
        <Search className="w-7 h-7 text-action-blue/50" />
      </div>
      <h3 className="font-semibold text-deep-navy">No results found</h3>
      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
        Try a different destination or expand the search area.
      </p>
    </div>
  );
}
