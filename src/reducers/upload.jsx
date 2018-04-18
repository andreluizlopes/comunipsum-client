import {
  FETCH_UPLOAD
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_UPLOAD:
      return {
        ...state,
        errorItems: action.errorItems,
        successItems: action.successItems,
        progress: action.progress
      };
    default:
      return state;
  }
}