import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Generate mock data for the last 14 days (booking volume)
const generateMockData = () => {
  const data = [];
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    // Mock booking volume: random between 80 and 150, with some pattern
    const bookings = Math.floor(Math.random() * 70) + 80;
    data.push({
      date: `${month} ${day}`,
      bookings,
    });
  }
  return data;
};

const earningsData = generateMockData();

export function EarningsChart() {
  return (
    <div className="bg-card/50 rounded-xl p-5 border border-border/50">
      <h3 className="font-semibold mb-4">Booking Volume (Last 14 Days)</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickMargin={10} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}