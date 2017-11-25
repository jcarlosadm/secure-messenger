import {
  MESSAGE_TITLE_CHANGED,
  FRIEND_ID_CHANGED,
  FETCH_MESSAGES_SUCCESS,
  BUBBLE_TEXT_CHANGED,
  SEND_MESSAGE_SUCCESS,
  SENDING_MESSAGE
} from '../actions/types';

const INITIAL_STATE = {
  title: '',
  friendId: '',
  listMessages: {},
  bubbleText: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGE_TITLE_CHANGED:
      return { ...state, title: action.payload };
    case FRIEND_ID_CHANGED:
      return { ...state, friendId: action.payload };
    case FETCH_MESSAGES_SUCCESS:
      return { ...state, listMessages: action.payload };
    case BUBBLE_TEXT_CHANGED:
      return { ...state, bubbleText: action.payload };
    case SENDING_MESSAGE:
      return { ...state, loading: true };
    case SEND_MESSAGE_SUCCESS:
      return { ...state, bubbleText: '', loading: false };
    default:
      return state;
  }
};
