import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  FRIEND_EMAIL_CHANGED,
  FRIEND_LOADING,
  FRIEND_RESET,
  ADD_FRIEND_FAIL,
  ADD_FRIEND_SUCCESS
} from './types';

export const friendEmailChanged = (text) => {
  return {
    type: FRIEND_EMAIL_CHANGED,
    payload: text
  };
};

export const friendReset = () => {
  return { type: FRIEND_RESET };
};

export const addFriend = ({ user, friendEmail }) => {
  return (dispatch) => {
    dispatch({ type: FRIEND_LOADING });
    let data = null;
    firebase.database().ref('users')
    .orderByChild('basic_info/email')
    .equalTo(friendEmail)
    .once('value', (snapshot) => {
      if (snapshot.val()) {
        const keys = Object.keys(snapshot.val());
        for (let i = 0; i < keys.length; ++i) {
          data = {
            email: snapshot.val()[keys[i]].basic_info.email,
            id: keys[i]
          };
        }
      }
    })
    .then(() => {
      if (data != null) {
        if (data.email === user.email) {
          dispatch({ type: ADD_FRIEND_FAIL });
        } else {
          friendExists(user, data.id, (success) => {
            if (success) {
              firebase.database().ref(`users/${user.uid}/friends`)
              .push().set({ id: data.id })
              .then(() => {
                dispatch({ type: ADD_FRIEND_SUCCESS });
                Actions.friends({ type: 'reset' });
              })
              .catch(() => dispatch({ type: ADD_FRIEND_FAIL }));
            } else {
              dispatch({ type: ADD_FRIEND_FAIL });
            }
          });
        }
      } else {
        dispatch({ type: ADD_FRIEND_FAIL });
      }
    })
    .catch(() => {
      dispatch({ type: ADD_FRIEND_FAIL });
    });
  };
};

const friendExists = (user, friendId, callback) => {
  let success = true;
  firebase.database().ref(`users/${user.uid}/friends`)
  .once('value', snapshot => {
    const data = snapshot.val();

    if (data) {
      const keys = Object.keys(data);

      for (let i = 0; i < keys.length; ++i) {
        if (data[keys[i]].id === friendId) {
          success = false;
          break;
        }
      }
    }
  })
  .then(callback(success));
};
