"use client";

import { motion } from "framer-motion";

export function SkeletonCard({ lines = 2 }: { lines?: number }) {
  return (
    <div className="bg-card/50 rounded-xl border border-border/50 p-4 space-y-3 shadow-sm">
      <div className="h-4 w-1/3 bg-muted rounded-md animate-pulse" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`h-3 bg-muted/60 rounded-md animate-pulse ${i === 0 ? 'w-5/6' : 'w-4/5'}`} />
      ))}
    </div>
  );
}

export function SkeletonMap() {
  return (
    <div className="aspect-video w-full rounded-xl border border-border/50 bg-muted/50 overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center gap-3">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-2 h-2 rounded-full bg-action-blue/60"
        />
        <span className="text-sm text-muted-foreground">Loading map data...</span>
      </div>
      <div className="absolute bottom-3 right-3 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-muted-foreground border border-border/50 shadow-sm">
        <div className="h-2 w-16 bg-muted rounded animate-pulse" />
        <div className="h-2 w-10 bg-muted/60 rounded animate-pulse mt-1.5" />
      </div>
    </div>
  );
}

export function SkeletonListRow() {
  return (
    <div className="bg-card/50 rounded-xl border border-border/50 p-4 shadow-sm flex gap-4 items-center">
      <div className="w-12 h-12 rounded-lg bg-muted/60 animate-pulse shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-3/5 bg-muted rounded animate-pulse" />
        <div className="h-2.5 w-2/5 bg-muted/60 rounded animate-pulse" />
        <div className="h-2 w-1/4 bg-muted/40 rounded animate-pulse" />
      </div>
      <div className="h-8 w-20 bg-action-blue/20 rounded-lg animate-pulse" />
    </div>
  );
}
