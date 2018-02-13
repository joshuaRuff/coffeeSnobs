import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mapDispatchToProps from './actions';
import { parseLocation } from '../../functions';
import Save from './component';

const propTypes = {
  action: PropTypes.string,
  apiUrl: PropTypes.string,
  id: PropTypes.string,
  location: PropTypes.object,
  selectedTemplate: PropTypes.object,
  templateOrLayout: PropTypes.string,
  token: PropTypes.string,
};

Save.propTypes = propTypes;

const mapStateToProps = function(store, ownProps) {
  const path = parseLocation(store.routing.location.pathname);
  return {
    action: path.action || '',
    apiUrl: store.app.apiUrl,
    id: path.id || '',
    location: store.routing.location,
    selectedTemplate: store.app.selectedTemplate || {},
    templateOrLayout: path.templateOrLayout || '',
    token: store.auth.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Save);
