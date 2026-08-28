import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const navItems = [
  { label: 'Charging Station', href: '#hero' },
  { label: 'Support', href: '#howitworks' },
  { label: 'Pricing', href: '#benefits' },
  { label: 'About Us', href: '#benefits' },
  { label: 'Contact Us', href: '#footer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Charging Station')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar__inner">
        {/* Logo */}
        <a href="#" className="navbar__logo">
          <span className="navbar__logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="navbar__logo-text">Diode<span className="navbar__logo-ev">EV</span></span>
        </a>

        {/* Desktop nav */}
        <ul className="navbar__links">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`navbar__link ${active === item.label ? 'navbar__link--active' : ''}`}
                onClick={() => setActive(item.label)}
              >
                {item.label.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#" className="btn btn-primary navbar__cta" id="navbar-download-btn">
          Download App
        </a>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="navbar-hamburger-btn"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="navbar__mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="#" className="btn btn-primary navbar__mobile-cta">Download App</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
