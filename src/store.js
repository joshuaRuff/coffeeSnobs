import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import RootReducer from './rootReducer';

// Create store
let store;
if (process.env.NODE_ENV === 'production') {
  store = createStore(RootReducer, undefined, compose(applyMiddleware(routerMiddleware(browserHistory), thunk)));
} else {
  /* eslint-disable no-underscore-dangle */
  store = createStore(
    RootReducer,
    undefined,
    compose(
      applyMiddleware(routerMiddleware(browserHistory), thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );
  /* eslint-enable */
}

const storeExport = store;
export default storeExport;
