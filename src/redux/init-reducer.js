import { authMe } from './auth-reducer';

const SET_INIT = 'APP/SET_INIT';

let initialState = {
  init: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INIT:
      return {
        ...state,
        init: true,
      };
    default:
      return state;
  }
};
const _setInit = () => ({ type: SET_INIT });

export const setInit = (userId) => (dispatch) => {
  if (userId > 0) {
    dispatch(authMe(userId)).then(() => dispatch(_setInit()));
  } else {
    dispatch(_setInit());
  }
};

export default appReducer;
