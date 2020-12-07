import { combineReducers } from 'redux';
import adviceReducer from './adviceReducer';
import { combineEpics } from 'redux-observable';
import { adviceEpic, updateFrequencyEpic } from './actions';

// reducers
export const rootReducer = combineReducers({
    adviceReducer
});

// epics
export const rootEpic = combineEpics(
  adviceEpic,
  updateFrequencyEpic,
);