import {
  FRIENDS_FETCH_SUCCESS,
  FRIENDS_RESET
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FRIENDS_FETCH_SUCCESS:
      return action.payload;
    case FRIENDS_RESET:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
