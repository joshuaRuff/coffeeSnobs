import React from 'react';
import { connect } from 'kea';
import { Menu, Dropdown, Icon, Button } from 'antd';

import authenicationLogic from 'authentication/logic';

class selectAccount extends React.Component {

  componentDidMount() {
    // Allows for setting of default
    const { defaultChoice = '', login } = this.props;

    if (typeof defaultChoice === 'string') {
      this.actions.setSelectedAccount(defaultChoice);
    }

    // If we have a token, go ahead and fetch accounts
    if (login.token) {
      this.actions.getAccounts(login.token);
    }
  }

  componentDidUpdate(prevProps) {
    const { login } = this.props;

    // If there is a new token, re-fetch user data
    if (login.token && prevProps.login.token !== login.token) {
      this.actions.getAccounts(login.token);
    }
  }

  handleMenuClick = (e) => {
    this.actions.setSelectedAccount(e.key);
  }

  render() {
    const { accounts, selectedAccount } = this.props;
    const accountList = Object.keys(accounts);
    const selectedAccountInfo = accounts[selectedAccount] || {};

    const menuItems = accountList.map((id) => {
      const account = accounts[id];
      const cssClass = (id === this.props.selectedAccount) ? 'selected' : '';
      return <Menu.Item key={id} className={cssClass}>{account.name}</Menu.Item>;
    });

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {menuItems}
      </Menu>
    );

    const selectedText = selectedAccountInfo.name || 'Select Account';

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
  props: [authenicationLogic, ['accounts', 'login', 'selectedAccount']],
  actions: [authenicationLogic, ['getAccounts', 'setSelectedAccount']],
};

// Important to connect kea to the component before we pass it onto antd.
// Antd doesn't forward everything, like this.actions to the component
const WrappedNormalLoginForm = connect(keaLogic)(selectAccount);

export default WrappedNormalLoginForm;
