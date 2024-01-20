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
      dispatch(fetchSongsSuccess(songsData));
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
    dispatch({ type: AudioActionTypes.NEXT_SONG, payload: nextIndex });
  };

export const prevSong =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    const { audio } = getState();
    const prevIndex = (audio.currentSongIndex - 1) % 5;
    //   const prevIndex = (audio.currentSongIndex - 1 + audio.trackLinerNotes.length) % audio.trackLinerNotes.length;
    dispatch({ type: AudioActionTypes.PREV_SONG, payload: prevIndex });
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

export const analyzeSongSuccess = (analysisData: number) => ({
  type: AudioActionTypes.ANALYZE_SONG_SUCCESS,
  payload: analysisData,
});

export const analyzeSongFailure = (error: string) => ({
  type: AudioActionTypes.ANALYZE_SONG_FAILURE,
  payload: error,
});

export type SongsActions = FetchSongsSuccessAction | FetchSongsFailureAction;
