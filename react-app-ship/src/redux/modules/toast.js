// /* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_TOAST = 'SHOW_TOAST';

// ------------------------------------
// Actions
// ------------------------------------
export function showToast(
  toastMsg = '',
) {
  return {
    type: SHOW_TOAST,
    toastOpen: true,
    toastMsg,
  };
}

export const actions = {
  showToast,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
export const ACTION_HANDLERS = {
  [SHOW_TOAST]: (state = {}, action) => {
    return {
      ...state,
      toastOpen: action.toastOpen,
      toastMsg: action.toastMsg,
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  toastMsg: '',
  toastOpen: false,
};

export default function toastReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
