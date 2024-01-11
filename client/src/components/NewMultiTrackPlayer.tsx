import React, { useContext } from "react";
import { AudioPlayerContext } from "./AudioPlayerContext";
import ErrorBoundary from "./ErrorBoundary";
import ProgressBar from "./ProgressBar";
import AlbumCover from "./AlbumCover";
import NavigationDashboard from "./NavigationDashboard";
import TrackButtons from "./TrackButtons";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

const NewMultiTrackPlayer = () => {
  const audio = useContext(AudioPlayerContext);

  if (!audio) {
    return null;
  }

  const {
    isMuted,
    isLoading,
    isPlaying,
    trackLinerNotes,
    currentSongIndex,
    progress,
    prevSong,
    nextSong,
    playPauseTracks,
    toggleMuteTrack,
  } = audio;

  const isValidIndex =
    currentSongIndex >= 0 && currentSongIndex < trackLinerNotes.length;

  const setProgress = (newProgress: number) => {
    console.log("New progress:", newProgress);
  };

  console.log("Audio Context:", audio);

  return (
    <ErrorBoundary>
        <NavigationDashboard
          isLoading={isLoading}
          isPlaying={isPlaying}
          onPlayPauseClick={playPauseTracks}
          onPrevClick={prevSong}
          onNextClick={nextSong}
          isValidIndex={isValidIndex}
        />
        <TrackButtons isMuted={isMuted} onToggleMute={toggleMuteTrack} />
    </ErrorBoundary>
  );
};

export default NewMultiTrackPlayer;
