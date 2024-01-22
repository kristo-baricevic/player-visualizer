export enum AudioActionTypes {
  PLAY_PAUSE_TRACKS = "PLAY_PAUSE_TRACKS",
  LOAD_SONG = "LOAD_SONG",
  TOGGLE_MUTE_TRACK = "TOGGLE_MUTE_TRACK",
  NEXT_SONG = "NEXT_SONG",
  PREV_SONG = "PREV_SONG",
  SET_VOLUME = "SET_VOLUME",
  FETCH_SONGS_SUCCESS = "FETCH_SONGS_SUCCESS",
  FETCH_SONGS_FAILURE = "FETCH_SONGS_FAILURE",
  ANALYZE_SONG_REQUEST = "ANALYZE_SONG_REQUEST",
  ANALYZE_SONG_SUCCESS = "ANALYZE_SONG_SUCCESS",
  ANALYZE_SONG_FAILURE = "ANALYZE_SONG_FAILURE",
}

interface BaseAction {
  type: string;
}

interface PlayPauseTracksAction extends BaseAction {
  type: typeof AudioActionTypes.PLAY_PAUSE_TRACKS;
}

interface LoadSongAction extends BaseAction {
  type: typeof AudioActionTypes.LOAD_SONG;
  payload: number;
}

interface ToggleMuteTrackAction extends BaseAction {
  type: typeof AudioActionTypes.TOGGLE_MUTE_TRACK;
  payload: number;
}

interface NextSongAction extends BaseAction {
  type: typeof AudioActionTypes.NEXT_SONG;
  payload: number;
}

interface PrevSongAction extends BaseAction {
  type: typeof AudioActionTypes.PREV_SONG;
  payload: number;
}

interface SetVolumeAction extends BaseAction {
  type: typeof AudioActionTypes.SET_VOLUME;
  payload: number;
}

interface FetchSongsSuccessAction extends BaseAction {
  type: AudioActionTypes.FETCH_SONGS_SUCCESS;
  payload: any[];
}

interface FetchSongsFailureAction extends BaseAction {
  type: AudioActionTypes.FETCH_SONGS_FAILURE;
}

interface AnalyzeSongRequestAction extends BaseAction {
  type: typeof AudioActionTypes.ANALYZE_SONG_REQUEST;
}

interface AnalyzeSongSuccessAction extends BaseAction {
  type: typeof AudioActionTypes.ANALYZE_SONG_SUCCESS;
  payload: {
    analysisResult: {
      centroids: number[];
      differences: number[];
    };
    bpm: number | null;
  };
}

interface AnalyzeSongFailureAction extends BaseAction {
  type: typeof AudioActionTypes.ANALYZE_SONG_FAILURE;
  payload: string;
}

export type AudioActions =
  | PlayPauseTracksAction
  | LoadSongAction
  | ToggleMuteTrackAction
  | NextSongAction
  | PrevSongAction
  | SetVolumeAction
  | FetchSongsSuccessAction
  | FetchSongsFailureAction
  | AnalyzeSongRequestAction
  | AnalyzeSongSuccessAction
  | AnalyzeSongFailureAction;
