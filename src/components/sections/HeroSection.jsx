import { useRef, useState } from 'react';

const HAND_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4';

export default function HeroSection({
  onOpenOs,
  onNavigateDomains,
  onNavigateContact,
  onNavigateAbout,
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="hero-section" id="hero">
      {/* Background video */}
      <div className="video-layer">
        <div className="video-wrapper">
          <video
            ref={videoRef}
            id="handVideo"
            className="bg-video"
            src={HAND_VIDEO}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>

      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge-row">
          <div className="live-badge">
            <span className="live-dot" />
            Kinetic Robotic Hand — 42-DOF Neural Articulation System
          </div>
        </div>

        {/* Bottom headline */}
        <div className="hero-bottom">
          <h1 className="hero-title">
            Engineering the{' '}
            <span>Autonomous</span>
            {' '}Future
          </h1>
          <p className="hero-subtitle">
            Robotics · IoT · Embedded Systems · Neuromorphic AI · 3D Fabrication. Built from silicon to intelligence.
          </p>

          <div className="hero-cta-group">
            <button
              className="btn-primary"
              onClick={onNavigateDomains}
            >
              🔬 Explore Domains
            </button>
            <button
              className="btn-secondary"
              onClick={onNavigateContact}
            >
              💬 Start a Project
            </button>
            <button className="btn-secondary" onClick={onOpenOs}>
              macOS View
            </button>
          </div>

          <div className="hero-video-controls">
            <button className="hvc-btn" onClick={togglePlay}>
              {playing ? '⏸ Pause' : '▶ Play'}
            </button>
            <span>Kinetic Hand Model v3.8 · 42-DOF</span>
          </div>

          {onNavigateAbout && (
            <button
              className="scroll-down"
              onClick={onNavigateAbout}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ↓ Learn more about us
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
