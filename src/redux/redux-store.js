import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import appReducer from './init-reducer';
import authReducer from './auth-reducer';
import profileReducer from './profile-reducer';
import notesReducer from './notes-reducer';

let reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  notes: notesReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.__store__ = store;

export default store;
