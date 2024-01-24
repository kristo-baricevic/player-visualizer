import { AudioActions, AudioActionTypes } from "./actionTypes";

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

export interface AudioState {
  currentSongIndex: number;
  trackLinerNotes: SongData[] | null;
  isMuted: boolean[];
  analysisData: {
    analysisResult: {
      centroids: number[];
      differences: number[];
    };
    bpm: number | null;
  };

  isLoading: boolean;
  isPlaying: boolean;
  error: boolean;
  volume?: number;
}

const initialState: AudioState = {
  currentSongIndex: 0,
  trackLinerNotes: [],
  isMuted: [false, false, false],
  isLoading: false,
  isPlaying: true,
  analysisData: {
    analysisResult: {
      centroids: [],
      differences: [],
    },
    bpm: null,
  },
  
  error: false,
  volume: 1,
};

const audioReducer = (
  state: AudioState = initialState,
  action: AudioActions
): AudioState => {
  console.log('Reducer action received:', action.type);
  switch (action.type) {
    case AudioActionTypes.PLAY_PAUSE_TRACKS:
      return { ...state, isPlaying: !state.isPlaying };

    case AudioActionTypes.LOAD_SONG:
      const loadSongAction = action as {
        type: typeof AudioActionTypes.LOAD_SONG;
        payload: number;
      };
      return {
        ...state,
        currentSongIndex: loadSongAction.payload,
        isPlaying: false,
      };

    case AudioActionTypes.TOGGLE_MUTE_TRACK:
      const toggleMuteAction = action as {
        type: typeof AudioActionTypes.TOGGLE_MUTE_TRACK;
        payload: number;
      };
      const updatedIsMuted = state.isMuted.map((mute, index) =>
        index === toggleMuteAction.payload ? !mute : mute
      );
      return { ...state, isMuted: updatedIsMuted };

    case AudioActionTypes.NEXT_SONG:
      console.log('NEXT_SONG action:', action.payload); 
      const nextSongAction = action as {
        type: typeof AudioActionTypes.NEXT_SONG;
        payload: number;
      };
      return {
        ...state,
        currentSongIndex: nextSongAction.payload,
        isPlaying: false,
      };

    case AudioActionTypes.PREV_SONG:
      console.log('PREV_SONG action:', action.payload);
      const prevSongAction = action as {
        type: typeof AudioActionTypes.PREV_SONG;
        payload: number;
      };
      return {
        ...state,
        currentSongIndex: prevSongAction.payload,
        isPlaying: false,
      };

    case AudioActionTypes.SET_VOLUME:
      const setVolumeAction = action as {
        type: typeof AudioActionTypes.SET_VOLUME;
        payload: number;
      };
      return { ...state, volume: setVolumeAction.payload };

    case AudioActionTypes.FETCH_SONGS_SUCCESS:
      if ("payload" in action && Array.isArray(action.payload)) {
        return {
          ...state,
          trackLinerNotes: action.payload,
          isLoading: false,
          error: false,
        };
      }

    case AudioActionTypes.FETCH_SONGS_FAILURE:
      return {
        ...state,
        error: true,
        isLoading: false,
      };

    case AudioActionTypes.ANALYZE_SONG_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case AudioActionTypes.ANALYZE_SONG_SUCCESS:
      if (action.type === AudioActionTypes.ANALYZE_SONG_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          analysisData: action.payload,
        };
      }
      break;

    case AudioActionTypes.ANALYZE_SONG_FAILURE:
      if (action.type === AudioActionTypes.ANALYZE_SONG_FAILURE) {
        return {
          ...state,
          isLoading: false,
          error: true,
        };
      }
      break;


    default:
      return state;
  }

  return state;
};

export default audioReducer;
