import React from 'react';
import { connect } from 'kea';
import { Layout, Menu, Icon } from 'antd';

import SideNavLogic from './logic';

const { Sider } = Layout;

// @SideNavLogic
// export default class SideNav extends React.Component {
//
//   render() {
//     console.log(this.props);
//     const { collapsed } = this.props;
//     return (
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="logo" />
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
//           <Menu.Item key="1">
//             <Icon type="user" />
//             <span>nav 1</span>
//           </Menu.Item>
//           <Menu.Item key="2">
//             <Icon type="video-camera" />
//             <span>nav 2</span>
//           </Menu.Item>
//           <Menu.Item key="3">
//             <Icon type="upload" />
//             <span>nav 3</span>
//           </Menu.Item>
//         </Menu>
//       </Sider>
//     );
//   }
//
// }

class SideNav extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log(this.props);
    const { collapsed } = this.props;
    return (
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }

}

const keaLogic = {
  props: [SideNavLogic.withKey(props => props.id), ['collapsed']],
  actions: [SideNavLogic.withKey(props => props.id), ['toggle']],
};

export default connect(keaLogic)(SideNav);
