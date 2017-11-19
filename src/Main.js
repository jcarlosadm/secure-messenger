import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import firebaseSetup from '../firebase_setup.json';
import Router from './Router';
import { runTests } from './tests/tests';

export default class Main extends Component {
  constructor() {
     super();
     console.ignoredYellowBox = [
         'Setting a timer'
       ];
  }

  componentWillMount() {
    firebase.initializeApp(firebaseSetup);
    runTests();
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Router />
      </Provider>
    );
  }
}
