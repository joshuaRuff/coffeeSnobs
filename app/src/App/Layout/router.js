import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Edit from './Edit';
import Save from '../common/components/save';
import Delete from '../common/components/delete';

export default () => (
  <Switch>
    <Route exact path="/layout/:layoutId/edit" component={Edit} />
    <Route exact path="/layout/:layoutId/save" component={Save} />
    <Route exact path="/layout/:layoutId/delete" component={Delete} />
  </Switch>
);
