import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CHAPTERS = [
  { id: 0, key: 'drive', label: '01 / DRIVE', start: 0.0, end: 0.25 },
  { id: 1, key: 'design', label: '02 / DESIGN', start: 0.25, end: 0.5 },
  { id: 2, key: 'power', label: '03 / POWER', start: 0.5, end: 0.75 },
  { id: 3, key: 'charge', label: '04 / CHARGE', start: 0.75, end: 0.9 },
  { id: 4, key: 'final', label: '05 / DEIGO', start: 0.9, end: 1.0 }
];

const LERP_PROGRESS = 0.09;
const LERP_MOUSE = 0.08;

/**
 * Drives the entire scroll-video experience.
 *
 * - GSAP ScrollTrigger pins the hero section and reports raw scroll
 *   progress (0-1) on every scroll tick.
 * - A requestAnimationFrame loop lerps that raw progress toward a smooth
 *   value, and uses it to set video.currentTime directly (never via
 *   React state), eliminating jitter/harsh seeking.
 * - The same loop lerps mouse position for the parallax layers.
 * - Subscribers (components) register a callback and read plain numbers
 *   each frame; nothing here calls setState, so no re-renders happen on
 *   scroll/mouse-move.
 */
export class ScrollEngine {
  constructor() {
    this.video = null;
    this.pinEl = null;
    this.scrollTrigger = null;

    this.targetProgress = 0;
    this.currentProgress = 0;
    this.targetMouseX = 0; // -1..1
    this.targetMouseY = 0; // -1..1
    this.currentMouseX = 0;
    this.currentMouseY = 0;

    this.activeChapter = 0;
    this.hasStartedScrolling = false;

    this.reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.subscribers = new Set();
    this.rafId = null;

    this._onMouseMove = this._onMouseMove.bind(this);
    this._tick = this._tick.bind(this);
  }

  init(videoEl, pinEl, { scrollDistance = '400%' } = {}) {
    this.video = videoEl;
    this.pinEl = pinEl;

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', this._onMouseMove, { passive: true });
    }

    this.scrollTrigger = ScrollTrigger.create({
      trigger: pinEl,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        this.targetProgress = self.progress;
        if (self.progress > 0.001 && !this.hasStartedScrolling) {
          this.hasStartedScrolling = true;
        }
      }
    });

    this._startLoop();

    return () => this.destroy();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  _onMouseMove(e) {
    if (this.reducedMotion) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.targetMouseX = (e.clientX / w) * 2 - 1;
    this.targetMouseY = (e.clientY / h) * 2 - 1;
  }

  _computeChapter(progress) {
    for (const ch of CHAPTERS) {
      if (progress >= ch.start && progress < ch.end) return ch.id;
    }
    return progress >= 1 ? CHAPTERS[CHAPTERS.length - 1].id : 0;
  }

  _startLoop() {
    const loop = () => {
      this._tick();
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  _tick() {
    const pLerp = this.reducedMotion ? 1 : LERP_PROGRESS;
    const mLerp = this.reducedMotion ? 1 : LERP_MOUSE;

    this.currentProgress += (this.targetProgress - this.currentProgress) * pLerp;
    this.currentMouseX += (this.targetMouseX - this.currentMouseX) * mLerp;
    this.currentMouseY += (this.targetMouseY - this.currentMouseY) * mLerp;

    // Snap tiny residuals to avoid perpetual sub-pixel writes.
    if (Math.abs(this.targetProgress - this.currentProgress) < 0.0001) {
      this.currentProgress = this.targetProgress;
    }

    if (this.video && Number.isFinite(this.video.duration) && this.video.duration > 0) {
      const targetTime = this.currentProgress * this.video.duration;
      // Guard against redundant seeks (some browsers dispatch a decode
      // per assignment even when the value barely changed).
      if (Math.abs(this.video.currentTime - targetTime) > 0.008) {
        this.video.currentTime = targetTime;
      }
    }

    const chapter = this._computeChapter(this.currentProgress);
    if (chapter !== this.activeChapter) {
      this.activeChapter = chapter;
    }

    const state = {
      progress: this.currentProgress,
      rawProgress: this.targetProgress,
      mouseX: this.currentMouseX,
      mouseY: this.currentMouseY,
      chapterIndex: this.activeChapter,
      hasStartedScrolling: this.hasStartedScrolling,
      reducedMotion: this.reducedMotion
    };

    this.subscribers.forEach((cb) => cb(state));
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', this._onMouseMove);
    }
    if (this.scrollTrigger) this.scrollTrigger.kill();
    this.subscribers.clear();
  }
}

/**
 * React entry point. Creates one ScrollEngine instance for the whole
 * hero experience and wires it to the given video/pin DOM refs once
 * both are mounted and the video has metadata (for duration).
 *
 * Returns the engine instance itself (not React state) — consumers call
 * engine.subscribe(cb) in their own effects and update refs/DOM
 * directly, per the "no setState on every frame" requirement.
 */
export function useScrollVideo(videoRef, pinRef, options) {
  const engineRef = useRef(null);
  if (!engineRef.current) {
    engineRef.current = new ScrollEngine();
  }

  useEffect(() => {
    const video = videoRef.current;
    const pinEl = pinRef.current;
    if (!video || !pinEl) return;

    let cleanupFn = null;

    const start = () => {
      cleanupFn = engineRef.current.init(video, pinEl, options);
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      // Metadata already available (duration is known).
      start();
    } else {
      video.addEventListener('loadedmetadata', start, { once: true });
    }

    return () => {
      video.removeEventListener('loadedmetadata', start);
      if (cleanupFn) cleanupFn();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef, pinRef]);

  return engineRef.current;
}

