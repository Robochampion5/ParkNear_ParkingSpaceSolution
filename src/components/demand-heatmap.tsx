import { MotionDiv } from '@/components/motion-div';

export function DemandHeatmap() {
  return (
    <MotionDiv
      className="aspect-[3/2] w-full rounded-xl border border-border/50 bg-muted/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Demand heatmap will be implemented here
        <br />
        Showing real-time parking demand vs supply across city zones
      </div>
    </MotionDiv>
  );
}