import React from 'react';

export function ScrollProgress({ isVisible, progress }) {
  const pct = Math.round(progress * 100);

  return (
    <div
      className={`scroll-progress ${isVisible ? 'scroll-progress--visible' : ''}`}
      id="scroll-progress"
    >
      <div className="scroll-progress__track">
        <div className="scroll-progress__fill" style={{ height: `${pct}%` }} id="progress-fill" />
        <div className="scroll-progress__dot" style={{ top: `${pct}%` }} id="progress-dot" />
      </div>
      <div className="scroll-progress__pct" id="progress-pct">
        {pct}%
      </div>
    </div>
  );
}
