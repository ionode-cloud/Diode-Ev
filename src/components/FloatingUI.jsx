import React, { useEffect, useRef } from 'react';

const ITEMS = [
  { id: 'electric-mobility', text: 'ELECTRIC MOBILITY', start: 0.09, end: 0.25, depth: 0.4, pos: 'top-left' },
  { id: 'smart-design', text: 'SMART DESIGN', start: 0.25, end: 0.5, depth: 0.5, pos: 'top-right' },
  { id: 'stat-electric', text: '100% ELECTRIC', start: 0.5, end: 0.75, depth: 0.3, pos: 'mid-left', stack: 0 },
  { id: 'stat-response', text: 'FAST RESPONSE', start: 0.5, end: 0.75, depth: 0.45, pos: 'mid-left', stack: 1 },
  { id: 'stat-silent', text: 'SILENT POWER', start: 0.5, end: 0.75, depth: 0.6, pos: 'mid-left', stack: 2 },
  { id: 'zero-emissions', text: 'ZERO EMISSIONS', start: 0.75, end: 0.9, depth: 0.35, pos: 'bottom-left' }
];

function visibility(progress, start, end) {
  const span = end - start;
  if (span <= 0) return 0;
  const fade = Math.min(span * 0.3, 0.035);
  if (progress < start - fade || progress > end + fade) return 0;
  if (progress < start) return (progress - (start - fade)) / fade;
  if (progress > end) return 1 - (progress - end) / fade;
  return 1;
}

export default function FloatingUI({ engine }) {
  const itemRefs = useRef({});

  useEffect(() => {
    if (!engine) return undefined;

    const unsubscribe = engine.subscribe(({ progress, mouseX, mouseY }) => {
      const t = performance.now() / 1000;

      ITEMS.forEach((item) => {
        const el = itemRefs.current[item.id];
        if (!el) return;

        const v = visibility(progress, item.start, item.end);
        const bob = Math.sin(t * 0.6 + item.depth * 10) * 5;
        const px = mouseX * 18 * item.depth;
        const py = mouseY * 12 * item.depth + bob;

        el.style.opacity = (v * 0.85).toFixed(3);
        el.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0)`;
      });
    });

    return unsubscribe;
  }, [engine]);

  return (
    <div className="floating-ui">
      {ITEMS.map((item) => (
        <div
          key={item.id}
          className={`floating-ui__item floating-ui__item--${item.pos}`}
          style={item.stack != null ? { marginTop: `${item.stack * 34}px` } : undefined}
          ref={(el) => (itemRefs.current[item.id] = el)}
        >
          <span className="floating-ui__dot" />
          {item.text}
        </div>
      ))}
    </div>
  );
}
