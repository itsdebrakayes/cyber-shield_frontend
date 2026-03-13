

# Dashboard & Breach Check Visual Overhaul

## Summary
Redesign the Dashboard score banner, service cards, pie charts, and gauges to match the reference images. Key changes: score section with white inset panels like image 2, cards matching the glassmorphic grid in image 3, radial/donut charts like image 1, and speedometer gauges with needle like image 4.

## Changes

### 1. `src/components/RiskGauge.tsx` — Needle-style speedometer
Replace the current simple arc gauge with a proper speedometer matching image 4:
- Full semicircular arc with tick marks around the edge
- Color gradient segments (green → yellow → red)
- A **needle** (triangle/line) pointing to the score, rotated based on value
- Score number displayed large below the needle
- Label underneath (e.g., "Caution", "Safe")

### 2. `src/pages/Dashboard.tsx` — Score banner redesign
Restructure the top banner to match image 2 (the university dashboard layout):
- **Left section**: Large circular badge with the grade (e.g., "A-") on a green/teal circular background that pops out, not flat — use a prominent `rounded-full` element with shadow
- **Middle section**: White/glass inset panels showing:
  - "Monitored Accounts" list with larger text (14px+), each account on its own row with grade badge
  - "Recent Alerts" with proper spacing and readable text
- **Right section**: A pink/rose glass accent panel showing breach source breakdown with the donut chart and stats
- All inner panels use `bg-white/90 dark:bg-white/10 rounded-2xl` to create the "white sections within the main backdrop" effect

### 3. `src/pages/Dashboard.tsx` — Service cards
Restyle to match image 3 (the glassmorphic card grid):
- Cards should be more square-proportioned, not wide
- Each card gets a distinct soft pastel gradient background (mint, lavender, peach, etc.) — not just tinted transparent
- Larger icon area at top
- Title and description below
- Rounded corners (~1rem), subtle shadow, frosted border
- Grid: `grid-cols-2 sm:grid-cols-3` with equal aspect ratio

### 4. Pie/Donut charts — Radial infographic style
Update charts in both Dashboard and BreachCheck to match image 1:
- Use **concentric ring** / thick donut style with wider `innerRadius`/`outerRadius` gap
- Purple and teal color palette matching the reference
- Larger chart sizes with percentage labels
- Consider nested rings for the breach source breakdown

### 5. `src/pages/BreachCheck.tsx` — Layout updates
- Increase account row sizes (padding, font size) for readability
- Use white inset panels within the purple hero similar to Dashboard
- Gauges per account use the new needle-style speedometer

### 6. `src/index.css` — New utility classes
- `.glass-inset-panel` — white/light panel for use inside colored banners: `bg-white/90 dark:bg-white/10 rounded-2xl shadow-sm`
- `.glass-accent-pink` — rose/pink gradient accent panel for the right sidebar section

