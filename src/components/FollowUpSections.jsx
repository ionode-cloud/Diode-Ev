import React, { useEffect, useRef } from 'react';

const SECTIONS = [
  {
    id: 'design',
    eyebrow: '01 — DESIGN',
    title: 'SCULPTED BY MOTION',
    body: 'Every surface of DEIGO EV is shaped by airflow, not habit. A silhouette drawn for the road ahead, not the one behind it.'
  },
  {
    id: 'performance',
    eyebrow: '02 — PERFORMANCE',
    title: 'POWER WITHOUT NOISE',
    body: 'Instant torque, delivered in silence. DEIGO EV responds the moment you do — no delay, no drama, no noise.'
  },
  {
    id: 'technology',
    eyebrow: '03 — TECHNOLOGY',
    title: 'INTELLIGENCE IN EVERY JOURNEY',
    body: 'An adaptive system that learns your routes, anticipates your charge, and keeps the drive effortless from the first mile to the last.'
  },
  {
    id: 'charging',
    eyebrow: '04 — CHARGING',
    title: 'READY FOR THE NEXT DRIVE',
    body: 'A charging network built around your life, not the other way around. Plug in, and be ready before you are.'
  }
];

function useRevealOnView(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('reveal-section--visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

function RevealSection({ section }) {
  const ref = useRef(null);
  useRevealOnView(ref);

  return (
    <section className="reveal-section" id={section.id} ref={ref}>
      <div className="reveal-section__inner">
        <div className="reveal-section__eyebrow">{section.eyebrow}</div>
        <h2 className="reveal-section__title">{section.title}</h2>
        <p className="reveal-section__body">{section.body}</p>
      </div>
    </section>
  );
}

export default function FollowUpSections() {
  return (
    <div className="follow-up-sections">
      {SECTIONS.map((section) => (
        <RevealSection key={section.id} section={section} />
      ))}
    </div>
  );
}
