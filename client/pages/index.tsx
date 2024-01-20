import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  Dispatch,
} from "react";
// import BackgroundAnimation from "@/components/BackgroundAnimation";
import MultiTrackPlayer from "../src/components/MultiTrackPlayer";
import LinerNotes from "../src/components/LinerNotes";
import ErrorBoundary from "../src/components/ErrorBoundary";
import { AudioPlayerContext } from "../src/components/AudioPlayerContext";
import { animationForSong, clearAnimations } from "@/src/utils/animations";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { useDispatch } from "react-redux";
import { analyzeAudio } from "@/src/redux/thunk";
import { AudioActions } from "@/src/redux/actionTypes";
import { ThunkDispatch } from "redux-thunk";

// @ts-nocheck

function Index() {
  const audio = useContext(AudioPlayerContext);
  type AppDispatch = ThunkDispatch<RootState, void, AudioActions>;

  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const songsData = useSelector(
    (state: RootState) => state.audio.trackLinerNotes
  );

  const analysisData = useSelector(
    (state: RootState) => state.audio.analysisData
  );

  const loadDataAnalysis = useCallback(
    (currentSongIndex: number) => {
      if (currentSongIndex === null || currentSongIndex === undefined) return;
      dispatch(analyzeAudio(currentSongIndex));
    },
    [dispatch]
  );

  useEffect(() => {
    if (audio) {
      const { currentSongIndex, loadNewSong } = audio;
      loadDataAnalysis(currentSongIndex);

      if (analysisData) {
        clearAnimations();
        animationForSong(120, analysisData, 0);
        loadNewSong(currentSongIndex);
      }
    }
    // including audio creates infinite loop,
    // so using eslint-disable-next-line to skip this warning

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    loadDataAnalysis,
    analysisData,
    audio?.currentSongIndex,
    audio?.loadNewSong,
  ]);

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
