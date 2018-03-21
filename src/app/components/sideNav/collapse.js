import React from 'react';
import { connect } from 'kea';
import { Icon } from 'antd';

import SideNavLogic from './logic';

class CollpaseSideNav extends React.Component {

  render() {
    const { collapsed } = this.props;
    const { toggle } = this.actions;
    const className = this.props.className || 'trigger';
    return (
      <Icon
        className={className}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggle}
      />
    );
  }

}

const keaLogic = {
  props: [SideNavLogic.withKey(props => props.target), ['collapsed']],
  actions: [SideNavLogic.withKey(props => props.target), ['toggle']],
};

export default connect(keaLogic)(CollpaseSideNav);
