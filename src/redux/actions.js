import {
  POLL_ADVICE_FULFILLED,
  POLL_ADVICE_START,
  POLL_ADVICE_STOP,
  UPDATE_FREQUENCY,
  UPDATE_FREQUENCY_FULFILLED,
} from './constants';
import {
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import {
  timer,
  from,
} from 'rxjs';

export const startAdvicePolling = () => ({ type: POLL_ADVICE_START });
export const startAdvicePollingFulfilled = ({ response }) => ({ type: POLL_ADVICE_FULFILLED, payload: response });
export const stopAdvicePolling = () => ({ type: POLL_ADVICE_STOP });
export const adviceEpic = (action$, state$) => {

  const stopAdvicePolling$ = action$.pipe(
    ofType(POLL_ADVICE_STOP),
  );

  return action$.pipe(
    ofType(POLL_ADVICE_START),
    switchMap(() => {
      
      const pollingInMs = state$.value.adviceReducer.frequency * 1000;
      
      return timer(0, pollingInMs).pipe(
        takeUntil(stopAdvicePolling$),
        switchMap(() => from(ajax.get('https://api.adviceslip.com/advice'))),
        map(payload => ({ type: POLL_ADVICE_FULFILLED, payload }))
      );
    })
  );
};

export const updateFrequency = frequency => ({ type: UPDATE_FREQUENCY, payload: frequency });
export const updateFrequencyFulfilled = ({ payload }) => ({ type: UPDATE_FREQUENCY_FULFILLED, payload });
export const updateFrequencyEpic = action$ => action$.pipe(
  ofType(UPDATE_FREQUENCY),
    map(response => updateFrequencyFulfilled(response))
);