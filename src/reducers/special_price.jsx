import {
  FETCH_SPECIAL_PRICE_SEARCH
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_SPECIAL_PRICE_SEARCH:
      return { ...state, search: action.payload };
    default:
      return state;
  }
}