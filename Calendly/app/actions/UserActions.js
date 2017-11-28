import * as actions from './ActionTypes';
import * as CONSTANTS from '../common/Constants';

export function setUser(code) {
  return {
    type: actions.SET_USER,
    code,
  };
}

export function clearUsers() {
  return {
    type: actions.CLEAR_USERS,
  };
}
