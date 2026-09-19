import { HostForm } from '@/components/host-form';
import { HostListings } from '@/components/host-listings';

export default function HostDashboard() {
  return (
    <div className="space-y-8">
      <div className="bg-card/50 rounded-xl p-6 border border-border/50 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Host Dashboard</h2>
        <p className="text-muted-foreground">
          List your parking space and manage your bookings dashboard.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
        <div className="bg-card/50 rounded-xl p-5 border border-border/50">
          <HostForm />
        </div>
        <div className="bg-card/50 rounded-xl p-5 border border-border/50">
          <HostListings />
        </div>
      </div>
    </div>
  );
}