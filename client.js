import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Global Styles
import './src/css/style.scss';

// Store it required to be imported before any components
// including the main app
import store from './src/store';

// Include Component
import App from './src/index.js';

const history = createHistory();

// Set the ID of the div from DOM the app will be loaded into
const client = document.getElementById('app');

// Render the react app w/ redux store as wrapper into div w/ defined ID
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  client,
);
