import { Route, Switch } from 'react-router-dom';
import { Row, Col } from 'antd';

import React from 'react';
import CheckIfLoggedIn from './components/checkIfLoggedIn';
import Login from './components/login';
import Forgot from './components/forgot';
import Register from './components/register';

export default class Auth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row type="flex" justify="center" align="middle" style={{ height: '100vh' }}>
        <CheckIfLoggedIn />
        <Col xs={{ span: 11 }} lg={{ span: 6 }}>
          <Switch>
            <Route exact path="/auth/login" component={Login} />
            <Route exact path="/auth/forgot" component={Forgot} />
            <Route exact path="/auth/register" component={Register} />
            <Route component={Login} />
          </Switch>
        </Col>
      </Row>
    );
  }

}
