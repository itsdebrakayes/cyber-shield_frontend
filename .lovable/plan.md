

# Implement Full Supabase Authentication

## Overview
Connect this project to Supabase for real authentication (login, signup, password reset) with a `profiles` table for user data. Protect all routes behind auth. Build both desktop and mobile auth pages.

## Steps

### 1. Enable Supabase (Lovable Cloud)
- Spin up a Supabase backend via Lovable Cloud
- This creates the Supabase client integration files automatically

### 2. Create database schema
- **`profiles` table**: `id` (uuid, FK to `auth.users`), `full_name` (text), `avatar_url` (text), `created_at`, `updated_at`
- **Trigger**: Auto-create profile row on signup (`handle_new_user` function)
- **RLS policies**: Users can read/update only their own profile
- **`user_roles` table** with `app_role` enum (`admin`, `moderator`, `user`) and `has_role()` security definer function per security guidelines

### 3. Create Supabase client integration
- `src/integrations/supabase/client.ts` — Supabase client singleton
- `src/integrations/supabase/types.ts` — generated types

### 4. Create `AuthContext` + `useAuth` hook
- `src/contexts/AuthContext.tsx`:
  - Wrap app with `AuthProvider`
  - `onAuthStateChange` listener set up **before** `getSession()` call
  - Expose `user`, `session`, `profile`, `signIn`, `signUp`, `signOut`, `resetPassword`, `loading`
  - Fetch profile from `profiles` table on session change

### 5. Create `ProtectedRoute` component
- `src/components/ProtectedRoute.tsx`:
  - If loading, show spinner
  - If no session, redirect to `/login`
  - Otherwise render children

### 6. Update `src/pages/Auth.tsx` (desktop)
- Wire login form to `supabase.auth.signInWithPassword()`
- Wire signup form to `supabase.auth.signUp()` with `full_name` in metadata and `emailRedirectTo`
- Wire forgot password to `supabase.auth.resetPasswordForEmail()` with `redirectTo`
- Add loading states on buttons
- On successful auth, `navigate('/dashboard')` via React Router (not `window.location`)
- Add input validation (non-empty email, min 6-char password)

### 7. Create mobile auth page
- `src/pages/mobile/MobileAuth.tsx` — same logic, mobile-optimized layout (full-width card, smaller padding)
- Update `Auth.tsx` to branch via `useIsMobile()` like other pages

### 8. Create `/reset-password` page
- `src/pages/ResetPassword.tsx` — form to set new password
- Check for `type=recovery` in URL hash
- Call `supabase.auth.updateUser({ password })`
- Add route in `App.tsx`

### 9. Update `App.tsx` routing
- Wrap all authenticated routes with `<ProtectedRoute>`
- Add `/reset-password` as a public route
- Keep `/login` public

### 10. Update `Layout.tsx` sign-out
- Replace the "Sign Out" link with actual `signOut()` call from `useAuth()`
- Show user's name/email in the profile dropdown

### 11. Files to create/edit

| File | Action |
|------|--------|
| `src/integrations/supabase/client.ts` | Create |
| `src/integrations/supabase/types.ts` | Create |
| `src/contexts/AuthContext.tsx` | Create |
| `src/components/ProtectedRoute.tsx` | Create |
| `src/pages/Auth.tsx` | Edit — wire to Supabase |
| `src/pages/mobile/MobileAuth.tsx` | Create |
| `src/pages/ResetPassword.tsx` | Create |
| `src/App.tsx` | Edit — add ProtectedRoute, new routes |
| `src/components/Layout.tsx` | Edit — real sign-out, show user info |
| Database migrations | profiles table, trigger, RLS, user_roles |

