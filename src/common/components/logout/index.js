import React from 'react';
import { connect } from 'kea';
import { Button } from 'antd';

import authenicationLogic from 'authentication/logic';

class Logout extends React.Component {

  logout = () => {
    this.actions.logout();
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

export default connect(keaLogic)(Logout);
