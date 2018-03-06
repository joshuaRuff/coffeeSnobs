import { connect } from 'react-redux';

import mapDispatchToProps from './actions';
import MainNav from './component';

const mapStateToProps = function(store, ownProps) {
  return {
    accountId: store.app.accountId,
    accounts: store.app.accounts,
    location: store.routing.location,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);
