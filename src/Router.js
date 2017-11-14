import React from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }} >
      <Scene key='auth'>
        <Scene
          key='login'
          component={LoginForm}
          title="Login"
          titleStyle={styles.titleStyle}
          initial
        />
        <Scene
          key='register'
          component={RegisterForm}
          title='Register'
          titleStyle={styles.titleStyle}
        />
      </Scene>
    </Router>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    alignSelf: 'center'
  }
});

export default RouterComponent;
