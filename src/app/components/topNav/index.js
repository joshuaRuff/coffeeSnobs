import React from 'react';
import { connect } from 'kea';
import { Layout, Icon } from 'antd';

import SideNavLogic from '../sideNav/logic';

const { Header } = Layout;

@connect({
  props: [SideNavLogic.withKey(props => props.id), ['collapsed']],
  actions: [SideNavLogic.withKey(props => props.id), ['toggle']],
})
export default class TopNav extends React.Component {
  render() {
    const { collapsed } = this.props;
    const { toggle } = this.actions;
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} />
      </Header>
    );
  }
}
