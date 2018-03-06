import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

import SideNav from './common/components/sideNav';
import MainNav from './common/components/nav';
import Routes from './router';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    // Check if token exists in store, if not, logout. If so, check default to /
    if (!this.props.token) {
      this.props.logout();
      this.props.history.push('/auth/login');
    } else {
      this.loadAccountTemplates();
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.accountId != this.props.accountId) {
      this.loadAccountTemplates();
    }
  }

  loadAccountTemplates() {
    this.props.history.push('/');
    this.props.getTemplates();
    this.props.getLayouts();
  }

  render() {
    const mainContent = (this.props.layoutsFetched && this.props.templatesFetched) ?
      (
        <div>
          <div className="col-md-2 mainColumns">
            <Paper className="paperStyles" zDepth={3}>
              <SideNav history={this.props.history} />
            </Paper>
          </div>
          <div className="col-md-10 mainColumns">
            <Routes />
          </div>
        </div>
      ) : '';

    return (
      <MuiThemeProvider>
        <div className="container-fluid no-breadcrumbs page-users">
          <MainNav />
          {mainContent}
        </div>
      </MuiThemeProvider>
    );
  }
}
