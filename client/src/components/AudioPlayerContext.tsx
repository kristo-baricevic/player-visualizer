"use client";

import React, { createContext, useState, useCallback, useEffect } from "react";
import { fetchSongs, setCurrentSongIndex } from "../redux/actions";
import { useDispatch } from "react-redux";
import { Howl } from "howler";
import { AppDispatch } from "../store";


export const useAppDispatch: () => AppDispatch = useDispatch;

// Define the shape of your context state
interface AudioContextState {
  isPlaying: boolean;
  isLoading: boolean;
  currentSongIndex: number;
  progress: number;
  setProgress: (newProgress: number) => void;
  currentSong: { [key: string]: Howl } | null;
  trackLinerNotes: TrackLinerNotes[];
  nextSong: () => void;
  prevSong: () => void;
  isMuted: boolean[];
  volume?: number;
  getAudioContext: () => AudioContext | null;
  loadNewSong: (songIndex: number) => void;
  playPauseTracks: () => void;
  toggleMuteTrack: (trackIndex: number) => void;
}

type AudioProviderProps = {
  children: React.ReactNode;
};

interface Track {
  [key: string]: Howl;
}

interface CurrentTrackState {
  song: Track | null;
  index: number;
  isPlaying: boolean;
  isMuted: boolean[];
}

interface TrackLoadingStatus {
  [key: string]: boolean;
}

interface TrackLinerNotes {
  id: number;
  title: string;
  samples: {
    parts: {
      text: string;
      link?: string;
    }[];
  }[];
}

