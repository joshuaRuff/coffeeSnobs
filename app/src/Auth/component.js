import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Nav from './nav';
import Routes from './router';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    // Redirect user back to app if token exists, if not, redirect to login
    if (this.props.token) {
      this.props.history.push('/');
    } else if (this.props.location.pathname == '/auth') {
      this.props.history.push('/auth/login');
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Nav />
          <Routes />
        </div>
      </MuiThemeProvider>
    );
  }
}
