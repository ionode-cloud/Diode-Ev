import React, { useEffect, useRef } from 'react';
import { CHAPTERS } from '../hooks/useCinematicScroll.js';

export default function ScrollProgress({ engine }) {
  const rootRef  = useRef(null);
  const fillRef  = useRef(null);
  const dotRef   = useRef(null);
  const pctRef   = useRef(null);
  const chRefs   = useRef([]);

  useEffect(() => {
    if (!engine) return undefined;

    const unsubscribe = engine.subscribe(({ progress, smoothScroll, hasStartedScrolling }) => {
      const pct = Math.round(progress * 100);

      if (fillRef.current) fillRef.current.style.height = `${pct}%`;
      if (dotRef.current)  dotRef.current.style.top     = `${pct}%`;
      if (pctRef.current)  pctRef.current.textContent   = `${pct}%`;

      if (rootRef.current) {
        rootRef.current.classList.toggle('scroll-progress--visible', hasStartedScrolling);
      }

      chRefs.current.forEach((el, i) => {
        if (!el) return;
        const ch     = CHAPTERS[i];
        const active = smoothScroll >= ch.pxStart && smoothScroll < ch.pxEnd;
        el.classList.toggle('scroll-progress__chapter--active', active);
      });
    });

    return unsubscribe;
  }, [engine]);

  return (
    <div className="scroll-progress" ref={rootRef}>
      <div className="scroll-progress__track">
        <div className="scroll-progress__fill" ref={fillRef} />
        <div className="scroll-progress__dot"  ref={dotRef}  />
      </div>
      <div className="scroll-progress__pct" ref={pctRef}>0%</div>
      <div className="scroll-progress__chapters">
        {CHAPTERS.map((ch, i) => (
          <div
            key={ch.id}
            className="scroll-progress__chapter"
            ref={el => (chRefs.current[i] = el)}
          >
            {ch.label}
          </div>
        ))}
      </div>
    </div>
  );
}
