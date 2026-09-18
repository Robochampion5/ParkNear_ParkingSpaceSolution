import { useSearchParams } from 'next/navigation';
import RenterDashboard from '@/components/renter-dashboard';
import HostDashboard from '@/components/host-dashboard';
import AdminDashboard from '@/components/admin-dashboard';

export default function Dashboard() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') as 'Renter' | 'Host' | 'Admin' | null;

  switch (role) {
    case 'Renter':
      return <RenterDashboard />;
    case 'Host':
      return <HostDashboard />;
    case 'Admin':
      return <AdminDashboard />;
    default:
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Please select a role</h2>
            <p className="text-muted-foreground">
              Use the role switcher in the navigation bar to choose between Renter, Host, or Admin dashboard.
            </p>
          </div>
        </div>
      );
  }
}