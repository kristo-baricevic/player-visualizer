import { combineReducers } from 'redux';
import audioReducer from './reducer';

const rootReducer = combineReducers({
  audio: audioReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
