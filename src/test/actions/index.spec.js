import '../mocks/localStorage';
import mockAxios from 'jest-mock-axios';
import { signinUser, authError, signoutUser } from '../../actions/';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from '../../actions/types';

describe('ACTION', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  describe('signinUser', () => {
    it('authentication error', () => {
      const action = authError('Bad login info');

      expect(action.type).toEqual(AUTH_ERROR);
      expect(action.payload).toEqual('Bad login info');
    });
  });

  describe('signoutUser', () => {
    it('signinout user', () => {
      localStorage.setItem('token', '1234');
      const action = signoutUser();
      mockAxios.mockResponse();

      expect(localStorage.getItem('token')).toEqual(null);
      expect(action.type).toEqual(UNAUTH_USER);
    });
  });
});
