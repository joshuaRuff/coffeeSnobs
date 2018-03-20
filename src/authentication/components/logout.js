import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'kea';
import { Button } from 'antd';

import './login.scss';
import authenicationLogic from '../logic';

class Logout extends React.Component {

  componentWillMount() {
    if (!this.props.login.token) {
      this.props.history.push('/auth');
    }
  }

  logout = () => {
    this.actions.logout();
    this.props.history.push('/auth');
  };

  render() {
    const size = this.props.size || 'default';
    return (
      <Button type="primary" icon="logout" size={size} onClick={this.logout}>Logout</Button>
    );
  }

}

const keaLogic = {
  props: [authenicationLogic, ['login']],
  actions: [authenicationLogic, ['logout']],
};

export default withRouter(connect(keaLogic)(Logout));
