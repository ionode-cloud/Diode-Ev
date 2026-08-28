import { motion } from 'framer-motion'
import './BrandStrip.css'

const brands = [
  {
    name: 'TOYOTA',
    svg: (
      <svg viewBox="0 0 100 34" fill="currentColor" height="22" aria-label="Toyota">
        <ellipse cx="50" cy="17" rx="48" ry="15" fill="none" stroke="currentColor" strokeWidth="3" />
        <ellipse cx="50" cy="17" rx="29" ry="15" fill="none" stroke="currentColor" strokeWidth="3" />
        <ellipse cx="50" cy="9" rx="16" ry="8" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'TATA',
    svg: (
      <svg viewBox="0 0 80 34" fill="currentColor" height="22" aria-label="Tata">
        <rect x="2" y="8" width="76" height="5" rx="2.5" />
        <rect x="35" y="8" width="10" height="20" rx="2" />
        <rect x="2" y="8" width="76" height="5" rx="2.5" transform="translate(0 18)" />
      </svg>
    ),
  },
  {
    name: 'HYUNDAI',
    svg: (
      <svg viewBox="0 0 90 40" fill="currentColor" height="24" aria-label="Hyundai">
        <ellipse cx="45" cy="20" rx="42" ry="18" fill="none" stroke="currentColor" strokeWidth="3.5" transform="rotate(-5 45 20)" />
        <path d="M28 32 C30 24 35 12 37 8 L43 8 C41 14 39 22 37 32 Z" fill="currentColor" />
        <path d="M53 32 C55 22 61 14 63 8 L69 8 C67 12 61 24 59 32 Z" fill="currentColor" />
        <path d="M33 21 C40 18 52 18 63 21 L62 25 C52 22 40 22 34 25 Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'MAHINDRA',
    svg: (
      <svg viewBox="0 0 90 38" fill="currentColor" height="22" aria-label="Mahindra">
        <path d="M24 30 L45 8 L45 15 L32 28 Z" fill="currentColor" />
        <path d="M66 30 L45 8 L45 15 L58 28 Z" fill="currentColor" />
        <path d="M45 18 L51 24 L39 24 Z" fill="currentColor" />
        <ellipse cx="45" cy="33" rx="28" ry="3" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'Mercedes-Benz',
    svg: (
      <svg viewBox="0 0 80 80" fill="none" height="34" aria-label="Mercedes-Benz">
        <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="2.5" />
        <path d="M40 6 L40 40 L8 58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M40 6 L40 40 L72 58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M8 58 L72 58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function BrandStrip() {
  return (
    <section className="brandstrip" id="brands">
      <div className="brandstrip__inner">
        <p className="brandstrip__label">Compatible With All Major EV Brands</p>
        <div className="brandstrip__logos">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              className="brandstrip__logo"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {brand.svg}
              <span className="brandstrip__logo-name">{brand.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
