import config from '../config/config';
import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';
import UrlQueryHelper from '../helpers/urlQuery';

export function signinUser({ username, password }, history) {
  return dispatch => {
    // Submit username/password to the server
    axios.post(`${config.services.price_api.uri}/auth`, { username, password })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      history.push('/');
      dispatch({ type: AUTH_USER });
    })
    .catch((err) => {
      if (err.response) {
        dispatch(authError(`Bad login info, ${err.response.data.message}`));
      }
    });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  axios.delete(`${config.services.price_api.uri}/auth`, {
    headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
  })
  .catch(err => {
    console.error(err);
  });

  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function fetchMessage(data = null) {
  return function(dispatch, getState) {

    let filterPagination = getState().form.filterPagination;
    let filterPaginationParams = '';
    if(filterPagination && filterPagination.values) {
      filterPaginationParams = `${UrlQueryHelper.toParams(filterPagination.values)}`;
    }
    
    let filterForm = getState().form.filterForm;
    let filterFormParams = '';
    if (filterForm && filterForm.values) {
      filterFormParams = `${UrlQueryHelper.toParams(filterForm.values)}`;
    }
    if (filterPaginationParams && filterFormParams) {
      filterFormParams = `&${filterFormParams}`;
    }

    axios.get(`${config.services.price_api.uri}/special-prices/search?${filterPaginationParams}${filterFormParams}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data
      })
    })
    .catch(err => {
      console.log(err);
      if (err.response === undefined || err.response.status === 401) {
        signoutUser();
      }
    });
  }
}