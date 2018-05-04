import React from 'react';
import { connect } from 'kea';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown, Icon, Button } from 'antd';

import selectAccountLogic from './logic';

class selectAccount extends React.Component {

  componentDidMount() {
    this.actions.getAccounts();
  }

  handleMenuClick = (e) => {
    this.actions.selectAccount(e.key);
    this.props.history.push('/');
  }

  render() {
    const { accounts, selectedAccount } = this.props;
    const accountList = Object.keys(accounts);

    const menuItems = accountList.map((id) => {
      const account = accounts[id];
      const cssClass = (id === selectedAccount.id) ? 'selected' : '';
      return <Menu.Item key={id} className={cssClass}>{account.name}</Menu.Item>;
    });

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {menuItems}
      </Menu>
    );

    const selectedText = selectedAccount.name || 'Select Account';

    return (
      <Dropdown overlay={menu}>
        <Button style={{ marginLeft: 8 }}>
          {selectedText} <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }

}

const keaLogic = {
  props: [
    selectAccountLogic, ['accounts', 'selectedAccount'],
  ],
  actions: [
    selectAccountLogic, ['getAccounts', 'selectAccount'],
  ],
};

export default withRouter(connect(keaLogic)(selectAccount));
