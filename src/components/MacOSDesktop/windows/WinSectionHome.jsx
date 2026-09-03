import OsWindow from '../OsWindow.jsx';

const HAND_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4';

export default function WinSectionHome({
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
      id="win-section-home"
      title="🏠 Home — Autonomous Robotics Ecosystem"
      isOpen={isOpen}
      isFocused={isFocused}
      zIndex={zIndex}
      initialWidth={760}
      initialHeight={560}
      initialTop={52}
      initialLeft={125}
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
        {/* Badge */}
        <div style={{ marginBottom: '14px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38bdf8',
              fontSize: '11.5px',
              fontWeight: 700,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
              }}
            />
            Kinetic Robotic Hand — 42-DOF Neural Articulation System
          </span>
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 10px',
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}
        >
          Engineering the <span style={{ color: '#38bdf8' }}>Autonomous</span> Future
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: '#cbd5e1',
            lineHeight: 1.6,
            margin: '0 0 20px',
            maxWidth: '620px',
          }}
        >
          Robotics · IoT · Embedded Systems · Neuromorphic AI · 3D Fabrication. Built from silicon to
          intelligence. Explore all landing page systems and interactive 3D modules below.
        </p>

        {/* Embedded Video Showcase */}
        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            background: '#000',
            height: '200px',
            position: 'relative',
            marginBottom: '22px',
          }}
        >
          <video
            src={HAND_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '14px',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '5px 12px',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '11.5px',
              color: '#38bdf8',
              fontWeight: 600,
            }}
          >
            ● Live Hand Telemetry v3.8 · 42-DOF Active
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '14px',
              background: 'rgba(15, 23, 42, 0.85)',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              color: '#cbd5e1',
              fontWeight: 600,
            }}
          >
            Kinetic Mesh Architecture
          </div>
        </div>

        {/* Interactive Sections Grid */}
        <h3
          style={{
            fontSize: '12.5px',
            textTransform: 'uppercase',
            color: '#94a3b8',
            fontWeight: 700,
            letterSpacing: '0.08em',
            margin: '0 0 12px',
          }}
        >
          Integrated Ecosystem Tabs
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
            gap: '10px',
            marginBottom: '22px',
          }}
        >
          {[
            { id: 'win-section-about', name: 'About Us', icon: '🤖', desc: 'A.R.I.A Head 3D' },
            { id: 'win-section-domains', name: 'Domains', icon: '🧠', desc: 'Neural Brain' },
            { id: 'win-section-products', name: 'Products', icon: '🪙', desc: 'VaultShield Coin' },
            { id: 'win-section-contact', name: 'Contact', icon: '🌍', desc: 'Earth Telemetry' },
            { id: 'win-console', name: 'Console', icon: '💻', desc: 'Code Runner' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenWin(item.id)}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '10px',
                padding: '12px 10px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                color: '#fff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.18)';
                e.currentTarget.style.borderColor = '#38bdf8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              }}
            >
              <div style={{ fontSize: '22px', marginBottom: '6px' }}>{item.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>{item.name}</div>
              <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '2px' }}>{item.desc}</div>
            </button>
          ))}
        </div>

        {/* Direct Action Links */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            className="os-pill-link"
            onClick={() => onOpenWin('win-section-about')}
          >
            📖 About Section
          </button>
          <button
            className="os-pill-link"
            onClick={() => onOpenWin('win-section-domains')}
          >
            🔬 Domains Matrix
          </button>
          <button
            className="os-pill-link"
            onClick={() => onOpenWin('win-section-products')}
          >
            📦 Products Catalog
          </button>
          <button
            className="os-pill-link"
            onClick={() => onOpenWin('win-section-contact')}
          >
            💬 Contact Team
          </button>
          <button
            className="btn-primary"
            style={{ fontSize: '12px', padding: '6px 14px' }}
            onClick={() => onOpenWin('win-console')}
          >
            💻 Open Code Runner
          </button>
        </div>
      </div>
    </OsWindow>
  );
}
