import config from '../config/config';
import axios from 'axios';
import {
  FETCH_SPECIAL_PRICE_SEARCH
} from './types';
import UrlQueryHelper from '../helpers/urlQuery';
import * as actions from './index'

export function fetchSearch() {
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
        type: FETCH_SPECIAL_PRICE_SEARCH,
        payload: response.data
      })
    })
    .catch(err => {
      console.log(err);
      if (err.response === undefined || err.response.status === 401) {
        actions.signoutUser();
      }
    });
  }
}