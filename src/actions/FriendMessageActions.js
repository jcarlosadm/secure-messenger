import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  MESSAGE_TITLE_CHANGED,
  FRIEND_ID_CHANGED,
  FETCH_MESSAGES_SUCCESS,
  BUBBLE_TEXT_CHANGED,
  SENDING_MESSAGE,
  SEND_MESSAGE_SUCCESS
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

    Actions.messageWindow();
  };
};

export const fetchMessages = ({ uid, friendId }) => {
  return (dispatch) => {
    firebase.database().ref(`users/${uid}/friends/${friendId}/messages`)
    .orderByChild('timestamp')
    .on('value', (snapshot) => {
      const data = {};
      snapshot.forEach((child) => {
        data[child.key] = child.val();
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

export const sendMessage = ({ uid, friendId, message }) => {
  const timestamp = new Date().getTime();

  return (dispatch) => {
    if (message != null && message !== undefined && message.length > 0) {
      dispatch({ type: SENDING_MESSAGE });

      firebase.database().ref(`users/${uid}/friends/${friendId}/messages`)
      .push().set({
        message,
        owner: uid,
        timestamp
      })
      .then(() => {
        firebase.database().ref(`users/${friendId}/friends/${uid}/messages`)
        .push().set({
          message,
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
