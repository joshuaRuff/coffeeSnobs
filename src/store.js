import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import sagaPlugin from 'kea-saga';

// store.js
import { getStore } from 'kea';

export default getStore({
  plugins: [sagaPlugin],
  middleware: [routerMiddleware(browserHistory)],
  reducers: {
    router: routerReducer,
  },
});
