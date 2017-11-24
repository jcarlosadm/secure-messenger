import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  MESSAGE_TITLE_CHANGED,
  FRIEND_ID_CHANGED,
  FETCH_MESSAGES_SUCCESS
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
