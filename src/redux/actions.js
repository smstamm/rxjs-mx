import {
  POLL_ADVICE_FULFILLED,
  GET_DATA,
  GET_DATA_FULFILLED,
  POLL_ADVICE_START,
  POLL_ADVICE_STOP,
  UPDATE_COUNT,
  UPDATE_COUNT_FULFILLED,
} from './constants';
import {
  map,
  mergeMap,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import {
  timer,
  from,
} from 'rxjs';

export const getNames = num => ({ type: GET_DATA, payload: num });
export const getNamesFulfilled = ({ response }) => ({ type: GET_DATA_FULFILLED, payload: response });
export const getNamesEpic = action$ => {
  return action$.pipe(
    ofType(GET_DATA),
    mergeMap(action => {
      return ajax.get(`https://randomuser.me/api/?results=${action.payload}&inc=name&noinfo`).pipe(
        map(response => getNamesFulfilled(response))
      )
    })
  )
};

export const getAdvice = num => ({ type: POLL_ADVICE_START, payload: num });
export const getAdviceFulfilled = ({ response }) => ({ type: POLL_ADVICE_FULFILLED, payload: response });
export const stopAdvicePolling = () => ({ type: POLL_ADVICE_STOP });
export const adviceEpic = action$ => {
  const stopAdvicePolling$ = action$.pipe(
    ofType(POLL_ADVICE_STOP),
  );

  return action$.pipe(
    ofType(POLL_ADVICE_START),
    switchMap(() => {
      return timer(0, 5000).pipe(
        takeUntil(stopAdvicePolling$),
        switchMap(() => from(ajax.get('https://api.adviceslip.com/advice'))),
        map(data => ({ type: POLL_ADVICE_FULFILLED, payload: data }))
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