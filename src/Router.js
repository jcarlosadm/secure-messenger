import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import FriendsList from './components/FriendsList';
import InitialLogo from './components/InitialLogo';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }} >
        <Scene key='auth'>
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
        </Scene>
        <Scene key='messenger'>
          <Scene
            key='friends'
            component={FriendsList}
            title='Friends'
            initial
          />
        </Scene>
    </Router>
  );
};

export default RouterComponent;
