import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import SideNavLogic from './logic';

const { Sider } = Layout;

@SideNavLogic
export default class SideNav extends React.Component {

  render() {
    const { collapsed, path } = this.props;

    // This can be changed by our menuItemData map to select which menu
    // item our navigation is currently on
    let defaultRoute = '';

    // Array of objects the determine each menu nav item. It is easier to read all
    // of them in an array of objects then to have all the different options in the HTML
    const menuItemData = [
      { title: 'Route 1', icon: 'user', route: '/routeone' },
      { title: 'Route 2', icon: 'video-camera', route: '/routetwo' },
      { title: 'Route 3', icon: 'upload', route: '/routethree' },
    ];

    // Map our array of objects into a menu item. Also check for if the current route
    // passed into this component exists as a route, if so, select that index as the defaultRoute
    const menuItems = menuItemData.map((data, index) => {
      if (path === data.route) { defaultRoute = index.toString(); }
      return (
        <Menu.Item key={index}>
          <Link to={data.route}>
            <Icon type={data.icon} />
            <span>{data.title}</span>
          </Link>
        </Menu.Item>
      );
    });


    return (
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultRoute]}>
          {menuItems}
        </Menu>
      </Sider>
    );
  }

}
