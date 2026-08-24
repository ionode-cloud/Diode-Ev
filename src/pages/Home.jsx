import React, { useCallback, useState } from 'react';
import LoadingScreen   from '../components/LoadingScreen.jsx';
import CinematicStage  from '../components/CinematicStage.jsx';
import FinalCTA        from '../components/FinalCTA.jsx';

export default function Home() {
  const [videoProgress, setVideoProgress] = useState(0);
  const [loadingDone,   setLoadingDone]   = useState(false);

  const handleVideoProgress = useCallback((p) => {
    setVideoProgress(p);
    if (p >= 1) {
      // Small delay so the bar visibly reaches 100% before fading.
      setTimeout(() => setLoadingDone(true), 300);
    }
  }, []);

  return (
    <div className="app-root">
      <LoadingScreen progress={videoProgress} visible={!loadingDone} />

      <main>
        <CinematicStage onVideoProgress={handleVideoProgress} />
        <FinalCTA />
      </main>
    </div>
  );
}
