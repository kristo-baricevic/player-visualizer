import React, { useContext } from "react";
import { AudioPlayerContext } from "./AudioPlayerContext";
import ErrorBoundary from "./ErrorBoundary";
import PlayButton from "./PlayButton";
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
      <div className="music-container" id="music-container">
        {isValidIndex && <AlbumCover currentSongIndex={currentSongIndex} />}
        <div className="flex flex-col px-2">
          {isValidIndex && (
            <h4 className="flex">{trackLinerNotes[currentSongIndex]?.title}</h4>
          )}
          {isValidIndex && (
            <ProgressBar progress={progress} onSetProgress={setProgress} />
          )}
        </div>
        <NavigationDashboard
          isLoading={isLoading}
          isPlaying={isPlaying}
          onPlayPauseClick={playPauseTracks}
          onPrevClick={prevSong}
          onNextClick={nextSong}
          isValidIndex={isValidIndex}
        />
        <TrackButtons isMuted={isMuted} onToggleMute={toggleMuteTrack} />
      </div>
    </ErrorBoundary>
  );
};

export default NewMultiTrackPlayer;
