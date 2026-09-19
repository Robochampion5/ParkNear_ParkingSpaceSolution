import { MotionDiv } from '@/components/motion-div';

export function CityStats() {
  // Mock data for the summary stats
  const totalActiveFacilities = 124; // TODO: replace with actual count from facilities data
  const totalBookingsThisMonth = 2840; // TODO: replace with actual data
  // Formula for CO2 saved:
  //   bookings × avg minutes saved from not circling × emissions factor
  //   Assuming:
  //     avg minutes saved per booking = 15 minutes (0.25 hours)
  //     emissions factor = 0.00022 tons CO2 per minute of idling (example value, adjust as needed)
  //   So: totalBookingsThisMonth * 15 * 0.00022 = totalBookingsThisMonth * 0.0033
  const estimatedCo2Saved = Math.round(totalBookingsThisMonth * 0.0033 * 10) / 10; // 1 decimal place

  return (
    <MotionDiv
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Active Facilities */}
        <div className="bg-card/70 rounded-xl p-4 border border-border/50">
          <div className="text-sm font-medium text-muted-foreground mb-1">
            Total Active Facilities
          </div>
          <div className="text-2xl font-bold text-action-blue">
            {totalActiveFacilities.toLocaleString()}
          </div>
        </div>

        {/* Total Bookings This Month */}
        <div className="bg-card/70 rounded-xl p-4 border border-border/50">
          <div className="text-sm font-medium text-muted-foreground mb-1">
            Total Bookings This Month
          </div>
          <div className="text-2xl font-bold text-fresh-teal">
            {totalBookingsThisMonth.toLocaleString()}
          </div>
        </div>

        {/* Estimated CO2 Saved */}
        <div className="bg-card/70 rounded-xl p-4 border border-border/50">
          <div className="text-sm font-medium text-muted-foreground mb-1">
            Estimated CO₂ Saved
          </div>
          <div className="text-2xl font-bold text-fresh-teal">
            {estimatedCo2Saved.toLocaleString()} tons
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}