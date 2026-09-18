import { useState } from 'react';

export function HostForm() {
  const [formData, setFormData] = useState({
    address: '',
    price: '',
    capacity: '',
    hasEV: false,
    availability: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Host form submitted:', formData);
    alert('Facility listed successfully! (Feature coming soon)');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground block mb-1">
          Facility Address
        </label>
        <input
          type="text"
          placeholder="Enter facility address..."
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          className="w-full px-4 py-3 rounded-xl border border-input/50 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground block mb-1">
            Price per hour (₹)
          </label>
          <input
            type="number"
            placeholder="e.g., 150"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-input/50 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground block mb-1">
            Total Capacity
          </label>
          <input
            type="number"
            placeholder="Number of spots"
            value={formData.capacity}
            onChange={(e) => setFormData({...formData, capacity: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-input/50 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-muted-foreground">
          <input
            type="checkbox"
            checked={formData.hasEV}
            onChange={(e) => setFormData({...formData, hasEV: e.target.checked})}
            className="h-4 w-4 text-action-blue focus:ring-action-blue border-gray-300 rounded"
          />
          <span className="ml-2">EV Charging Available</span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground block mb-1">
          Availability Schedule
        </label>
        <input
          type="text"
          placeholder="e.g., Mon-Fri 6PM-11PM, Weekends 8AM-10PM"
          value={formData.availability}
          onChange={(e) => setFormData({...formData, availability: e.target.value})}
          className="w-full px-4 py-3 rounded-xl border border-input/50 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-3 rounded-xl bg-action-blue text-white font-medium hover:bg-action-blue/90 transition-colors"
      >
        List Facility
      </button>
    </form>
  );
}