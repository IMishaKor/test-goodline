import md5 from 'md5';
import { authMe } from './auth-reducer';

const SET_INIT = 'APP/SET_INIT';
const SET_SESSION_TAB_ID = 'APP/SET_SESSION_TAB_ID';
const REMOVE_SESSION_TAB_ID = 'APP/REMOVE_SESSION_TAB_ID';

let initialState = {
  init: false,
  sessionTabId: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INIT:
      return {
        ...state,
        init: true,
      };
    case SET_SESSION_TAB_ID:
      return {
        ...state,
        sessionTabId: action.sessionTabId,
      };
    case REMOVE_SESSION_TAB_ID:
      return {
        ...state,
        sessionTabId: null,
      };
    default:
      return state;
  }
};
const _setInit = () => ({ type: SET_INIT });
const _setSessionTabId = (sessionTabId) => ({ type: SET_SESSION_TAB_ID, sessionTabId });
const _removeSessionTabId = () => ({ type: REMOVE_SESSION_TAB_ID });

export const setInit = (userId) => async (dispatch) => {
  if (userId > 0) {
    await dispatch(authMe(userId));
    let sessionTabId;
    if (window.name) {
      sessionTabId = window.name;
    } else {
      sessionTabId = md5(userId + '' + Math.random());
      window.name = sessionTabId;
    }
    dispatch(_setSessionTabId(sessionTabId));
  } else {
    window.name = '';
    dispatch(_removeSessionTabId());
  }
  dispatch(_setInit());
};

export default appReducer;
