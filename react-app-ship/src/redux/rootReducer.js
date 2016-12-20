import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './modules/counter';
import shipOrder from './modules/shipOrder';

export default combineReducers({
  shipOrder,
  counter,
  router,
});
