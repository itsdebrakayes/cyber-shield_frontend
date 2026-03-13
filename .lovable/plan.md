

# Cybersecurity Theme for Score Section + Smaller Mobile Cards

## Changes

### 1. `src/index.css` — Recolor hero sections to cyber theme
- **`.glass-hero-purple`** (desktop): Change from purple gradient to deep navy/dark teal (`hsl(210 65% 15%)` → `hsl(195 70% 18%)` → `hsl(220 60% 20%)`). Dark mode even deeper.
- **`.mobile-score-card`**: Same dark navy/teal treatment instead of purple.
- **`.dashboard-grade-orb`**: Neon cyan glow (`hsl(170 100% 50%)`) with pulsing cyan box-shadow instead of teal-green.
- **`.dashboard-score-hero::before`**: Add a subtle cyan radial glow instead of blue, and add a faint grid/scan-line overlay via `::after` for a "hacker terminal" feel.
- **`.mobile-service-tile`**: Reduce `min-height` from `7.5rem` back to `6.5rem`.

### 2. `src/pages/mobile/MobileDashboard.tsx` — Slightly smaller cards
- Change service grid from `grid-cols-2 gap-3` to `grid-cols-2 gap-2.5`
- Reduce icon container from `!h-12 !w-12` to `!h-10 !w-10`
- Reduce overall spacing from `space-y-5` to `space-y-4`
- Score card padding from `p-6` to `p-5`

### Color Direction
The hero/score sections will use a dark navy-to-teal gradient evoking a terminal/cyber aesthetic, with neon cyan and green accent glows. Service cards keep their existing pastel colors unchanged.

