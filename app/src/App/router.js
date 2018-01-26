import React from 'react';
import { Switch, Route } from 'react-router-dom';

import FourOFour from '../common/components/404';

class Account extends React.Component {
  render() {
    return (
      <div>
        <h1>Account</h1>
      </div>
    );
  }
}

class Edit extends React.Component {
  render() {
    return (
      <div>
        <h1>Edit</h1>
      </div>
    );
  }
}


export default () => (
  <Switch>
    <Route path="/account" component={Account} />
    <Route path="/edit" component={Edit} />
    <Route component={FourOFour} />
  </Switch>
);
