import React from 'react';

import AppBar from 'material-ui/AppBar';

import TopNav from '../common/components/topNav';
import Routes from './router';

export default class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <AppBar
          title={`Template - ${this.props.templateId}`}
        />
        <TopNav history={this.props.history} />
        <Routes />
      </div>
    );
  }
}
