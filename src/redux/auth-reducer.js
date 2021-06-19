// import { authAPI, securityAPI } from '../api/api';
import { authAPI } from '../api/api';

const SET_AUTH_USER_DATA = 'AUTH/SET_AUTH_USER_DATA';
const DESTROY_AUTH_USER_DATA = 'AUTH/DESTROY_USER_DATA';
const TOGGLE_IS_FETCHING = 'AUTH/TOGGLE_IS_FETCHING';

let initialState = {
  userId: null,
  email: null,
  name: null,
  isAuth: false,
  isFetching: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.payload,
        isAuth: true,
      };
    case DESTROY_AUTH_USER_DATA:
      return {
        ...state,
        userId: null,
        name: null,
        login: null,
        isAuth: false,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};
const _setAuthUserData = (userId, name, login) => ({ type: SET_AUTH_USER_DATA, payload: { userId, name, login } });
const _destroyAutUserData = () => ({ type: DESTROY_AUTH_USER_DATA });
const _toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const authMe = () => async (dispatch) => {
  try {
    dispatch(_toggleIsFetching(true));
    const data = await authAPI.authMe();

    if (data.resultCode === 0) {
      dispatch(_setAuthUserData(data.data.id, data.data.name, data.data.login));
    } else {
      dispatch(_destroyAutUserData());
    }
    dispatch(_toggleIsFetching(false));

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const authLogin = (name, password, rememberMy, captcha) => async (dispatch, getState) => {
  try {
    const authLoginData = await authAPI.authLogin(name, password, rememberMy, captcha);
    if (authLoginData.resultCode === 0) {
      return await dispatch(authMe());
    } else if (authLoginData.resultCode === 10) {
      // const captchaUrl = getState().auth.captchaUrl;
      // if (!captchaUrl) {
      //   await dispatch(getCaptchaUrl());
      // }
    }
    return authLoginData;
  } catch (error) {
    console.log(error);
  }
};
export const authLogout = () => async (dispatch) => {
  try {
    const authLogoutData = await authAPI.authLogout();
    if (authLogoutData.resultCode === 0) {
      dispatch(_destroyAutUserData());
    }
    return authLogoutData;
  } catch (error) {
    console.log(error);
  }
};

export default authReducer;
