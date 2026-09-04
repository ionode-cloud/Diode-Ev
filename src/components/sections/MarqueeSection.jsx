/**
 * MarqueeSection — Animated infinite-scroll logo/tech strip.
 * Duplicated to create seamless CSS marquee animation.
 */

const TECH_ITEMS = [
  { icon: '🤖', label: 'ROS2 Jazzy' },
  { icon: '🧠', label: 'Neuromorphic AI' },
  { icon: '📡', label: 'LoRaWAN 5G' },
  { icon: '⚙️', label: '42-DOF Kinematics' },
  { icon: '🔬', label: 'Edge Inference' },
  { icon: '🛰️', label: 'LiDAR SLAM' },
  { icon: '💡', label: 'Embedded RTOS' },
  { icon: '🦾', label: 'Biomimetics' },
  { icon: '🔌', label: 'Multi-layer PCB' },
  { icon: '🌐', label: 'Isaac Sim' },
  { icon: '⚡', label: 'MPPT Energy' },
  { icon: '🎯', label: 'YOLO Vision' },
];

const PARTNER_ITEMS = [
  { label: 'NVIDIA Jetson', color: '#76b900' },
  { label: 'ROS2 Foundation', color: '#0a84ff' },
  { label: 'STMicroelectronics', color: '#03a8e0' },
  { label: 'ESP32 Ecosystem', color: '#e74c3c' },
  { label: 'Gazebo Sim', color: '#ff9f0a' },
  { label: 'OpenCV', color: '#30d158' },
  { label: 'TensorRT', color: '#76b900' },
  { label: 'Raspberry Pi', color: '#c51a4a' },
  { label: 'Arduino Pro', color: '#00979d' },
  { label: 'Qualcomm AI', color: '#3253dc' },
];

function MarqueeTrack({ items, reverse = false, renderItem }) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee-track-outer${reverse ? ' marquee-reverse' : ''}`}>
      <div className="marquee-track-inner">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  return (
    <section className="marquee-section" aria-label="Technologies and partners">
      <div className="marquee-header">
        <span className="marquee-label">Powering our stack</span>
      </div>

      {/* Row 1 — Tech stack */}
      <MarqueeTrack
        items={TECH_ITEMS}
        renderItem={(item) => (
          <>
            <span className="mq-icon">{item.icon}</span>
            <span className="mq-label">{item.label}</span>
          </>
        )}
      />

      {/* Row 2 — Partners (reverse) */}
      <MarqueeTrack
        items={PARTNER_ITEMS}
        reverse
        renderItem={(item) => (
          <>
            <span
              className="mq-dot"
              style={{ background: item.color }}
            />
            <span className="mq-label">{item.label}</span>
          </>
        )}
      />
    </section>
  );
}
