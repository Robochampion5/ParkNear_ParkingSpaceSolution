import { Search, Compass } from 'lucide-react';
import { EmptySearch } from './empty-states';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="bg-deep-navy/[0.06] rounded-full w-24 h-24 flex items-center justify-center mb-6">
        <Compass className="w-12 h-12 text-deep-navy/40" />
      </div>
      <h1 className="text-6xl font-extrabold text-deep-navy mb-2 tracking-tight">404</h1>
      <h2 className="text-2xl font-bold text-deep-navy mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        We could not find the page you are looking for. Head back to discover parking near UB City, MG Road.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-deep-navy text-white font-medium hover:bg-deep-navy/90 transition shadow-lg shadow-deep-navy/20"
      >
        <Search className="w-4 h-4" />
        Back to Discovery
      </a>
    </div>
  );
}
