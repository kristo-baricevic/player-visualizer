/* eslint-disable @next/next/no-img-element */
import React, { useContext, useRef } from "react";
import { AudioPlayerContext } from "./AudioPlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faGuitar,
  faDrum,
  faMicrophone,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import ErrorBoundary from "./ErrorBoundary";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

const MultiTrackPlayer = () => {
  const audio = useContext(AudioPlayerContext);

  const musicContainerRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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
    setProgress,
    prevSong,
    nextSong,
    playPauseTracks,
    toggleMuteTrack,
  } = audio;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const width = progressContainerRef.current?.clientWidth || 0;
    const clickX = e.nativeEvent.offsetX;
  
    if (audio.currentSong) {
      // Assuming all tracks have the same duration
      const duration = audio.currentSong['track1'].duration(); 
      const newTime = (clickX / width) * duration;
  
      // Seek in all tracks
      Object.values(audio.currentSong).forEach(track => {
        track.seek(newTime);
      });
  
      // Update the progress state immediately
      const newProgress = (newTime / duration) * 100;
      setProgress(newProgress);
    }
  };
  
  // Play/Pause button click event
  const handleClickPlayPause = () => {
    //fire the play/pause action
    playPauseTracks();

    //update the play/pause button state in order to change the icon
    if (musicContainerRef.current && isPlaying) {
      musicContainerRef.current?.classList.remove("play");
    } else {
      musicContainerRef.current?.classList.add("play");
    }
  };

  // Next song button click event
  const prevSongHandler = () => {
    prevSong();
  };

  // Previous song button click event
  const nextSongHandler = () => {
    nextSong();
  };

  return (
    <ErrorBoundary>
      <>
        <div
          ref={musicContainerRef}
          className="music-container"
          id="music-container"
        >
          <div className="music-info">
            <img
              className="cover-image"
              src={`http://localhost:8080/images/cover${currentSongIndex}.png`}
              onError={(e) => (e.currentTarget.src = "cover1.png")}
              alt="album art"
            />
            <div className="flex flex-col px-2">
              <h4 className="flex" ref={titleRef}>
                {trackLinerNotes[currentSongIndex]?.title}
              </h4>
              <div
                className="progress-container flex"
                ref={progressContainerRef}
                onClick={handleProgressClick}
                >
                <div
                  className="progress"
                  ref={progressRef}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="container-background">
            <div className="navigation">
              <button
                ref={prevBtnRef}
                data-testid="prevSongBtn"
                className="action-btn"
                onClick={prevSongHandler}
              >
                <FontAwesomeIcon icon={faBackward} />
              </button>
              <button
                ref={playBtnRef}
                data-testid="playPauseBtn"
                className="action-btn action-btn-big"
                onClick={handleClickPlayPause}
              >
                {isLoading ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                )}
              </button>
              <button
                ref={nextBtnRef}
                data-testid="nextSongBtn"
                className="action-btn"
                onClick={nextSongHandler}
              >
                <FontAwesomeIcon icon={faForward} />
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center z-20 mt-6">
            {[0, 1, 2].map((trackIndex) => (
              <button
                key={trackIndex}
                className="flex mx-4 bg-cyan-700 p-4 hover:bg-cyan-600 active:bg-cyan-900 ml-2 rounded-full"
                onClick={() => toggleMuteTrack(trackIndex)}
              >
                {trackIndex === 0 ? (
                  isMuted[trackIndex] ? (
                    <FontAwesomeIcon icon={faGuitar} size="2xl" fade />
                  ) : (
                    <FontAwesomeIcon icon={faGuitar} size="2xl" />
                  )
                ) : trackIndex === 1 ? (
                  isMuted[trackIndex] ? (
                    <FontAwesomeIcon icon={faMicrophone} size="2xl" fade />
                  ) : (
                    <FontAwesomeIcon icon={faMicrophone} size="2xl" />
                  )
                ) : isMuted[trackIndex] ? (
                  <FontAwesomeIcon icon={faDrum} size="2xl" fade />
                ) : (
                  <FontAwesomeIcon icon={faDrum} size="2xl" />
                )}
              </button>
            ))}
          </div>
        </div>
      </>
    </ErrorBoundary>
  );
};

export default MultiTrackPlayer;
