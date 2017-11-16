import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  NAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  RESET_ATTR
} from './types';

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        loginUserSuccess(dispatch, user);
      })
      .catch(() => loginUserFail(dispatch));
  };
};

export const registerUser = ({ name, email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => registerUserSuccess(dispatch, user, name, email, password))
      .catch(() => loginUserFail(dispatch));
  };
};

export const resetAttr = () => {
  return { type: RESET_ATTR };
};

export const verifyIfUserLogged = () => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        loginUserSuccess(dispatch, user);
      } else {
        Actions.login({ type: 'reset' });
      }
    });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  // TODO: update user ip
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.messenger({ type: 'reset' });
};

const registerUserSuccess = (dispatch, user, name, password) => {
  user.updateProfile({ displayName: name })
    .then(() => {
      firebase.auth().signInWithEmailAndPassword(user.email, password)
        .then(userLogin => {
          loginUserSuccess(dispatch, userLogin);
        })
        .catch(() => loginUserFail(dispatch));
    });
};
