import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from './auth-reducer';

let reducers = combineReducers({
  auth: authReducer,
});

const store = createStore(reducers);

window.__store__ = store;

export default store;
