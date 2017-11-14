import {
  NAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAME_CHANGED:
      return { ...state, name: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        password: '',
        error: '',
        loading: false,
        user: action.payload
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: 'Authentication Failed',
        password: '',
        loading: false
      };
    default:
      return state;
  }
};
