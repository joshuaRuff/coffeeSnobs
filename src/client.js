import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import App from './app';
import Auth from './authentication';
import store from './store';

import 'common/css/style.scss';

const history = createHistory();

// Set the ID of the div from DOM the app will be loaded into
const client = document.getElementById('app');

// Render the react app w/ redux store as wrapper into div w/ defined ID
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/auth" component={Auth.components.index} />
        <Route component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  client,
);
