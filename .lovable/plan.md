

# Mobile Versions for All Screens + Dashboard Welcome Flow

## Overview
Create dedicated mobile components for all 7 pages (Dashboard, Link Scanner, Image Detection, Video Detection, Audio Detection, Email Analysis, Breach Check, Settings) plus fix the Dashboard welcome flow and medium screen layout.

## Approach
Each page will use `useIsMobile()` to conditionally render a mobile-specific layout. Mobile layouts will follow the same glassmorphism aesthetic but optimized for single-column, touch-friendly interaction with the floating bottom nav bar.

## Changes

### 1. `src/pages/MobileDashboard.tsx` — New
- Dark purple glass score card with grade, score bar, key stats
- For **new users** (no accounts): replaces score card entirely with welcome message + pink glass "Add Account" panel
- 2-column compact service card grid
- Recent alerts in white glass panel
- Bottom padding for floating nav

### 2. `src/pages/Dashboard.tsx` — Modify
- Import `useIsMobile()` → render `<MobileDashboard />` on mobile
- Fix welcome flow: when `isNewUser`, replace the **entire hero** (grade orb + accounts + alerts) with welcome content + pink "Add Accounts" panel
- Fix medium screen: use `lg:grid-cols-[220px_1fr_280px]` instead of `xl`, add `md` intermediate stacking

### 3. Mobile page components — New files
Each gets a mobile-optimized version following the same pattern:

- **`src/pages/mobile/MobileLinkScanner.tsx`**: URL input at top, scan button, results as stacked cards
- **`src/pages/mobile/MobileImageDetection.tsx`**: Upload area, progress bar, results in vertical stack with gauge
- **`src/pages/mobile/MobileVideoDetection.tsx`**: Upload + timeline list vertically stacked
- **`src/pages/mobile/MobileAudioDetection.tsx`**: Upload + anomaly list vertically stacked
- **`src/pages/mobile/MobileEmailAnalysis.tsx`**: Sender/subject/body inputs stacked, results below
- **`src/pages/mobile/MobileBreachCheck.tsx`**: Account list as full-width cards, gauge per account
- **`src/pages/mobile/MobileSettings.tsx`**: Single-column form cards

### 4. Modify each desktop page
Add `useIsMobile()` conditional at top of each page component to render its mobile counterpart.

### 5. `src/index.css` — Mobile utilities
- `.mobile-glass-card` — compact glass card for mobile views
- `.mobile-section-header` — smaller section headings
- Reduce `.dashboard-service-card` min-height on mobile to `8rem`

### 6. `src/components/Layout.tsx` — Already correct
- Top nav hides on mobile (`hidden md:flex`)
- Bottom floating nav shows on mobile (`md:hidden`)
- No changes needed

## Mobile Design Principles
- Single column layouts, full-width cards
- Larger touch targets (min 44px)
- Same glass/blur/pastel aesthetic, just reorganized vertically
- Bottom padding (~6rem) on all mobile pages to clear the floating nav
- Consistent dark purple hero cards for score/status sections

