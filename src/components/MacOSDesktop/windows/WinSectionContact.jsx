import { useState } from 'react';
import OsWindow from '../OsWindow.jsx';

const EARTH_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4';

export default function WinSectionContact({
  isOpen,
  isFocused,
  zIndex,
  onClose,
  onMin,
  onFocus,
  onCloseOs,
}) {
  const [copyText, setCopyText] = useState('📋 Copy Email: hello@robogenesis.co');

  const handleCopy = () => {
    navigator.clipboard.writeText('hello@robogenesis.co').then(() => {
      setCopyText('✓ Copied: hello@robogenesis.co');
      setTimeout(() => {
        setCopyText('📋 Copy Email: hello@robogenesis.co');
      }, 2000);
    });
  };

  const jumpToContact = () => {
    onClose();
    onCloseOs();
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <OsWindow
      id="win-section-contact"
      title="💬 Contact & Global Mesh — Earth Telemetry"
      isOpen={isOpen}
      isFocused={isFocused}
      zIndex={zIndex}
      initialWidth={740}
      initialHeight={560}
      initialTop={70}
      initialLeft={180}
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
        <span className="os-sec-tag">💬 Global Telemetry &amp; Contact</span>
        <h2 className="os-sec-h2">Talk Directly to Our Engineering Team</h2>
        <p className="os-sec-p">
          Whether you need custom robotic kinematics, embedded firmware, or joint research — connect with our engineering
          hubs worldwide.
        </p>

        {/* Embedded Global Earth Video Visualizer */}
        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            background: '#000',
            height: '190px',
            position: 'relative',
            marginBottom: '20px',
          }}
        >
          <video
            src={EARTH_VIDEO}
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
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              padding: '5px 12px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.2)',
              fontSize: '11.5px',
              color: '#34d399',
              fontWeight: 600,
            }}
          >
            ● Orbital Telemetry: 400km LEO · Nominal
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
            Global Autonomous Mesh
          </div>
        </div>

        {/* Contact Action Cards */}
        <div className="os-contact-thread" onClick={jumpToContact} style={{ marginBottom: '8px' }}>
          <div className="os-ct-avatar" style={{ background: 'rgba(10,132,255,0.2)' }}>
            💼
          </div>
          <div>
            <div className="os-ct-name">New Project Scoping</div>
            <div className="os-ct-desc">Tell us about your robotic or embedded challenge...</div>
          </div>
          <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: '18px' }}>›</span>
        </div>

        <div className="os-contact-thread" onClick={jumpToContact} style={{ marginBottom: '8px' }}>
          <div className="os-ct-avatar" style={{ background: 'rgba(48,209,88,0.2)' }}>
            🔬
          </div>
          <div>
            <div className="os-ct-name">Academic &amp; Joint R&amp;D</div>
            <div className="os-ct-desc">Grant proposals, lab trials, neuromorphic research...</div>
          </div>
          <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: '18px' }}>›</span>
        </div>

        <div className="os-contact-thread" onClick={jumpToContact} style={{ marginBottom: '14px' }}>
          <div className="os-ct-avatar" style={{ background: 'rgba(191,90,242,0.2)' }}>
            🧑‍💻
          </div>
          <div>
            <div className="os-ct-name">Engineering Careers</div>
            <div className="os-ct-desc">We're hiring firmware, robotics &amp; ML engineers...</div>
          </div>
          <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: '18px' }}>›</span>
        </div>

        <button className="os-contact-email-btn" onClick={handleCopy} style={{ marginBottom: '12px' }}>
          {copyText}
        </button>

        <button
          onClick={jumpToContact}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(10,132,255,0.15)',
            border: '1px solid rgba(10,132,255,0.25)',
            color: '#64b5ff',
            borderRadius: '10px',
            padding: '12px 16px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            width: '100%',
            justifyContent: 'center',
            transition: 'all 0.18s',
          }}
        >
          💬 Open Dedicated Contact Page &amp; Live Form →
        </button>
      </div>
    </OsWindow>
  );
}
