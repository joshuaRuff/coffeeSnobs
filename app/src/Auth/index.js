import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mapDispatchToProps from './actions';
import Auth from './component';

const propTypes = {
  test: PropTypes.string,
};

Auth.propTypes = propTypes;

const mapStateToProps = function(store, ownProps) {
  return {
    test: store.auth.loginStuff,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
