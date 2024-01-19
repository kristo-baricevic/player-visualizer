// thunks.js
import { ThunkAction } from "redux-thunk";
import {
  analyzeSongRequest,
  analyzeSongSuccess,
  analyzeSongFailure,
} from "./actions";
import * as Essentia from "essentia.js";
import { RootState } from "../store";
import { Action, Dispatch } from "redux";

export const analyzeAudio = (
  currentSongIndex: number
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(analyzeSongRequest());
    try {
      const response = await fetch(
        `http://localhost:8080/server-api/music/song${currentSongIndex}/track3.mp3`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch audio data");
      }
      const audioData = await response.arrayBuffer();
      const essentia = new Essentia.Client();
      // Perform analysis (modify as per your actual analysis logic)
      const spectralCentroid = essentia.spectralCentroid(audioData);
      dispatch(analyzeSongSuccess(spectralCentroid));
    } catch (error) {
      if (error) {
        dispatch(analyzeSongFailure(error instanceof Error ? error.message : String(error)));
    } else return null;
    }
  };
};
