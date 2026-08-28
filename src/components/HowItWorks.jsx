import { motion } from 'framer-motion'
import './HowItWorks.css'

const steps = [
  {
    id: 'step-plug-in',
    number: '01',
    title: 'Easy Plug In',
    desc: 'Connect your EV to the charger easily—power up anytime, anywhere with Diode EV.',
    img: '/images/plug_in.jpg',
    hasPlay: true,
    accent: '#3de89e',
  },
  {
    id: 'step-charge-smart',
    number: '02',
    title: 'Charge Smart',
    desc: 'Use our app to monitor, schedule, and optimize your charge—full control in your hands.',
    img: '/images/app_screen.jpg',
    hasPlay: false,
    accent: '#00c8ff',
  },
  {
    id: 'step-drive-clean',
    number: '03',
    title: 'Drive Clean',
    desc: 'Hit the road with a full battery and a clean conscience. Greening Bharat, one charge at a time.',
    img: '/images/drive_clean.jpg',
    hasPlay: false,
    accent: '#3de89e',
  },
]

export default function HowItWorks() {
  return (
    <section className="howitworks" id="howitworks">
      <div className="howitworks__inner container">
        {/* Header */}
        <motion.div
          className="howitworks__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title howitworks__title">HOW IT WORKS</h2>
          <p className="section-subtitle howitworks__subtitle">
            Three simple steps to smarter EV charging
          </p>
        </motion.div>

        {/* Cards */}
        <div className="howitworks__cards">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              id={step.id}
              className="howcard"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <div className="howcard__img-wrap">
                <img
                  src={step.img}
                  alt={step.title}
                  className="howcard__img"
                  loading="lazy"
                />
                <div className="howcard__img-overlay" />
                {step.hasPlay && (
                  <div className="howcard__play" id={`${step.id}-play-btn`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                )}
                {/* Number badge */}
                <div className="howcard__number" style={{ color: step.accent }}>
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="howcard__content">
                <div
                  className="howcard__accent-line"
                  style={{ background: step.accent }}
                />
                <h3 className="howcard__title">{step.title}</h3>
                <p className="howcard__desc">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
