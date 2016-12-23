import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './modules/counter';
import shipOrder from './modules/shipOrder';
import toastReducer from './modules/toast';

export default combineReducers({
  shipOrder,
  counter,
  toastReducer,
  router,
});
