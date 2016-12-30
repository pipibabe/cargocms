import Lang from 'lodash';
import {
  postData,
} from '../utils/fetchApi';
import { showToast } from './toast';
// ------------------------------------
// Constants
// ------------------------------------
export const GET_SHIP_LIST = 'GET_SHIP_LIST';
export const FIND_SHIP_ITEM = 'FIND_SHIP_ITEM';
const API_SHIP_LIST = '/api/admin/suppliershiporder/all';

// ------------------------------------
// Actions
// ------------------------------------
export function deliverShipListData(data) {
  return {
    type: GET_SHIP_LIST,
    list: data,
  };
}

export function fetchShipListData() {
  return async(dispatch, getState) => {
    const query = {
      serverSidePaging: true,
      startDate: '1900/01/01',
      endDate: '3000/01/01',
      where: {
        SupplierId: getState().user.currentUser.Supplier.id,
      },
      columns: [],
      order: [{
        column: 0,
        dir: 'asc',
      }],
      search: {
        value: '',
        regex: false,
      },
      length: 1000,
      start: 0,
      _: new Date().getTime(),
    };
    const fetchResult = await postData(API_SHIP_LIST, query);
    let result = '';
    // success
    if (fetchResult.status) {
      dispatch(deliverShipListData(fetchResult.data.data));
      if (!Lang.isEmpty(fetchResult.data.data)) {
        dispatch(showToast('載入完成'));
      } else {
        dispatch(showToast('沒有資料'));
      }
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
  return async(dispatch, getState) => {
    const query = {
      serverSidePaging: true,
      startDate: '1900/01/01',
      endDate: '3000/01/01',
      columns: [{
        data: 'id',
        searchable: true,
      },
      {
        data: 'invoiceNo',
        searchable: 'true',
        findInclude: 'true',
        search: {
          concat: ['invoicePrefix', 'invoiceNo'],
        },
      },
      {
        data: 'lastname',
        searchable: 'true',
        findInclude: 'true',
        search: {
          concat: ['lastname', 'firstname'],
        },
      },
      {
        data: '',
        searchable: true,
        search: {
          where: {
            SupplierId: getState().user.Supplier.id,
          },
        },
      },
      { data: 'email', searchable: 'true' },
      { data: 'telephone', searchable: 'true' },
      { data: 'paymentAddress1', searchable: 'true' },
      { data: 'paymentCity', searchable: 'true' },
      ],
      order: [{ column: '0', dir: 'asc' }],
      start: 0,
      length: 999999,
      search: { value, regex: 'false' },
      _: new Date().getTime(),
    };
    const fetchResult = await postData(API_SHIP_LIST, query);
    let result = '';
    // success
    if (fetchResult.status) {
      dispatch(deliverFindShipItem(value, { items: fetchResult.data.data }));
      if (fetchResult.data.data.length > 0) {
        dispatch(showToast('載入完成'));
      } else {
        dispatch(showToast('沒有資料'));
      }
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
