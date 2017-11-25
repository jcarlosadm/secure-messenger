import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import BlockCipher from '../BlockCipher';
import RSAManager from '../RSAManager';
import {
  MESSAGE_TITLE_CHANGED,
  FRIEND_ID_CHANGED,
  FETCH_MESSAGES_SUCCESS,
  BUBBLE_TEXT_CHANGED,
  SENDING_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SESSION_KEY_CHANGED
} from './types';

export const chooseFriend = ({ name, friendId }) => {
  return (dispatch) => {
    dispatch({
      type: MESSAGE_TITLE_CHANGED,
      payload: name
    });

    dispatch({
      type: FRIEND_ID_CHANGED,
      payload: friendId
    });

    const user = firebase.auth().currentUser;
    firebase.database().ref(`users/${user.uid}/friends`)
      .child(friendId).once('value', (snapshot) => {
        const encryptedInitVectorJson = snapshot.val().init_vector;
        const encryptedKeyJson = snapshot.val().session_key;


        const rsa = new RSAManager();
        rsa.getPrivateKeyLocally(user.uid, (privateKey) => {
          const initVectorJson = rsa.decrypt(encryptedInitVectorJson, privateKey);
          const keyJson = rsa.decrypt(encryptedKeyJson, privateKey);

          const cipher = new BlockCipher();
          const { key, initVector } =
            cipher.jsonToKeys(keyJson, initVectorJson);

          console.log(key);
          console.log(initVectorJson);

          dispatch({
            type: SESSION_KEY_CHANGED,
            payload: { sessionKey: key, initVector }
          });

          Actions.messageWindow();
        });
      });
  };
};

export const fetchMessages = ({ uid, friendId, sessionKey, initVector }) => {
  return (dispatch) => {
    firebase.database().ref(`users/${uid}/friends/${friendId}/messages`)
    .orderByChild('timestamp')
    .on('value', (snapshot) => {
      const data = {};
      const cipher = new BlockCipher();
      snapshot.forEach((child) => {
        data[child.key] = child.val();
        data[child.key].message = cipher.decrypt(data[child.key].message,
          sessionKey, initVector);
      });

      dispatch({
        type: FETCH_MESSAGES_SUCCESS,
        payload: data
      });
    });
  };
};

export const bubbleTextChanged = (text) => {
  return {
    type: BUBBLE_TEXT_CHANGED,
    payload: text
  };
};

export const sendMessage = ({ uid, friendId, message, sessionKey, initVector }) => {
  const timestamp = new Date().getTime();

  return (dispatch) => {
    if (message != null && message !== undefined && message.length > 0) {
      dispatch({ type: SENDING_MESSAGE });
      const messageAscii = message.replace(/[^\x00-\x7F]/g, '_');

      const cipher = new BlockCipher();
      const newMessage = cipher.encrypt(messageAscii, sessionKey, initVector);

      firebase.database().ref(`users/${uid}/friends/${friendId}/messages`)
      .push().set({
        message: newMessage,
        owner: uid,
        timestamp
      })
      .then(() => {
        firebase.database().ref(`users/${friendId}/friends/${uid}/messages`)
        .push().set({
          message: newMessage,
          owner: uid,
          timestamp
        })
        .then(() => {
          dispatch({ type: SEND_MESSAGE_SUCCESS });
        });
      });
    }
  };
};
