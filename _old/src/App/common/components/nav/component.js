import React from 'react';
import { NavLink } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

export default class MainNav extends React.Component {
  handleChange = (event, index, value) => {
    this.props.selectAccount(value);
  }

  logout() {
    this.props.logout();
  }

  render() {
    const menuItems = this.props.accounts.map((data, index) => <MenuItem key={index} value={data.id} primaryText={data.name} />);

    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild style={{ padding: '0 16px 0 31px' }}>
            <ToolbarTitle text="Account:" />
            <DropDownMenu
              value={this.props.accountId}
              onChange={this.handleChange}
              style={{ height: 'auto' }}
              iconStyle={{ fill: '#000' }}
            >
              {menuItems}
            </DropDownMenu>
          </ToolbarGroup>
          <ToolbarGroup>
            <NavLink to="/auth/login" onClick={() => { this.logout(); }}>Logout</NavLink>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}
