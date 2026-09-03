import { useState } from 'react';

const COIN_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4';

const TABS = ['Products', 'Services CLI', 'Enterprise'];

const PRODUCTS = [
  {
    name: 'RG-247 Autonomous Robotic Platform v3',
    badge: '🏆 Flagship',
    badgeColor: 'rgba(10,132,255,0.15)',
    badgeText: '#64a3ff',
    desc: 'Fully modular research chassis with ROS2 Jazzy, 360° solid-state LiDAR, dual RGB-D stereo cameras, and 42-DOF kinetic articulation for indoor navigation, search-and-rescue, and academic labs.',
    features: ['42-DOF Kinetic Articulation', 'ROS2 Jazzy + Nav2 Navigation', 'Solid-State LiDAR 360° Sweep', 'Isaac Sim Verified Simulation'],
    status: '🔵 Pre-order Q3 2026',
    statusColor: '#64a3ff',
    featured: true,
  },
  {
    name: 'SmartNode IoT Board v2',
    badge: '📡 IoT Dev Board',
    badgeColor: 'rgba(48,209,88,0.12)',
    badgeText: '#30d158',
    desc: 'Industrial dev board with ESP32-S3 dual-core, LoRa SX1262 transceiver, BLE 5.0, WiFi 6, and 12 isolated sensor breakouts with onboard solar MPPT charging.',
    features: ['ESP32-S3 240 MHz Dual-Core', 'LoRaWAN SX1262 — 20km Range', 'Solar MPPT + 18650 Li-Ion', 'IP67 Industrial Enclosure Option'],
    status: '● In Stock — Ships in 24h',
    statusColor: '#30d158',
    featured: false,
  },
  {
    name: 'EdgeVision AI Module v1',
    badge: '🎯 Edge AI Camera',
    badgeColor: 'rgba(191,90,242,0.12)',
    badgeText: '#bf5af2',
    desc: 'Compact neural vision module with 4 TOPS onboard inference. Runs real-time YOLO, MobileNet, and custom models locally — zero cloud dependency, 100% private.',
    features: ['4 TOPS Neural Processing Unit', 'YOLO + Custom Model Support', '120 FPS Global Shutter Camera', 'Zero-Cloud Private Inference'],
    status: '◐ Production Eval Units',
    statusColor: '#ff9f0a',
    featured: false,
  },
];

const CLI_LINES = [
  { type: 'prompt', path: '~/robogenesis', cmd: 'ros2 launch rg247 full_stack.launch.py' },
  { type: 'output', text: '[INFO] ROS2 Jazzy Jalisco — Initialized' },
  { type: 'output', text: '[INFO] Nav2 Stack: Active — 42 joints online' },
  { type: 'highlight', text: '[LIDAR] 360° sweep: 0 obstacles detected ✓' },
  { type: 'prompt', path: '~/robogenesis', cmd: 'rgos deploy --env production --node arm-v3' },
  { type: 'output', text: '[DEPLOY] Building firmware image...' },
  { type: 'highlight', text: '[SUCCESS] arm-v3 flashed — 248ms upload time ✓' },
];

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState('Products');

  return (
    <section className="section products-section" id="products">
      <div className="container-fluid">
        <div className="products-split-layout">
          {/* Left — Coin panel */}
          <div className="split-left-coin">
            <div className="coin-showcase-panel">
              <div className="coin-video-frame">
                <video
                  id="coinVideo"
                  className="coin-video"
                  src={COIN_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="coin-badge-floating">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#a78bfa', display: 'inline-block' }} />
                  ⚡ EAL6+ HSM Secure Enclave
                </div>
              </div>
              <div style={{ padding: '14px 18px', background: '#12141f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>VaultShield™ Hardware Token</span>
                <a href="/coin.html" target="_blank" style={{ padding: '5px 14px', borderRadius: 999, background: '#7342E2', color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                  Open coin.html ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right — Product tabs */}
          <div className="split-right-products">
            <div className="products-header-wrap">
            <div>
              <span className="section-tag">📦 Products & Engineering</span>
              <h2 className="section-title" style={{ marginTop: 8 }}>Hardware-Grade Solutions</h2>
              <p className="section-sub">
                From autonomous robotics platforms to edge AI modules — production-ready and field-proven.
              </p>
            </div>

            <div className="tabs-nav">
              {TABS.map((t) => (
                <button
                  key={t}
                  className={`tab-btn${activeTab === t ? ' active' : ''}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

            {activeTab === 'Products' && (
              <div className="products-grid">
                {PRODUCTS.map((p) => (
                  <div key={p.name} className={`product-card${p.featured ? ' featured' : ''}`}>
                    <div>
                      <div className="product-badge" style={{ background: p.badgeColor, color: p.badgeText }}>
                        {p.badge}
                      </div>
                      <div className="product-name">{p.name}</div>
                      <div className="product-desc">{p.desc}</div>
                      <div className="product-features">
                        {p.features.map((f) => <div key={f} className="feat-item">{f}</div>)}
                      </div>
                    </div>
                    <div className="product-footer">
                      <div className="product-status">
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.statusColor, display: 'inline-block' }} />
                        {p.status}
                      </div>
                      <button className="product-btn">Enquire →</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Services CLI' && (
              <div className="terminal-box">
                {CLI_LINES.map((l, i) => {
                  if (l.type === 'prompt') return (
                    <div key={i}>
                      <span className="term-prompt">robogenesis</span>
                      <span style={{ color: 'rgba(255,255,255,0.3)' }}> in </span>
                      <span className="term-path">{l.path}</span>
                      <span style={{ color: 'rgba(255,255,255,0.3)' }}> › </span>
                      <span className="term-cmd">{l.cmd}</span>
                    </div>
                  );
                  if (l.type === 'highlight') return <div key={i} className="term-hi">{l.text}</div>;
                  return <div key={i}>{l.text}</div>;
                })}
              </div>
            )}

            {activeTab === 'Enterprise' && (
              <div className="product-card featured">
                <div className="product-badge" style={{ background: 'rgba(255,159,10,0.15)', color: '#ff9f0a' }}>
                  🏢 Enterprise Suite
                </div>
                <div className="product-name">Robogenesis Enterprise Platform</div>
                <div className="product-desc">
                  Fully managed robotics infrastructure for R&D facilities, defense labs, and smart factories.
                  SLA-backed, custom firmware, dedicated engineering support, and on-site deployment.
                </div>
                <div className="product-features">
                  {['Custom ROS2 Fleet Management', 'Dedicated Hardware Engineering Team', '99.9% SLA with Priority Support', 'On-Site Lab Integration & Training'].map((f) => (
                    <div key={f} className="feat-item">{f}</div>
                  ))}
                </div>
                <div className="product-footer">
                  <span style={{ fontSize: 12, color: '#ff9f0a', fontWeight: 700 }}>Contact for custom pricing</span>
                  <button
                    className="product-btn"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Talk to Engineering →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