export const AudioPlayerContext = createContext<AudioContextState | undefined>(
  undefined
);

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // This code runs only on the client side where 'window' is defined
    if (typeof window !== "undefined") {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(ac);
    }
  }, []);

  const getAudioContext = () => {
    return audioContext as AudioContext;
  };

  const dispatch = useAppDispatch();

  const [currentTrack, setCurrentTrack] = useState<CurrentTrackState>({
    song: null,
    index: 0,
    isPlaying: false,
    isMuted: [false, false, false],
  });

  const [trackLoadingStatus, setTrackLoadingStatus] =
    useState<TrackLoadingStatus>({
      track1: false,
      track2: false,
      track3: false,
    });

  const [trackLinerNotes, setTrackLinerNotes] = useState<TrackLinerNotes[]>([]);

  const isLoading = Object.values(trackLoadingStatus).some((status) => status);

  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);


  /**
 * Logs a message to the console when the current track index changes.
 * 
 * @param {number} currentTrack.index - The index of the current track
 */
  useEffect(() => {
    console.log("Current track index changed:", currentTrack.index);
    if (trackLinerNotes[currentTrack.index]) {
      setTrackLinerNotes([trackLinerNotes[currentTrack.index]]);
    }
  }, [currentTrack.index]);



  const loadSong = useCallback(
    (songIndex: number) => {
      if (currentTrack.song) {
        Object.values(currentTrack.song).forEach((track) => track.unload());
      }

      try {
        setTrackLoadingStatus({ track1: true, track2: true, track3: true });
        const basePath = `http://localhost:8080/music/song${songIndex + 1}`;
        const newSong = {
          track1: new Howl({
            src: [`${basePath}/track1.mp3`],
            onload: () =>
              setTrackLoadingStatus((prev) => ({ ...prev, track1: false })),
          }),
          track2: new Howl({
            src: [`${basePath}/track2.mp3`],
            onload: () =>
              setTrackLoadingStatus((prev) => ({ ...prev, track2: false })),
          }),
          track3: new Howl({
            src: [`${basePath}/track3.mp3`],
            onload: () =>
              setTrackLoadingStatus((prev) => ({ ...prev, track3: false })),
          }),
        };
        setCurrentTrack((prev) => ({
          ...prev,
          song: newSong,
          index: songIndex,
        }));

        // fetch liner notes
        const data = dispatch(fetchSongs());
        console.log(data);
      } catch (error) {
        console.error("Error in loadSong:", error);
      }
    },
    [dispatch]
  );

  const updateProgress = useCallback(() => {
    if (currentTrack.song && currentTrack.isPlaying) {
      const primaryTrack = currentTrack.song["track1"];
      const newProgress = (primaryTrack.seek() / primaryTrack.duration()) * 100;
      setProgress(newProgress);
    }
  }, [currentTrack.song, currentTrack.isPlaying]);

  const playPauseTracks = useCallback(() => {
    console.log("playPause callback", currentTrack.isPlaying);
    if (!currentTrack.song) return;

    setCurrentTrack((prev) => {
      const isPlaying = !prev.isPlaying;
      if (prev.song) {
        Object.values(prev.song).forEach(track =>
          isPlaying ? track.play() : track.pause()
        );
      }
      return { ...prev, isPlaying };
    });
  }, [currentTrack.song]);

  const toggleMuteTrack = useCallback(
    (trackIndex: number) => {
      if (
        !currentTrack.song ||
        trackIndex < 0 ||
        trackIndex >= currentTrack.isMuted.length
      )
        return;

      setCurrentTrack((prev) => {
        const newMuted = [...prev.isMuted];
        newMuted[trackIndex] = !newMuted[trackIndex];
        if (prev.song) {
          const trackKeys = Object.keys(prev.song);
          prev.song[trackKeys[trackIndex]].mute(newMuted[trackIndex]);
        }
        return { ...prev, isMuted: newMuted };
      });
    },
    [currentTrack.isMuted.length, currentTrack.song]
  );

  // Add next and previous song functions
  const nextSong = useCallback(() => {
    console.log("next song callback");
    //stop current song
    if (currentTrack.song) {
      Object.values(currentTrack.song).forEach((track) => track.stop());
    }

    const nextIndex = (currentTrack.index + 1) % 5;
    console.log("next song index", nextIndex);
    dispatch(setCurrentSongIndex(nextIndex)); 

    loadSong(nextIndex);
    console.log("currentTrack.index", currentTrack.index);
    setCurrentTrack((prev) => ({
      ...prev,
      index: nextIndex,
      isPlaying: false,
    }));
    setTrackLinerNotes([trackLinerNotes[nextIndex]]);
  }, [currentTrack.index, loadSong]);

  const prevSong = useCallback(() => {
    //stop current song
    if (currentTrack.song) {
      Object.values(currentTrack.song).forEach((track) => track.stop());
    }

    const prevIndex = (currentTrack.index - 1 + 5) % 5;
    dispatch(setCurrentSongIndex(prevIndex)); // Dispatch the action to update the index

    loadSong(prevIndex);
    console.log("currentTrack.index", currentTrack.index);
    setCurrentTrack((prev) => ({
      ...prev,
      index: prevIndex,
      isPlaying: false,
    }));

    const trackNumber = currentTrack.index;
    setTrackLinerNotes([trackLinerNotes[trackNumber]]);
    console.log(trackLinerNotes);
    console.log(trackLinerNotes[prevIndex]);
  }, [currentTrack.index, loadSong]);

  const changeVolume = useCallback(
    (newVolume: number) => {
      setVolume(newVolume);
      if (currentTrack.song) {
        Object.values(currentTrack.song).forEach((track) =>
          track.volume(newVolume)
        );
      }
    },
    [currentTrack.song]
  );

  useEffect(() => {
    let animationFrameId: number;

    if (currentTrack.isPlaying) {
      animationFrameId = requestAnimationFrame(updateProgress);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [updateProgress, currentTrack.isPlaying]);

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying: currentTrack.isPlaying,
        trackLinerNotes,
        currentSongIndex: currentTrack.index,
        isMuted: currentTrack.isMuted,
        isLoading,
        progress,
        setProgress,
        getAudioContext,
        currentSong: currentTrack.song,
        loadNewSong: loadSong,
        nextSong,
        volume,
        prevSong,
        playPauseTracks,
        toggleMuteTrack,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioProvider;
