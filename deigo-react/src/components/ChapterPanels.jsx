import React from 'react';

export function FloatingData() {
  return (
    <div className="floating-data" id="floating-data">
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
  );
}

export function ChapterPanels() {
  return (
    <div className="chapter-text">
      <article className="chapter-panel chapter-panel--ch1" id="ch1">
        <div className="chapter-panel__number">01 / ON THE ROAD</div>
        <h2 className="chapter-panel__heading">
          <span>ALWAYS</span>
          <span>IN MOTION.</span>
        </h2>
        <p className="chapter-panel__subtext">
          Move without limits.
          <br />
          Silent. Smooth. Electric.
        </p>
      </article>

      <article className="chapter-panel chapter-panel--ch2" id="ch2">
        <div className="chapter-panel__number">02 / LOW BATTERY</div>
        <h2 className="chapter-panel__heading">
          <span>RUNNING</span>
          <span>LOW.</span>
        </h2>
        <p className="chapter-panel__subtext">
          DEIGO reads the range and finds a station
          <br />
          before it becomes a problem.
        </p>
      </article>

      <article className="chapter-panel chapter-panel--ch3" id="ch3">
        <div className="chapter-panel__number">03 / CHARGING STATION</div>
        <h2 className="chapter-panel__heading">
          <span>PLUG IN.</span>
          <span>POWER UP.</span>
        </h2>
        <p className="chapter-panel__subtext">
          Fast DC charging brings you from
          <br />
          18% to 80% in minutes, not hours.
        </p>
      </article>

      <article className="chapter-panel chapter-panel--ch4" id="ch4">
        <div className="chapter-panel__number">04 / BACK ON THE ROAD</div>
        <h2 className="chapter-panel__heading">
          <span>CHARGED.</span>
          <span>READY.</span>
          <span>GONE.</span>
        </h2>
        <p className="chapter-panel__subtext">Full power, zero hesitation. Onward.</p>
      </article>

      <FloatingData />
    </div>
  );
}
