import { useRef, useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';

const CARDS = [
  {
    title: 'Kinetic Robotic Hand',
    subtitle: 'RG-Hand v3.8 · 42-DOF',
    desc: 'Biomimetic dexterous hand with variable impedance actuators. Handles fragile glassware and 20kg payloads alike.',
    icon: '🦾',
    color: '#0a84ff',
    tags: ['42-DOF', 'Sub-mm Precision', 'ROS2 Compatible'],
    stat: '0.3mm',
    statLabel: 'Positioning Accuracy',
    badge: 'Flagship',
  },
  {
    title: 'Neural Vision Pod',
    subtitle: 'EdgeVision v1 · 4 TOPS',
    desc: 'Zero-cloud stereo RGB-D camera running YOLO at 120fps. 100% on-device AI with full data privacy.',
    icon: '👁️',
    color: '#bf5af2',
    tags: ['4 TOPS NPU', '120 FPS', 'Zero Cloud'],
    stat: '<5ms',
    statLabel: 'Inference Latency',
    badge: 'Edge AI',
  },
  {
    title: 'SmartNode IoT Board',
    subtitle: 'v2 · ESP32-S3 + LoRaWAN',
    desc: 'Industrial IoT board with 20km LoRa range, solar MPPT, and IP67 housing for harsh field deployments.',
    icon: '📡',
    color: '#30d158',
    tags: ['LoRaWAN 20km', 'Solar MPPT', 'IP67 Rated'],
    stat: '20km',
    statLabel: 'Wireless Range',
    badge: 'In Stock',
  },
  {
    title: 'Cognitive Brain Module',
    subtitle: 'v4.2 · Synaptic Pipeline',
    desc: '12-layer neuromorphic cortex mesh with Hebbian plasticity. Real-time motor command dispatch at sub-10ms.',
    icon: '🧠',
    color: '#ff9f0a',
    tags: ['Neuromorphic', 'Hebbian Learning', '<10ms Reflex'],
    stat: '4 TOPS',
    statLabel: 'Neural Inference',
    badge: 'Research',
  },
  {
    title: 'RG-247 Rover Platform',
    subtitle: 'Full Autonomy Stack',
    desc: 'Fully modular 6-wheel research rover with ROS2 Nav2, 360° LiDAR, and 42-DOF arm for payload manipulation.',
    icon: '🤖',
    color: '#ff453a',
    tags: ['Nav2 Stack', '360° LiDAR', 'Isaac Sim Ready'],
    stat: 'Q3 2026',
    statLabel: 'Pre-order Now',
    badge: 'Pre-order',
  },
  {
    title: 'VaultShield™ Token',
    subtitle: 'EAL6+ HSM Enclave',
    desc: 'Hardware security module with tamper-proof EAL6+ enclave for cryptographic key protection in robotics fleets.',
    icon: '🔐',
    color: '#64d2ff',
    tags: ['EAL6+ Certified', 'HSM Enclave', 'Fleet Auth'],
    stat: '256-bit',
    statLabel: 'AES Encryption',
    badge: 'Security',
  },
];

function TiltCard({ card, index, isVisible }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -10;
    const rotateY = ((x - cx) / cx) * 10;
    setTransform(`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card${isVisible ? ' tilt-card--visible' : ''}`}
      style={{
        '--tc-color': card.color,
        transform,
        transitionDelay: `${index * 80}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Radial glow on hover */}
      <div
        className="tilt-card-glow"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${card.color}28 0%, transparent 70%)`,
        }}
      />

      <div className="tc-top">
        <div className="tc-badge-row">
          <span className="tc-badge" style={{ background: card.color + '22', color: card.color }}>
            {card.badge}
          </span>
          <div className="tc-icon-wrap" style={{ background: card.color + '18' }}>
            <span className="tc-icon">{card.icon}</span>
          </div>
        </div>
        <h3 className="tc-title">{card.title}</h3>
        <div className="tc-subtitle" style={{ color: card.color }}>{card.subtitle}</div>
        <p className="tc-desc">{card.desc}</p>
      </div>

      <div className="tc-bottom">
        <div className="tc-stat-block" style={{ borderColor: card.color + '44' }}>
          <div className="tc-stat-value" style={{ color: card.color }}>{card.stat}</div>
          <div className="tc-stat-label">{card.statLabel}</div>
        </div>
        <div className="tc-tags">
          {card.tags.map((tag) => (
            <span key={tag} className="tc-tag" style={{ color: card.color + 'cc' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TiltCardsSection() {
  const [ref, isVisible] = useScrollAnimation(0.05);

  return (
    <section className="tiltcards-section" ref={ref} id="showcase">
      <div className="tiltcards-container">
        <div className={`tiltcards-header${isVisible ? ' anim-slide-up' : ''}`}>
          <span className="section-tag-pill">Product Showcase</span>
          <h2 className="tiltcards-title">
            Hardware Built to <span>Impress</span>
          </h2>
          <p className="tiltcards-subtitle">
            Hover over each card to interact. Every product engineered from silicon to system software.
          </p>
        </div>

        <div className="tiltcards-grid">
          {CARDS.map((card, i) => (
            <TiltCard key={card.title} card={card} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
