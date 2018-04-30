import config from '../config/config';
import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

export function signinUser({ username, password }, history) {
  return dispatch => {
    // Submit username/password to the server
    axios.post(`${config.services.api.uri}/auth`, { username, password })
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
  axios.delete(`${config.services.api.uri}/auth`, {
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
//    let limit = 0;
    //axios.get(`${config.services.api.uri}/phrases/rand/${limit}`, {
    axios.get(`${config.services.api.uri}/posts/1`, {
      headers: { contentType: 'application/json' }
    })
    .then(response => {
      const bodyResponse = response.data.body
      dispatch({
        type: FETCH_MESSAGE,
        payload: bodyResponse
      })
    })
    .catch(err => {
      console.log(err);
    });
  }
}