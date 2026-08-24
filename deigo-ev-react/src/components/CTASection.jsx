import React, { useEffect, useRef } from 'react';

export default function CTASection() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('cta-section--visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cta-section" id="final-cta" ref={ref}>
      <div className="cta-section__inner">
        <div className="cta-section__eyebrow">05 — MEET DEIGO EV</div>
        <h2 className="cta-section__title">DEIGO EV</h2>
        <p className="cta-section__subtitle">The road is yours.</p>
        <div className="cta-section__actions">
          <a href="#top" className="cta-section__primary">EXPLORE DEIGO</a>
          <a href="#technology" className="cta-section__secondary">DISCOVER THE TECHNOLOGY</a>
        </div>
      </div>
    </section>
  );
}
