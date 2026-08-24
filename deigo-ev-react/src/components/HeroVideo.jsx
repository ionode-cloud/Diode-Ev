import React, { useEffect, useRef } from 'react';
import { useScrollVideo } from '../hooks/useScrollVideo.js';
import ChapterText from './ChapterText.jsx';
import FloatingUI from './FloatingUI.jsx';

export default function HeroVideo({ onEngineReady, onVideoProgress }) {
  const pinRef = useRef(null);
  const videoRef = useRef(null);
  const bgLayerRef = useRef(null);
  const videoLayerRef = useRef(null);
  const fgLayerRef = useRef(null);
  const indicatorRef = useRef(null);

  const engine = useScrollVideo(videoRef, pinRef, { scrollDistance: '400%' });

  useEffect(() => {
    if (onEngineReady) onEngineReady(engine);
  }, [engine, onEngineReady]);

  // Report video load progress upward for the loading screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const handleProgress = () => {
      if (!video.buffered.length || !video.duration) return;
      const buffered = video.buffered.end(video.buffered.length - 1);
      onVideoProgress && onVideoProgress(Math.min(buffered / video.duration, 1));
    };
    const handleCanPlay = () => onVideoProgress && onVideoProgress(1);

    video.addEventListener('progress', handleProgress);
    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('loadedmetadata', handleProgress);

    return () => {
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleProgress);
    };
  }, [onVideoProgress]);

  useEffect(() => {
    // Video must never behave like a normal player: pause immediately,
    // scrubbing owns currentTime exclusively from here on.
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    if (!engine) return undefined;

    const unsubscribe = engine.subscribe(({ progress, mouseX, mouseY, hasStartedScrolling }) => {
      // Cinematic settle: slightly zoomed in at the start, eases to 1x by the end.
      const cineScale = 1.08 - progress * 0.08;

      if (bgLayerRef.current) {
        const x = mouseX * 6;
        const y = mouseY * 4;
        bgLayerRef.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      }

      if (videoLayerRef.current) {
        const x = mouseX * 12;
        const y = mouseY * 8;
        videoLayerRef.current.style.transform =
          `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${cineScale.toFixed(4)})`;
      }

      if (fgLayerRef.current) {
        const x = mouseX * 16;
        const y = mouseY * 10;
        fgLayerRef.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      }

      if (indicatorRef.current) {
        indicatorRef.current.style.opacity = hasStartedScrolling ? '0' : '1';
      }
    });

    return unsubscribe;
  }, [engine]);

  return (
    <section className="hero-video" ref={pinRef} id="top">
      <div className="hero-video__bg-layer" ref={bgLayerRef} />

      <div className="hero-video__video-layer" ref={videoLayerRef}>
        <video
          ref={videoRef}
          className="hero-video__video"
          src="/videos/1.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen"
        />
        <div className="hero-video__gradient hero-video__gradient--top" />
        <div className="hero-video__gradient hero-video__gradient--bottom" />
      </div>

      <div className="hero-video__foreground-layer" ref={fgLayerRef}>
        <ChapterText engine={engine} />
        <FloatingUI engine={engine} />
      </div>

      <div className="hero-video__indicator" ref={indicatorRef}>
        <span>SCROLL TO DRIVE</span>
        <div className="hero-video__indicator-line" />
      </div>
    </section>
  );
}
