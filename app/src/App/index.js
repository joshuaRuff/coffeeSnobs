import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mapDispatchToProps from './actions';
import App from './component';

const propTypes = {
  apiUrl: PropTypes.string,
  test: PropTypes.string,
  token: PropTypes.string,
};

App.propTypes = propTypes;

const mapStateToProps = function(store, ownProps) {
  return {
    apiUrl: store.app.apiUrl,
    token: store.auth.token,
    test: store.app.test,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
