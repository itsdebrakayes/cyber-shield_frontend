

# Full Cybersecurity Theme Overhaul (Keeping Glassmorphism)

Transform the entire app's color palette and visual language to feel like a proper cybersecurity tool — dark navy/teal backgrounds, neon cyan/green accents, terminal-inspired touches — while preserving the glassmorphism aesthetic.

## Changes

### 1. `src/index.css` — Color Variables & Global Styles

**Light mode shifts darker and more "cyber":**
- `--background`: Shift from light gray (`220 20% 97%`) to a cool dark blue-gray (`220 25% 12%`)
- `--foreground`: Light text (`210 20% 92%`)
- `--card`: Dark navy (`225 25% 14%`)
- `--primary`: Neon cyan (`170 80% 50%`) instead of purple
- `--muted`: Dark navy tones
- `--border`: Subtle cyan-tinted borders
- `--accent`: Teal-cyan

**Dark mode goes even deeper:**
- `--background`: Near-black navy (`225 30% 7%`)
- `--card`: Deep navy (`225 28% 10%`)
- Same neon cyan primary

**Cyber accent colors stay but shift slightly more neon:**
- Keep the existing cyber-green, blue, teal, purple, red, yellow but bump saturation

**New global styles:**
- Add a subtle animated grid/scanline background pattern on `body` using CSS pseudo-elements
- Add a faint neon cyan glow to `.glass-card` borders
- Update `.nav-glass-pill` to use darker glass with cyan border tint
- Update `.glass-hero-purple` to be `.glass-hero-cyber` with deep navy + cyan radial glow

### 2. `src/components/Layout.tsx` — Nav Styling
- Change the logo shield background from `bg-primary` (was purple) to the new cyan primary — this happens automatically via the variable change
- No structural changes needed, colors flow from CSS variables

### 3. `src/pages/Auth.tsx` — Login Page
- The auth page uses `bg-background` and `Card` — these will automatically pick up the new dark cyber colors
- Shield icon already uses `bg-primary` which becomes cyan

### 4. `src/pages/Dashboard.tsx` — Desktop Dashboard
- `.glass-accent-pink` panel (breach sources, add accounts) → rename/restyle to a cyber-teal accent instead of pink/rose
- Update the breach panel to use dark teal glass instead of pink

### 5. `src/pages/mobile/MobileDashboard.tsx`
- Score card already uses `.mobile-score-card` (navy/teal) — no change needed
- Welcome card uses same class — good

### 6. Service Card Tints
- The service cards use `dashboard-service-card--{tone}` with per-tone gradients
- Shift these from pastel tints to darker, more saturated cyber tints (neon color / 0.15 on dark card base)
- Service icons: shift from pastel backgrounds to dark glass with neon icon colors

### 7. Individual Feature Pages (LinkScanner, ImageDetection, etc.)
- These use `Card` components which inherit from CSS variables — will automatically become dark/cyber
- `RiskGauge` uses score colors which remain (safe=green, warning=yellow, danger=red) — already cyber-appropriate

## Summary of Files to Edit
1. **`src/index.css`** — Major: rewrite both light/dark CSS variables to cyber palette, update all glass utilities, replace pink accent with teal, add background grid pattern
2. **`src/pages/Dashboard.tsx`** — Minor: change `glass-accent-pink` references to `glass-accent-cyber`
3. **`src/pages/mobile/MobileDashboard.tsx`** — No changes needed (already using cyber score card)
4. **`src/components/Layout.tsx`** — No changes needed (inherits from variables)

The key insight: by shifting the CSS variables at the root level, the entire app transforms. The glassmorphism classes (blur, transparency, inset highlights) remain identical — only the base colors feeding into them change from soft pastels to dark navy/cyan/neon tones.

