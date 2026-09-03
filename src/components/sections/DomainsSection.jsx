import { useState, useRef } from 'react';
import { domainsData } from '../../data/domains.js';

const BRAIN_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'hardware', label: '🔧 Hardware' },
  { id: 'software', label: '💻 Software' },
  { id: 'research', label: '🔬 Research' },
];

export default function DomainsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchVal, setSearchVal] = useState('');
  const [searchDisplay, setSearchDisplay] = useState('');
  const searchInputRef = useRef(null);

  const filtered = domainsData.filter(
    (d) => activeFilter === 'all' || d.cat === activeFilter
  );

  const handleSearch = () => {
    const q = searchVal.trim();
    if (!q) return;
    setSearchDisplay(`Analyzing: "${q}"...`);
    setTimeout(() => {
      setSearchDisplay('');
      setSearchVal('');
      if (searchInputRef.current) searchInputRef.current.placeholder = `Neural Mesh: 4 TOPS complete for: ${q}`;
      setTimeout(() => {
        if (searchInputRef.current) searchInputRef.current.placeholder = 'Query cognitive neural mesh...';
      }, 3500);
    }, 800);
  };

  return (
    <section className="section domains-section" id="domains">
      <div className="container-fluid">
        <div className="domains-split-layout">
          {/* Left — Brain panel */}
          <div className="split-left-brain">
            <div className="brain-showcase-panel">
              <div className="brain-video-frame">
                <video
                  id="brainVideo"
                  className="brain-video"
                  src={BRAIN_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="brain-video-mask" />
                <div className="brain-badge-floating">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#9fff00', display: 'inline-block' }} />
                  Synaptic Cognitive Pipeline · 4 TOPS Active
                </div>
              </div>
              <div className="brain-content-frame">
                <h2 className="brain-title">
                  Neural Cognitive{' '}
                  <span className="eye-pill"><span className="eye-pill__dot" /></span>{' '}
                  Architecture
                </h2>
                <p className="brain-desc">
                  A living neuromorphic mesh processing sensory input across 12 cortical layers, feeding real-time
                  motor commands to robotic actuators at sub-10ms latency.
                </p>

                {/* Search */}
                <div className="brain-search-pill">
                  <input
                    ref={searchInputRef}
                    className="brain-search-input"
                    value={searchDisplay || searchVal}
                    placeholder="Query cognitive neural mesh..."
                    onChange={(e) => !searchDisplay && setSearchVal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button className="brain-search-btn" onClick={handleSearch}>→</button>
                </div>

                <div className="brain-features-list">
                  {[
                    '4 TOPS onboard neural inference engine',
                    'Hebbian synaptic plasticity & LTP/LTD',
                    'Real-time motor cortex command dispatch',
                    'Zero-cloud: 100% private on-device AI',
                  ].map((f) => (
                    <div key={f} className="bfl-item">
                      <span className="bfl-dot">●</span> {f}
                    </div>
                  ))}
                </div>

                <div className="brain-buttons">
                  <a href="/brain.html" target="_blank" className="brain-cta-btn">
                    Open 3D Brain ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Domain cards */}
          <div className="split-right-domains">
            <div>
              <span className="section-tag">🔬 Core Domains</span>
              <h2 className="section-title" style={{ marginTop: 8 }}>Frontier Technology Disciplines</h2>
              <p className="section-sub">
                8 specialist engineering areas united under one roof — from bare-metal RTOS to neuromorphic AI.
              </p>
            </div>

            {/* Filters */}
            <div className="domain-filters">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  className={`df-btn${activeFilter === f.id ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="domains-grid">
              {filtered.map((d) => (
                <div key={d.name} className="domain-card">
                  <div>
                    <div className="dc-icon-box" style={{ background: d.color }}>
                      {d.icon}
                    </div>
                    <div className="dc-name">{d.name}</div>
                    <div className="dc-category">{d.cat}</div>
                    <div className="dc-desc">{d.desc}</div>
                  </div>
                  <div className="dc-tags">
                    {d.tags.map((t) => (
                      <span key={t} className="dc-tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
