import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import { CheckIfLoggedIn, RestrictedComponent } from 'authentication/components';
import { SideNav, TopNav } from 'common/components';
import FourOFour from 'errorCodes/404';

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
    this.state = {
      menuItems: [
        { title: 'Route 1', icon: 'user', route: '/routeone' },
        { title: 'Route 2', icon: 'video-camera', route: '/routetwo' },
        { title: 'Route 3', icon: 'upload', route: '/routethree' },
      ],
    };
  }

  render() {
    return (
      <Layout id="AppLayout">
        <CheckIfLoggedIn />
        <SideNav id="mainSideNav" path={this.props.location.pathname} items={this.state.menuItems} />
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
              <RestrictedComponent error={<h2>Access Denied</h2>} comp={Route} path="/routeone" component={RouteOne} />
              <RestrictedComponent error={<h2>Access Denied</h2>} comp={Route} path="/routetwo" component={RouteTwo} />
              <RestrictedComponent error={<h2>Access Denied</h2>} comp={Route} path="/" component={Default} exact />
              <Route component={FourOFour} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }

}
