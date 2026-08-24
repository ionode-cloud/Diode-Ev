import React, { useEffect, useRef } from 'react';

export default function FinalCTA() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.classList.add('final-cta--visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="final-cta" id="final-cta" ref={ref}>
      <div className="final-cta__inner">
        <div className="final-cta__eyebrow">THE ROAD AWAITS</div>

        <h2 className="final-cta__headline">
          THE ROAD<br />IS YOURS.
        </h2>

        <p className="final-cta__sub">
          Experience electric mobility redefined.
        </p>
        <p className="final-cta__model">DEIGO EV</p>

        <div className="final-cta__actions">
          <a href="#cinema" className="final-cta__primary">EXPLORE DEIGO</a>
          <a href="#technology" className="final-cta__secondary">DISCOVER THE TECHNOLOGY</a>
        </div>
      </div>
    </section>
  );
}
