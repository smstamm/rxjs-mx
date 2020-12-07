import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from './root';
import { rootEpic } from './root';

export const configureStore = (persistedState) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const epicMiddleware = createEpicMiddleware();
  const middlewares = [epicMiddleware];
  const middlewareEnhancer = composeEnhancers(applyMiddleware(...middlewares));

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, persistedState, composedEnhancers);

  epicMiddleware.run(rootEpic);

  return store;
}

export function loadState() {
  try {
    const serializedState = sessionStorage.getItem('advice_state');
    return serializedState !== null ? JSON.parse(serializedState) : undefined;
  }
  catch (error) {
    return undefined;
  }
};

export function persistState(state) {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('advice_state', serializedState);
  }
  catch (error) {
    console.log('Error trying to save to browser storage');
  }
};