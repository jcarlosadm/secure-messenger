import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { friendsFetch } from '../actions';
import FriendListUnit from './FriendListUnit';

class FriendsList extends Component {
  componentWillMount() {
    this.props.friendsFetch(this.props.user);

    this.createDataSource(this.props);

    Actions.refresh({ onRight: this.logout });
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  logout() {
    firebase.auth().signOut();
    Actions.login({ type: 'reset' });
  }

  createDataSource({ friends }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(friends);
  }

  renderRow(friend) {
    return <FriendListUnit friend={friend} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  const friends = _.map(state.friends, (val, uid) => {
    return { ...val, uid };
  });

  return { friends, user };
};

export default connect(mapStateToProps, {
  friendsFetch
})(FriendsList);
