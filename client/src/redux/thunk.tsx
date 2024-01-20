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
    console.log("outside thunk action" + currentSongIndex);

    dispatch(analyzeSongRequest());
    try {
      console.log("inside thunk action" + currentSongIndex);
      const response = await fetch(
        `http://localhost:8080/analyze/${currentSongIndex + 1}`
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
