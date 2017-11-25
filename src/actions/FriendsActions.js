import firebase from 'firebase';
import {
  FRIENDS_FETCH_SUCCESS,
  FRIENDS_RESET
} from './types';

export const friendsFetch = (currentUser) => {
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/friends`)
      .on('value', snapshot => {
        const data = snapshot.val();
        if (data != null && data !== undefined) {
          const keys = Object.keys(snapshot.val());

          firebase.database().ref('users').once('value', snapshot2 => {
            for (let i = 0; i < keys.length; ++i) {
              const friendInfo = getFriendInfo(snapshot2.val(), keys[i]);
              data[keys[i]].email = friendInfo.email;
              data[keys[i]].name = friendInfo.name;
              data[keys[i]].friendId = friendInfo.friendId;
            }

            dispatch({
              type: FRIENDS_FETCH_SUCCESS,
              payload: data
            });
          });
        } else {
          dispatch({
            type: FRIENDS_FETCH_SUCCESS,
            payload: {}
          });
        }
      });
  };
};

export const friendsReset = () => {
  return { type: FRIENDS_RESET };
};

const getFriendInfo = (data, friendId) => {
  const email = data[friendId].basic_info.email;
  const name = data[friendId].basic_info.name;
  return { email, name, friendId };
};
