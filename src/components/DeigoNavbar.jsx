import React, { useRef, useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Home',       href: '#cinema'  },
  { label: 'About',      href: '#about'   },
  { label: 'Contact Us', href: '#contact' },
];

export default function DeigoNavbar({ engine }) {
  const navRef    = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!engine) return undefined;

    const unsubscribe = engine.subscribe(({ smoothScroll }) => {
      const el = navRef.current;
      if (!el) return;
      el.classList.toggle('deigo-navbar--scrolled', smoothScroll > 60);
    });

    return unsubscribe;
  }, [engine]);

  return (
    <nav className="deigo-navbar" ref={navRef}>
      <div className="deigo-navbar__inner">
        <a href="#cinema" className="deigo-navbar__logo">DEIGO</a>

        <div className="deigo-navbar__links">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="deigo-navbar__link"
            >
              {label}
            </a>
          ))}
        </div>

        <a href="#final-cta" className="deigo-navbar__cta">EXPLORE</a>

        <button
          type="button"
          className="deigo-navbar__hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`deigo-navbar__mobile ${menuOpen ? 'deigo-navbar__mobile--open' : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="deigo-navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <a
          href="#final-cta"
          className="deigo-navbar__mobile-link deigo-navbar__mobile-link--cta"
          onClick={() => setMenuOpen(false)}
        >
          EXPLORE
        </a>
      </div>
    </nav>
  );
}
