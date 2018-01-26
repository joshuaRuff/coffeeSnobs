import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mapDispatchToProps from './actions';
import FourOFour from './component';

const propTypes = {
  test: PropTypes.object,
  updateTest: PropTypes.func,
};

FourOFour.propTypes = propTypes;

const mapStateToProps = function(store, ownProps) {
  return {
    test: store.fourofour,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FourOFour);
