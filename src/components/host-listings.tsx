import { MotionDiv } from '@/components/motion-div';

export function HostListings() {
  return (
    <MotionDiv
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-card/50 rounded-xl p-4 border border-border/50">
        <h3 className="font-semibold mb-2">Your Listings</h3>
        <p className="text-sm text-muted-foreground">
          Your active parking facility listings will appear here
        </p>
      </div>

      {/* Placeholder for host listings */}
      <div className="space-y-3">
        <div className="bg-card/70 rounded-lg p-3 border border-border/50">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">Office Building Lot</h4>
              <p className="text-xs text-muted-foreground mt-1">₹180/hr • 12/25 spots</p>
            </div>
            <span className="px-2 py-0.5 text-xs rounded-full bg-fresh-teal/20 text-fresh-teal">
              Active
            </span>
          </div>
          <div className="flex mt-2 space-x-2 text-xs">
            <span>Today: ₹2,160</span>
            <span>Week: ₹15,120</span>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}