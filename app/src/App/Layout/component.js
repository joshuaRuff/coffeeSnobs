import React from 'react';

import AppBar from 'material-ui/AppBar';

import TopNav from '../common/components/topNav';
import Routes from './router';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <AppBar
          title={`Layout - ${this.props.match.params.layoutId}`}
        />
        <TopNav history={this.props.history} hide={'live'} />
        <Routes />
      </div>
    );
  }
}
