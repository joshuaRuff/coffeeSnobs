import { Route, Switch } from 'react-router-dom';
import { Row, Col } from 'antd';

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
      <Row type="flex" justify="center" align="middle" style={{ height: '100vh' }}>
        <Col xs={{ span: 11 }} lg={{ span: 6 }}>
          <h1>Authentication</h1>
          <Switch>
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/forgot" component={Forgot} />
          </Switch>
        </Col>
      </Row>
    );
  }
}
