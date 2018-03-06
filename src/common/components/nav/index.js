import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mapDispatchToProps from './actions';
import TopNav from './component';

const propTypes = {
  test: PropTypes.object,
  updateTest: PropTypes.func,
};

TopNav.propTypes = propTypes;

const mapStateToProps = function(store, ownProps) {
  return {
    test: store.app,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
