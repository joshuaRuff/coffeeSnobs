import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mapDispatchToProps from './actions';
import Login from './component';

const propTypes = {
  accountId: PropTypes.string,
  apiUrl: PropTypes.string,
  error: PropTypes.string,
  test: PropTypes.string,
  token: PropTypes.string,
};

Login.propTypes = propTypes;

const mapStateToProps = function(store, ownProps) {
  return {
    accountId: store.app.accountId,
    apiUrl: store.app.apiUrl,
    error: store.auth.error,
    token: store.auth.token,
    test: store.auth.loginStuff,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
