import { useState } from 'react';

export function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search filters facilities by name, type, and distance
    console.log('Searching for:', query);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a destination (e.g., UB City, MG Road)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-input/50 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-3 rounded-xl bg-action-blue text-white font-medium hover:bg-action-blue/90 transition-colors"
      >
        Search Parking
      </button>
    </form>
  );
}