import OsWindow from '../OsWindow.jsx';

const BRAIN_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4';

export default function WinSectionDomains({
  isOpen,
  isFocused,
  zIndex,
  onClose,
  onMin,
  onFocus,
  onOpenWin,
}) {
  return (
    <OsWindow
      id="win-section-domains"
      title="🔬 Domains & Capabilities — Neural Brain Mesh"
      isOpen={isOpen}
      isFocused={isFocused}
      zIndex={zIndex}
      initialWidth={760}
      initialHeight={560}
      initialTop={60}
      initialLeft={140}
      onClose={onClose}
      onMin={onMin}
      onFocus={onFocus}
      bodyStyle={{
        padding: 0,
        background: '#090d16',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="os-section-win-content" style={{ padding: '24px 28px' }}>
        <span className="os-sec-tag">🔬 Core Domains &amp; Neural Architecture</span>
        <h2 className="os-sec-h2">Frontier Technology Disciplines</h2>
        <p className="os-sec-p">
          Our multidisciplinary lab combines deep mechanical engineering, digital signal processing, and modern artificial
          intelligence across specialized disciplines.
        </p>

        {/* Embedded Neural Brain Video Visualizer */}
        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            background: '#EDEEF5',
            height: '190px',
            position: 'relative',
            marginBottom: '20px',
          }}
        >
          <video
            src={BRAIN_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '14px',
              background: 'rgba(26,26,26,0.85)',
              backdropFilter: 'blur(8px)',
              padding: '5px 12px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.2)',
              fontSize: '11.5px',
              color: '#9fff00',
              fontWeight: 700,
            }}
          >
            ● Synaptic Cognitive Pipeline · 4 TOPS Active
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '14px',
              background: 'rgba(15, 23, 42, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              color: '#f8fafc',
              fontWeight: 600,
            }}
          >
            Neuromorphic Mesh Architecture
          </div>
        </div>

        {/* 6 Core Domains Grid */}
        <div className="os-domain-grid" style={{ marginBottom: '20px' }}>
          <div className="os-domain-card">
            <div className="os-dc-icon">⚙️</div>
            <div className="os-dc-name">Embedded Systems</div>
            <div className="os-dc-desc">
              ARM Cortex, STM32, ESP32, multi-layer high-speed PCB layouts, and real-time RTOS firmware.
            </div>
          </div>
          <div className="os-domain-card">
            <div className="os-dc-icon">🤖</div>
            <div className="os-dc-name">ROS2 Robotics</div>
            <div className="os-dc-desc">
              Modular 42-DOF articulation, LiDAR mapping, Nav2 autonomous waypoint tracking, and kinematics.
            </div>
          </div>
          <div className="os-domain-card">
            <div className="os-dc-icon">📡</div>
            <div className="os-dc-name">IoT Systems</div>
            <div className="os-dc-desc">
              Low-power LoRaWAN sensor arrays, MQTT edge gateways, and industrial telemetry.
            </div>
          </div>
          <div className="os-domain-card">
            <div className="os-dc-icon">🧠</div>
            <div className="os-dc-name">AI &amp; Neural Vision</div>
            <div className="os-dc-desc">
              On-device computer vision, 4 TOPS NPU model quantization, YOLO detection, zero-cloud AI.
            </div>
          </div>
          <div className="os-domain-card">
            <div className="os-dc-icon">🖨️</div>
            <div className="os-dc-name">3D Additive Lab</div>
            <div className="os-dc-desc">
              FDM, SLA, and SLS rapid prototyping for robotic chassis and weatherproof enclosures.
            </div>
          </div>
          <div className="os-domain-card">
            <div className="os-dc-icon">🚀</div>
            <div className="os-dc-name">Digital Twin Sim</div>
            <div className="os-dc-desc">
              Full physics simulation in Isaac Sim and Gazebo to stress-test autonomous routines.
            </div>
          </div>
        </div>

        {/* Quick navigation pill links */}
        <div className="os-pill-row">
          <button className="os-pill-link" onClick={() => onOpenWin('win-section-products')}>
            📦 View Hardware Catalog
          </button>
          <button className="os-pill-link" onClick={() => onOpenWin('win-section-contact')}>
            💬 Request Feasibility Study
          </button>
        </div>
      </div>
    </OsWindow>
  );
}
