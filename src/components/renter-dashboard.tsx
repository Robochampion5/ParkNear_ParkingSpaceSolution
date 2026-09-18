import { SearchBar } from '@/components/search-bar';
import { MapView } from '@/components/map-view';
import { FacilityList } from '@/components/facility-list';

export default function RenterDashboard() {
  return (
    <div className="space-y-8">
      <div className="bg-card/50 rounded-xl p-6 border border-border/50">
        <h2 className="text-2xl font-semibold mb-4">Find Parking</h2>
        <p className="text-muted-foreground">
          Search for parking spots near your destination and book with confidence.
        </p>
        <SearchBar />
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="bg-card/50 rounded-xl p-5 border border-border/50">
          <MapView />
        </div>
        <div className="bg-card/50 rounded-xl p-5 border border-border/50">
          <FacilityList />
        </div>
      </div>
    </div>
  );
}