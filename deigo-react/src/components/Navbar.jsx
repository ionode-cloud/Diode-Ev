import React from 'react';

export function Navbar({ isScrolled, onNavigate }) {
  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <button
        type="button"
        className="navbar__mark"
        id="nav-brand"
        onClick={() => onNavigate(0)}
      >
        DEIGO
      </button>
      <div className="navbar__links">
        <button type="button" onClick={() => onNavigate(0.16)}>
          Design
        </button>
        <button type="button" onClick={() => onNavigate(0.38)}>
          Performance
        </button>
        <button type="button" onClick={() => onNavigate(0.62)}>
          Charging
        </button>
        <button type="button" onClick={() => onNavigate(1.0, true)}>
          Configure
        </button>
      </div>
    </nav>
  );
}
