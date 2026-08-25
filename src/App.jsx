import React, { useState, useRef, useCallback } from 'react';
import { useFrameLoader } from './hooks/useFrameLoader';
import { useVirtualScroll } from './hooks/useVirtualScroll';
import { LoadingScreen } from './components/LoadingScreen';
import { FrameCanvas } from './components/FrameCanvas';
import { Navbar } from './components/Navbar';
import { HeroTitle } from './components/HeroTitle';
import { IntroCopy } from './components/IntroCopy';
import { ScrollIndicator } from './components/ScrollIndicator';
import { ChapterPanels } from './components/ChapterPanels';
import { ScrollProgress } from './components/ScrollProgress';
import { FinalCTA } from './components/FinalCTA';

/* ============================================================
   MATH & TIMELINE HELPERS
   ============================================================ */
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smoothstep = (e0, e1, v) => {
  const x = clamp((v - e0) / (e1 - e0));
  return x * x * (3 - 2 * x);
};
const segmentInOut = (s, a, b, c, d) => {
  const enter = smoothstep(a, b, s);
  const exit = smoothstep(c, d, s);
  return { enter, exit, active: enter * (1 - exit) };
};

const CHAPTER_RANGES = [
  { key: 'ch1', a: 0.065, b: 0.115, c: 0.220, d: 0.275 },
  { key: 'ch2', a: 0.265, b: 0.320, c: 0.440, d: 0.500 },
  { key: 'ch3', a: 0.490, b: 0.550, c: 0.690, d: 0.750 },
  { key: 'ch4', a: 0.740, b: 0.800, c: 0.920, d: 0.985 },
];

export function App() {
  const footerRef = useRef(null);
  const { isReady, loadProgress, getNearestFrame, ensureFrameLoading, totalFrames } =
    useFrameLoader();

  const [currentFrame, setCurrentFrame] = useState(null);
  const currentFrameIndexRef = useRef(-1);

  // High-frequency RAF callback to drive hardware-accelerated CSS variables & canvas
  const handleScrollTick = useCallback(
    (state) => {
      const root = document.documentElement;
      const set = (k, v) => root.style.setProperty(k, v);
      const p = state.canvasProgress;

      // 1. Update Viewport translation for footer reveal (px)
      set('--app-y', state.footerOffsetPx.toFixed(2));

      // 2. Intro and Hero animations
      const introExit = smoothstep(0.015, 0.070, p);
      set('--title-y', `${(introExit * -210).toFixed(2)}px`);
      set('--title-scale', (1 - introExit * 0.08).toFixed(4));
      set('--title-opacity', (1 - introExit).toFixed(3));

      set('--intro-y', `${(introExit * 90).toFixed(2)}px`);
      set('--intro-opacity', (1 - introExit).toFixed(3));

      set('--indicator-opacity', clamp(1 - smoothstep(0, 0.045, p)).toFixed(3));

      // 3. Chapter story transitions
      const segs = {};
      CHAPTER_RANGES.forEach((r) => {
        segs[r.key] = segmentInOut(p, r.a, r.b, r.c, r.d);
      });

      ['ch1', 'ch2', 'ch3', 'ch4'].forEach((key) => {
        const seg = segs[key];
        set(`--${key}-opacity`, seg.active.toFixed(3));
        set(`--${key}-y`, `${((1 - seg.enter) * 58 - seg.exit * 86).toFixed(2)}px`);
      });

      // 4. Atmospheric shader wash
      set(
        '--shade-top-alpha',
        clamp(segs.ch2.active * 0.30 + segs.ch3.active * 0.25 + segs.ch4.active * 0.40).toFixed(3)
      );
      set(
        '--shade-mid-alpha',
        clamp(segs.ch2.active * 0.25 + segs.ch3.active * 0.20 + segs.ch4.active * 0.45).toFixed(3)
      );
      set(
        '--shade-bottom-alpha',
        clamp(segs.ch2.active * 0.40 + segs.ch3.active * 0.35 + segs.ch4.active * 0.55).toFixed(3)
      );

      // 5. Frame index calculation
      const frameIdx = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(p * (totalFrames - 1)))
      );

      if (frameIdx !== currentFrameIndexRef.current) {
        currentFrameIndexRef.current = frameIdx;
        ensureFrameLoading(frameIdx);
        const img = getNearestFrame(frameIdx);
        if (img) {
          setCurrentFrame(img);
        }
      }
    },
    [ensureFrameLoading, getNearestFrame, totalFrames]
  );

  const {
    canvasProgress,
    smoothScroll,
    hasStartedScrolling,
    scrollToProgress,
  } = useVirtualScroll({
    footerRef,
    onTick: handleScrollTick,
    enabled: isReady,
  });

  return (
    <>
      <LoadingScreen isReady={isReady} progress={loadProgress} />

      <main className="app-viewport" id="app-viewport">
        {/* ============================================================
             CINEMATIC STAGE — fixed viewport image sequence
             ============================================================ */}
        <section className="cinema-scroll" id="cinema">
          <div className="stage">
            <div className="world">
              {/* Z1: canvas image sequence */}
              <FrameCanvas currentFrame={currentFrame} />

              {/* Z2: cinematic vignette */}
              <div className="depth-overlay" />

              {/* Z3: scroll-driven atmospheric wash */}
              <div className="shade" id="shade" />

              {/* Z10: top navbar */}
              <Navbar
                isScrolled={smoothScroll > 40}
                onNavigate={scrollToProgress}
              />

              {/* Z10: hero title */}
              <HeroTitle />

              {/* Z10: intro copy */}
              <IntroCopy />

              {/* Z10: scroll indicator */}
              <ScrollIndicator onClick={() => scrollToProgress(0.16)} />

              {/* Z11: chapters 01..04 */}
              <ChapterPanels />

              {/* Z16: scroll progress meter */}
              <ScrollProgress
                isVisible={hasStartedScrolling}
                progress={canvasProgress}
              />
            </div>
          </div>
        </section>

        {/* ============================================================
             FINAL CTA / FOOTER (Revealed strictly after 100% canvas sequence)
             ============================================================ */}
        <FinalCTA ref={footerRef} />
      </main>
    </>
  );
}

export default App;
