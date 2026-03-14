

# Replace All Purple with Light Blue

## What changes
Every instance of the `cyber-purple` color token gets replaced with a new `cyber-light-blue` token across the entire codebase. This covers ~150 references in 15 files.

## Approach

### 1. Update CSS variables (`src/index.css`)
- Rename `--cyber-purple` / `--cyber-purple-foreground` to `--cyber-light-blue` / `--cyber-light-blue-foreground`
- Change hue values from ~260 (purple) to ~200 (light blue) in both light and dark themes

### 2. Update Tailwind config (`tailwind.config.ts`)
- Rename the `purple` / `purple-foreground` keys under `cyber` to `light-blue` / `light-blue-foreground`

### 3. Global find-and-replace across all component files
Replace `cyber-purple` → `cyber-light-blue` in every `.tsx` and `.css` file:

| File | Approx matches |
|------|---------------|
| `src/index.css` | CSS custom properties + dashboard service card classes |
| `tailwind.config.ts` | Token definitions |
| `src/components/Layout.tsx` | Ambient splotch |
| `src/pages/Dashboard.tsx` | Pie colors, service cards |
| `src/pages/VideoDetection.tsx` | Icons, gradients, timeline |
| `src/pages/BreachCheck.tsx` | Pie colors, stat cards, gradients |
| `src/pages/EmailAnalysis.tsx` | Gradient references |
| `src/pages/ImageDetection.tsx` | Gradient references |
| `src/pages/mobile/Mobile*.tsx` | All mobile counterparts |
| `src/pages/mobile/MobileLinkScanner.tsx` | Icon color |

### 4. Rename CSS utility classes
In `src/index.css`, rename all `--video` and other dashboard service classes that reference `cyber-purple` to use `cyber-light-blue`.

