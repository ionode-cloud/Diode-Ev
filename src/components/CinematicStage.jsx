import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useCinematicScroll } from '../hooks/useCinematicScroll.js';
import DeigoNavbar   from './DeigoNavbar.jsx';
import ChapterText   from './ChapterText.jsx';
import ScrollProgress from './ScrollProgress.jsx';

/**
 * CinematicStage
 *
 * The main cinematic section:
 *   <section.cinema-scroll>   ← 100vh + 3700px, owns the scroll distance
 *     <div.stage>             ← sticky 100vh, always in viewport
 *       <div.world>
 *         .atmosphere
 *         .video-layer → <video>
 *         .depth-overlay
 *         DeigoNavbar
 *         .hero-title
 *         .intro-copy
 *         ChapterText
 *         ChapterText
 *         ScrollProgress
 *         .shade
 *       </div>
 *     </div>
 *   </section>
 */
export default function CinematicStage({ onVideoProgress }) {
  const sectionRef      = useRef(null);
  const videoRef        = useRef(null);
  const atmosphereRef   = useRef(null);
  const videoLayerRef   = useRef(null);

  const engine = useCinematicScroll(videoRef, sectionRef);

  /* ── Report video buffer progress upward for the loading screen ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.pause();
    video.currentTime = 0;

    const onProgress = () => {
      if (!video.buffered.length || !video.duration) return;
      const buffered = video.buffered.end(video.buffered.length - 1);
      onVideoProgress?.(Math.min(buffered / video.duration, 1));
    };
    const onCanPlay = () => onVideoProgress?.(1);

    video.addEventListener('progress',       onProgress);
    video.addEventListener('canplaythrough', onCanPlay);
    video.addEventListener('loadedmetadata', onProgress);

    return () => {
      video.removeEventListener('progress',       onProgress);
      video.removeEventListener('canplaythrough', onCanPlay);
      video.removeEventListener('loadedmetadata', onProgress);
    };
  }, [onVideoProgress]);

  return (
    <section
      className="cinema-scroll"
      id="cinema"
      ref={sectionRef}
    >
      <div className="stage">
        <div className="world">

          {/* ── Z1: atmosphere ── */}
          <div className="atmosphere" ref={atmosphereRef} />

          {/* ── Z2: cinematic video ── */}
          <div className="video-layer" ref={videoLayerRef}>
            <video
              ref={videoRef}
              className="cinematic-video"
              src="/videos/1.mp4"
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen"
            />
          </div>

          {/* ── Z3: depth vignette ── */}
          <div className="depth-overlay" />

          {/* ── Z4: scroll-driven shade overlay ── */}
          <div className="shade" />

          {/* ── Z10+: navigation ── */}
          <DeigoNavbar engine={engine} />

          {/* ── Z10: hero title ── */}
          <h1 className="hero-title" aria-label="DEIGO">
            <span className="hero-title__wordmark">DEIGO</span>
            <span className="hero-title__sub">ELECTRIC MOBILITY</span>
          </h1>

          {/* ── Z10: intro copy ── */}
          <div className="intro-copy">
            <div className="intro-copy__headline">A NEW GENERATION OF ELECTRIC MOTION.</div>
            <p className="intro-copy__body">
              Experience silent power, intelligent design,<br />
              and effortless movement through the city.
            </p>
            <div className="intro-copy__tags">
              <span className="intro-copy__tag">100% ELECTRIC</span>
              <span className="intro-copy__tag">SMART PERFORMANCE</span>
              <span className="intro-copy__tag">FUTURE READY</span>
            </div>
          </div>

          {/* ── Z10: scroll indicator ── */}
          <div className="scroll-indicator">
            <span className="scroll-indicator__text">SCROLL TO DRIVE</span>
            <div className="scroll-indicator__line" />
          </div>

          {/* ── Z11: chapter story panels ── */}
          <ChapterText />


          {/* ── Z16: scroll progress ── */}
          <ScrollProgress engine={engine} />

        </div>
      </div>
    </section>
  );
}
