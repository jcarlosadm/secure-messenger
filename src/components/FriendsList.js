import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import { friendsFetch } from '../actions';
import FriendListUnit from './FriendListUnit';

class FriendsList extends Component {
  componentWillMount() {
    this.props.friendsFetch(this.props.user);

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
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
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }} >
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => Actions.newFriendForm()}
        />
      </View>
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
