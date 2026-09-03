import { useState } from 'react';
import ContactSection from '../components/sections/ContactSection.jsx';

const FAQS = [
  {
    q: 'Can Robogenesis hardware be integrated into existing ROS2 / Isaac Sim workflows?',
    a: 'Yes. All our products ship with fully compliant ROS2 Humble/Iron packages, URDF/SDF kinematics meshes, and certified Isaac Sim and Gazebo simulation models.',
  },
  {
    q: 'Do you offer custom sensor payloads or bespoke robotic hand configurations?',
    a: 'Absolutely. We regularly design custom tendon routings, payload mounts, optical cameras, and specialized micro-controllers tailored to specific academic or industrial constraints.',
  },
  {
    q: 'What are typical lead times for development kits and volume units?',
    a: 'Standard evaluation developer kits dispatch within 5–7 business days worldwide. Custom engineering and volume enterprise batch orders generally require 3–6 weeks depending on fabrication specs.',
  },
  {
    q: 'How does enterprise hardware warranty and technical support work?',
    a: 'Every unit includes a standard 2-year warranty, comprehensive CAD & schematic documentation, and direct access to our core systems engineering team for integration support.',
  },
];

export default function ContactPage({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="page-container page-enter">
      {/* Page Hero Header */}
      <div className="page-hero-header">
        <div className="page-hero-inner">
          <div className="page-breadcrumb">
            <button onClick={() => onNavigate('home')}>Home</button>
            <span>/</span>
            <span>Contact</span>
          </div>
          <h1 className="page-title">
            Initiate <span>Autonomous Partnership</span>
          </h1>
          <p className="page-subtitle">
            Whether you are outfitting an industrial facility, commissioning bespoke cybernetic hardware, or exploring academic research collaboration, our engineering team is here to assist.
          </p>
        </div>
      </div>

      {/* Main Interactive Contact Section */}
      <ContactSection />

      {/* Global Engineering Hubs & FAQ */}
      <section className="contact-extra-section">
        <div className="contact-extra-container">
          <div className="section-tag-row">
            <span className="section-tag-pill">Global Engineering Hubs</span>
          </div>
          <h2 className="section-heading-lg">
            Where We <span>Operate</span>
          </h2>

          <div className="hubs-grid">
            <div className="hub-card">
              <span className="hub-flag">🇺🇸</span>
              <h3>San Francisco HQ</h3>
              <p>Silicon Valley Innovation Center</p>
              <span className="hub-detail">Kinetic Hand R&D · Autonomous Fleet Ops</span>
            </div>

            <div className="hub-card">
              <span className="hub-flag">🇯🇵</span>
              <h3>Tokyo Robotics Lab</h3>
              <p>Akihabara Precision Engineering Hub</p>
              <span className="hub-detail">High-Torque Actuators · Micro-Sensors</span>
            </div>

            <div className="hub-card">
              <span className="hub-flag">🇩🇪</span>
              <h3>Munich Systems Center</h3>
              <p>Bavaria Cybernetic Testing Grounds</p>
              <span className="hub-detail">Industrial Automation · Quality Testing</span>
            </div>
          </div>

          {/* Interactive FAQ Accordion */}
          <div className="faq-wrapper">
            <div className="section-tag-row" style={{ marginTop: '50px' }}>
              <span className="section-tag-pill">Common Inquiries</span>
            </div>
            <h2 className="section-heading-lg" style={{ marginBottom: '24px' }}>
              Frequently Asked <span>Questions</span>
            </h2>

            <div className="faq-accordion">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className={`faq-item${isOpen ? ' open' : ''}`}>
                    <button className="faq-question-btn" onClick={() => toggleFaq(idx)}>
                      <span>{faq.q}</span>
                      <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
