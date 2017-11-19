import firebase from 'firebase';
import {
  FRIENDS_FETCH_SUCCESS,
  FRIENDS_RESET
} from './types';

export const friendsFetch = (currentUser) => {
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/friends`)
      .on('value', snapshot => {
        dispatch({
          type: FRIENDS_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

export const friendsReset = () => {
  return { type: FRIENDS_RESET };
};
