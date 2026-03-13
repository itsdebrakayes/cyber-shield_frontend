
# CyberShield — AI-Powered Cybersecurity Platform Frontend

## Overview
Build a comprehensive cybersecurity dashboard with light/dark mode, featuring AI-powered deepfake detection, link scanning, phishing analysis, and breach monitoring. Uses mock data throughout, with authentication via Supabase.

## Design System
- **Light mode**: White/near-white background, pastel accent colors (soft greens, blues, purples)
- **Dark mode**: Dark backgrounds with slightly neon but still pastel accent colors
- **Top navigation bar** with logo, nav links, dark/light toggle, notifications bell, and user profile dropdown
- Clean, modern UI inspired by the reference images

## Pages & Features

### 1. Authentication
- **Login page** with email/password
- **Signup page** with email/password
- **Forgot/reset password** flow
- User profile setup: add accounts/emails to monitor

### 2. Dashboard (Home)
- **Security Score Banner** at top (like image 5's green A- section):
  - Overall letter grade (A+, A-, B, etc.) averaged from monitored accounts
  - List of monitored accounts with individual scores beside them
  - Graphs showing where your data is being accessed / breach sources
  - Recent risk notifications (e.g., "Password found in breach — change it")
- **6 Service Cards** below (like image 3's card grid):
  - Deepfake Video Detection
  - Deepfake Image Detection
  - Deepfake Audio Detection
  - Email/Phishing Analysis
  - Link Scanning
  - Breach Check
  - Each card has an icon, title, brief description, and "Go" button

### 3. Link Scanner (inspired by image 1)
- Input field to enter a URL, "Scan" button
- Loading state while scanning
- Results: risk score (speedometer/gauge), verdict (Safe/Suspicious/Dangerous), breakdown of why (Google Safe Browsing result, VirusTotal result), flags highlighted

### 4. Image Deepfake Detection (inspired by image 2)
- Upload or select an image
- Scanning animation
- Results page: the image displayed with annotation overlays (rectangles/markers pointing to suspicious areas with labels like "Extra finger detected", "Inconsistent lighting")
- Overall score (e.g., "90% Authentic"), stat bars (elasticity, artifacts, consistency, etc.)

### 5. Video Deepfake Detection
- Upload a video file
- Results: risk score, timeline highlighting suspicious moments, descriptions of what was flagged (inconsistent facial movements, lip sync issues, etc.)

### 6. Audio Deepfake Detection
- Upload audio file or voice note
- Results: risk score, timeline with flagged timestamps (e.g., "At 0:30 — unnatural pitch shift"), list of detected anomalies

### 7. Email/Phishing Analysis
- Paste raw email (body, sender, subject)
- System extracts URLs and scans each one
- Results: overall phishing risk score, flagged URLs with individual scores, suspicious patterns highlighted

### 8. Breach Check (inspired by image 4)
- Shows monitored accounts/emails
- Speedometer gauge per account showing risk level
- Charts showing breach sources, data exposed
- Detailed breach history per account
- Add/remove accounts to monitor

### 9. User Profile/Settings
- Manage monitored accounts and credentials
- Notification preferences
- Theme toggle (light/dark)

## All pages use mock/dummy data with realistic values to demonstrate the full experience.
