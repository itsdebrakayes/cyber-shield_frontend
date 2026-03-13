

# Fix Onboarding Flow — Remove "Skip" and Gate Dashboard Content

## Problem
Currently, the welcome/onboarding screen has a "Skip for now" button that lets users bypass adding accounts, after which the dashboard shows mock data (scores, breaches, alerts) as if there are accounts being monitored — contradictory and misleading.

## Approach
Instead of using a localStorage flag that can be dismissed, drive the onboarding state from whether there are **actual monitored accounts** (an empty array = new user). When there are no accounts, the dashboard should **only** show the welcome card + service grid — no score card, no alerts, no breach sources. Remove the "Skip for now" button entirely.

## Changes

### 1. `src/pages/mobile/MobileDashboard.tsx`
- Replace `isNewUser` localStorage check with a `monitoredAccounts` state array (starts empty)
- Derive `hasAccounts = monitoredAccounts.length > 0`
- When `!hasAccounts`: show welcome card (no skip button), service grid only — hide quick actions, alerts, breach sources
- When `hasAccounts`: show score card, quick actions, alerts, breach sources as normal
- Remove `dismissWelcome` function and `localStorage` usage
- Remove "Skip for now" button

### 2. `src/pages/Dashboard.tsx`
- Same logic: replace localStorage-based `isNewUser` with `monitoredAccounts` state array
- When empty: show welcome hero only — hide the service cards section's "recent alerts" and "breach sources" panels below the hero
- When populated: show full dashboard as normal
- Remove `dismissWelcome` and "Skip for now" button

Both files keep the mock `monitoredAccounts` data as the default state for demo purposes (so the dashboard looks populated). To test the empty state, the array would be initialized empty. For the competition demo, we can default it to the mock data so judges see the full dashboard.

