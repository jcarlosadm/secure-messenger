import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  MESSAGE_TITLE_CHANGED
} from './types';

export const chooseFriend = ({ name }) => {
  return (dispatch) => {
    dispatch({
      type: MESSAGE_TITLE_CHANGED,
      payload: name
    });

    Actions.messageWindow();
  };
};

export const fetchMessages = ({ uid, friendId }) => {
  /*return (dispatch) => {
    //firebase.database().ref(`users/${friendId}/messages`);
  };*/
  return {};
};
