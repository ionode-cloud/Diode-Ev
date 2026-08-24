# DEIGO EV — Scroll-Driven Cinematic Landing Page

A React + Vite + GSAP ScrollTrigger site where scrolling drives playback
of the hero video frame-by-frame, like steering the car through the page.

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

Production build:

```bash
npm run build
npm run preview
```

## How the scroll-video works

- `src/hooks/useScrollVideo.js` — the `ScrollEngine` class pins the hero
  section with GSAP ScrollTrigger and reads raw scroll progress on every
  tick. A `requestAnimationFrame` loop lerps that progress toward a
  smoothed value and sets `video.currentTime` directly from it (never
  `video.play()`), so scrolling up plays the video backward naturally.
- Nothing in the animation loop calls `setState` — components subscribe
  to `engine.subscribe(callback)` and write directly to DOM refs each
  frame (see `HeroVideo.jsx`, `ChapterText.jsx`, `FloatingUI.jsx`,
  `ScrollProgress.jsx`, `Navbar.jsx`). This keeps scrubbing at 60fps
  without React re-render overhead.
- The hero section is pinned for `400%` of extra scroll distance (i.e.
  ~5 screens of scroll drive the ~10s video). Adjust in `HeroVideo.jsx`
  via the `scrollDistance` option if you want the drive to feel longer
  or shorter.

## Structure

```
src/
 ├── components/
 │   ├── Navbar.jsx
 │   ├── HeroVideo.jsx
 │   ├── ScrollProgress.jsx
 │   ├── ChapterText.jsx
 │   ├── FloatingUI.jsx
 │   ├── LoadingScreen.jsx
 │   ├── FollowUpSections.jsx
 │   └── CTASection.jsx
 ├── pages/
 │   └── Home.jsx
 ├── hooks/
 │   └── useScrollVideo.js
 ├── styles/
 │   └── global.css
 ├── App.jsx
 └── main.jsx
public/
 └── videos/
     └── 1.mp4
```

## Notes

- This was built and verified in a sandbox without npm registry access,
  so `npm install` could not actually be run here — all source files
  were syntax-checked and fully bundled with esbuild (imports/exports
  across every file resolve correctly), but the dev server itself
  hasn't been run. Please run `npm install && npm run dev` locally as
  the first step.
- Mouse parallax and the floating HUD labels are hidden under 860px
  (mobile) per the brief — touch devices don't fire `mousemove` in the
  same way anyway, so this mostly just tidies up layout.
- Reduced-motion users (`prefers-reduced-motion: reduce`) get the lerp
  smoothing disabled (progress snaps directly) and CSS transitions
  shortened.
