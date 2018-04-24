import React from 'react';
import { connect } from 'kea';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import { RestrictedComponent } from 'authentication/components';
import SideNavLogic from './logic';

const { Sider } = Layout;

const SideNav = (props) => {
  const { collapsed, path, items = [] } = props;

  // This can be changed by our menuItemData map to select which menu
  // item our navigation is currently on
  let defaultRoute = '';

  // Map our array of objects into a menu item. Also check for if the current route
  // passed into this component exists as a route, if so, select that index as the defaultRoute
  const menuItems = items.map((data, index) => {
    if (path.indexOf(data.route) > -1) { defaultRoute = index.toString(); }
    return (
      <RestrictedComponent path={data.route} comp={Menu.Item} key={index}>
        <Link to={data.route}>
          <Icon type={data.icon} />
          <span>{data.title}</span>
        </Link>
      </RestrictedComponent>
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
};

const keaLogic = {
  props: [SideNavLogic.withKey(props => props.id), ['collapsed']],
};

export default connect(keaLogic)(SideNav);
