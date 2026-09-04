import DomainsSection from '../components/sections/DomainsSection.jsx';
import StatsSection from '../components/sections/StatsSection.jsx';
import TechStackSection from '../components/sections/TechStackSection.jsx';
import MarqueeSection from '../components/sections/MarqueeSection.jsx';
import ParallaxVideoSection from '../components/sections/ParallaxVideoSection.jsx';

export default function DomainsPage({ onNavigate }) {
  return (
    <div className="page-container page-enter">
      {/* Page Hero Header */}
      <div className="page-hero-header">
        <div className="page-hero-inner">
          <div className="page-breadcrumb">
            <button onClick={() => onNavigate('home')}>Home</button>
            <span>/</span>
            <span>Domains</span>
          </div>
          <h1 className="page-title">
            Specialized <span>Engineering Domains</span>
          </h1>
          <p className="page-subtitle">
            Our multi-disciplinary research labs push the limits across cybernetic robotics, embedded telemetry, neuromorphic AI, and precision 3D fabrication.
          </p>
        </div>
      </div>

      {/* Main Domains Interactive Section */}
      <DomainsSection />

      {/* Animated Tech Marquee */}
      <MarqueeSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Industrial Deployment Sectors */}
      <section className="domains-sectors-section">
        <div className="domains-sectors-container">
          <div className="section-tag-row">
            <span className="section-tag-pill">Field Applications</span>
          </div>
          <h2 className="section-heading-lg">
            Where Our Technology <span>Operates</span>
          </h2>

          <div className="sectors-grid">
            <div className="sector-card">
              <span className="sector-icon">🛰️</span>
              <h3>Aerospace & Deep Exploration</h3>
              <p>Autonomous rover kinematics and radiation-hardened micro-actuators tested for extreme thermal gradients and vacuum environments.</p>
            </div>

            <div className="sector-card">
              <span className="sector-icon">🏭</span>
              <h3>Advanced Manufacturing</h3>
              <p>High-speed visual sorting, adaptive 6-axis pick-and-place, and sub-millimeter quality verification in 24/7 automated facilities.</p>
            </div>

            <div className="sector-card">
              <span className="sector-icon">🏥</span>
              <h3>Surgical & Bio-Kinetic Tech</h3>
              <p>Tremor-canceling neural interfaces, compliant prosthetic limbs, and haptic feedback micro-tools for precision medical procedures.</p>
            </div>

            <div className="sector-card">
              <span className="sector-icon">⚡</span>
              <h3>Energy & Infrastructure</h3>
              <p>Autonomous pipeline crawling drones, substation inspection crawlers, and offshore wind turbine maintenance robotics.</p>
            </div>
          </div>

          <div className="about-cta-box">
            <div>
              <h3>Looking for a domain-specific custom solution?</h3>
              <p>Our research engineers build tailor-made robotic payloads and RTOS drivers.</p>
            </div>
            <button className="btn-primary" onClick={() => onNavigate('contact')}>
              Request Feasibility Study
            </button>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <TechStackSection />

      {/* Parallax video global reach */}
      <ParallaxVideoSection onNavigate={onNavigate} />
    </div>
  );
}
