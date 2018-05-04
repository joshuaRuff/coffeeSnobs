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
      menuItems: {
        '/routeone': { title: 'Route 1', icon: 'user' },
        '/routetwo': { title: 'Route 2', icon: 'video-camera' },
        '/routethree': { title: 'Route 3', icon: 'upload' },
      },
    };
  }

  render() {
    const accessDenied = <h2>Access Denied</h2>;

    return (
      <Layout id="AppLayout">
        <CheckIfLoggedIn />
        <SideNav
          id="mainSideNav"
          path={this.props.location.pathname}
          items={this.state.menuItems}
          title={<h3>Sardius Control Panel</h3>}
        />
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
              <RestrictedComponent error={accessDenied} comp={Route} path="/routeone" component={RouteOne} />
              <RestrictedComponent error={accessDenied} comp={Route} path="/routetwo" component={RouteTwo} />
              <Route path="/" component={Default} exact />
              <Route component={FourOFour} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }

}
