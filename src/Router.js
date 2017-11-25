import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import FriendsList from './components/FriendsList';
import InitialLogo from './components/InitialLogo';
import NewFriendForm from './components/NewFriendForm';
import MessageWindow from './components/MessageWindow';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }} >
        <Scene
          key='initialLogo'
          component={InitialLogo}
          hideNavBar
          initial
        />
        <Scene
          key='login'
          component={LoginForm}
          title="Login"
        />
        <Scene
          key='register'
          component={RegisterForm}
          title='Register'
        />
        <Scene
          onRight={() => {
            firebase.auth().signOut();
            Actions.login({ type: 'reset' });
          }}
          rightTitle='Logout'
          key='friends'
          component={FriendsList}
          title='Friends'
        />
        <Scene
          key='newFriendForm'
          component={NewFriendForm}
          title='New Friend'
        />
        <Scene
          key='messageWindow'
          component={MessageWindow}
          title='Messages'
        />
    </Router>
  );
};

export default RouterComponent;
