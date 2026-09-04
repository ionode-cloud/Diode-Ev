import ProductsSection from '../components/sections/ProductsSection.jsx';
import TiltCardsSection from '../components/sections/TiltCardsSection.jsx';
import StatsSection from '../components/sections/StatsSection.jsx';
import TestimonialsSection from '../components/sections/TestimonialsSection.jsx';
import MarqueeSection from '../components/sections/MarqueeSection.jsx';

export default function ProductsPage({ onNavigate }) {
  return (
    <div className="page-container page-enter">
      {/* Page Hero Header */}
      <div className="page-hero-header">
        <div className="page-hero-inner">
          <div className="page-breadcrumb">
            <button onClick={() => onNavigate('home')}>Home</button>
            <span>/</span>
            <span>Products</span>
          </div>
          <h1 className="page-title">
            Commercial Hardware & <span>Autonomous Systems</span>
          </h1>
          <p className="page-subtitle">
            From 42-DOF biomimetic hands to neuromorphic stereo vision pods and rugged all-terrain rover chassis, discover production-ready robotic platforms built for reliability.
          </p>
        </div>
      </div>

      {/* Main Products Catalog Section */}
      <ProductsSection />

      {/* Animated Marquee */}
      <MarqueeSection />

      {/* 3D Tilt Card Showcase */}
      <TiltCardsSection />

      {/* Stats */}
      <StatsSection />

      {/* Enterprise Integration & Custom Orders */}
      <section className="products-enterprise-section">
        <div className="products-enterprise-container">
          <div className="section-tag-row">
            <span className="section-tag-pill">Enterprise Integration</span>
          </div>
          <h2 className="section-heading-lg">
            Hardware Tailored to Your <span>Operational Scale</span>
          </h2>

          <div className="enterprise-grid">
            <div className="enterprise-card">
              <div className="ec-icon">📦</div>
              <h3>Turnkey Developer Kits</h3>
              <p>Pre-calibrated plug-and-play kits including ROS2 nodes, Python/C++ SDKs, CAD mounting files, and simulator meshes for Isaac Sim and Gazebo.</p>
            </div>

            <div className="enterprise-card">
              <div className="ec-icon">🛡️</div>
              <h3>24/7 Fleet Telemetry & SLAs</h3>
              <p>Hardware-level diagnostic monitoring, over-the-air firmware updates, and direct access to field hardware engineering support.</p>
            </div>

            <div className="enterprise-card">
              <div className="ec-icon">🔧</div>
              <h3>Custom End-Effector Tooling</h3>
              <p>Need specialized grippers, thermal imaging, or extreme-temperature alloys? We produce custom variations with full QA certification.</p>
            </div>
          </div>

          <div className="about-cta-box">
            <div>
              <h3>Ready to equip your robotic fleet or lab?</h3>
              <p>Contact our sales engineers for volume discounts, procurement quotes, and educational grants.</p>
            </div>
            <button className="btn-primary" onClick={() => onNavigate('contact')}>
              Request Official Quotation
            </button>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <TestimonialsSection />
    </div>
  );
}
