import { MotionDiv } from '@/components/motion-div';

export function FlaggedQueue() {
  return (
    <MotionDiv
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-card/50 rounded-xl p-5 border border-border/50">
        <h3 className="font-semibold mb-4">Flagged Items</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Items requiring review from hosts or renters
        </p>
        <div className="space-y-3">
          <div className="bg-card/70 rounded-lg p-4 border border-border/50">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-medium">Host Reliability Concern</h4>
                <p className="text-sm text-muted-foreground">
                  Facility: MG Road Complex • Issue: Schedule discrepancy
                </p>
              </div>
              <span className="px-2 py-0.5 text-xs rounded-full bg-warm-amber/20 text-warm-amber">
                Review
              </span>
            </div>
          </div>

          <div className="bg-card/70 rounded-lg p-4 border border-border/50">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-medium">Overstay Dispute</h4>
                <p className="text-sm text-muted-foreground">
                  User: John D. • Facility: UB City Lot
                </p>
              </div>
              <span className="px-2 py-0.5 text-xs rounded-full bg-warm-amber/20 text-warm-amber">
                Review
              </span>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}