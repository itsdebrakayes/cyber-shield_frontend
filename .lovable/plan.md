

# Fix Remaining Purple: Primary Color + Class Names

The purple you're seeing on the login page and logo comes from the **`--primary`** CSS variable, which is set to a purple hue (250 in light mode, 260 in dark mode). This controls button colors, the shield logo background, focus rings, and link accents.

## Changes

### 1. Update `--primary` in `src/index.css`
- Light mode: `250 60% 65%` → `200 60% 55%` (light blue)
- Light mode foreground: keep `0 0% 100%` (white)
- Dark mode: `260 65% 72%` → `200 65% 65%` (light blue)
- Dark mode foreground: `260 65% 10%` → `200 65% 10%`
- Update `--ring` from `250 60% 65%` → `200 60% 55%`

### 2. Rename `glass-hero-purple` class
In `src/index.css`: rename `.glass-hero-purple` → `.glass-hero-blue` (both light and dark variants). The gradient values already use blue hues from the previous update, so only the class name changes.

### 3. Update class references
- `src/pages/Dashboard.tsx`: `glass-hero-purple` → `glass-hero-blue`
- `src/pages/BreachCheck.tsx`: `glass-hero-purple` → `glass-hero-blue`

