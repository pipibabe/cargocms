import {
  postData,
  getData,
} from '../utils/fetchApi';
import { showToast } from './toast';
// ------------------------------------
// Constants
// ------------------------------------
export const GET_SHIP_LIST = 'GET_SHIP_LIST';
export const FIND_SHIP_ITEM = 'FIND_SHIP_ITEM';

// ------------------------------------
// Actions
// ------------------------------------
export function deliverShipListData(data) {
  // console.log('deliverShipListData=>', data);
  return {
    type: GET_SHIP_LIST,
    list: data,
  };
}

export function fetchShipListData() {
  return async(dispatch) => {
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
  };
}

export function deliverFindShipItem(searchText, data) {
  // console.log('deliverFindShipItem=>', data);
  return {
    type: FIND_SHIP_ITEM,
    list: data,
    searchText,
  };
}

export function fetchFindShipItem(value) {
  // console.log('search value=>', value);
  return async(dispatch, getState) => {
    const api = '/api/admin/suppliershiporder/all';
    const query = {
      serverSidePaging: true,
      startDate: '1900/01/01',
      endDate: '3000/01/01',
      columns:[
        {
        	"data": "invoiceNo",
        	"searchable": 'true',
          "findInclude": "true",
        	"search": {
        		"concat": ["invoicePrefix", "invoiceNo"]
        	}
        },
        { data: 'firstname', searchable: 'true' },
        { data: 'lastname', searchable: 'true' },
        { data: 'email', searchable: 'true' },
        { data: 'telephone', searchable: 'true' },
        { data: 'paymentAddress1', searchable: 'true' },
        { data: 'paymentCity', searchable: 'true' }
      ],
      order: [ { column: '0', dir: 'asc' } ],
      search: { value, regex: 'false' },
      _: '1470989140227'
    };
    const fetchResult = await postData(api, query);
    let result = '';
    // success
    if (fetchResult.status) {
      dispatch(deliverFindShipItem(value, fetchResult.data.data));
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
    // console.log('data query=>', JSON.stringify(query));
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
  [FIND_SHIP_ITEM]: (state = {}, action) => ({
    ...state,
    list: action.list,
    searchText: action.searchText,
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
