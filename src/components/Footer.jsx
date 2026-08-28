import { motion } from 'framer-motion'
import './Footer.css'

const footerLinks = {
  Product: ['Charging Stations', 'Home Chargers', 'Fleet Solutions', 'Mobile App'],
  Company: ['About Us', 'Careers', 'Press', 'Partners'],
  Support: ['Help Center', 'Contact Us', 'Warranty', 'API Docs'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__inner container">
        {/* Top */}
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </span>
              <span className="footer__logo-text">Diode<span>EV</span></span>
            </div>
            <p className="footer__tagline">
              Greening Bharat with smart 120 kW EV fast charging infrastructure.
            </p>
            <div className="footer__socials">
              {['twitter', 'instagram', 'linkedin', 'youtube'].map(s => (
                <a key={s} href="#" className="footer__social-link" aria-label={s} id={`footer-social-${s}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat} className="footer__col">
              <h4 className="footer__col-title">{cat}</h4>
              <ul className="footer__col-links">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="footer__link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="footer__newsletter">
          <div>
            <h4 className="footer__newsletter-title">Stay in the loop</h4>
            <p className="footer__newsletter-sub">Get updates on new charging stations near you.</p>
          </div>
          <div className="footer__newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="footer__newsletter-input"
              id="footer-newsletter-input"
            />
            <button className="btn btn-accent footer__newsletter-btn" id="footer-newsletter-submit">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Diode EV Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="footer__made">
            Made with <span style={{ color: '#3de89e' }}>⚡</span> in Bharat
          </p>
        </div>
      </div>
    </footer>
  )
}
