import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import RSAManager from '../RSAManager';
import BlockCipher from '../BlockCipher';
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

export const addFriend = ({ user, publicKey, friendEmail }) => {
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
            id: keys[i],
            publicKey: snapshot.val()[keys[i]].basic_info.publicKey
          };
        }
      }
    })
    .then(() => {
      if (data != null) {
        if (data.email === user.email) {
          dispatch({ type: ADD_FRIEND_FAIL });
        } else {
          friendNotExists(user, data.id, (success) => {
            if (success) {
              const rsa = new RSAManager();
              const friendPk = rsa.jsonToPublicKey(data.publicKey);
              const cipher = new BlockCipher();
              const { key, initVector } = cipher.genKeys();
              const { jsonKey, jsonInitVector } = cipher.keysToJson(key, initVector);
              const encryptedKeyToFriend = rsa.encrypt(jsonKey, friendPk);
              const encryptedInitVecToFriend = rsa.encrypt(jsonInitVector, friendPk);
              const encryptedKeyToMe = rsa.encrypt(jsonKey, publicKey);
              const encryptedInitVecToMe = rsa.encrypt(jsonInitVector, publicKey);

              firebase.database().ref(`users/${data.id}/friends`)
              .child(user.uid).set({
                session_key: encryptedKeyToFriend,
                init_vector: encryptedInitVecToFriend
              })
              .then(() => {
                firebase.database().ref(`users/${user.uid}/friends`)
                .child(data.id).set({
                  session_key: encryptedKeyToMe,
                  init_vector: encryptedInitVecToMe
                })
                .then(() => {
                  dispatch({ type: ADD_FRIEND_SUCCESS });
                  Actions.friends({ type: 'reset' });
                });
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

const friendNotExists = (user, friendId, callback) => {
  let success = true;
  firebase.database().ref(`users/${user.uid}/friends`)
  .once('value', snapshot => {
    const data = snapshot.val();

    if (data) {
      const keys = Object.keys(data);

      for (let i = 0; i < keys.length; ++i) {
        if (keys[i] === friendId) {
          success = false;
          break;
        }
      }
    }
  })
  .then(callback(success));
};
