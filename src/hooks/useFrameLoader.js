import { useState, useEffect, useRef } from 'react';

const TOTAL_FRAMES = 90;
const FRAME_PATH = (i) => `/assets/frames/frame_${String(i + 1).padStart(3, '0')}.jpg`;
const INITIAL_BATCH = 18;
const BG_CONCURRENCY = 4;

export function useFrameLoader() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const imagesRef = useRef(new Array(TOTAL_FRAMES).fill(null));
  const loadedRef = useRef(new Array(TOTAL_FRAMES).fill(false));
  const loadingRef = useRef(new Array(TOTAL_FRAMES).fill(false));
  const loadedCountRef = useRef(0);

  const loadFrame = (index) => {
    if (loadedRef.current[index] || loadingRef.current[index]) return Promise.resolve();
    loadingRef.current[index] = true;

    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        imagesRef.current[index] = img;
        loadedRef.current[index] = true;
        loadingRef.current[index] = false;
        loadedCountRef.current++;
        setLoadProgress(loadedCountRef.current / INITIAL_BATCH);
        resolve();
      };
      img.onerror = () => {
        loadingRef.current[index] = false;
        resolve();
      };
      img.src = FRAME_PATH(index);
    });
  };

  const getNearestFrame = (index) => {
    if (loadedRef.current[index]) return imagesRef.current[index];
    for (let r = 1; r < TOTAL_FRAMES; r++) {
      const lo = index - r;
      const hi = index + r;
      if (lo >= 0 && loadedRef.current[lo]) return imagesRef.current[lo];
      if (hi < TOTAL_FRAMES && loadedRef.current[hi]) return imagesRef.current[hi];
    }
    return null;
  };

  const ensureFrameLoading = (index) => {
    if (!loadedRef.current[index] && !loadingRef.current[index]) {
      loadFrame(index);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const loadSequence = async () => {
      // 1. Load initial batch
      const initialJobs = [];
      for (let i = 0; i < Math.min(INITIAL_BATCH, TOTAL_FRAMES); i++) {
        initialJobs.push(loadFrame(i));
      }
      await Promise.all(initialJobs);

      if (isCancelled) return;
      setIsReady(true);

      // 2. Stream remaining in background
      let nextIndex = INITIAL_BATCH;
      const pump = async () => {
        while (nextIndex < TOTAL_FRAMES && !isCancelled) {
          const idx = nextIndex++;
          if (!loadedRef.current[idx]) {
            await loadFrame(idx);
          }
        }
      };

      const workers = [];
      for (let w = 0; w < BG_CONCURRENCY; w++) {
        workers.push(pump());
      }
      await Promise.all(workers);
    };

    loadSequence();

    return () => {
      isCancelled = true;
    };
  }, []);

  return {
    isReady,
    loadProgress: Math.min(1, loadProgress),
    getNearestFrame,
    ensureFrameLoading,
    totalFrames: TOTAL_FRAMES,
  };
}
