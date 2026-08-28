import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrandStrip from './components/BrandStrip'
import Benefits from './components/Benefits'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <BrandStrip />
        <Benefits />
        <HowItWorks />
        <Footer />
      </main>
    </div>
  )
}

export default App
