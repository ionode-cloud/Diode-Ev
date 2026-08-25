import { useState, useEffect, useRef, useCallback } from 'react';

const CANVAS_SCROLL_TOTAL = 2600;
const PROGRESS_LERP = 0.18;
const MOUSE_LERP = 0.14;

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export function useVirtualScroll({ footerRef, onTick, enabled = true }) {
  const [scrollState, setScrollState] = useState({
    canvasProgress: 0,
    footerProgress: 0,
    footerOffsetPx: 0,
    smoothScroll: 0,
    hasStartedScrolling: false,
    isAtFooter: false,
  });

  const stateRef = useRef({
    targetScroll: 0,
    smoothScroll: 0,
    canvasScrollTotal: CANVAS_SCROLL_TOTAL,
    footerHeight: 450,
    footerScrollTotal: 450,
    totalScroll: CANVAS_SCROLL_TOTAL + 450,
    targetMouseX: 0,
    targetMouseY: 0,
    mouseX: 0,
    mouseY: 0,
    lastTouchY: 0,
  });

  // Programmatic scroll helper
  const scrollToProgress = useCallback((canvasProgress, toFooter = false) => {
    const s = stateRef.current;
    if (toFooter) {
      s.targetScroll = s.totalScroll;
    } else {
      s.targetScroll = clamp(canvasProgress * s.canvasScrollTotal, 0, s.canvasScrollTotal);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const s = stateRef.current;

    const updateFooterMetrics = () => {
      if (footerRef?.current) {
        s.footerHeight = footerRef.current.offsetHeight || 450;
        s.footerScrollTotal = Math.max(350, s.footerHeight);
        s.totalScroll = s.canvasScrollTotal + s.footerScrollTotal;
      }
    };

    updateFooterMetrics();
    window.addEventListener('resize', updateFooterMetrics);

    const onWheel = (e) => {
      e.preventDefault();
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 32;
      else if (e.deltaMode === 2) delta *= window.innerHeight;

      s.targetScroll = clamp(s.targetScroll + delta, 0, s.totalScroll);
    };

    const onTouchStart = (e) => {
      if (e.touches?.length > 0) {
        s.lastTouchY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (e.touches?.length > 0) {
        const currentY = e.touches[0].clientY;
        const delta = (s.lastTouchY - currentY) * 1.8;
        s.lastTouchY = currentY;
        s.targetScroll = clamp(s.targetScroll + delta, 0, s.totalScroll);
        if (e.cancelable) e.preventDefault();
      }
    };

    const onKeyDown = (e) => {
      const step = 140;
      const pageStep = 550;
      if (e.key === 'ArrowDown' || e.key === 'j') {
        s.targetScroll = clamp(s.targetScroll + step, 0, s.totalScroll);
        e.preventDefault();
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        s.targetScroll = clamp(s.targetScroll - step, 0, s.totalScroll);
        e.preventDefault();
      } else if (e.key === 'PageDown' || e.key === ' ') {
        s.targetScroll = clamp(s.targetScroll + pageStep, 0, s.totalScroll);
        e.preventDefault();
      } else if (e.key === 'PageUp') {
        s.targetScroll = clamp(s.targetScroll - pageStep, 0, s.totalScroll);
        e.preventDefault();
      } else if (e.key === 'Home') {
        s.targetScroll = 0;
        e.preventDefault();
      } else if (e.key === 'End') {
        s.targetScroll = s.totalScroll;
        e.preventDefault();
      }
    };

    const onMouseMove = (e) => {
      s.targetMouseX = e.clientX / window.innerWidth - 0.5;
      s.targetMouseY = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let rafId;
    let lastReportedProgress = -1;

    const loop = () => {
      s.smoothScroll = lerp(s.smoothScroll, s.targetScroll, PROGRESS_LERP);
      if (Math.abs(s.targetScroll - s.smoothScroll) < 0.05) {
        s.smoothScroll = s.targetScroll;
      }

      s.mouseX = lerp(s.mouseX, s.targetMouseX, MOUSE_LERP);
      s.mouseY = lerp(s.mouseY, s.targetMouseY, MOUSE_LERP);

      const canvasScroll = clamp(s.smoothScroll, 0, s.canvasScrollTotal);
      const canvasProgress = clamp(canvasScroll / s.canvasScrollTotal, 0, 1);

      const footerScroll = clamp(s.smoothScroll - s.canvasScrollTotal, 0, s.footerScrollTotal);
      const footerProgress = s.footerScrollTotal > 0 ? clamp(footerScroll / s.footerScrollTotal, 0, 1) : 0;
      const footerOffsetPx = footerProgress * s.footerHeight;

      const stateSnapshot = {
        canvasProgress,
        footerProgress,
        footerOffsetPx,
        smoothScroll: s.smoothScroll,
        canvasScroll,
        targetScroll: s.targetScroll,
        mouseX: s.mouseX,
        mouseY: s.mouseY,
        hasStartedScrolling: s.smoothScroll > 15,
        isAtFooter: footerProgress > 0.01,
      };

      // Call high-frequency callback (direct CSS variable updates)
      if (onTick) {
        onTick(stateSnapshot);
      }

      // Throttle React state update slightly if unchanged to keep 60+ fps
      if (Math.abs(canvasProgress - lastReportedProgress) > 0.002 || footerOffsetPx > 0 || lastReportedProgress === -1) {
        lastReportedProgress = canvasProgress;
        setScrollState(stateSnapshot);
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', updateFooterMetrics);
    };
  }, [enabled, footerRef, onTick]);

  return {
    ...scrollState,
    scrollToProgress,
  };
}
