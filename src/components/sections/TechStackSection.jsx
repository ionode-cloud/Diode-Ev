import { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';

const TECH_STACK = [
  {
    category: 'Robotics & Motion',
    color: '#0a84ff',
    icon: '🤖',
    skills: [
      { name: 'ROS2 / ROS', level: 95 },
      { name: '42-DOF Kinematics', level: 92 },
      { name: 'SLAM Navigation', level: 88 },
      { name: 'Gazebo / Isaac Sim', level: 85 },
    ],
  },
  {
    category: 'AI & Neural Compute',
    color: '#bf5af2',
    icon: '🧠',
    skills: [
      { name: 'Neuromorphic AI', level: 90 },
      { name: 'YOLO / MobileNet', level: 93 },
      { name: 'TensorRT Optimization', level: 87 },
      { name: 'Edge Inference (4 TOPS)', level: 91 },
    ],
  },
  {
    category: 'Embedded & IoT',
    color: '#30d158',
    icon: '⚙️',
    skills: [
      { name: 'Bare-Metal RTOS', level: 96 },
      { name: 'STM32 / ESP32-S3', level: 94 },
      { name: 'Multi-layer PCB Design', level: 89 },
      { name: 'LoRaWAN / BLE 5.0', level: 86 },
    ],
  },
  {
    category: 'Sensors & Perception',
    color: '#ff9f0a',
    icon: '👁️',
    skills: [
      { name: 'Solid-State LiDAR', level: 90 },
      { name: 'Stereo RGB-D Vision', level: 88 },
      { name: 'IMU Sensor Fusion', level: 93 },
      { name: 'Tactile Haptic Arrays', level: 82 },
    ],
  },
];

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [ref, isVisible] = useScrollAnimation(0.1);
  const active = TECH_STACK[activeTab];

  return (
    <section className="techstack-section" ref={ref} id="techstack">
      <div className="techstack-container">
        <div className={`techstack-header${isVisible ? ' anim-slide-up' : ''}`}>
          <span className="section-tag-pill">Engineering Depth</span>
          <h2 className="techstack-title">
            Technology <span>Capabilities</span>
          </h2>
          <p className="techstack-subtitle">
            A full-spectrum engineering stack — from silicon to intelligence.
          </p>
        </div>

        <div className={`techstack-layout${isVisible ? ' anim-fade-in' : ''}`}>
          {/* Tab nav */}
          <div className="ts-tab-nav">
            {TECH_STACK.map((cat, i) => (
              <button
                key={cat.category}
                className={`ts-tab-btn${activeTab === i ? ' active' : ''}`}
                style={activeTab === i ? { borderColor: cat.color, color: cat.color } : {}}
                onClick={() => setActiveTab(i)}
              >
                <span className="ts-tab-icon">{cat.icon}</span>
                <span>{cat.category}</span>
              </button>
            ))}
          </div>

          {/* Skills panel */}
          <div className="ts-skills-panel" style={{ '--accent-color': active.color }}>
            <div className="ts-panel-header">
              <span className="ts-panel-icon">{active.icon}</span>
              <h3 className="ts-panel-title">{active.category}</h3>
            </div>
            <div className="ts-skills-list">
              {active.skills.map((skill, idx) => (
                <div
                  key={skill.name}
                  className={`ts-skill-row${isVisible ? ' ts-skill-visible' : ''}`}
                  style={{ transitionDelay: `${idx * 120 + 200}ms` }}
                >
                  <div className="ts-skill-top">
                    <span className="ts-skill-name">{skill.name}</span>
                    <span className="ts-skill-pct" style={{ color: active.color }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="ts-bar-track">
                    <div
                      className="ts-bar-fill"
                      style={{
                        width: isVisible ? `${skill.level}%` : '0%',
                        background: `linear-gradient(90deg, ${active.color}aa, ${active.color})`,
                        transitionDelay: `${idx * 120 + 400}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="ts-expertise-badge" style={{ background: active.color + '18', borderColor: active.color + '44' }}>
              <span style={{ color: active.color }}>✦</span>
              Expert-level in-house capability — no outsourcing
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
