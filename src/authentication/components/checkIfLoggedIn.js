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

    if (!this.props.login.token && nextProps.login.token) {
      // Perform logic here for whenever a user becomes logged in

      // An array of parent routes that if logged in, will direct the user back to app home page
      // A parent route is the first param after the domain.
      // Example is http://my.domain.com/test/colors/blue, the parent route would be: /test
      const noAuthAllowedRoutes = ['/auth'];

      // Check if the next Props path parent exists in our noAuthAllowedRoutes array
      if (noAuthAllowedRoutes.indexOf(nextProps.match.path) >= 0) {
        this.props.history.push('/');
      }
    }

    // If a logged in token was removed from store, direct user to login page
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
