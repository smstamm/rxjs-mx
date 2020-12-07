import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import { combineEpics } from 'redux-observable';
import { adviceEpic, getNamesEpic, updateCountEpic } from './actions';

// reducers
export const rootReducer = combineReducers({
    dataReducer
});

// epics
export const rootEpic = combineEpics(
  adviceEpic,
  getNamesEpic,
  updateCountEpic,
);