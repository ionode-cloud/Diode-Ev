import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Charger3D from './Charger3D'
import './Benefits.css'

const leftBenefits = [
  {
    id: 'easy-platform',
    title: 'Easy-to-Use Platform',
    desc: 'Intuitive interface designed for every driver.',
    icon: '◎',
  },
  {
    id: 'eco-friendly',
    title: 'Eco-Friendly Commitment',
    desc: 'Powered by 100% renewable energy sources.',
    icon: '◉',
  },
  {
    id: 'transparent-pricing',
    title: 'Transparent Pricing',
    desc: 'No hidden fees. Pay only for what you charge.',
    icon: '◈',
  },
]

const rightBenefits = [
  {
    id: 'fast-reliable',
    title: 'Fast & Reliable Charging',
    desc: '120 kW DC fast charging — full battery in minutes.',
    icon: '◎',
  },
  {
    id: 'multiple-options',
    title: 'Multiple Charging Options',
    desc: 'CCS2, CHAdeMO, Type 2 — all standards supported.',
    icon: '◉',
  },
  {
    id: 'customer-support',
    title: '24/7 Customer Support',
    desc: 'Live assistance available around the clock.',
    icon: '◈',
  },
]

function BenefitItem({ item, side, index, inView }) {
  return (
    <motion.div
      className={`benefit-item benefit-item--${side}`}
      id={`benefit-${item.id}`}
      initial={{ opacity: 0, x: side === 'left' ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="benefit-item__dot">
        <span className="benefit-item__dot-inner" />
      </div>
      <div className={`benefit-item__content benefit-item__content--${side}`}>
        <h3 className="benefit-item__title">{item.title}</h3>
        <p className="benefit-item__desc">{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Benefits() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const chargerRotation = useTransform(scrollYProgress, [0.1, 0.9], [0, Math.PI * 2])
  const [rotY, setRotY] = useState(0)

  useEffect(() => {
    const unsub = chargerRotation.on('change', v => setRotY(v))
    return unsub
  }, [chargerRotation])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="benefits" id="benefits" ref={sectionRef}>
      {/* Background */}
      <div className="benefits__bg">
        <img src="/images/benefits_bg.jpg" alt="" className="benefits__bg-img" />
        <div className="benefits__bg-overlay" />
      </div>

      <div className="benefits__inner container">
        {/* Header */}
        <motion.div
          className="benefits__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title benefits__title">KEY BENEFITS</h2>
          <p className="section-subtitle benefits__subtitle">
            Unlock the core advantages of our EV charger—designed for speed,
            intelligence, and compatibility with every ride.
          </p>
        </motion.div>

        {/* Three-column layout */}
        <div className="benefits__columns">
          {/* Left */}
          <div className="benefits__col benefits__col--left">
            {leftBenefits.map((item, i) => (
              <BenefitItem key={item.id} item={item} side="left" index={i} inView={inView} />
            ))}
          </div>

          {/* Center: 3D Charger */}
          <div className="benefits__center">
            <div className="benefits__charger-glow" />
            <Charger3D
              height="520px"
              batteryPct={78}
              showDisplay={false}
              className="benefits__charger-canvas"
            />
          </div>

          {/* Right */}
          <div className="benefits__col benefits__col--right">
            {rightBenefits.map((item, i) => (
              <BenefitItem key={item.id} item={item} side="right" index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
