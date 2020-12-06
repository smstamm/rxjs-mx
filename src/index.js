import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore, loadState, persistState } from './redux/helpers';

const persistedState = loadState();
const store = configureStore(persistedState);

store.subscribe(() => {
  persistState(store.getState());
});

ReactDOM.render(
	<Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);