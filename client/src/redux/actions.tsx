import { ThunkAction } from "redux-thunk";
import { Action, Dispatch } from "redux";
import { AudioActionTypes } from "./actionTypes";
import { AudioState } from "./reducer";
import { analyzeAudio } from "./thunk";

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Action<string>>;

export interface RootState {
  audio: AudioState;
}

interface SongData {
  id: number;
  title: string;
  samples: {
    parts: {
      text: string;
      link?: string;
    }[];
  }[];
}

export const setCurrentSongIndex = (index: number) => {
  return {
    type: AudioActionTypes.SET_CURRENT_SONG_INDEX,
    payload: index,
  };
};

export const loadSong = (songIndex: number) => {
  return {
    type: AudioActionTypes.LOAD_SONG,
    payload: songIndex,
  };
};

export const playPauseSong = () => {
  return {
    type: AudioActionTypes.PLAY_PAUSE_TRACKS,
  };
};

interface FetchSongsSuccessAction extends Action {
  type: typeof AudioActionTypes.FETCH_SONGS_SUCCESS;
  payload: SongData[];
}

interface FetchSongsFailureAction extends Action {
  type: typeof AudioActionTypes.FETCH_SONGS_FAILURE;
  error: string;
}

export const fetchSongsSuccess = (
  songs: SongData[]
): FetchSongsSuccessAction => ({
  type: AudioActionTypes.FETCH_SONGS_SUCCESS,
  payload: songs,
});

export const fetchSongsFailure = (
  error: string = "Unknown error"
): FetchSongsFailureAction => ({
  type: AudioActionTypes.FETCH_SONGS_FAILURE,
  error,
});

export const fetchSongs = () => {
  return async (dispatch: Dispatch<SongsActions>) => {
    try {
      const response = await fetch("http://localhost:8080/server-api/songs");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const songsData = await response.json();
      console.log(songsData);
      dispatch(fetchSongsSuccess(songsData as SongData[]));
    } catch (error) {
      console.error("Error fetching songs:", error);
      dispatch(fetchSongsFailure());
    }
  };
};

export const nextSong =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    const { audio } = getState();
    const nextIndex = (audio.currentSongIndex + 1) % 5;
    dispatch(setCurrentSongIndex(nextIndex));
    dispatch(loadSong(nextIndex));
  };

export const prevSong =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    const { audio } = getState();
    const prevIndex = (audio.currentSongIndex - 1) % 5;
    dispatch(setCurrentSongIndex(prevIndex));
    dispatch(loadSong(prevIndex));
  };

export const toggleMuteTrack = (trackIndex: number) => {
  return {
    type: AudioActionTypes.TOGGLE_MUTE_TRACK,
    payload: trackIndex,
  };
};

export const analyzeSongRequest = () => ({
  type: AudioActionTypes.ANALYZE_SONG_REQUEST,
});

export const analyzeSongSuccess = (analysisData: {
  analysis: {
    centroids: [];
    differences: [];
  };
  bpm: null;
}) => ({
  type: AudioActionTypes.ANALYZE_SONG_SUCCESS,
  payload: analysisData,
});

export const analyzeSongFailure = (error: string) => ({
  type: AudioActionTypes.ANALYZE_SONG_FAILURE,
  payload: error,
});

export const deleteWavFile = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(`http://localhost:8080/delete-wav/`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to delete WAV file");
      }
      console.log("WAV file deleted successfully");
      dispatch({ type: AudioActionTypes.WAV_FILE_DELETED });
    } catch (error) {
      console.error("Error deleting WAV file:", error);
      dispatch({
        type: AudioActionTypes.WAV_FILE_DELETION_ERROR,
        payload: error,
      });
    }
  };
};

export const wavFileDeleted = () => ({
  type: AudioActionTypes.WAV_FILE_DELETED,
});

export const wavFileDeletionError = (errorMessage: string) => ({
  type: AudioActionTypes.WAV_FILE_DELETION_ERROR,
  payload: errorMessage,
});

export type SongsActions = FetchSongsSuccessAction | FetchSongsFailureAction;
