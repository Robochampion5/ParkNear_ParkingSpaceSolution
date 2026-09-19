import { DemandHeatmap } from '@/components/demand-heatmap';
import { CityStats } from '@/components/city-stats';
import { FlaggedQueue } from '@/components/flagged-queue';
import { EarningsChart } from '@/components/earnings-chart';
import { EmptyFlagged } from '@/components/empty-states';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="bg-card/50 rounded-xl p-6 border border-border/50">
        <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of parking demand, supply, and system health across the city.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-card/50 rounded-xl p-5 border border-border/50">
            <CityStats />
          </div>
          <div className="bg-card/50 rounded-xl p-5 border border-border/50">
            <DemandHeatmap />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-card/50 rounded-xl p-5 border border-border/50">
            <FlaggedQueue />
          </div>
          <div className="bg-card/50 rounded-xl p-5 border border-border/50">
            <EarningsChart />
          </div>
        </div>
      </div>
    </div>
  );
}