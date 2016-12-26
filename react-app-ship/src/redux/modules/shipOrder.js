/* @flow */
import { postData } from '../utils/fetchApi';
import { showToast } from './toast';
// ------------------------------------
// Constants
// ------------------------------------
export const GET_SHIP_LIST = 'GET_SHIP_LIST';
export const FETCH_SHIP_LIST_API = 'FETCH_SHIP_LIST_API';

// ------------------------------------
// Actions
// ------------------------------------

export function deliverShipListData(data) {
  console.log('data=>', data);
  return {
    type: GET_SHIP_LIST,
    list: data,
  };
}

export function fetchShipListData() {
  return async(dispatch, getState)=> {
    const api = '/api/admin/suppliershiporder/all';
    const fetchResult = await postData(api);
    let result = '';
    // success
    if (fetchResult.status) {
      dispatch(deliverShipListData(fetchResult.data.data));
      dispatch(showToast('載入完成'));
    } else {
      // error
      if (fetchResult.response) {
        result = fetchResult.response.statusText;
      } else {
        result = fetchResult.message;
      }
      dispatch(showToast(result));
    }
    // console.log('fetchResult=>', fetchResult);
    // console.log('result=>', result);
  };
}

export const actions = {
  deliverShipListData,
  fetchShipListData,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
export const ACTION_HANDLERS = {
  [GET_SHIP_LIST]: (state = {}, action) => ({
    ...state,
    list: action.list,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  list: {},
};

export default function shipOrderReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
