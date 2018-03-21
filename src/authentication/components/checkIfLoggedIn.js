import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'kea';

import authenicationLogic from '../logic';

class CheckIfLoggedIn extends React.Component {

  componentWillMount() {
    if (!this.props.login.token) {
      const token = this.getToken();
      if (token) {
        this.actions.setLogin(token.token, token.expires);
      } else {
        this.props.history.push('/auth/login');
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // Once action goes through and it succesfully got a token, change route to app
    if (!this.props.login.token && nextProps.login.token) {
      this.props.history.push('/');
    }
    if (this.props.login.token && !nextProps.login.token) {
      this.props.history.push('/auth/login');
    }
  }

  getToken = () => {
    // Check localstorage if a token exists
    const { token, expires } = localStorage;

    if (token && expires && this.checkTime(expires)) {
      // If token hasn't expired, return it
      return { token, expires };
    }
    return false;
  }

  checkTime = (dateString) => {
    if (dateString) {
      try {
        const now = Date.now();
        const expires = new Date(dateString).getTime();
        if (now < expires) { return true; }
      } catch (err) {
        return false;
      }
    }
    return false;
  }

  render() {
    return (
      <div />
    );
  }

}

const keaLogic = {
  props: [authenicationLogic, ['login']],
  actions: [authenicationLogic, ['setLogin']],
};

export default withRouter(connect(keaLogic)(CheckIfLoggedIn));
