# ParkNear — Parking, Reserved.

Greenfield parking-space app (Next.js 15 App Router, TypeScript, Tailwind, shadcn/ui). Design tokens: deep-navy `#0F172A`, fresh-teal `#10B981`, warm-amber `#F59E0B`, action-blue `#2563EB`.

## Live Demo Script (60–90 seconds)

Follow this order — it mirrors the pitch Q&A sequence.

1. **Renter — Search & Book (0:00–0:15)**
   - Open the app, choose **Renter**.
   - Type a destination (e.g. "UB City, MG Road") in the search bar and hit Search.
   - Click **Book** on the top result (UB City Underground, 18 spots available, ₹45/hr).
   - Confirm the booking; show the confirmation card with time window and directions link.

2. **Host — List & Price (0:15–0:35)**
   - Switch to **Host** via the tab switcher.
   - Fill the listing form: address (e.g. Lavelle Road), capacity (~60 spots), choose "underground lot".
   - Toggle **EV Charging**, upload a photo, set available days, and click **Continue to Pricing**.
   - Watch the Gemini pricing card load (spinner + sparkle → suggested ₹45/hr with reason).
   - Accept or adjust the price, then **List Space**. The earnings card shows ~₹4,725/mo (3.5 hrs/day × 30 days).

3. **Admin — Demand Heatmap & Alert (0:35–0:55)**
   - Switch to **Admin**.
   - Point to the **Demand Heatmap** (7-day × 6-bucket grid) — red cells = Friday evening peak (95), green = Sunday morning (10).
   - Note the **Gemini Demand Alert** card (amber-flagged zone): automatic alert for high evening demand near MG Road.
   - Show the summary stat cards: 124 facilities, 2,840 active bookings, 186 EV spots, 12.4 tons CO₂ saved (formula: bookings × avg minutes saved × emissions factor — commented in `city-stats.tsx`).

4. **Handoffs — Simulation (0:55–1:15)**
   - Click **Demo Handoffs** from the landing or role tab.
   - Walk through 5 guided steps: timeline with 5–10 min buffer → Renter A late → Renter B gets notification (Wait / Switch) → resolve via either path → overstay (only past grace period) with animated charge + reliability score.

5. **Close / Q&A (1:15–1:30)**
   - Return to landing. Confirm all three roles, the Gemini pricing + demand APIs, preserved facilities dataset, and the interactive handoff mechanism.

## Data

- `src/data/facilities.json` — 9 facilities + `UB_CITY_COORDS` (12.9724, 77.5968)
- `src/data/demand.json` — 7×6 intensity grid (0–100) + time labels
- `f4` (Residency Road Gated Lot) = fully booked (`availableSpots: 0`) for demo of "suggest nearest alternative"

## Build / Deploy

```bash
npm install
npm run build      # outputs static to ./out/ (clean, 0 errors)
# For live deployment (needs auth):
# vercel --prod  (project linked via vercel login)
```

The site builds to static HTML with 2 dynamic API routes (`gemini-price`, `gemini-demand`). Both fall back to demo content if `GEMINI_API_KEY` is missing or the call times out.

## Design Notes

- Font: Inter; colors from CSS vars (`--deep-navy`, `--fresh-teal`, `--warm-amber`, `--action-blue`)
- Shadow/radius system: `rounded-xl`, soft shadows, `bg-card/50` on cards
- Animation: Framer Motion on all major transitions (< 300 ms)
- Attachment: `Co-Authored-By: Claude Code <noreply@anthropic.com>` on every commit
