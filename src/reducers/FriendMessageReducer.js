import {
  MESSAGE_TITLE_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  title: '',
  listMessages: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGE_TITLE_CHANGED:
      return { ...state, title: action.payload };
    default:
      return state;
  }
};
