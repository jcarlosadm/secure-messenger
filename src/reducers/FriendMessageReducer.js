import {
  MESSAGE_TITLE_CHANGED,
  FRIEND_ID_CHANGED,
  FETCH_MESSAGES_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  title: '',
  friendId: '',
  listMessages: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGE_TITLE_CHANGED:
      return { ...state, title: action.payload };
    case FRIEND_ID_CHANGED:
      return { ...state, friendId: action.payload };
    case FETCH_MESSAGES_SUCCESS:
      return { ...state, listMessages: action.payload };
    default:
      return state;
  }
};
