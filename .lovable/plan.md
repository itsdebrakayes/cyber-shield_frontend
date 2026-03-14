

# Add URL/Link Input to Detection Pages

Currently, all three detection pages (Image, Video, Audio) only support file uploads. This adds a second input method: paste a URL (e.g., a social media post, direct media link, or website) and have the system fetch and scan the media at that location.

Since this is a mock/fake system with no backend, the URL scan will simulate fetching and return the same mock results after a delay.

## Changes

### 1. Create a shared `UrlInput` component (`src/components/UrlInput.tsx`)
A reusable component with:
- Text input for URL with a "Scan URL" button
- Accepts a placeholder prop (e.g., "Paste an image URL or social media post link...")
- Loading state with spinner
- `onSubmit` callback that passes the URL string
- Styled consistently with the existing upload cards (glass-card style)
- Supports common patterns: direct media links, Instagram/TikTok/X/YouTube post URLs

### 2. Update `ImageDetection.tsx`
- Add a tab/toggle below the upload area: "Upload File" | "Scan URL"
- When "Scan URL" is selected, show the `UrlInput` component
- On URL submit, simulate scanning (same mock result + delay)
- Show the URL as context in the results (e.g., "Scanned: https://...")

### 3. Update `VideoDetection.tsx`
- Same tab/toggle pattern
- URL input with video-specific placeholder ("Paste a video URL, YouTube link, or social media post...")

### 4. Update `AudioDetection.tsx`
- Same tab/toggle pattern
- URL input with audio-specific placeholder ("Paste an audio URL, SoundCloud link, or podcast episode...")

### 5. Update mobile counterparts
- `MobileImageDetection.tsx`, `MobileVideoDetection.tsx`, `MobileAudioDetection.tsx` — add the same URL tab using the shared `UrlInput` component, adapted for mobile layout

## UI Design

The centered "empty state" view will show two options using Tabs from shadcn:

```text
┌─────────────────────────────┐
│     [Upload File] [Scan URL]│  ← Tab toggle
├─────────────────────────────┤
│  Upload area OR URL input   │
│  depending on active tab    │
└─────────────────────────────┘
```

When a URL is submitted, the same scanning animation and mock results display as file uploads. The results card will show the scanned URL as source context.

## Files to create/edit
- **Create**: `src/components/UrlInput.tsx`
- **Edit**: `src/pages/ImageDetection.tsx`, `src/pages/VideoDetection.tsx`, `src/pages/AudioDetection.tsx`
- **Edit**: `src/pages/mobile/MobileImageDetection.tsx`, `src/pages/mobile/MobileVideoDetection.tsx`, `src/pages/mobile/MobileAudioDetection.tsx`

