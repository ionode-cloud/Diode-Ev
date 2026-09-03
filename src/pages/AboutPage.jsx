import AboutSection from '../components/sections/AboutSection.jsx';

export default function AboutPage({ onOpenOs, onNavigate }) {
  return (
    <div className="page-container page-enter">
      {/* Page Hero Header */}
      <div className="page-hero-header">
        <div className="page-hero-inner">
          <div className="page-breadcrumb">
            <button onClick={() => onNavigate('home')}>Home</button>
            <span>/</span>
            <span>About Us</span>
          </div>
          <h1 className="page-title">
            Engineering the <span>Autonomous Frontier</span>
          </h1>
          <p className="page-subtitle">
            Robogenesis fuses mechanical precision, neuromorphic edge AI, and high-frequency sensor fusion to create systems that perceive, adapt, and act in the physical world.
          </p>
        </div>
      </div>

      {/* Main Interactive About Section with 3D Head & Metrics */}
      <AboutSection onOpenOs={onOpenOs} />

      {/* Additional Pillars Section */}
      <section className="about-pillars-section">
        <div className="about-pillars-container">
          <div className="section-tag-row">
            <span className="section-tag-pill">Core Principles</span>
          </div>
          <h2 className="section-heading-lg">
            How We Build <span>Cybernetic Systems</span>
          </h2>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-num">01</div>
              <h3>Biomimetic Compliance</h3>
              <p>
                Biological organisms don&apos;t move with rigid, brittle actuators. Our robotic limbs feature variable impedance and soft compliance mechanics, enabling delicate manipulation of fragile glassware and high-power structural loads alike.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-num">02</div>
              <h3>Neuromorphic Processing</h3>
              <p>
                By distributing spiking neural network processors directly into the joint nodes, reflex loops happen in microsecond intervals without waiting for a centralized cloud or host compute trip.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-num">03</div>
              <h3>Full-Stack Sovereignty</h3>
              <p>
                We design and manufacture our hardware, power distribution, embedded RTOS, and AI models under one roof. No vendor lock-in, no latency bottlenecks—total engineering synchronization.
              </p>
            </div>
          </div>

          <div className="about-cta-box">
            <div>
              <h3>Have a mission-critical robotics challenge?</h3>
              <p>Collaborate with our engineering leads to design bespoke autonomous hardware.</p>
            </div>
            <button className="btn-primary" onClick={() => onNavigate('contact')}>
              Talk with Our Engineers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
