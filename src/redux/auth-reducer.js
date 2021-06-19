// import { authAPI, securityAPI } from '../api/api';
import { authAPI } from '../api/api';

const SET_AUTH_USER_DATA = 'AUTH/SET_AUTH_USER_DATA';
const DESTROY_AUTH_USER_DATA = 'AUTH/DESTROY_USER_DATA';
const TOGGLE_AUTH_IS_FETCHING = 'AUTH/TOGGLE_IS_FETCHING';

let initialState = {
  authUser: {
    userId: null,
    email: null,
    name: null,
  },
  isAuth: false,
  isFetching: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        authUser: action.payload,
        isAuth: true,
      };
    case DESTROY_AUTH_USER_DATA:
      return {
        ...state,
        authUser: {
          userId: null,
          email: null,
          name: null,
        },
        isAuth: false,
      };
    case TOGGLE_AUTH_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};
const _setAuthUserData = (userId, email, name) => ({ type: SET_AUTH_USER_DATA, payload: { userId, email, name } });
const _destroyAutUserData = () => ({ type: DESTROY_AUTH_USER_DATA });
const _toggleIsFetching = (isFetching) => ({ type: TOGGLE_AUTH_IS_FETCHING, isFetching });

export const authMe = (userId) => async (dispatch) => {
  try {
    const authMeData = await authAPI.authMe(userId);
    if (authMeData.resultCode === 1) {
      dispatch(_setAuthUserData(authMeData.data.userId, authMeData.data.email, authMeData.data.name));
      dispatch(_toggleIsFetching(false));
    } else {
      dispatch(_destroyAutUserData());
    }
    return authMeData.data;
  } catch (error) {
    console.log(error);
  }
};

export const authLogin = (email, password) => async (dispatch) => {
  try {
    dispatch(_toggleIsFetching(true));
    const authLoginData = await authAPI.authLogin(email, password);
    if (authLoginData.resultCode === 1) {
      return await dispatch(authMe(authLoginData.data.userId));
    } else {
      console.log('Чтото пошло не так');
    }
    dispatch(_toggleIsFetching(false));

    return authLoginData.data;
  } catch (error) {
    console.error(error);
  }
};

export const authLogout = () => async (dispatch) => {
  try {
    const authLogoutData = await authAPI.authLogout();
    if (authLogoutData.resultCode === 1) {
      dispatch(_destroyAutUserData());
    }
    return authLogoutData.data;
  } catch (error) {
    console.log(error);
  }
};

export default authReducer;
