import { createStore, compose, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import reducer from './reducers';

// Create store
let store;

if (process.env.NODE_ENV === 'production') {
  store = createStore(
    reducer,
    undefined,
    compose(applyMiddleware(routerMiddleware(browserHistory))),
  );
} else {
  /* eslint-disable no-underscore-dangle */
  store = createStore(
    reducer,
    undefined,
    compose(
      applyMiddleware(routerMiddleware(browserHistory)),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );
  /* eslint-enable */
}
export default store;
