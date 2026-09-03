import OsWindow from '../OsWindow.jsx';

const COIN_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4';

export default function WinSectionProducts({
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
      id="win-section-products"
      title="📦 Products & Catalog — VaultShield Token & Hardware"
      isOpen={isOpen}
      isFocused={isFocused}
      zIndex={zIndex}
      initialWidth={760}
      initialHeight={560}
      initialTop={65}
      initialLeft={160}
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
        <span className="os-sec-tag">📦 Catalog &amp; Hardware Security</span>
        <h2 className="os-sec-h2">Engineered Products &amp; Solutions</h2>
        <p className="os-sec-p">
          Production-grade devices, modular development kits, and turnkey industrial systems engineered for performance at
          the edge.
        </p>

        {/* Embedded VaultShield Token Video Visualizer */}
        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            background: '#0b0e17',
            height: '190px',
            position: 'relative',
            marginBottom: '20px',
          }}
        >
          <video
            src={COIN_VIDEO}
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
              color: '#a78bfa',
              fontWeight: 600,
            }}
          >
            ⚡ EAL6+ HSM Secure Enclave
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
            VaultShield™ 3D Hardware Token
          </div>
        </div>

        {/* Product Items List */}
        <div className="os-product-list" style={{ marginBottom: '20px' }}>
          <div className="os-product-item featured">
            <div className="os-product-badge" style={{ background: 'rgba(10,132,255,0.2)', color: '#64a3ff' }}>
              🏆 Flagship Autonomous Platform
            </div>
            <div className="os-product-name">RG-247 Autonomous Robotic Platform v3</div>
            <div className="os-product-desc">
              Fully modular research chassis with ROS2 Jazzy, 360° solid-state LiDAR, dual RGB-D stereo cameras, and
              42-DOF kinetic articulation for indoor navigation, search-and-rescue, and academic labs.
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
              <span style={{ padding: '3px 8px', borderRadius: '999px', background: 'rgba(10,132,255,0.15)', color: '#64a3ff', fontSize: '11px', fontWeight: 700 }}>
                ROS2 Jazzy
              </span>
              <span style={{ padding: '3px 8px', borderRadius: '999px', background: 'rgba(10,132,255,0.15)', color: '#64a3ff', fontSize: '11px', fontWeight: 700 }}>
                42-DOF
              </span>
              <span style={{ padding: '3px 8px', borderRadius: '999px', background: 'rgba(48,209,88,0.15)', color: '#30d158', fontSize: '11px', fontWeight: 700 }}>
                ● Pre-order Q3 2026
              </span>
            </div>
          </div>

          <div className="os-product-item">
            <div className="os-product-name">VaultShield™ Hardware Crypto Token v2</div>
            <div className="os-product-desc">
              Biometric FIDO2/Passkey hardware enclave with tamper-proof physical bus isolation and post-quantum crypto.
            </div>
          </div>

          <div className="os-product-item">
            <div className="os-product-name">A.R.I.A Vision Head Module</div>
            <div className="os-product-desc">
              Neuromorphic stereo vision pod with on-device YOLO inference and dual high-speed micro-gimbals.
            </div>
          </div>
        </div>

        {/* Quick navigation pill links */}
        <div className="os-pill-row">
          <button className="os-pill-link" onClick={() => onOpenWin('win-section-contact')}>
            💬 Request Volume Quote
          </button>
          <button className="os-pill-link" onClick={() => onOpenWin('win-console')}>
            💻 Test Device Firmware (Console)
          </button>
        </div>
      </div>
    </OsWindow>
  );
}
