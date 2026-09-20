"use client";

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast: 'bg-card border border-border/60 shadow-lg text-deep-navy',
          description: 'text-sm text-muted-foreground',
          actionButton: 'bg-deep-navy text-white hover:bg-deep-navy/90',
          cancelButton: 'bg-muted text-deep-navy hover:bg-muted/80',
        },
        duration: 4000,
        style: {
          borderRadius: '1rem',
        },
      }}
    />
  );
}