import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './auth-reducer';
import profileReducer from './profile-reducer';

let reducers = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.__store__ = store;

export default store;
