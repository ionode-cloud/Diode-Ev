import { useState, useRef } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';

const TESTIMONIALS = [
  {
    quote: "Robogenesis delivered a fully autonomous inspection rover for our semiconductor fab line in just 14 weeks. The precision of the 42-DOF hand exceeded every spec we set.",
    author: "Dr. Anika Rao",
    role: "VP of Robotics Automation",
    org: "NanoFab Global",
    avatar: "🧑‍🔬",
    color: '#0a84ff',
    rating: 5,
  },
  {
    quote: "Their neuromorphic edge AI module replaced our entire cloud vision pipeline. Zero latency, full privacy, and the YOLO model runs at 120fps on-device. Genuinely game-changing.",
    author: "Marco Fernández",
    role: "Lead Systems Architect",
    org: "AeroVision Systems",
    avatar: "👨‍💻",
    color: '#bf5af2',
    rating: 5,
  },
  {
    quote: "We integrated Robogenesis's SmartNode IoT boards across 2,000 offshore turbines. The solar MPPT charging and LoRaWAN mesh network has been flawless for 18 months.",
    author: "Priya Nathani",
    role: "Infrastructure Director",
    org: "WindForge Energy",
    avatar: "👩‍💼",
    color: '#30d158',
    rating: 5,
  },
  {
    quote: "The compliant prosthetic control system they engineered has sub-5ms haptic feedback. Our patients report it feels more natural than anything we've tested from larger vendors.",
    author: "Dr. Jonas Müller",
    role: "Clinical Research Director",
    org: "BioSynth Labs",
    avatar: "🧑‍⚕️",
    color: '#ff9f0a',
    rating: 5,
  },
];

const TEAM = [
  { name: 'Aryan Singh', role: 'CEO & Co-Founder', emoji: '🧑‍🚀', color: '#0a84ff', bio: 'Robotics systems architect with 10 years in ROS2 and biomimetic kinematics.' },
  { name: 'Priya Mehra', role: 'CTO — Neural AI', emoji: '👩‍💻', color: '#bf5af2', bio: 'Neuromorphic AI researcher; former lead at a top-5 edge inference lab.' },
  { name: 'Siddharth Rao', role: 'Chief Hardware Engineer', emoji: '🧑‍🔧', color: '#30d158', bio: 'Expert in multi-layer PCB design, power systems, and RTOS firmware.' },
  { name: 'Anjali Gupta', role: 'Head of Embedded Systems', emoji: '👩‍🔬', color: '#ff9f0a', bio: '12 years in STM32, ESP32, and bare-metal RTOS for industrial IoT.' },
];

function StarRating({ count }) {
  return (
    <div className="star-row">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="star">★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [view, setView] = useState('testimonials'); // 'testimonials' | 'team'
  const [ref, isVisible] = useScrollAnimation(0.1);

  const active = TESTIMONIALS[activeIdx];

  return (
    <section className="testimonials-section" ref={ref} id="testimonials">
      <div className="testimonials-container">
        <div className={`testimonials-header${isVisible ? ' anim-slide-up' : ''}`}>
          <span className="section-tag-pill">Voices & Team</span>
          <h2 className="testimonials-title">
            Trusted by <span>Builders Worldwide</span>
          </h2>
        </div>

        {/* Toggle */}
        <div className="testimonials-toggle">
          <button
            className={`tt-btn${view === 'testimonials' ? ' active' : ''}`}
            onClick={() => setView('testimonials')}
          >
            💬 Client Testimonials
          </button>
          <button
            className={`tt-btn${view === 'team' ? ' active' : ''}`}
            onClick={() => setView('team')}
          >
            👥 Our Team
          </button>
        </div>

        {view === 'testimonials' && (
          <div className={`testimonials-layout${isVisible ? ' anim-fade-in' : ''}`}>
            {/* Big featured quote */}
            <div className="testimonial-featured" key={activeIdx} style={{ '--t-color': active.color }}>
              <div className="tf-quote-mark">"</div>
              <StarRating count={active.rating} />
              <p className="tf-quote">{active.quote}</p>
              <div className="tf-author-row">
                <div className="tf-avatar" style={{ background: active.color + '22' }}>
                  <span>{active.avatar}</span>
                </div>
                <div>
                  <div className="tf-name">{active.author}</div>
                  <div className="tf-role">{active.role} · <span style={{ color: active.color }}>{active.org}</span></div>
                </div>
              </div>
            </div>

            {/* Selector dots */}
            <div className="testimonial-nav">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={i}
                  className={`t-nav-dot${activeIdx === i ? ' active' : ''}`}
                  style={activeIdx === i ? { background: t.color } : {}}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`View testimonial from ${t.author}`}
                />
              ))}
            </div>

            {/* Thumbnail cards */}
            <div className="testimonial-cards-row">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={i}
                  className={`tc-card${activeIdx === i ? ' active' : ''}`}
                  style={activeIdx === i ? { borderColor: t.color } : {}}
                  onClick={() => setActiveIdx(i)}
                >
                  <span className="tc-avatar" style={{ background: t.color + '22' }}>{t.avatar}</span>
                  <div>
                    <div className="tc-name">{t.author}</div>
                    <div className="tc-org" style={activeIdx === i ? { color: t.color } : {}}>{t.org}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'team' && (
          <div className={`team-grid${isVisible ? ' anim-fade-in' : ''}`}>
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className={`team-card${isVisible ? ' team-card--visible' : ''}`}
                style={{ transitionDelay: `${i * 100}ms`, '--t-color': member.color }}
              >
                <div className="team-avatar-wrap" style={{ background: member.color + '18' }}>
                  <span className="team-avatar">{member.emoji}</span>
                  <div className="team-avatar-ring" style={{ borderColor: member.color }} />
                </div>
                <h3 className="team-name">{member.name}</h3>
                <div className="team-role" style={{ color: member.color }}>{member.role}</div>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
