import {
  FRIEND_EMAIL_CHANGED,
  FRIEND_LOADING,
  FRIEND_RESET,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FRIEND_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case FRIEND_LOADING:
      return { ...state, loading: true, error: '' };
    case FRIEND_RESET:
      return { ...state, ...INITIAL_STATE };
    case ADD_FRIEND_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case ADD_FRIEND_FAIL:
      return { ...state, loading: false, error: 'Error to add friend' };
    default:
      return state;
  }
};
