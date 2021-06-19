// import { authAPI, securityAPI } from '../api/api';
import { profileAPI } from '../api/api';

const PROFILE_ADD_USER = 'PROFILE/ADD_USER';
// const DESTROY_AUTH_USER_DATA = 'AUTH/DESTROY_USER_DATA';
const PROFILE_TOGGLE_IS_FETCHING = 'PROFILE/TOGGLE_IS_FETCHING';

let initialState = {
  authUser: {
    userId: null,
    email: null,
    name: null,
  },
  isFetching: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_ADD_USER:
      return {
        ...state,
      };
    case PROFILE_TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

// const _setAuthUserData = (userId, name, login) => ({ type: PROFILE_SET_USER, payload: { userId, name, login } });
// const _destroyAutUserData = () => ({ type: DESTROY_AUTH_USER_DATA });
const _toggleIsFetching = (isFetching) => ({ type: PROFILE_TOGGLE_IS_FETCHING, isFetching });

export const addUser = (email, name, password) => async (dispatch) => {
  try {
    dispatch(_toggleIsFetching(true));
    const addUserData = await profileAPI.addUser(email, name, password);
    if (addUserData.resultCode === 1) {
      console.log('Регистрация прошла успешно');
    } else {
      console.log('Чтото пошло не так');
    }
    dispatch(_toggleIsFetching(false));
    return addUserData.data;
  } catch (error) {
    console.error(error);
  }
};

// export const authMe = () => async (dispatch) => {
//   try {
//     dispatch(_toggleIsFetching(true));
//     const data = await authAPI.authMe();

//     if (data.resultCode === 0) {
//       dispatch(_setAuthUserData(data.data.id, data.data.name, data.data.login));
//     } else {
//       dispatch(_destroyAutUserData());
//     }
//     dispatch(_toggleIsFetching(false));

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const authLogin = (name, password, rememberMy, captcha) => async (dispatch, getState) => {
//   try {
//     const authLoginData = await authAPI.authLogin(name, password, rememberMy, captcha);
//     if (authLoginData.resultCode === 0) {
//       return await dispatch(authMe());
//     } else if (authLoginData.resultCode === 10) {
//       // const captchaUrl = getState().auth.captchaUrl;
//       // if (!captchaUrl) {
//       //   await dispatch(getCaptchaUrl());
//       // }
//     }
//     return authLoginData;
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const authLogout = () => async (dispatch) => {
//   try {
//     const authLogoutData = await authAPI.authLogout();
//     if (authLogoutData.resultCode === 0) {
//       dispatch(_destroyAutUserData());
//     }
//     return authLogoutData;
//   } catch (error) {
//     console.log(error);
//   }
// };

export default profileReducer;
