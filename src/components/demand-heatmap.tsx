import { MotionDiv } from '@/components/motion-div';
import demandData from '@/data/demand.json';

type DemandGridItem = {
  label: string;
  values: number[];
};

type DemandData = {
  UB_CITY_COORDS: { lat: number; lng: number };
  demandGrid: DemandGridItem[];
  timeLabels: string[];
};

const DemoData = demandData as DemandData;

/**
 * Returns an RGB color string for a demand value (0-100) using smooth interpolation:
 *   0  -> green (#10B981)
 *   50 -> yellow (#FBBF24)
 *   100-> red  (#EF4444)
 */
function getColorForValue(value: number): string {
  // Clamp value between 0 and 100
  const clamped = Math.max(0, Math.min(100, value));
  if (clamped < 50) {
    // Interpolate between green and yellow
    const ratio = clamped / 50;
    const r = Math.round(16 + (251 - 16) * ratio); // 10B981 -> FBBF24: r: 16->251
    const g = Math.round(185 + (191 - 185) * ratio); // g: 185->191
    const b = Math.round(129 + (36 - 129) * ratio); // b: 129->36
    return `rgb(${r},${g},${b})`;
  } else {
    // Interpolate between yellow and red
    const ratio = (clamped - 50) / 50;
    const r = Math.round(251 + (239 - 251) * ratio); // r: 251->239
    const g = Math.round(191 + (36 - 191) * ratio); // g: 191->36
    const b = Math.round(24 + (68 - 24) * ratio); // b: 24->68
    return `rgb(${r},${g},${b})`;
  }
}

export default function DemandHeatmap() {
  return (
    <MotionDiv
      className="aspect-[3/2] w-full rounded-xl border border-border/50 bg-muted/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <h3 className="font-semibold mb-4">Demand Heatmap</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
                {DemoData.timeLabels.map((label, idx) => (
                  <th key={idx} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DemoData.demandGrid.map((row, rowIdx) => (
                <tr key={rowIdx} className="border-t">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {row.label}
                  </th>
                  {row.values.map((val, colIdx) => (
                    <td
                      key={colIdx}
                      className={`
                        px-4 py-3 text-center
                        transition-all duration-200
                        hover:scale-105
                      `}
                      style={{
                        backgroundColor: getColorForValue(val),
                        // Ensure text contrast: white on dark backgrounds, black on light
                        color:
                          // Calculate luminance: 0.299*R + 0.587*G + 0.114*B
                          // If luminance > 128, use black text; else white text
                          (() => {
                            const match = getColorForValue(val).match(/rgb\((\d+), (\d+), (\d+)\)/);
                            if (!match) return '#000';
                            const r = parseInt(match[1]);
                            const g = parseInt(match[2]);
                            const b = parseInt(match[3]);
                            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
                            return luminance > 128 ? '#000' : '#fff';
                          })()
                      }}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2 w-6" style={{ backgroundColor: getColorForValue(0) }}></div>
            <span>Low Demand</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-6" style={{ backgroundColor: getColorForValue(50) }}></div>
            <span>Medium Demand</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-6" style={{ backgroundColor: getColorForValue(100) }}></div>
            <span>High Demand</span>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}