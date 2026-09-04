import HeroSection from '../components/sections/HeroSection.jsx';
import MarqueeSection from '../components/sections/MarqueeSection.jsx';
import StatsSection from '../components/sections/StatsSection.jsx';
import TiltCardsSection from '../components/sections/TiltCardsSection.jsx';
import ParallaxVideoSection from '../components/sections/ParallaxVideoSection.jsx';
import TestimonialsSection from '../components/sections/TestimonialsSection.jsx';

export default function HomePage({ onNavigate, onOpenOs }) {
  return (
    <div className="page-container page-enter">
      {/* 1. Interactive Hero with Kinetic Hand Video */}
      <HeroSection
        onOpenOs={onOpenOs}
        onNavigateDomains={() => onNavigate('domains')}
        onNavigateContact={() => onNavigate('contact')}
      />

      {/* 2. Animated Marquee Tech Strip */}
      <MarqueeSection />

      {/* 3. Highlights & Quick Navigation Grid */}
      <section className="home-highlights-section">
        <div className="home-highlights-container">
          <div className="section-tag-row">
            <span className="section-tag-pill">Pioneering Autonomy</span>
          </div>
          <h2 className="home-highlights-title">
            Where Silicon Meets <span>Kinetic Intelligence</span>
          </h2>
          <p className="home-highlights-desc">
            Explore our specialized divisions driving next-generation cybernetic hardware, neural perception, and autonomous robotics.
          </p>

          <div className="home-cards-grid">
            <div className="home-feature-card" onClick={() => onNavigate('about')}>
              <div className="hfc-icon">🦾</div>
              <div className="hfc-badge">Engineering Ethos</div>
              <h3>Kinetic Articulation</h3>
              <p>42-DOF precision mechanical hands and biomimetic kinematics calibrated for sub-millimeter dexterity.</p>
              <div className="hfc-link">Learn About Us →</div>
            </div>

            <div className="home-feature-card" onClick={() => onNavigate('domains')}>
              <div className="hfc-icon">🔬</div>
              <div className="hfc-badge">Research & Labs</div>
              <h3>Core Domains</h3>
              <p>From neuromorphic edge AI to high-torque robotics and aerospace autonomous navigation.</p>
              <div className="hfc-link">Explore 6 Domains →</div>
            </div>

            <div className="home-feature-card" onClick={() => onNavigate('products')}>
              <div className="hfc-icon">⚡</div>
              <div className="hfc-badge">Hardware Systems</div>
              <h3>Autonomous Products</h3>
              <p>Production-grade robotic hands, vision pods, and rover platforms engineered for industrial scale.</p>
              <div className="hfc-link">Browse Catalog →</div>
            </div>

            <div className="home-feature-card" onClick={() => onNavigate('contact')}>
              <div className="hfc-icon">💬</div>
              <div className="hfc-badge">Collaborations</div>
              <h3>Custom Projects</h3>
              <p>Partner with our hardware & software team to deploy bespoke autonomous units for your enterprise.</p>
              <div className="hfc-link">Get in Touch →</div>
            </div>
          </div>

          {/* Quick desktop teaser banner */}
          <div className="home-os-banner">
            <div className="hob-left">
              <span className="hob-badge">Interactive Desktop Mode</span>
              <h3>Experience Robogenesis OS Simulation</h3>
              <p>Test real-time telemetry, run code in 8 languages, and inspect interactive 3D models in an authentic macOS environment.</p>
            </div>
            <button className="btn-primary" onClick={onOpenOs}>
              Launch macOS View
            </button>
          </div>
        </div>
      </section>

      {/* 4. Animated Stats with Particles */}
      <StatsSection />

      {/* 5. 3D Tilt Cards Showcase */}
      <TiltCardsSection />

      {/* 6. Full-bleed Parallax Video Section */}
      <ParallaxVideoSection onNavigate={onNavigate} />

      {/* 7. Testimonials & Team */}
      <TestimonialsSection />
    </div>
  );
}
