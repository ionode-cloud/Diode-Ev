import React from 'react';

export function LoadingScreen({ isReady, progress }) {
  const pct = Math.round(progress * 100);

  return (
    <div className={`loading-screen ${isReady ? 'loading-screen--hidden' : ''}`} id="loading-screen">
      <div className="loading-screen__mark">DEIGO</div>
      <div className="loading-screen__bar">
        <div className="loading-screen__fill" style={{ width: `${pct}%` }} id="loading-fill" />
      </div>
      <div className="loading-screen__pct" id="loading-pct">
        {pct}%
      </div>
    </div>
  );
}
