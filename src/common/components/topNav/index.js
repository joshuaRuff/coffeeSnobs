import React from 'react';
import { Layout } from 'antd';

import Logout from 'common/components/logout';
import CollapseSideNav from '../sideNav/collapse';

const { Header } = Layout;

export default class TopNav extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <CollapseSideNav target="mainSideNav" />
        <Logout size="small" />
      </Header>
    );
  }

}
