import { profileAPI } from '../api/api';

const PROFILE_ADD_USER = 'PROFILE/ADD_USER';
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

export default profileReducer;
