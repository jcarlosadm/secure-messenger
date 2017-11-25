import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FriendsReducer from './FriendsReducer';
import NewFriendReducer from './NewFriendReducer';
import FriendMessageReducer from './FriendMessageReducer';

export default combineReducers({
  auth: AuthReducer,
  friends: FriendsReducer,
  newFriend: NewFriendReducer,
  message: FriendMessageReducer
});
