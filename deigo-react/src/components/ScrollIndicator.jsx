import React from 'react';

export function ScrollIndicator({ onClick }) {
  return (
    <button
      type="button"
      className="scroll-indicator"
      id="scroll-indicator"
      onClick={onClick}
      aria-label="Scroll to drive"
    >
      <span className="scroll-indicator__text">SCROLL TO DRIVE</span>
      <div className="scroll-indicator__line" />
    </button>
  );
}
