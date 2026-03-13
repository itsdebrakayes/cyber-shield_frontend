

# Make Mobile Dashboard Cards Bigger to Fill Screen

## Problem
The mobile dashboard content only fills about three-quarters of the screen, leaving empty space above the bottom nav bar.

## Changes

### 1. `src/index.css` — Increase mobile service tile size
- Change `.mobile-service-tile` `min-height` from `6.5rem` to `7.5rem`

### 2. `src/pages/mobile/MobileDashboard.tsx` — Adjust grid and spacing
- Change service grid from `grid-cols-3 gap-2.5` to `grid-cols-2 gap-3` so each card is wider and taller (2 columns = bigger cards, 3 rows instead of 2)
- Increase icon size from `!h-10 !w-10` to `!h-12 !w-12` and icon inner from `h-4 w-4` to `h-5 w-5`
- Increase quick action button height with `h-12 rounded-xl` instead of default
- Increase the overall container spacing from `space-y-4` to `space-y-5`
- Increase score card padding from `p-5` to `p-6`

These changes will make the content fill to just above the bottom nav bar without feeling cramped.

