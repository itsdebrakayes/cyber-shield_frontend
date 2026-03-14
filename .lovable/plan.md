

# Breach Check: Service-First Layout with Public Lookup + Personal Monitoring

## Structure (both desktop and mobile)

The page will be reorganized into two distinct sections:

### Section 1 — Public Breach Lookup (top, service-focused)
- Hero card with a prominent search input: "Check any email for data breaches"
- User types any email (not necessarily their own) and hits "Check"
- Shows a results area below the input: risk gauge, breach count, exposed data types, and breach list for the looked-up email
- Uses mock results for demo (e.g., after "checking," show simulated breach data with a brief loading state)
- This is the primary tool — anyone can use it without adding an account

### Section 2 — Personal Monitoring Dashboard (below)
- Section header: "Your Monitored Accounts"
- Shows the user's own monitored accounts with their scores, breaches, and exposed data (existing cards)
- Input to add a new account to ongoing monitoring
- Stats summary (total breaches, avg score) derived from monitored accounts only

## Changes

### `src/pages/BreachCheck.tsx` (desktop)
- Add state for `lookupEmail`, `lookupResult`, and `isChecking`
- Top section: cyber-themed hero with large search input + "Check" button, and a collapsible results panel that appears after a lookup
- Mock the lookup: on submit, set a brief loading state then show a random mock result
- Move existing monitored accounts + charts into a "Your Monitored Accounts" section below
- Keep the "Add to monitor" input in the personal section

### `src/pages/mobile/MobileBreachCheck.tsx` (mobile)
- Same two-section layout adapted for mobile
- Top: score card restyled as "Breach Lookup" with search input and results
- Below: "Your Accounts" section with existing monitored account cards
- Add to monitor input stays in the personal section

