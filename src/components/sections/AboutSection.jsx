import { useRef, useEffect, useState } from 'react';
import { useCounterAnimation } from '../../hooks/useCounterAnimation.js';

const HEAD_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';
const TW_TEXT = "Glad you stopped in. Good taste tends to find us. Now, what are we building?";

function AnimatedMetric({ target }) {
  const ref = useCounterAnimation(target);
  return <span ref={ref}>0</span>;
}

export default function AboutSection({ onOpenOs }) {
  const headVideoRef = useRef(null);
  const [twDisplay, setTwDisplay] = useState('');
  const [twDone, setTwDone] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setTwDisplay(TW_TEXT.slice(0, idx + 1));
      idx++;
      if (idx >= TW_TEXT.length) { clearInterval(interval); setTwDone(true); }
    }, 34);
    return () => clearInterval(interval);
  }, []);

  // Mouse-scrub head rotation
  useEffect(() => {
    const video = headVideoRef.current;
    if (!video) return;
    let prevX = null;
    let targetTime = 0;
    let isSeeking = false;

    const applySeek = () => {
      if (!video.duration || isNaN(video.duration) || isSeeking) return;
      if (Math.abs(targetTime - video.currentTime) < 0.01) return;
      isSeeking = true;
      video.currentTime = targetTime;
    };

    const onSeeked = () => {
      isSeeking = false;
      if (Math.abs(targetTime - video.currentTime) > 0.01) applySeek();
    };

    const onMouseMove = (e) => {
      if (!video.duration || isNaN(video.duration)) return;
      const rect = video.getBoundingClientRect();
      if (prevX === null) { prevX = e.clientX; return; }
      const delta = e.clientX - prevX;
      prevX = e.clientX;
      targetTime += (delta / rect.width) * 0.8 * video.duration;
      targetTime = Math.max(0, Math.min(video.duration, targetTime));
      video.pause();
      applySeek();
    };

    const onMouseLeave = () => {
      prevX = null;
      if (video.paused) video.play().catch(() => {});
    };

    video.addEventListener('seeked', onSeeked);
    video.parentElement?.addEventListener('mousemove', onMouseMove);
    video.parentElement?.addEventListener('mouseleave', onMouseLeave);

    return () => {
      video.removeEventListener('seeked', onSeeked);
      video.parentElement?.removeEventListener('mousemove', onMouseMove);
      video.parentElement?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="section about-section" id="about">
      <div className="container-fluid">
        <div className="about-split-layout">
          {/* Left — text */}
          <div className="about-left-text">
            <span className="section-tag">📖 About Robogenesis</span>
            <h2 className="section-title">
              Bridging Pure Hardware<br />with Frontier Intelligence
            </h2>

            {/* A.R.I.A typewriter */}
            <div className="aria-typewriter-box">
              <div className="aria-agent-label">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0a84ff', display: 'inline-block' }} />
                A.R.I.A — Adaptive Response Interface Agent
              </div>
              <p className="aria-typewriter-text" id="ariaTypewriterText">
                {twDisplay}{!twDone && <span style={{ opacity: 0.6 }}>|</span>}
              </p>
            </div>

            <p className="about-body-text">
              Founded in 2022, we engineer end-to-end cybernetic solutions across microcontrollers, ROS2 autonomous
              platforms, 3D rapid prototyping, and real-time edge AI. We eliminate traditional hardware fragmentation by
              bringing multi-layer PCB design, bare-metal RTOS, and neuromorphic vision under one unified roof.
            </p>

            {/* Action pills */}
            <div className="about-pills-row">
              {[
                { emoji: '💼', label: 'Pitch us an idea', id: 'contact' },
                { emoji: '🧑‍💻', label: 'Come work here', id: 'contact' },
                { emoji: '👋', label: 'Say hello', id: 'contact' },
                { emoji: '🔬', label: 'How we operate', id: 'domains' },
              ].map((p) => (
                <a
                  key={p.label}
                  href={`#${p.id}`}
                  className="about-action-pill"
                  onClick={(e) => { e.preventDefault(); scrollTo(p.id); }}
                >
                  {p.emoji} {p.label}
                </a>
              ))}
            </div>

            {/* Metrics */}
            <div className="metrics-grid">
              {[
                { target: 48, suffix: '+', label: 'Projects Completed' },
                { target: 8, suffix: '', label: 'Core Domains' },
                { target: 248, suffix: '', label: 'Active Units' },
                { target: 99, suffix: '.4%', label: 'Uptime' },
              ].map((m) => (
                <div key={m.label} className="metric-card">
                  <div className="metric-num">
                    <AnimatedMetric target={m.target} />{m.suffix}
                  </div>
                  <div className="metric-label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — head video */}
          <div className="about-right-head">
            <div className="head-showcase-panel">
              <div className="head-video-wrap">
                <video
                  ref={headVideoRef}
                  id="headVideo"
                  className="head-video"
                  src={HEAD_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="head-badge-top">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#38bdf8', display: 'inline-block' }} />
                  A.R.I.A Vision Core · Online
                </div>
                <div className="head-drag-hint">← Drag to rotate →</div>
              </div>
              <div className="head-footer-bar">
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0a0e1a' }}>
                  A.R.I.A Neuromorphic Head v4.2
                </span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <a href="/head.html" target="_blank" className="about-action-pill" style={{ fontSize: 12, padding: '5px 12px' }}>
                    Open head.html ↗
                  </a>
                  <button className="about-action-pill reach-pill" onClick={onOpenOs} style={{ fontSize: 12, padding: '5px 12px' }}>
                    🖥 macOS View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
