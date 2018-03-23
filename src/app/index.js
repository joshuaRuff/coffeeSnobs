import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import CheckIfLoggedIn from 'common/components/checkIfLoggedIn';
import SideNav from 'common/components/sideNav';
import TopNav from 'common/components/topNav';
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
              <Route path="/routeone" component={RouteOne} />
              <Route path="/routetwo" component={RouteTwo} />
              <Route exact path="/" component={Default} />
              <Route component={FourOFour} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }

}
