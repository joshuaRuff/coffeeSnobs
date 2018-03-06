import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mapDispatchToProps from './actions';
import Template from './component';

const propTypes = {
  apiUrl: PropTypes.string,
  template: PropTypes.object,
  templateId: PropTypes.string,
  token: PropTypes.string,
};

Template.propTypes = propTypes;

const mapStateToProps = function(store, ownProps) {
  const templateId = ownProps.match.params.templateId || '';
  const template = store.app.templates[templateId] || {};
  return {
    apiUrl: store.app.apiUrl,
    template,
    templateId,
    token: store.auth.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Template);
