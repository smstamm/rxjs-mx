import {
  GET_DATA,
  GET_DATA_FULFILLED,
  UPDATE_COUNT,
  UPDATE_COUNT_FULFILLED,
} from './constants';
import {
  map,
  mergeMap,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';

export const getNames = num => ({ type: GET_DATA, payload: num });
export const getNamesFulfilled = ({ response }) => ({ type: GET_DATA_FULFILLED, payload: response });
export const getNamesEpic = action$ => {
  return action$.pipe(
    ofType(GET_DATA),
    mergeMap(action => {
      return ajax.get(`https://randomuser.me/api/?results=${action.payload}&seed=rx-react&nat=us&inc=name&noinfo`).pipe(
        map(response => getNamesFulfilled(response))
      )
    })
  )
};

export const updateCount = count => ({ type: UPDATE_COUNT, payload: count });
export const updateCountFulfilled = ({ payload }) => ({ type: UPDATE_COUNT_FULFILLED, payload });
export const updateCountEpic = action$ => action$.pipe(
  ofType(UPDATE_COUNT),
    map(response => updateCountFulfilled(response))
);