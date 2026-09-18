import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const earningsData = [
  { month: 'Jan', bookings: 120, revenue: 18000 },
  { month: 'Feb', bookings: 145, revenue: 22000 },
  { month: 'Mar', bookings: 175, revenue: 28000 },
  { month: 'Apr', bookings: 210, revenue: 32000 },
  { month: 'May', bookings: 200, revenue: 31000 },
];

export function EarningsChart() {
  return (
    <div className="bg-card/50 rounded-xl p-5 border border-border/50">
      <h3 className="font-semibold mb-4">Earnings Trend</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563EB"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}