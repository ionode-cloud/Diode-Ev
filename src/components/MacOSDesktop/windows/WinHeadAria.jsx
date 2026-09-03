import OsWindow from '../OsWindow.jsx';

export default function WinHeadAria({ isOpen, isFocused, zIndex, onClose, onMin, onFocus, onSetWallpaper }) {
  return (
    <OsWindow
      id="win-head-aria"
      title="🤖 A.R.I.A Neuromorphic Head — head.html"
      isOpen={isOpen}
      isFocused={isFocused}
      zIndex={zIndex}
      initialWidth={720}
      initialHeight={500}
      initialTop={70}
      initialLeft={180}
      onClose={onClose}
      onMin={onMin}
      onFocus={onFocus}
      bodyStyle={{ padding: 0, display: 'flex', flexDirection: 'column', background: '#000000' }}
    >
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '70% center' }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '16px',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            padding: '6px 14px',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.2)',
            fontSize: '12px',
            color: '#38bdf8',
            fontWeight: 600,
          }}
        >
          ● A.R.I.A Vision Core · Online
        </div>
      </div>
      <div
        style={{
          padding: '12px 20px',
          background: 'rgba(255,255,255,0.06)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#ffffff',
          fontSize: '13px',
        }}
      >
        <div>
          <strong>Adaptive Response Interface Agent</strong> · 3D Head
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            style={{
              padding: '5px 14px',
              borderRadius: '999px',
              background: '#00f2fe',
              color: '#000',
              fontSize: '12px',
              fontWeight: 700,
            }}
            onClick={() => onSetWallpaper(1)}
          >
            Set as Wallpaper
          </button>
          <a
            href="/head.html"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '5px 14px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.15)',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Open head.html ↗
          </a>
        </div>
      </div>
    </OsWindow>
  );
}
