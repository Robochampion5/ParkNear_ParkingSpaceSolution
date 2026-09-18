import { MotionDiv } from '@/components/motion-div';

export function CityStats() {
  return (
    <MotionDiv
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-card/50 rounded-xl p-5 border border-border/50">
        <h3 className="font-semibold mb-4">City Statistics</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-card/70 rounded-xl p-4 border border-border/50">
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Total Facilities
            </div>
            <div className="text-2xl font-bold text-action-blue">
              124
            </div>
          </div>

          <div className="bg-card/70 rounded-xl p-4 border border-border/50">
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Active Bookings
            </div>
            <div className="text-2xl font-bold text-fresh-teal">
              2,840
            </div>
          </div>

          <div className="bg-card/70 rounded-xl p-4 border border-border/50">
            <div className="text-sm font-medium text-muted-foreground mb-1">
              EV Spots Available
            </div>
            <div className="text-2xl font-bold text-warm-amber">
              186
            </div>
          </div>

          <div className="bg-card/70 rounded-xl p-4 border border-border/50">
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Estimated CO₂ Saved
            </div>
            <div className="text-2xl font-bold text-fresh-teal">
              12.4 tons
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}