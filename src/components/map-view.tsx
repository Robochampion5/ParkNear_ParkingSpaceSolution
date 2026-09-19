import { MotionDiv } from '@/components/motion-div';
import { SkeletonMap } from '@/components/skeleton';
import { useState, useEffect } from 'react';

export function MapView() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);

  if (!loaded) return <SkeletonMap />;

  return (
  return (
    <MotionDiv
      className="aspect-video w-full rounded-xl border border-border/50 bg-muted/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Map view will be implemented here with Mapbox/Leaflet integration
        <br />
        Showing nearby organized parking facilities with real-time availability
      </div>
    </MotionDiv>
  );
}