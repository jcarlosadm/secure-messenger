import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
// import DataStore from 'react-native-local-mongodb';
import { friendsFetch } from '../actions';
import FriendListUnit from './FriendListUnit';
import LocalDatabase from '../LocalDatabase';

class FriendsList extends Component {
  componentWillMount() {
    //const db = new DataStore(/*{ filename: 'storageKey' }*/);
    //db.loadDatabase();

    /*const doc = [
      {
        uid: 'sadsdsesdsdzcxzdsd',
        friends: ['aaaaaa', 'bbbbbb']
      }
    ];

    db.insert(doc);

    db.find({ uid: 'sadsdsesdsdzcxzdsd' }, (err, docs) => {
      console.log(docs[0].friends);
    });

    db.update({ uid: 'sadsdsesdsdzcxzdsd' }, { $push: { friends: 'ccccccc' } },
    {}, () => {});

    db.find({ uid: 'sadsdsesdsdzcxzdsd' }, (err, docs) => {
      console.log(docs[0].friends);
    });

    db.update({ uid: 'sadsdsesdsdzcxzdsd' }, { $pull: { friends: 'ccccccc' } },
    {}, () => {});

    db.find({ uid: 'sadsdsesdsdzcxzdsd' }, (err, docs) => {
      console.log(docs[0].friends);
    });

    db.update({ uid: 'sadsdsesdsdzcxzdsd' },
    { $set: { friends: ['ddddddd', 'eeeeeeee'] } },
    {}, () => {});

    db.find({ uid: 'sadsdsesdsdzcxzdsd' }, (err, docs) => {
      console.log(docs[0].friends);
    });
    */
    const localDb = new LocalDatabase();
    localDb.updateFriendList('sadsdsesdsdzcxzdsd', ['aaaaa', 'fffffff'], () => {
      localDb.getFriendList('sadsdsesdsdzcxzdsd', (friendList) => {
        console.log('friend list:', friendList);
      });
    });

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
