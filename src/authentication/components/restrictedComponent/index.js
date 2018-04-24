import React from 'react';
import { connect } from 'kea';

import authenicationLogic from 'authentication/logic';
import { securityRoutes } from 'common/api/config';

const RestrictedComponent = (props) => {
  // Expects a path to be given to this component. Set a default if none provided
  const path = props.path || '/default';

  // Expects a profile from auth store. Get controlPanel access from profile
  const profile = props.profile || {};
  const controlPanel = profile.controlPanel || {};
  const access = controlPanel.access || {};
  const role = profile.role || 'user';

  // Check if the path is in our securityRoutes object
  const route = (securityRoutes[path]);

  // Check if our user has an the currently selected account under access
  const scpRole = access[props.selectedAccount] || 'user';

  // If our user has a role of fullAdmin or his controlPanel role for this account
  // exists in our security route object for the route, return the route
  if (route) {
    if (role === 'fullAdmin' || route.indexOf(scpRole) >= 0) {
      const Component = props.comp;
      return <Component {...props} />;
    }
  }

  const error = props.error || null;
  return error;
};

const keaLogic = {
  props: [authenicationLogic, ['profile', 'selectedAccount']],
};

export default connect(keaLogic)(RestrictedComponent);
