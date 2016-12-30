// /* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_TOAST = 'SHOW_TOAST';
export const CLOSE_TOAST = 'CLOSE_TOAST';

// ------------------------------------
// Actions
// ------------------------------------
export function showToast(
  msg = '',
) {
  return {
    type: SHOW_TOAST,
    open: true,
    msg,
  };
}

export function closeToast() {
  return {
    type: CLOSE_TOAST,
    open: false,
    msg: '',
  };
}

export const actions = {
  showToast,
  closeToast,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
export const ACTION_HANDLERS = {
  [SHOW_TOAST]: (state = {}, action) => ({
    ...state,
    open: action.open,
    msg: action.msg,
  }),
  [CLOSE_TOAST]: (state = {}, action) => ({
    ...state,
    open: action.open,
    msg: action.msg,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  msg: '',
  open: false,
};

export default function toastReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
