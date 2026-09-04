import { useRef, useEffect } from 'react';

const EARTH_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

const OVERLAY_STATS = [
  { label: 'Global Deployments', value: '18+', icon: '🌍' },
  { label: 'Countries Served', value: '12', icon: '🛰️' },
  { label: 'Partner Labs', value: '34', icon: '🔬' },
];

export default function ParallaxVideoSection({ onNavigate }) {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);

  // Parallax scroll effect on the overlay text
  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    if (!section || !overlay) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = -rect.top / (rect.height || 1);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      overlay.style.transform = `translateY(${clampedProgress * 60}px)`;
      overlay.style.opacity = `${1 - clampedProgress * 1.4}`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="parallax-video-section" ref={sectionRef} id="global-reach">
      {/* Full-bleed background video */}
      <video
        className="parallax-bg-video"
        src={EARTH_VIDEO}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="parallax-overlay" />

      {/* Floating content with parallax offset */}
      <div className="parallax-content" ref={overlayRef}>
        <span className="parallax-tag">Global Reach</span>
        <h2 className="parallax-title">
          Robogenesis Operates<br />
          <span>Across The World</span>
        </h2>
        <p className="parallax-subtitle">
          From Bangalore to Berlin — our autonomous systems power smart factories, research labs, and field missions on 4 continents.
        </p>

        {/* Floating stat pills */}
        <div className="parallax-stats-row">
          {OVERLAY_STATS.map((s) => (
            <div key={s.label} className="parallax-stat-pill">
              <span className="psp-icon">{s.icon}</span>
              <span className="psp-value">{s.value}</span>
              <span className="psp-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Animated scan line */}
        <div className="parallax-scanline" />

        <div className="parallax-cta-row">
          {onNavigate && (
            <>
              <button className="btn-primary" onClick={() => onNavigate('contact')}>
                🌍 Explore Global Partnerships
              </button>
              <button className="btn-secondary" onClick={() => onNavigate('products')}>
                View All Products
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
