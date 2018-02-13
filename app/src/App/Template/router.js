import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Edit from './Edit';
import Save from '../common/components/save';
import Live from '../common/components/live';
import Delete from '../common/components/delete';

export default () => (
  <Switch>
    <Route exact path="/template/:templateId/edit" component={Edit} />
    <Route exact path="/template/:templateId/save" component={Save} />
    <Route exact path="/template/:templateId/live" component={Live} />
    <Route exact path="/template/:templateId/delete" component={Delete} />
  </Switch>
);
