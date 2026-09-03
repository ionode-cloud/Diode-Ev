import { useRef } from 'react';
import OsWindow from '../OsWindow.jsx';

const HEAD_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

export default function WinSectionAbout({
  isOpen,
  isFocused,
  zIndex,
  onClose,
  onMin,
  onFocus,
  onOpenWin,
}) {
  const headVideoRef = useRef(null);

  return (
    <OsWindow
      id="win-section-about"
      title="📖 About Robogenesis — A.R.I.A Head Intelligence"
      isOpen={isOpen}
      isFocused={isFocused}
      zIndex={zIndex}
      initialWidth={740}
      initialHeight={560}
      initialTop={55}
      initialLeft={120}
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
        {/* Header Tag */}
        <span className="os-sec-tag">📖 About &amp; Neuromorphic Vision</span>
        <h2 className="os-sec-h2">Bridging Pure Hardware with Frontier Intelligence</h2>
        <p className="os-sec-p">
          Founded in 2022, we engineer end-to-end cybernetic solutions across microcontrollers, ROS2 autonomous
          platforms, 3D rapid prototyping, and real-time edge AI.
        </p>

        {/* Embedded A.R.I.A Head Video Visualizer */}
        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            background: '#000',
            height: '210px',
            position: 'relative',
            marginBottom: '20px',
          }}
        >
          <video
            ref={headVideoRef}
            src={HEAD_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '70% center' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '14px',
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              padding: '5px 12px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.2)',
              fontSize: '11.5px',
              color: '#38bdf8',
              fontWeight: 600,
            }}
          >
            ● A.R.I.A Vision Core · Online
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '14px',
              background: 'rgba(15, 23, 42, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              color: '#f8fafc',
              fontWeight: 600,
            }}
          >
            Neuromorphic Head v4.2
          </div>
        </div>

        {/* Metrics Row */}
        <div className="os-metrics-row" style={{ marginBottom: '18px' }}>
          <div className="os-metric-card">
            <div className="os-metric-num">48+</div>
            <div className="os-metric-label">Completed Projects</div>
          </div>
          <div className="os-metric-card">
            <div className="os-metric-num">8</div>
            <div className="os-metric-label">Domains</div>
          </div>
          <div className="os-metric-card">
            <div className="os-metric-num">248</div>
            <div className="os-metric-label">Active Units</div>
          </div>
          <div className="os-metric-card">
            <div className="os-metric-num">99.4%</div>
            <div className="os-metric-label">Uptime</div>
          </div>
        </div>

        {/* A.R.I.A Quote Box */}
        <div
          style={{
            background: 'rgba(115,66,226,0.12)',
            border: '1px solid rgba(115,66,226,0.25)',
            borderRadius: '10px',
            padding: '14px 16px',
            marginBottom: '18px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#a78bfa',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#7342E2',
                display: 'inline-block',
              }}
            />
            A.R.I.A — Adaptive Response Interface Agent
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
            &ldquo;Glad you stopped in. Good taste tends to find us. Now, what are we building?&rdquo;
          </p>
        </div>

        {/* Quick navigation pill links */}
        <div className="os-pill-row">
          <button className="os-pill-link" onClick={() => onOpenWin('win-section-domains')}>
            🔬 Explore Domains
          </button>
          <button className="os-pill-link" onClick={() => onOpenWin('win-section-products')}>
            📦 View Products
          </button>
          <button className="os-pill-link" onClick={() => onOpenWin('win-section-contact')}>
            💬 Get in Touch
          </button>
        </div>
      </div>
    </OsWindow>
  );
}
