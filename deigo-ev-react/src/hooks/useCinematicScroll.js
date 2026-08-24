import { useEffect, useRef } from 'react';

/* ============================================================
   MATH HELPERS
   ============================================================ */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function clamp(v, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

/**
 * Smooth Hermite interpolation (same as GLSL smoothstep).
 * Maps v from range [e0,e1] → 0..1 with smooth ease in/out.
 */
export function smoothstep(e0, e1, v) {
  const x = clamp((v - e0) / (e1 - e0));
  return x * x * (3 - 2 * x);
}

/**
 * Describe a chapter with an enter ramp and an exit ramp.
 * a → b  = fade in
 * b → c  = fully visible
 * c → d  = fade out
 * Returns { enter, exit, active } all in 0..1
 */
export function segmentInOut(s, a, b, c, d) {
  const enter = smoothstep(a, b, s);
  const exit  = smoothstep(c, d, s);
  return { enter, exit, active: enter * (1 - exit) };
}

/* ============================================================
   CONSTANTS
   ============================================================ */
export const SCROLL_TOTAL = 3700;

export const CHAPTERS = [
  { id: 0, key: 'running',   label: '01 / ON THE ROAD',      pxStart:    0, pxEnd:  740 },
  { id: 1, key: 'lowBattery',label: '02 / LOW BATTERY',      pxStart:  560, pxEnd: 1665 },
  { id: 2, key: 'charging',  label: '03 / CHARGING STATION', pxStart: 1500, pxEnd: 2590 },
  { id: 3, key: 'departure', label: '04 / BACK ON THE ROAD', pxStart: 2350, pxEnd: 3150 },
];

/* ============================================================
   ENGINE CLASS
   ============================================================ */
export class CinematicEngine {
  constructor() {
    this.video      = null;
    this.sectionEl  = null;

    this.targetScroll    = 0;
    this.smoothScroll    = 0;
    this.targetVideoTime = 0;
    this.smoothVideoTime = 0;

    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.mouseX       = 0;
    this.mouseY       = 0;

    this.subscribers = new Set();
    this.rafId       = null;

    this.reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    this._onMouseMove = this._onMouseMove.bind(this);
    this._loop        = this._loop.bind(this);
  }

  /* ---------------------------------------------------------- */
  init(videoEl, sectionEl) {
    this.video     = videoEl;
    this.sectionEl = sectionEl;

    if (videoEl) {
      videoEl.pause();
      videoEl.currentTime = 0;
    }

    if (!this.reducedMotion) {
      window.addEventListener('mousemove', this._onMouseMove, { passive: true });
    }

    this.rafId = requestAnimationFrame(this._loop);
    return () => this.destroy();
  }

  subscribe(cb) {
    this.subscribers.add(cb);
    return () => this.subscribers.delete(cb);
  }

  /* ---------------------------------------------------------- */
  _getScrollDistance() {
    const section = this.sectionEl;
    if (!section) return 0;
    const top = -section.getBoundingClientRect().top;
    return clamp(top, 0, section.offsetHeight - window.innerHeight);
  }

  _onMouseMove(e) {
    this.targetMouseX = e.clientX / window.innerWidth  - 0.5;
    this.targetMouseY = e.clientY / window.innerHeight - 0.5;
  }

  _loop() {
    this._tick();
    this.rafId = requestAnimationFrame(this._loop);
  }

  _tick() {
    const rm    = this.reducedMotion;
    const pLerp = rm ? 1 : 0.14;
    const mLerp = rm ? 1 : 0.12;
    const vLerp = rm ? 1 : 0.18;

    // --- scroll ---
    this.targetScroll = this._getScrollDistance();
    this.smoothScroll = lerp(this.smoothScroll, this.targetScroll, pLerp);

    // Snap tiny residuals
    if (Math.abs(this.targetScroll - this.smoothScroll) < 0.05) {
      this.smoothScroll = this.targetScroll;
    }

    // --- mouse ---
    this.mouseX = lerp(this.mouseX, this.targetMouseX, mLerp);
    this.mouseY = lerp(this.mouseY, this.targetMouseY, mLerp);

    // --- video scrubbing ---
    const s        = this.smoothScroll;
    const progress = clamp(s / SCROLL_TOTAL);
    const video    = this.video;

    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      this.targetVideoTime = progress * video.duration;
      this.smoothVideoTime = lerp(this.smoothVideoTime, this.targetVideoTime, vLerp);
      if (Math.abs(video.currentTime - this.smoothVideoTime) > 0.008) {
        video.currentTime = this.smoothVideoTime;
      }
    }

    // --- CSS variables ---
    this._updateCSSVars(s);

    // --- notify subscribers ---
    const state = {
      smoothScroll:       s,
      progress,
      rawScroll:          this.targetScroll,
      mouseX:             this.mouseX,
      mouseY:             this.mouseY,
      hasStartedScrolling: s > 5,
    };
    this.subscribers.forEach(cb => cb(state));
  }

  /* ---------------------------------------------------------- */
  _updateCSSVars(s) {
    const root = document.documentElement;
    const set  = (k, v) => root.style.setProperty(k, v);
    const mx   = this.mouseX;
    const my   = this.mouseY;

    /* ---- Hero title ---- */
    const introExit   = smoothstep(90, 650, s);
    set('--title-y',       `${(introExit * -210).toFixed(2)}px`);
    set('--title-scale',   (1 - introExit * 0.08).toFixed(4));
    set('--title-opacity', (1 - introExit).toFixed(3));

    /* ---- Intro copy ---- */
    set('--intro-y',       `${(introExit * 90).toFixed(2)}px`);
    set('--intro-opacity', (1 - introExit).toFixed(3));

    /* ---- Scroll indicator ---- */
    set('--indicator-opacity', clamp(1 - smoothstep(0, 300, s)).toFixed(3));

    /* ---- Chapter segments ----
       Retimed to match the actual footage in 1.mp4:
         0.0 – 2.0s  car running through the city      → frame1
         2.0 – 4.5s  dashboard / app flags low battery  → frame2
         4.5 – 7.0s  pulled in, charging at the station → frame3
         7.0 – 10s   pulls out, back on the road        → frame4
       (video duration 10s over SCROLL_TOTAL=3700px, so 1s ≈ 370px) */
    const frame1 = segmentInOut(s,    0,  200,  520,  740);
    const frame2 = segmentInOut(s,  560,  900, 1400, 1665);
    const frame3 = segmentInOut(s, 1500, 1850, 2350, 2590);
    const frame4 = segmentInOut(s, 2350, 2650, 2900, 3150);

    set('--ch1-opacity', frame1.active.toFixed(3));
    set('--ch1-y',       `${((1 - frame1.enter) * 58 - frame1.exit * 86).toFixed(2)}px`);

    set('--ch2-opacity', frame2.active.toFixed(3));
    set('--ch2-y',       `${((1 - frame2.enter) * 58 - frame2.exit * 86).toFixed(2)}px`);

    set('--ch3-opacity', frame3.active.toFixed(3));
    set('--ch3-y',       `${((1 - frame3.enter) * 58 - frame3.exit * 86).toFixed(2)}px`);

    set('--ch4-opacity', frame4.active.toFixed(3));
    set('--ch4-y',       `${((1 - frame4.enter) * 58 - frame4.exit * 86).toFixed(2)}px`);

    /* ---- Video transforms ---- */
    const videoScale =
      1.02
      + frame2.enter * 0.20
      + frame2.exit  * 0.25
      + frame3.enter * 0.12;

    set('--video-scale', videoScale.toFixed(4));

    /* ---- Atmosphere ---- */
    set('--atmosphere-x',     `${(mx * -12).toFixed(2)}px`);
    set('--atmosphere-y',     `${(my * -4).toFixed(2)}px`);
    set('--atmosphere-scale', (1.02 + frame2.enter * 0.05).toFixed(4));

    /* ---- Shade overlays ---- */
    set('--shade-top-alpha',
      clamp(frame2.active * 0.30 + frame3.active * 0.25 + frame4.active * 0.40).toFixed(3));
    set('--shade-mid-alpha',
      clamp(frame2.active * 0.25 + frame3.active * 0.20 + frame4.active * 0.45).toFixed(3));
    set('--shade-bottom-alpha',
      clamp(frame2.active * 0.40 + frame3.active * 0.35 + frame4.active * 0.55).toFixed(3));

    /* ---- Navbar (pass raw scrolled amount) ---- */
    set('--navbar-scrolled', s > 60 ? '1' : '0');
  }

  /* ---------------------------------------------------------- */
  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    window.removeEventListener('mousemove', this._onMouseMove);
    this.subscribers.clear();
  }
}

/* ============================================================
   REACT HOOK
   ============================================================ */
export function useCinematicScroll(videoRef, sectionRef) {
  const engineRef = useRef(null);
  if (!engineRef.current) {
    engineRef.current = new CinematicEngine();
  }

  useEffect(() => {
    const video   = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return undefined;

    let cleanup = null;

    const start = () => {
      cleanup = engineRef.current.init(video, section);
    };

    // Wait for metadata so duration is known before first scrub attempt.
    if (video.readyState >= 1) {
      start();
    } else {
      video.addEventListener('loadedmetadata', start, { once: true });
    }

    return () => {
      video.removeEventListener('loadedmetadata', start);
      if (cleanup) cleanup();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return engineRef.current;
}
