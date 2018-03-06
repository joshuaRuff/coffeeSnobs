import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Template from './Template';
import Layout from './Layout';

const defaultView = props => <div><p>Please selected a template or layout to get started</p></div>;

export default () => (
  <Switch>
    <Route exact path="/template/:templateId/:action" component={Template} />
    <Route exact path="/template/:templateId" component={Template} />
    <Route exact path="/template" component={Template} />
    <Route exact path="/layout/:layoutId/:action" component={Layout} />
    <Route exact path="/layout/:layoutId" component={Layout} />
    <Route exact path="/layout" component={Layout} />
    <Route component={defaultView} />
  </Switch>
);
