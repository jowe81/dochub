import { combineReducers } from 'redux';

import sessionReducer from "./features/session/sessionSlice";

const rootReducer = combineReducers({
  session: sessionReducer,
});

export default rootReducer;
