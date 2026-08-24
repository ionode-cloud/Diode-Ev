import React, { useEffect, useRef, useState } from 'react';

const LINKS = ['DESIGN', 'PERFORMANCE', 'TECHNOLOGY', 'CHARGING'];

export default function Navbar({ engine }) {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!engine) return undefined;

    const unsubscribe = engine.subscribe(({ rawProgress }) => {
      const el = navRef.current;
      if (!el) return;
      // Cross the "scrolled" threshold once progress passes a hair above 0.
      const scrolled = rawProgress > 0.015;
      el.classList.toggle('navbar--scrolled', scrolled);
    });

    return unsubscribe;
  }, [engine]);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar__inner">
        <a href="#top" className="navbar__logo">DEIGO</a>

        <div className="navbar__links">
          {LINKS.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="navbar__link">
              {link}
            </a>
          ))}
        </div>

        <a href="#final-cta" className="navbar__cta">EXPLORE</a>

        <button
          type="button"
          className="navbar__menu-btn"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {link}
          </a>
        ))}
        <a href="#final-cta" className="navbar__mobile-link navbar__mobile-link--cta" onClick={() => setMenuOpen(false)}>
          EXPLORE
        </a>
      </div>
    </nav>
  );
}
