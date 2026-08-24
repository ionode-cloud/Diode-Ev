import React from 'react';

export default function LoadingScreen({ progress, visible }) {
  const pct = Math.round(Math.min(progress, 1) * 100);

  return (
    <div
      className={`loading-screen${visible ? '' : ' loading-screen--hidden'}`}
      aria-hidden={!visible}
      role="status"
      aria-label="Loading DEIGO cinematic experience"
    >
      <div className="loading-screen__mark">DEIGO</div>
      <div className="loading-screen__label">LOADING EXPERIENCE</div>
      <div className="loading-screen__bar-track">
        <div className="loading-screen__bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="loading-screen__pct">{pct}%</div>
    </div>
  );
}
