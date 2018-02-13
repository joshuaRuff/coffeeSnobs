import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mapDispatchToProps from './actions';
import { parseLocation } from '../../functions';
import Delete from './component';

const propTypes = {
  accountId: PropTypes.string,
  action: PropTypes.string,
  apiUrl: PropTypes.string,
  id: PropTypes.string,
  layouts: PropTypes.object,
  location: PropTypes.object,
  templateOrLayout: PropTypes.string,
  templates: PropTypes.object,
  token: PropTypes.string,
};

Delete.propTypes = propTypes;

const mapStateToProps = function(store, ownProps) {
  const path = parseLocation(store.routing.location.pathname);
  return {
    accountId: store.app.accountId,
    action: path.action || '',
    apiUrl: store.app.apiUrl,
    id: path.id || '',
    layouts: store.app.layouts,
    location: store.routing.location,
    templateOrLayout: path.templateOrLayout || '',
    templates: store.app.templates,
    token: store.auth.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
