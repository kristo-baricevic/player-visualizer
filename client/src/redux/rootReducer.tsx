import { combineReducers } from "redux";
import audioReducer from "./reducer";

const rootReducer = combineReducers({
  audio: audioReducer,
});

export default rootReducer;
