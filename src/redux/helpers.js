import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';
import promise from 'redux-promise';

export const configureStore = (persistedState) => {
  const middlewares = [promise];
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers)

  const store = createStore(rootReducer, persistedState, composedEnhancers);

  return store;
}

export function loadState() {
  try {
    const serializedState = sessionStorage.getItem('names_state');
    return serializedState !== null ? JSON.parse(serializedState) : undefined;
  }
  catch (error) {
    return undefined;
  }
};

export function persistState(state) {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('names_state', serializedState);
  }
  catch (error) {
    console.log('Error trying to save data to browser storage');
  }
};