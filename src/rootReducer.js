// rootReducer.js
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authentication from './authentication';

export default combineReducers({
  [authentication.constants.NAME]: authentication.reducer,
  routing: routerReducer,
});
