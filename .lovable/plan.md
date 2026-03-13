

# Liquid Glass Navbar for CyberShield

## What We're Building
A floating, glassmorphic "liquid" navbar inspired by Apple's liquid glass design trend. The key characteristics:

- **Floating pill shape**: The navbar detaches from the edges, centered with rounded corners, creating a floating capsule effect
- **Frosted glass**: Heavy `backdrop-blur` with semi-transparent background, subtle border with transparency
- **Animated sliding highlight**: A pill-shaped indicator that smoothly slides behind the active nav link using Framer Motion's `layoutId`
- **Subtle glow/shadow**: A soft colored shadow underneath giving a "hovering" feel
- **Liquid border**: A subtle gradient border that shifts, giving an organic/liquid feel

## Changes

### `src/components/Layout.tsx`
Redesign the `<nav>` element:

1. **Outer wrapper**: Add top padding so the navbar floats away from the top edge
2. **Nav container**: Change from full-width sticky bar to a centered floating pill:
   - `mx-auto max-w-fit rounded-full` for pill shape
   - `bg-card/40 dark:bg-card/30 backdrop-blur-2xl` for strong glass effect
   - `border border-white/20 dark:border-white/10` for liquid glass border
   - `shadow-lg shadow-primary/5` for floating glow
   - Keep `sticky top-4 z-50`
3. **Sliding active indicator**: Use Framer Motion `motion.div` with `layoutId="nav-pill"` rendered behind the active link — this creates the smooth sliding pill animation when switching pages
4. **Nav links**: Positioned relative, each link gets `relative z-10` so text sits above the sliding indicator
5. **Logo on left, nav links center, actions on right** — all inside the floating pill
6. **Mobile nav**: Also gets the floating pill treatment at the bottom or as a condensed scrollable strip

### `src/index.css`
Add a subtle CSS animation for a gradient border shimmer effect on the navbar (optional enhancement for the "liquid" feel).

### No other files change
The Layout component is the only file that needs modification. Framer Motion is already installed.

## Technical Approach
- Use `useLocation()` (already imported) to determine active link
- Wrap each nav link in a `relative` container; render a `motion.div` with `layoutId="activeNav"` inside the active link's container — Framer Motion automatically animates the position change
- The sliding pill uses `absolute inset-0 rounded-full bg-primary/10` with `layout` transition
- Glass effect via Tailwind utilities only, no external CSS library needed

