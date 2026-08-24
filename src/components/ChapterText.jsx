import React from 'react';

/**
 * ChapterText — 4 cinematic story panels.
 *
 * ALL animation (opacity + Y position) is driven purely by CSS custom
 * properties set on :root by the CinematicEngine each RAF tick.
 * Zero JS subscriptions needed here — the CSS variables handle it all.
 *
 * Pixel ranges (matching useCinematicScroll segmentInOut calls) follow
 * the actual cut points in /videos/1.mp4:
 *   ch1  →     0 –  740px   0.0–2.0s   Car running through the city
 *   ch2  →   560 – 1665px   2.0–4.5s   Dashboard/app flags low battery
 *   ch3  →  1500 – 2590px   4.5–7.0s   Pulled in, charging at the station
 *   ch4  →  2350 – 3150px   7.0–10s    Pulls out, back on the road
 */
export default function ChapterText() {
  return (
    <div className="chapter-text">

      {/* ── CHAPTER 01 — CAR RUNNING ── */}
      <article className="chapter-panel chapter-panel--ch1" id="drive">
        <div className="chapter-panel__number">01 / ON THE ROAD</div>
        <h2 className="chapter-panel__heading">
          <span>ALWAYS</span>
          <span>IN MOTION.</span>
        </h2>
        <p className="chapter-panel__subtext">
          Move without limits.<br />
          Silent. Smooth. Electric.
        </p>
      </article>

      {/* ── CHAPTER 02 — LOW BATTERY ── */}
      <article className="chapter-panel chapter-panel--ch2" id="low-battery">
        <div className="chapter-panel__number">02 / LOW BATTERY</div>
        <h2 className="chapter-panel__heading">
          <span>RUNNING</span>
          <span>LOW.</span>
        </h2>
        <p className="chapter-panel__subtext">
          DEIGO reads the range and finds a station<br />
          before it becomes a problem.
        </p>
      </article>

      {/* ── CHAPTER 03 — CHARGING STATION ── */}
      <article className="chapter-panel chapter-panel--ch3" id="charging">
        <div className="chapter-panel__number">03 / CHARGING STATION</div>
        <h2 className="chapter-panel__heading">
          <span>PLUG IN.</span>
          <span>POWER UP.</span>
        </h2>
        <p className="chapter-panel__subtext">
          Fast DC charging brings you from<br />
          18% to 80% in minutes, not hours.
        </p>
      </article>

      {/* ── CHAPTER 04 — DEPARTURE ── */}
      <article className="chapter-panel chapter-panel--ch4" id="departure">
        <div className="chapter-panel__number">04 / BACK ON THE ROAD</div>
        <h2 className="chapter-panel__heading">
          <span>CHARGED.</span>
          <span>READY.</span>
          <span>GONE.</span>
        </h2>
        <p className="chapter-panel__subtext">
          Full power, zero hesitation. Onward.
        </p>
      </article>

      {/* ── CHARGING floating data (ch3 range) ── */}
      <div className="floating-data">
        <div className="floating-data__item floating-data__item--a">
          <span className="floating-data__label">18% → 80%</span>
          <span className="floating-data__value">RECHARGED</span>
        </div>
        <div className="floating-data__item floating-data__item--b">
          <span className="floating-data__label">150 kW</span>
          <span className="floating-data__value">DC FAST CHARGE</span>
        </div>
        <div className="floating-data__item floating-data__item--c">
          <span className="floating-data__label">~28 MIN</span>
          <span className="floating-data__value">TO FULL RANGE</span>
        </div>
      </div>

    </div>
  );
}
