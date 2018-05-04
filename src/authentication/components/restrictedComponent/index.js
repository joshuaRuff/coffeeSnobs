import React from 'react';
import { connect } from 'kea';

import authenicationLogic from 'authentication/logic';
import selectAccountLogic from 'authentication/components/selectAccount/logic';
import { securityRoutes } from 'common/api/config';

class RestrictedComponent extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { profile, access, path = '/default' } = this.props;
    const role = profile.role || 'user';

    // Check if the path is in our securityRoutes object
    const route = (securityRoutes[path]);

    // Check if our user has an the currently selected account under access
    const scpRole = access[this.props.selectedAccount.id] || 'user';

    // If our user has a role of fullAdmin or his controlPanel role for this account
    // exists in our security route object for the route, return the route

    if (role === 'fullAdmin' || (route && route.indexOf(scpRole) > -1)) {
      const Component = this.props.comp;
      return <Component {...this.props} />;
    }

    const error = this.props.error || null;
    return error;
  }

}

const keaLogic = {
  props: [
    authenicationLogic, ['profile', 'access'],
    selectAccountLogic, ['selectedAccount'],
  ],
};

export default connect(keaLogic)(RestrictedComponent);
