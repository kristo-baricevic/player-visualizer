import React, { useEffect, useState, useContext } from "react";
// import BackgroundAnimation from "@/components/BackgroundAnimation";
import MultiTrackPlayer from "../src/components/MultiTrackPlayer";
import LinerNotes from "../src/components/LinerNotes";
import ErrorBoundary from "../src/components/ErrorBoundary";
import { AudioPlayerContext } from "../src/components/AudioPlayerContext";
import { animationForSong, clearAnimations } from "../src/utils/animations";

function Index() {
  const audio = useContext(AudioPlayerContext);

  useEffect(() => {
    if (audio) {
      try {
          const { currentSongIndex, loadNewSong } = audio;
          clearAnimations();
          animationForSong(120, 0, 0);
          loadNewSong(currentSongIndex);
      } catch (error) {
        console.error("Error in Index component useEffect:", error);
      }
    }
  }, [audio?.currentSongIndex, audio?.loadNewSong]);

  if (!audio || !audio.currentSongIndex || !audio.loadNewSong) {
    return null;
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="night-sky" id="night-sky"></div>
      <div className="page-title flex justify-center">
        {"kr1st0-beats".split("").map((letter, index) => (
          <span key={index} className="letter text-2xl" id="letter">
            {letter}
          </span>
        ))}
      </div>
      <ErrorBoundary>
        <div className="flex items-center justify-center box mb-10 h-80 w-80 bg-cyan-300 rounded-lg">
          <MultiTrackPlayer />
        </div>
        <div id="starburst" className="starburst"></div>
        <div>{/* <BackgroundAnimation /> */}</div>
        <LinerNotes />
      </ErrorBoundary>
    </main>
  );
}

export default Index;
