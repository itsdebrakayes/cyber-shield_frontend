

# Gradient Icons + Background Color Splotches

## Two changes

### 1. Match hero icons to dashboard colors with gradient styling

Currently all page hero icons use `bg-primary/10 text-primary`. Email Analysis already has the nice gradient: `bg-gradient-to-br from-cyber-yellow/20 to-cyber-purple/20 text-cyber-yellow`.

Update each page's hero icon to use a similar `bg-gradient-to-br` with colors matching their dashboard card theme:

| Page | Gradient | Icon Color |
|------|----------|------------|
| Link Scanner | `from-cyber-green/20 to-cyber-teal/20` | `text-cyber-green` |
| Image Detection | `from-cyber-blue/20 to-cyber-purple/20` | `text-cyber-blue` |
| Video Detection | `from-cyber-purple/20 to-cyber-blue/20` | `text-cyber-purple` |
| Audio Detection | `from-cyber-teal/20 to-cyber-green/20` | `text-cyber-teal` |

Apply to both desktop and mobile versions (8 files total, one line change each).

### 2. Add ambient color splotch background to the whole site

In `Layout.tsx`, add a fixed background layer with large, soft, blurred radial gradient "splotches" behind all content — similar to the Dan Rack aesthetic with organic color blobs.

Implementation: Add a `div` with `fixed inset-0 -z-10 overflow-hidden` inside the Layout root, containing 3-4 absolutely positioned pseudo-elements (or child divs) that are large blurred circles of different colors (purple, teal, blue, pink) at ~30-40% opacity, with `blur-[120px]` or similar. Different positions for light vs dark mode.

**Files to edit:**
- `src/components/Layout.tsx` — add background splotch layer
- `src/pages/LinkScanner.tsx` — icon gradient
- `src/pages/ImageDetection.tsx` — icon gradient
- `src/pages/VideoDetection.tsx` — icon gradient
- `src/pages/AudioDetection.tsx` — icon gradient
- `src/pages/mobile/MobileLinkScanner.tsx` — icon gradient
- `src/pages/mobile/MobileImageDetection.tsx` — icon gradient
- `src/pages/mobile/MobileVideoDetection.tsx` — icon gradient
- `src/pages/mobile/MobileAudioDetection.tsx` — icon gradient

