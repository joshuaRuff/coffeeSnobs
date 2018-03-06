import { connect } from 'react-redux';

import mapDispatchToProps from '../../../actions';
import { parseLocation } from '../../functions';
import SideNav from './component';

const mapStateToProps = function(store, ownProps) {
  const path = parseLocation(store.routing.location.pathname);
  return {
    action: path.action || '',
    id: path.id || '',
    layouts: store.app.layouts,
    location: store.routing.location,
    templateOrLayout: path.templateOrLayout || '',
    templates: store.app.templates,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
