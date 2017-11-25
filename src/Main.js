import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import firebaseSetup from '../firebase_setup.json';
import Router from './Router';

export default class Main extends Component {
  constructor() {
     super();
     console.ignoredYellowBox = ['Setting a timer'];
  }

  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseSetup);
    }
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Router />
      </Provider>
    );
  }
}
