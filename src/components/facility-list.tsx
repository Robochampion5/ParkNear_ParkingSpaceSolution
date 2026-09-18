import { MotionDiv } from '@/components/motion-div';

export function FacilityList() {
  return (
    <MotionDiv
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-card/50 rounded-xl p-4 border border-border/50">
        <h3 className="font-semibold mb-2">Nearby Facilities</h3>
        <p className="text-sm text-muted-foreground">
          Facility listings will appear here with real-time availability and pricing
        </p>
      </div>

      {/* Placeholder for facility cards */}
      <div className="space-y-3">
        <div className="bg-card/70 rounded-lg p-3 border border-border/50">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">City Center Parking</h4>
              <p className="text-xs text-muted-foreground mt-1">0.2 mi away • ₹150/hr</p>
            </div>
            <span className="px-2 py-0.5 text-xs rounded-full bg-fresh-teal/20 text-fresh-teal">
              8/20 Spots
            </span>
          </div>
          <div className="flex mt-2 space-x-2">
            <span className="text-xs bg-action-blue/20 text-action-blue rounded">
              EV Charging
            </span>
            <span className="text-xs bg-warm-amber/20 text-warm-amber rounded">
              Covered
            </span>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}