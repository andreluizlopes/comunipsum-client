import {
  FETCH_UPLOAD
} from '../../actions/types';
import { uploadSpecialPrice } from '../../actions/upload';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

export const mockStore = configureMockStore([thunk]);

describe('Actions upload', () => {
  it('uploadSpecialPrice', () => {
    const store = mockStore();
    store.dispatch(uploadSpecialPrice({teste: 1}));
    const actions = store.getActions();
    expect(actions[0]).toEqual({"type": FETCH_UPLOAD});
  });
});