import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { AudioActionTypes } from "./actionTypes";
import { AudioState } from "./reducer";


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

export const fetchSongsSuccess = (songs: SongData[]): FetchSongsSuccessAction => ({
    type: AudioActionTypes.FETCH_SONGS_SUCCESS,
  payload: songs,
});

export const fetchSongsFailure = () => ({
  type: AudioActionTypes.FETCH_SONGS_FAILURE,
});

export const fetchSongs = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch: any) => {
    fetch("http://localhost:8080/api/songs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((songsData) => {
        dispatch(fetchSongsSuccess(songsData as SongData[]));
      })
      .catch((error) => {
        dispatch(fetchSongsFailure());
      });
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
