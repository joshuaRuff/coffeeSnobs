import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import CheckIfLoggedIn from 'authentication/components/checkIfLoggedIn';
import SideNav from './components/sideNav';
import TopNav from './components/topNav';

import RouteOne from './appRoute1';
import RouteTwo from './appRoute2';

import './index.scss';

const { Content } = Layout;

const Default = () => (
  <div>
    <h2>Default Route if none is chosen</h2>
  </div>
);


export default class AppLayout extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Layout id="AppLayout">
        <CheckIfLoggedIn />
        <SideNav id="mainSideNav" path={this.props.location.pathname} />
        <Layout>
          <TopNav />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            <Switch>
              <Route exact path="/routeone" component={RouteOne} />
              <Route exact path="/routetwo" component={RouteTwo} />
              <Route exact path="/" component={Default} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }

}
