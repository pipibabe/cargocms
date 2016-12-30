import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './modules/counter';
import shipOrder from './modules/shipOrder';
import toast from './modules/toast';
import user from './modules/user';

export default combineReducers({
  shipOrder,
  counter,
  toast,
  user,
  router,
});
