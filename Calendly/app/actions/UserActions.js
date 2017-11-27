import * as actions from './ActionTypes';

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
