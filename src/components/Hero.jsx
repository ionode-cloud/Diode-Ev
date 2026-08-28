import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Charger3D from './Charger3D'
import './Hero.css'

/* ─── BATTERY % COUNTER ─────────────────────────────── */
function useBatteryCounter() {
  const [pct, setPct] = useState(18)
  useEffect(() => {
    const vals = [18, 32, 48, 65, 78, 90, 100, 18]
    let idx = 0
    const interval = setInterval(() => {
      idx = (idx + 1) % vals.length
      setPct(vals[idx])
    }, 2400)
    return () => clearInterval(interval)
  }, [])
  return pct
}

/* ─── TEXT ANIMATIONS ────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
}

export default function Hero() {
  const heroRef = useRef(null)
  const batteryPct = useBatteryCounter()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  // Mouse tracking for 3D charger
  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMouse({ x, y })
  }, [])

  return (
    <section className="hero" id="hero" ref={heroRef} onMouseMove={handleMouseMove}>
      {/* Background */}
      <div className="hero__bg">
        <img src="/images/hero_bg.jpg" alt="" className="hero__bg-img" loading="eager" />
        <div className="hero__bg-overlay" />
      </div>

      {/* EV Car */}
      <motion.div
        className="hero__car"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src="/images/ev_car.jpg" alt="Modern Electric Vehicle" className="hero__car-img" />
      </motion.div>

      {/* Content */}
      <div className="hero__content container">
        {/* Left text */}
        <div className="hero__text">
          <motion.div
            className="hero__badge"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="hero__badge-dot" />
            Smart EV Charging · 120 kW · CCS2
          </motion.div>

          <motion.h1
            className="hero__title"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            POWER
            <br />
            <span className="hero__title-accent">FORWARD</span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Smart EV Charging<br />
            <span>For The Future</span>
          </motion.p>

          <motion.div
            className="hero__actions"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <a href="#" className="btn btn-accent hero__btn-primary" id="hero-find-station-btn">
              Find Station
            </a>
            <a href="#howitworks" className="btn hero__btn-secondary" id="hero-learn-more-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Learn More
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="hero__proof"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <div className="hero__avatars">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="hero__avatar" style={{ background: `hsl(${i * 70},60%,45%)` }} />
              ))}
            </div>
            <span className="hero__proof-text"><strong>5.4K+</strong> Active Users</span>
          </motion.div>
        </div>

        {/* 3D Charger */}
        <motion.div
          className="hero__charger-wrap"
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__charger-glow" />
          <Charger3D
            height="580px"
            batteryPct={batteryPct}
            showDisplay={true}
            className="hero__charger-canvas"
          />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="hero__scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}
