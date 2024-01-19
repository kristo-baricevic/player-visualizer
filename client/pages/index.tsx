import React, { useEffect, useState, useContext } from "react";
// import BackgroundAnimation from "@/components/BackgroundAnimation";
import MultiTrackPlayer from "../src/components/MultiTrackPlayer";
import LinerNotes from "../src/components/LinerNotes";
import ErrorBoundary from "../src/components/ErrorBoundary";
import { AudioPlayerContext } from "../src/components/AudioPlayerContext";
import { animationForSong, clearAnimations } from "@/src/utils/animations";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import * as Essentia from 'essentia.js';
const fs = require('fs');

// @ts-nocheck

function Index() {
  const audio = useContext(AudioPlayerContext);
  const songsData = useSelector(
    (state: RootState) => state.audio.trackLinerNotes
  );

  const audioContext = audio?.getAudioContext();

  const essentia = new Essentia.Client();
  const analyser = audioContext?.createAnalyser();

  /**
   * This function analyzes the audio data using the Essentia library and returns the spectral centroid of the audio data.
   * @param {Float32Array} dataArray - The audio data array.
   * @returns {number} The spectral centroid of the audio data.
   */

  function analyzeAudio() {
    if (analyser) {
      const bufferLength = analyser.frequencyBinCount;
      if (typeof bufferLength === "number") {
        const dataArray = new Float32Array(bufferLength);
        analyser.getFloatFrequencyData(dataArray);

        const spectralCentroid = essentia.spectralCentroid(dataArray);
        return spectralCentroid;
      } else {
        console.error("bufferLength is not defined");
        return null;
      }
    } else {
      console.error("Analyser is not defined");
      return null;
    }
  }

  useEffect(() => {
    if (audio) {
      try {
        const analysisData1 = analyzeAudio();
        const { currentSongIndex, loadNewSong } = audio;
        clearAnimations();
        animationForSong(120, analysisData1, 0);
        loadNewSong(currentSongIndex);
        console.log(songsData);
      } catch (error) {
        console.error("Error in Index component useEffect:", error);
      }
    }
  }, [audio?.currentSongIndex, audio?.loadNewSong]);

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
        <LinerNotes />
      </ErrorBoundary>
    </main>
  );
}

export default Index;
