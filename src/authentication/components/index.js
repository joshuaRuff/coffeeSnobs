import { Route, Switch } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

import React from 'react';
import Login from './Login';
import Forgot from './Forgot';
import Register from './Register';

export { Login, Forgot, Register };

export class index extends React.Component {
  constructor(props) {
    console.log('Auth Component');
    super(props);
    this.state = {
      error: '',
      loading: false,
      password: '',
      username: '',
    };
  }
  render() {
    return (
      <div>
        <Header as="h3">Authentication</Header>
        <Switch>
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/forgot" component={Forgot} />
        </Switch>
      </div>
    );
  }
}
