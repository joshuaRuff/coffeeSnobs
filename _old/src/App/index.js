import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mapDispatchToProps from './actions';
import App from './component';

const propTypes = {
  accountId: PropTypes.string,
  apiUrl: PropTypes.string,
  expires: PropTypes.string,
  layoutsFetched: PropTypes.bool,
  templatesFetched: PropTypes.bool,
  token: PropTypes.string,
};

App.propTypes = propTypes;

const mapStateToProps = function(store, ownProps) {
  return {
    accountId: store.app.accountId,
    apiUrl: store.app.apiUrl,
    expires: store.auth.expires,
    layoutsFetched: store.app.layoutsFetched,
    templatesFetched: store.app.templatesFetched,
    token: store.auth.token,
    test: store.app.test,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
