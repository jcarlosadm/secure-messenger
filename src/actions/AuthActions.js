import firebase from 'firebase';
import {
  NAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
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
        firebase.database().ref(`/users/${user.uid}/basic_info`)
          .once('value')
          .then(snapshot => dispatch({
            type: NAME_CHANGED,
            payload: snapshot.val().username
          }));
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

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  // TODO: call Action Main window
};

const registerUserSuccess = (dispatch, user, name, email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userLogin => {
      const { currentUser } = firebase.auth();
      firebase.database().ref(`/users/${currentUser.uid}/basic_info`)
        .set({ username: name })
        .then(dispatch({
          type: NAME_CHANGED,
          payload: name
        }));
      loginUserSuccess(dispatch, userLogin);
    })
    .catch(() => loginUserFail(dispatch));
};
