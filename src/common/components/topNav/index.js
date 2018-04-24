import React from 'react';
import { Layout } from 'antd';

import Logout from 'authentication/components/logout';
import { SelectAccount } from 'authentication/components';
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
        <SelectAccount defaultChoice="-uniqueAccountId_1" />
        <Logout size="small" />
      </Header>
    );
  }

}
