import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux'

import auth from './auth';

export default combineReducers({
  form,
  routing: routerReducer,
  auth
});