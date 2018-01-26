import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mapDispatchToProps from './actions';
import Forgot from './component';

const propTypes = {
  test: PropTypes.string,
  token: PropTypes.string,
};

Forgot.propTypes = propTypes;

const mapStateToProps = function(store, ownProps) {
  return {
    apiUrl: store.app.apiUrl,
    token: store.auth.token,
    test: store.auth.loginStuff,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
