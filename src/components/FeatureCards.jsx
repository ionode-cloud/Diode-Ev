import React, { useRef, useEffect, useCallback } from 'react';

/* ============================================================
   CARD DATA — 5 original cards
   ============================================================ */
const CARDS = [
  {
    id: 'electric-drive',
    title: 'ELECTRIC DRIVE',
    body: 'Silent power,\nsmooth acceleration,\neffortless movement.',
    icon: '⚡',
  },
  {
    id: 'smart-design',
    title: 'SMART DESIGN',
    body: 'Designed around\nthe modern city.',
    icon: '◈',
  },
  {
    id: 'connected',
    title: 'CONNECTED',
    body: 'Technology that\nmoves with you.',
    icon: '◎',
  },
  {
    id: 'comfort',
    title: 'COMFORT',
    body: 'A calm and refined\nelectric experience.',
    icon: '✦',
  },
  {
    id: 'future-ready',
    title: 'FUTURE READY',
    body: 'Built for the\nnext generation.',
    icon: '◈',
  },
];

const CARD_COUNT   = CARDS.length;      // 5
const SET_COUNT    = 3;                  // 3 copies for infinite illusion
const TOTAL_CARDS  = CARD_COUNT * SET_COUNT; // 15

/* Create 15-card array: [set-0, set-1 (middle), set-2] */
const ALL_CARDS = Array.from({ length: SET_COUNT }, (_, si) =>
  CARDS.map(c => ({ ...c, id: `${c.id}-${si}` }))
).flat();

/* Start pointing at the first card of the middle set */
const INITIAL_INDEX = CARD_COUNT; // index 5

/* ============================================================
   COMPONENT
   ============================================================ */
export default function FeatureCards({ engine }) {
  const trackRef       = useRef(null);
  const activeIndexRef = useRef(INITIAL_INDEX);
  const cardWidthRef   = useRef(0);

  /* Measure card width once after mount and on resize */
  const measureCard = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.firstElementChild;
    if (!firstCard) return;
    const gap = 18; // matches CSS gap
    cardWidthRef.current = firstCard.offsetWidth + gap;
  }, []);

  useEffect(() => {
    measureCard();
    const ro = new ResizeObserver(measureCard);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [measureCard]);

  /* Apply offset to track (no React state — direct DOM) */
  const applyOffset = useCallback((index, animated = true) => {
    const track = trackRef.current;
    if (!track) return;
    const offset = -(index * cardWidthRef.current);
    track.style.transition = animated
      ? 'transform 640ms cubic-bezier(0.22, 1, 0.36, 1)'
      : 'none';
    track.style.transform = `translateX(${offset.toFixed(2)}px)`;
  }, []);

  /* Initialise at middle set silently */
  useEffect(() => {
    // Wait one frame so card widths are measured
    const raf = requestAnimationFrame(() => {
      measureCard();
      applyOffset(INITIAL_INDEX, false);
    });
    return () => cancelAnimationFrame(raf);
  }, [applyOffset, measureCard]);

  /* Infinite-scroll logic — silently jump after transition ends */
  const handleTransitionEnd = useCallback(() => {
    const idx = activeIndexRef.current;
    const track = trackRef.current;
    if (!track) return;

    if (idx < CARD_COUNT) {
      // Jumped into set-0, silently jump to set-1 equivalent
      const newIdx = idx + CARD_COUNT;
      activeIndexRef.current = newIdx;
      applyOffset(newIdx, false);
    } else if (idx >= CARD_COUNT * 2) {
      // Jumped into set-2, silently jump to set-1 equivalent
      const newIdx = idx - CARD_COUNT;
      activeIndexRef.current = newIdx;
      applyOffset(newIdx, false);
    }
  }, [applyOffset]);

  const navigate = useCallback((dir) => {
    measureCard();
    const next = activeIndexRef.current + dir;
    activeIndexRef.current = next;
    applyOffset(next, true);
  }, [applyOffset, measureCard]);

  return (
    <>
      <div className="feature-cards">
        <div className="feature-cards__viewport">
          <div
            className="feature-cards__track"
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
          >
            {ALL_CARDS.map(card => (
              <div key={card.id} className="feature-card">
                <div className="feature-card__title">{card.title}</div>
                <div className="feature-card__body">
                  {card.body.split('\n').map((line, i) => (
                    <span key={i} style={{ display: 'block' }}>{line}</span>
                  ))}
                </div>
                <div className="feature-card__icon">{card.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation controls — opacity + pointer-events driven by CSS vars */}
      <div className="card-controls">
        <button
          type="button"
          className="card-controls__btn"
          aria-label="Previous card"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <button
          type="button"
          className="card-controls__btn"
          aria-label="Next card"
          onClick={() => navigate(1)}
        >
          →
        </button>
      </div>
    </>
  );
}
