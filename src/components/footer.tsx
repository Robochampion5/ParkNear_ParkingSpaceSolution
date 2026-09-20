import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-deep-navy/[0.03] mt-auto pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="text-center md:text-left">
            <p className="font-semibold text-deep-navy mb-1">ParkNear — Parking, Reserved.</p>
            <p className="text-xs">Book with certainty. Park without circling.</p>
          </div>
          <div className="flex gap-4 text-xs font-medium">
            <Link href="/privacy" className="text-deep-navy hover:text-action-blue transition-colors">Privacy</Link>
            <Link href="/terms" className="text-deep-navy hover:text-action-blue transition-colors">Terms</Link>
            <a href="mailto:hello@parknnear.in" className="text-deep-navy hover:text-action-blue transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} ParkNear. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
