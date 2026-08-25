import React, { useRef, useEffect } from 'react';

const MAX_DPR = 2;

export function FrameCanvas({ currentFrame }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    width: 0,
    height: 0,
    dpr: 1,
  });

  const drawFrame = (img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    const { width: cw, height: ch } = stateRef.current;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (!iw || !ih || !cw || !ch) return;

    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      stateRef.current = { width, height, dpr };

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (currentFrame) {
        drawFrame(currentFrame);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (currentFrame) {
      drawFrame(currentFrame);
    }
  }, [currentFrame]);

  return <canvas ref={canvasRef} id="frame-canvas" className="frame-canvas" />;
}
