import { useEffect, useRef } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';

const STATS = [
  { value: 248, suffix: '', label: 'Active Robotic Units', icon: '🤖', color: '#0a84ff' },
  { value: 42, suffix: '-DOF', label: 'Kinetic Articulation', icon: '🦾', color: '#bf5af2' },
  { value: 99, suffix: '.4%', label: 'System Uptime', icon: '⚡', color: '#30d158' },
  { value: 4, suffix: 'TOPS', label: 'Neural Inference', icon: '🧠', color: '#ff9f0a' },
  { value: 48, suffix: '+', label: 'Projects Shipped', icon: '🚀', color: '#ff453a' },
  { value: 10, suffix: 'ms', label: 'Reflex Latency', icon: '⏱️', color: '#64d2ff' },
];

function ParticleCanvas({ color }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color + Math.round(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [color]);

  return <canvas ref={canvasRef} className="stat-particle-canvas" />;
}

function AnimatedCounter({ value, suffix, isVisible }) {
  const spanRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !spanRef.current) return;
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      spanRef.current.textContent = Math.round(eased * value);
      if (progress < 1) requestAnimationFrame(step);
      else spanRef.current.textContent = value;
    };
    requestAnimationFrame(step);
  }, [isVisible, value]);

  return (
    <>
      <span ref={spanRef}>0</span>
      <span className="stat-suffix">{suffix}</span>
    </>
  );
}

export default function StatsSection() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section className="stats-section" ref={ref} id="stats">
      <div className="stats-bg-grid" />
      <div className="stats-container">
        <div className="stats-header">
          <span className="section-tag-pill">By The Numbers</span>
          <h2 className="stats-title">
            Systems That <span>Perform</span>
          </h2>
          <p className="stats-subtitle">
            Real metrics from deployed hardware across research labs, smart factories, and field robotics teams.
          </p>
        </div>

        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-card${isVisible ? ' stat-card--visible' : ''}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <ParticleCanvas color={stat.color} />
              <div className="stat-icon-glow" style={{ background: stat.color + '22' }}>
                <span className="stat-icon">{stat.icon}</span>
              </div>
              <div className="stat-number" style={{ color: stat.color }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-bar-track">
                <div
                  className="stat-bar-fill"
                  style={{
                    background: stat.color,
                    width: isVisible ? `${Math.min(100, stat.value)}%` : '0%',
                    transitionDelay: `${i * 90 + 400}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
