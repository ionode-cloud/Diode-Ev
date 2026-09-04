import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';

const TIMELINE = [
  {
    year: '2022',
    quarter: 'Q1',
    title: 'Robogenesis Founded',
    desc: 'Two engineers with a vision: full-stack autonomous hardware built under one roof. First office in Bangalore with 3 team members.',
    icon: '🚀',
    color: '#0a84ff',
    side: 'left',
  },
  {
    year: '2022',
    quarter: 'Q4',
    title: 'SmartNode IoT v1 Shipped',
    desc: 'First commercial product: ESP32-S3 IoT board with LoRaWAN, BLE, and solar MPPT. 200 units sold in 6 weeks.',
    icon: '📡',
    color: '#30d158',
    side: 'right',
  },
  {
    year: '2023',
    quarter: 'Q2',
    title: 'Neuromorphic AI Lab Launched',
    desc: 'Dedicated 4 TOPS edge inference research division. Spiking neural networks trained for real-time object detection without cloud dependency.',
    icon: '🧠',
    color: '#bf5af2',
    side: 'left',
  },
  {
    year: '2023',
    quarter: 'Q3',
    title: 'RG-100 Robotic Hand Prototype',
    desc: 'First 18-DOF dexterous hand prototype demonstrated at RoboIndia 2023. Sub-millimeter precision validated on surgical glassware manipulation.',
    icon: '🦾',
    color: '#ff9f0a',
    side: 'right',
  },
  {
    year: '2024',
    quarter: 'Q1',
    title: 'EdgeVision AI Module Released',
    desc: '120fps global shutter with 4 TOPS onboard inference. First zero-cloud robotic vision platform in the Indian market.',
    icon: '👁️',
    color: '#64d2ff',
    side: 'left',
  },
  {
    year: '2024',
    quarter: 'Q3',
    title: '248 Active Units Deployed',
    desc: 'Robotics fleet milestone: 248 robotic units active across aerospace, healthcare, and smart factory customers globally.',
    icon: '🌍',
    color: '#30d158',
    side: 'right',
  },
  {
    year: '2025',
    quarter: 'Q1',
    title: 'RG-247 Platform — 42-DOF',
    desc: 'Flagship full-body autonomous platform with 42 degrees of freedom, ROS2 Jazzy, solid-state LiDAR, and Isaac Sim verification.',
    icon: '⚙️',
    color: '#ff453a',
    side: 'left',
  },
  {
    year: '2026',
    quarter: 'Q3',
    title: 'Pre-Order Launch & Enterprise Tier',
    desc: 'RG-247 pre-orders open. Enterprise managed fleet platform launched with 99.9% SLA and dedicated hardware engineering support.',
    icon: '🏆',
    color: '#ff9f0a',
    side: 'right',
    current: true,
  },
];

export default function TimelineSection() {
  const [ref, isVisible] = useScrollAnimation(0.05);

  return (
    <section className="timeline-section" ref={ref} id="timeline">
      <div className="timeline-container">
        <div className={`timeline-header${isVisible ? ' anim-slide-up' : ''}`}>
          <span className="section-tag-pill">Our Journey</span>
          <h2 className="timeline-title">
            From Garage to <span>Global Robotics</span>
          </h2>
          <p className="timeline-subtitle">
            Four years of relentless engineering — every milestone built in-house, every system field-proven.
          </p>
        </div>

        <div className="timeline-track">
          {/* Center spine */}
          <div className="timeline-spine">
            <div
              className="timeline-spine-fill"
              style={{ height: isVisible ? '100%' : '0%' }}
            />
          </div>

          {TIMELINE.map((item, i) => (
            <div
              key={i}
              className={`timeline-row timeline-${item.side}${isVisible ? ' tl-row--visible' : ''}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="tl-card" style={{ '--tl-color': item.color }}>
                {item.current && <div className="tl-current-badge">Now</div>}
                <div className="tl-time">
                  <span className="tl-year">{item.year}</span>
                  <span className="tl-quarter" style={{ color: item.color }}>{item.quarter}</span>
                </div>
                <h3 className="tl-title">{item.title}</h3>
                <p className="tl-desc">{item.desc}</p>
              </div>

              {/* Center node */}
              <div
                className={`tl-node${item.current ? ' tl-node--pulse' : ''}`}
                style={{ background: item.color, boxShadow: `0 0 18px ${item.color}66` }}
              >
                <span>{item.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
