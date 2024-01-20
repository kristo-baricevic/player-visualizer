// thunks.js
import { ThunkAction } from "redux-thunk";
import {
  analyzeSongRequest,
  analyzeSongSuccess,
  analyzeSongFailure,
} from "./actions";
import { RootState } from "../store";
import { Action, Dispatch } from "redux";

export const analyzeAudio = (
  currentSongIndex: number
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch: Dispatch) => {
    dispatch(analyzeSongRequest());
    try {
      console.log("thunk action" + currentSongIndex);
      const response = await fetch(
        `http://localhost:8080/analyze/${currentSongIndex}`
      );
      if (!response.ok) {
        throw new Error("Server responded with an error.");
      }
      const analysisResult = await response.json();
      dispatch(analyzeSongSuccess(analysisResult));
    } catch (error) {
      dispatch(
        analyzeSongFailure(
          error instanceof Error ? error.message : String(error)
        )
      );
    }
  };
};
