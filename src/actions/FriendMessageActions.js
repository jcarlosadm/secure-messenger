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
