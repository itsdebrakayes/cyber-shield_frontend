

# Redesign Breach Check Dashboard + Risk Gauge + Email Analysis

## What the user wants
Based on the reference image, the user wants:
1. **Risk Score gauge** to look like the reference — a ~270° arc gauge with large centered score number, "Score" label above, scale markers (0 and 1000), and a severity label ("High") below
2. **Monitoring dashboard** to use a dark card grid layout like the reference — stat cards with colored icons, a donut chart ("Threats By Virus" style with total % in center), and a line/area chart for trends
3. **Breach lookup + "add account to monitor"** inputs should be **centered on screen** (like other pages were updated)
4. **Email Analysis** page needs a visual refresh to look better/centered

## Changes

### 1. `src/components/RiskGauge.tsx` — Redesign to match reference
- Change from a 180° semicircle to a ~270° arc gauge
- Show "Score" label above the number
- Large centered score number (e.g., "741") without the % suffix — use raw score mapped to 0-1000 scale
- Scale markers at bottom: "0" on left, "1000" on right
- Colored severity label pill below ("High", "Medium", "Low")
- Thicker arc with gradient from red → orange → green
- Accept a `maxScore` prop (default 100) so breach check can pass `maxScore={1000}`

### 2. `src/pages/BreachCheck.tsx` — Full redesign of monitoring section
- **Breach Lookup**: Center on screen when no result shown (like other pages), using `min-h-[calc(100vh-8rem)] flex items-center justify-center` when no lookup result and no accounts
- **Monitoring dashboard** (when accounts exist): Dark-themed card grid layout inspired by reference:
  - **Top row**: Stat cards showing "Total Threats", "Email Risk", "Password Risk", etc. with colored icon circles and percentage values
  - **Risk Score card**: The new arc gauge showing aggregate risk score on 0-1000 scale
  - **Donut chart card**: "Data Exposure" breakdown — donut with total percentage in center, legend items with colored dots (replaces current pie chart)
  - **Bar/line chart card**: "Breach Timeline" (keep existing bar chart but style it better with the reference aesthetic)
- Account cards below remain but get cleaner styling
- When no accounts are being monitored: show centered "Add an account to monitor" input instead of the dashboard

### 3. `src/pages/mobile/MobileBreachCheck.tsx` — Same structure adapted for mobile
- Centered lookup when no result
- Monitoring section with compact stat cards and donut chart
- Same gating logic

### 4. `src/pages/EmailAnalysis.tsx` — Center the form + beautify
- When no result is shown: center the email form on screen using the same `min-h-[calc(100vh-8rem)]` centered layout pattern
- Add a hero icon (Mail) and descriptive text above the form
- Style the form with `glass-card` instead of plain `Card`
- After scan: show results in full-width layout as normal

### 5. `src/pages/mobile/MobileEmailAnalysis.tsx` — Same centering + glass styling
- Center form when no result, transition to scrollable results after scan

