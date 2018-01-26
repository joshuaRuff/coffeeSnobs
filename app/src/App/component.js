import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TopNav from './nav';
import Routes from './router';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    // Run a action to update your store
    // this.props.updateTest('Gotcha');
    if (!this.props.token) {
      this.props.history.push('/auth/login');
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <TopNav location={this.props.location} />
          <p>Hello</p>
          <Routes />
        </div>
      </MuiThemeProvider>
    );
  }
}
