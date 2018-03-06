import React from 'react';
import { Switch, Route } from 'react-router-dom';

import FourOFour from '../common/components/404';
import Login from './Login';
import Forgot from './Forgot';
import Register from './Register';

export default () => (
  <Switch>
    <Route exact path="/auth/register" component={Register} />
    <Route exact path="/auth/forgot" component={Forgot} />
    <Route exact path="/auth/login" component={Login} />
    <Route component={FourOFour} />
  </Switch>
);
