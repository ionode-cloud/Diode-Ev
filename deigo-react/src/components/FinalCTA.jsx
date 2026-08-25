import React, { forwardRef } from 'react';

export const FinalCTA = forwardRef(function FinalCTA(props, ref) {
  return (
    <section className="final-cta" id="final-cta" ref={ref}>
      <h2 className="final-cta__heading">READY TO GO ELECTRIC?</h2>
      <p className="final-cta__body">Configure your DEIGO and book a test drive today.</p>
      <button
        type="button"
        className="final-cta__button"
        id="cta-btn"
        onClick={() => alert('DEIGO Configuration portal is ready.')}
      >
        CONFIGURE YOUR DEIGO
      </button>
    </section>
  );
});
