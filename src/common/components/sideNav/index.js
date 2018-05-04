import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import SideNavLogic from './logic';

const { Sider } = Layout;

@SideNavLogic
class SideNav extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      collapsed,
      path,
      items = {},
      menuItems = {},
      allItems = Object.assign({}, items, menuItems),
      itemKeys = Object.keys(items),
      menuItemsKeys = Object.keys(menuItems),
      allItemKeys = itemKeys.concat(menuItemsKeys),
    } = this.props;

    // This can be changed by our menuItemData map to select which menu
    // item our navigation is currently on
    let defaultRoute = '';

    // Go through our menuItem object and create menuItems.
    // Also check for if the current route passed into this component
    // exists as a route, if so, select that index as the defaultRoute
    const allMenuItems = allItemKeys.map((key) => {
      const item = allItems[key];

      if (path.indexOf(key) > -1) { defaultRoute = key; }

      // If this item has a target, render it as a normal link and unselectable menu item
      if (!item.target) {
        return (
          <Menu.Item key={key}>
            <Link to={key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      }
      return (
        <Menu.Item key={key}>
          <a href={item.href} target="_blank">
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </a>
        </Menu.Item>
      );
    });

    return (
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {this.props.title}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[defaultRoute]}
          selectable={false}
          selectedKeys={[defaultRoute]}
        >
          {allMenuItems}
        </Menu>
      </Sider>
    );
  }

}

export default SideNav;
