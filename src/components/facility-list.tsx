import { facilities } from '@/data/facilities';
import { DiscoveryCard } from '@/components/discovery/discovery-card';
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
      <div className="bg-card/50 rounded-xl p-5 border border-border/50">
        <h3 className="font-semibold mb-4">Discover Parking</h3>
        <p className="text-sm text-muted-foreground">
          Real-time availability and pricing for verified parking spots nearby
        </p>
      </div>

      <div className="space-y-4">
        {facilities.map(f => (
          <DiscoveryCard key={f.id} f={f} />
        ))}
      </div>
    </MotionDiv>
  );
}
