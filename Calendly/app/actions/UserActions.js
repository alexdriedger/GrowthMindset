import { GoogleSignin } from 'react-native-google-signin';
import * as actions from './ActionTypes';

export function requestUser() {
  return {
    type: actions.REQUEST_USER,
  };
}

export function receiveUserSuccess(user) {
  return {
    type: actions.RECEIVE_USER_SUCCESS,
    user,
  };
}

export function receiveUserFailure() {
  return {
    type: actions.RECEIVE_USER_FAILURE,
  };
}

export function signOut() {
  return {
    type: actions.LOG_OUT,
  };
}

async function _signOut() {
  await GoogleSignin.revokeAccess();
  await GoogleSignin.signOut();
  console.log('Signed out');
}

export function logOut() {
  return async function (dispatch) {
    _signOut();
    dispatch(signOut());
  };
}

async function _setupGoogleSignin() {
  let user;
  try {
    await GoogleSignin.hasPlayServices({ autoResolve: true });
    await GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/calendar'],
      webClientId: '559002692075-dd16p5gkema2phtuq4hrt09pbdpnjvb4.apps.googleusercontent.com',
      offlineAccess: true,
    });

    user = await GoogleSignin.currentUserAsync();
    // console.log('User already logged in');
  } catch (err) {
    console.log('Play services error', err.code, err.message);
  }
  return user;
}

async function _signIn() {
  let user;
  try {
    user = await GoogleSignin.signIn();
  } catch (err) {
    console.log('WRONG SIGNIN', err);
  }
  return user;
}

export function logIn() {
  return async function (dispatch) {
    dispatch(requestUser());
    let user = await _setupGoogleSignin();
    if (user) {
      dispatch(receiveUserSuccess(user));
      return;
    }
    user = await _signIn();
    if (user) {
      dispatch(receiveUserSuccess(user));
    } else {
      dispatch(receiveUserFailure());
    }
  };
}
