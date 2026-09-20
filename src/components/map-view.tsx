"use client";

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

  // Check for Mapbox token
  const token = typeof window !== 'undefined' && import.meta.env?.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!token) {
    return (
      <MotionDiv
        className="aspect-video w-full rounded-xl border border-border/50 bg-muted/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex h-full items-center justify-center text-center p-8">
          <div className="bg-deep-navy/20 rounded-xl p-6 border border-deep-navy/30 max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold text-deep-navy mb-2">Map Temporarily Unavailable</h3>
            <p className="text-muted-foreground mb-4">
              Add your NEXT_PUBLIC_MAPBOX_TOKEN to .env.local to enable the interactive map.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-deep-navy text-white font-medium hover:bg-deep-navy/90 transition-all"
            >
              Reload after adding token
            </button>
          </div>
        </div>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv
      className="h-full w-full rounded-xl border border-border/50 bg-muted/50 overflow-hidden relative"
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
