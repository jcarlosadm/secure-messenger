import _ from 'lodash';
import React from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchMessages } from '../actions';
import MessageUnit from './MessageUnit';

class MessageWindow extends React.Component {
  componentWillMount() {
    Actions.refresh({ title: this.props.title });

    this.props.fetchMessages({
      uid: this.props.user.uid,
      friendId: this.props.friendId
    });

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ messages }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(messages);
  }

  renderRow(message) {
    return <MessageUnit message={message} />;
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
  const { title, friendId, listMessages } = state.message;
  const { user } = state.auth;

  const messages = _.map(listMessages, (val, id) => {
    return { ...val, id };
  });

  return { title, friendId, messages, user };
};

export default connect(mapStateToProps, { fetchMessages })(MessageWindow);
