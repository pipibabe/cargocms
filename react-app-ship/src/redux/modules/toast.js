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
  console.log(`Action@toastMsg=>${toastMsg}`);
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
const ACTION_HANDLERS = {
  [SHOW_TOAST]: (state = {}, action) => {
    console.log(`Handler@state=>${JSON.stringify(state)}`);
    console.log(`Handlers@action=>${JSON.stringify(action)}`);
    return {
      ...state,
      toastOpen: action.open,
      toastMsg: action.msg,
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function toastReducer(state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];

  console.log(`Reducer@state=>${JSON.stringify(state)}`);
  console.log(`Reducer@action=>${action.type}`);
  console.log(`Reducer@ACTION_HANDLERS=>${JSON.stringify(ACTION_HANDLERS)}`);
  console.log(`Reducer@handler=>${JSON.stringify(handler)}`);

  return handler ? handler(state, action) : state;
}
